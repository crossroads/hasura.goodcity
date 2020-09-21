const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require("../hasura");

describe("DonorCondition schema", () => {
  const TABLE_NAME = 'donor_conditions'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});