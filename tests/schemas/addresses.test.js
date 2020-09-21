const { assertSchemaExists, assertHasRelationship } = require("../assertions");

describe("Address schema", () => {
  const TABLE_NAME = 'addresses'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  it('has a district', () => {
    assertHasRelationship(TABLE_NAME, 'district');
  })
});