const { assertSchemaExists, assertHasRelationship } = require("../assertions");

describe("GoodcitySetting schema", () => {
  const TABLE_NAME = 'goodcity_settings'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })
});