const _ = require('lodash');
const {
  ROLES,
  PUBLIC_ROLE,
  STAFF_ROLES,
  MANAGER_ROLES
}   = require('../constants');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

describe("PrintersUsers schema", () => {
  const TABLE_NAME = 'printers_users'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'printer',
    'user'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe('Access rules', () => {
    it('is not publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    });

    context('As a base user', () => {
      it('I have no access', () => {
        expectAccessRule(TABLE_NAME, ROLES.USER).not.to.exist
      })
    });

    _.each(MANAGER_ROLES, role => {
      context(`As a ${role}`, () => {
        it('I have unfiltered access', () => {
          expectAccessRule(TABLE_NAME, role).to.exist
          expectAccessRule(TABLE_NAME, role).to.be.unfiltered
        });

        it('I can read 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        });
      });
    });


    _.pull(STAFF_ROLES, ...MANAGER_ROLES).forEach(role => {
      context(`As a ${role}`, () => {
        it('I can only access my records', () => {
          expectAccessRule(TABLE_NAME, role).to.exist
          expectAccessRule(TABLE_NAME, role).to.matchRules([
            ruleMatchers.requireOwnership('user_id')
          ])
        });

        it('I can read 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        });
      });
    });
  });
});