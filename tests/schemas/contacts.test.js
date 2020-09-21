const { assertSchemaExists } = require("../assertions");

describe("Contact schema", () => {
  const TABLE_NAME = 'contacts'

  it('exist on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })
});