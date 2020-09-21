const { assertSchemaExists } = require("../assertions");

describe("Location schema", () => {
  const TABLE_NAME = 'locations'

  it('exist on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })
});