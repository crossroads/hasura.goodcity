const _                                   = require('lodash');
const { INCOMING_STAFF_ROLES, ALL_ROLES } = require('../constants.js');
const {
  assertSchemaExists,
  assertHasRelationship,
  assertHasComputedProperty,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

describe("Offer schema", () => {
  const TABLE_NAME = 'offers'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'closed_by',
    'created_by',
    'reviewed_by',
    'received_by',
    'offers_packages',
    'crossroads_transport',
    'gogovan_transport',
    'deliveries',
    'items',
    'cancellation_reason'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe("Computed properties", () => {
    it ("has computed images", () => {
      assertHasComputedProperty(TABLE_NAME, 'images')
    });
  });

  describe("Access Rules", () => {
    const { requireOwnership } = ruleMatchers;

    it("is not publicly available", () => {
      expectAccessRule(TABLE_NAME, 'public').not.to.exist;
    });
    
    _.pull(ALL_ROLES, ...INCOMING_STAFF_ROLES).forEach(role => {
      context(`As a ${role}`, () => {
        it('allows me to see offers I created',  () => {
          expectAccessRule(TABLE_NAME, role).to.exist;
          expectAccessRule(TABLE_NAME, role).to.matchRules([
            requireOwnership('created_by_id')
          ])
        });

        it('only allows me to read 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      });
    });

    context("As a supervisor", () => {
      const ROLE = 'supervisor';

      it('allows me to see all offers',  () => {
        expectAccessRule(TABLE_NAME, ROLE).to.exist;
        expectAccessRule(TABLE_NAME, ROLE).to.be.unfiltered;
      });

      it('only allows me to read 25 records at a time', () => {
        expectAccessRule(TABLE_NAME, ROLE).to.have.a.limitOf(25)
      })
    });

    context("As a reviewer", () => {
      const ROLE = 'reviewer';

      it('allows me to see all offers',  () => {
        expectAccessRule(TABLE_NAME, ROLE).to.exist;
        expectAccessRule(TABLE_NAME, ROLE).to.be.unfiltered;
      });

      it('only allows me to read 25 records at a time', () => {
        expectAccessRule(TABLE_NAME, ROLE).to.have.a.limitOf(25)
      })
    });
  });
});