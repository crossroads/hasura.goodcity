const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require('../hasura');

describe("Restriction schema", () => {
  const TABLE_NAME = 'restrictions'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});