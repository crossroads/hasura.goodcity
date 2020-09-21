const { assertSchemaExists, assertHasRelationship } = require("../assertions");

describe("Image schema", () => {
  const TABLE_NAME = 'images'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })
});