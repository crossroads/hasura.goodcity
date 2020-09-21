const _ = require('lodash');
const {
  assertSchemaExists,
  assertHasRelationship
} = require("../assertions");

describe("PackageCategoriesPackageTypes schema", () => {
  const TABLE_NAME = 'package_categories_package_types'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'package_type',
    'package_category'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });
});