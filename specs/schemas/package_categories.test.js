const _                           = require('lodash');
const { PUBLIC_ROLE, ALL_ROLES }  = require('../constants');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule
} = require("../assertions");

describe("PackageCategories schema", () => {
  const TABLE_NAME = 'package_categories'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'parent',
    'children',
    'package_categories_package_types'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe('Access Rules', () => {
    it('is available to everyone', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.be.unfiltered
      _.each(ALL_ROLES, r => expectAccessRule(TABLE_NAME, r).to.be.unfiltered)
    });

    it('limits the number of rows to 50', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.have.a.limitOf(50)
      _.each(ALL_ROLES, r => expectAccessRule(TABLE_NAME, r).to.have.a.limitOf(50))
    })
  });
});