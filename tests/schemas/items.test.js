const _ = require('lodash');
const {
  assertSchemaExists,
  assertHasRelationship
} = require("../assertions");

describe("Item schema", () => {
  const TABLE_NAME = 'items'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

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
});