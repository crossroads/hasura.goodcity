const { assertSchemaExists, assertHasRelationship } = require("../assertions");

describe("DonorCondition schema", () => {
  const TABLE_NAME = 'donor_conditions'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })
});