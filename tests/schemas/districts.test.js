const { assertSchemaExists, assertHasRelationship } = require("../assertions");

describe("District schema", () => {
  const TABLE_NAME = 'districts'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  it('has a territory', () => {
    assertHasRelationship(TABLE_NAME, 'territory');
  })
});