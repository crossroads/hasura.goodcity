const _ = require('lodash');
const {
  assertSchemaExists,
  assertHasRelationship
} = require("../assertions");

describe("PackageSet schema", () => {
  const TABLE_NAME = 'package_sets'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'package_type',
    'packages'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });
});