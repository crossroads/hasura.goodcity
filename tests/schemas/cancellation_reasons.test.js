const { assertSchemaExists } = require("../assertions");

describe("CancellationReason schema", () => {
  const TABLE_NAME = 'cancellation_reasons'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })
});