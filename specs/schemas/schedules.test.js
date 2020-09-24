const _                                     = require('lodash');
const { PUBLIC_ROLE, ROLES, STAFF_ROLES }   = require('../constants');
const {
  expectAccessRule,
  assertSchemaExists,
  assertHasRelationship,
  ruleMatchers
} = require("../assertions");

describe("Schedule schema", () => {
  const TABLE_NAME = 'schedules'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('has deliveries', () => {
    assertHasRelationship(TABLE_NAME, 'deliveries')
  });

  describe('Access rules', () => {
    it('is not publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    })

    context('As a base user', () => {
      it('allows base users to see schedules of their own orders', () => {
        expectAccessRule(TABLE_NAME, ROLES.USER).to.exist
        expectAccessRule(TABLE_NAME, ROLES.USER).to.matchRules([
          ruleMatchers.requireOwnership('deliveries.offer.created_by_id')
        ])
      });
    });

    _.each(STAFF_ROLES, (role) => {
      context(`As a ${role}`, () => {
        it('i have unfiltered access', () => {
          expectAccessRule(TABLE_NAME, role).to.exist
          expectAccessRule(TABLE_NAME, role).to.be.unfiltered
        });

        it('i can only fetch 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        });
      });
    })
  });
});