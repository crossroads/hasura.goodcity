const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require('../hasura');

describe("ValuationMatrices schema", () => {
  const TABLE_NAME = 'valuation_matrices'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});