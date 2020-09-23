const _                                     = require('lodash');
const { STAFF_ROLES, ROLES, PUBLIC_ROLE }   = require('../constants');
const {
  assertSchemaExists,
  assertHasRelationship,
  assertHasComputedProperty,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

describe("Package schema", () => {
  const TABLE_NAME = 'packages'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  describe("Computed properties", () => {
    it ("has computed images", () => {
      assertHasComputedProperty(TABLE_NAME, 'images')
    });
  });

  _.each([
    'item',
    'package_type',
    'donor_condition',
    'restriction',
    'storage_type',
    'package_set'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe('Access rules', () => {
    it('is not publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    })

    it('is not accessible by normal users', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    })

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
  })
});