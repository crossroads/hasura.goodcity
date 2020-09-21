const { assertSchemaExists, assertHasRelationship } = require("../assertions");

describe("Holiday schema", () => {
  const TABLE_NAME = 'holidays'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })
});