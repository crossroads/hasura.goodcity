const _                                     = require('lodash');
const { PUBLIC_ROLE, STAFF_ROLES, ROLES }   = require('../constants');
const {
  assertSchemaExists,
  assertHasRelationship,
  assertHasComputedProperty,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

describe("Item schema", () => {
  const TABLE_NAME = 'items'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  describe("Computed properties", () => {
    it ("has computed images", () => {
      assertHasComputedProperty(TABLE_NAME, 'images')
    });
  });

  _.each([
    'donor_condition',
    'offer',
    'packages',
    'package_type'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe('Access rules', () => {
    it('is not publicly accessible', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    });

    it('allows users to see items they belong to an offer he/she created', () => {
      expectAccessRule(TABLE_NAME, ROLES.USER).to.exist
      expectAccessRule(TABLE_NAME, ROLES.USER).to.matchRules([
        ruleMatchers.requireOwnership('offer.created_by_id'),
        ruleMatchers.hidesSoftDeletes()
      ])
    });

    _.each(STAFF_ROLES, role => {
      context(`As a ${role}`, () => {
        it(`allows me to access items`, () => {
          expectAccessRule(TABLE_NAME, role).to.exist
          expectAccessRule(TABLE_NAME, role).to.matchRules([
            ruleMatchers.hidesSoftDeletes()
          ])
        });

        it(`limits the number of records to 25`, () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      });
    });
  });
});