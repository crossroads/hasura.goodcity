const _ = require('lodash');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

const { STAFF_ROLES, ROLES, PUBLIC_ROLE } = require('../constants');

describe("UserRole schema", () => {
  const TABLE_NAME = 'user_roles'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'user',
    'role'
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
      it('i can only see my user roles', () => {
        expectAccessRule(TABLE_NAME, ROLES.USER).to.exist
        expectAccessRule(TABLE_NAME, ROLES.USER).to.matchRules([
          ruleMatchers.requireOwnership('user_id')
        ])
      });
    });

    _.each(STAFF_ROLES, role => {
      context(`As a ${role}`, () => {
        it('allows me to read user_roles without restrictions', () => {
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