const { assertSchemaExists } = require("../assertions");

describe("CrossroadsTransports schema", () => {
  const TABLE_NAME = 'crossroads_transports'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })
});