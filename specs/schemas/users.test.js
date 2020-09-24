const _ = require('lodash');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

const { STAFF_ROLES, ROLES, PUBLIC_ROLE } = require('../constants');

describe("User schema", () => {
  const TABLE_NAME = 'users'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'image',
    'organisations_users',
    'user_roles'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe('Access rule', () => {
    it('is not publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    })

    context('As a base user', () => {
      it('i can only see myself', () => {
        expectAccessRule(TABLE_NAME, ROLES.USER).to.exist
        expectAccessRule(TABLE_NAME, ROLES.USER).to.matchRules([
          ruleMatchers.requireOwnership('id')
        ])
      });
    });

    _.each(STAFF_ROLES, role => {
      context(`As a ${role}`, () => {
        it('allows me to read users without restrictions', () => {
          expectAccessRule(TABLE_NAME, role).to.exist
          expectAccessRule(TABLE_NAME, role).to.be.unfiltered
        })

        it('allows me to only fetch 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      })
    });
  })
});