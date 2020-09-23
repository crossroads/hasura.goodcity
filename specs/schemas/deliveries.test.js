const _                                   = require('lodash');
const { INCOMING_STAFF_ROLES, ALL_ROLES } = require('../constants.js');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");


describe("Deliveries schema", () => {
  const TABLE_NAME = 'deliveries'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'contact',
    'offer',
    'schedule'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe("Access Rules", () => {
    const {
      requireOwnership,
      hidesSoftDeletes
    } = ruleMatchers;
    
    _.pull(ALL_ROLES, ...INCOMING_STAFF_ROLES).forEach(role => {
      context(`As a ${role}`, () => {
        it('allows me to see my own deliveries',  () => {
          expectAccessRule(TABLE_NAME, role).to.exist;
          expectAccessRule(TABLE_NAME, role).to.matchRules([
            requireOwnership('offer.created_by_id'),
            hidesSoftDeletes()
          ])
        });

        it('only allows me to read 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      });
    });

    INCOMING_STAFF_ROLES.forEach(role => {
      context(`As a ${role}`, () => {
        it('allows me to see all non-deleted deliveries',  () => {
          expectAccessRule(TABLE_NAME, role).to.exist;
          expectAccessRule(TABLE_NAME, role).to.matchRules([
            hidesSoftDeletes()
          ])
        });

        it('only allows me to read 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      });
    });
  });
});