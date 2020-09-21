const { assertSchemaExists, assertHasRelationship } = require("../assertions");

describe("GogovanTransports schema", () => {
  const TABLE_NAME = 'gogovan_transports'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })
});