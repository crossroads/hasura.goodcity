const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require("../hasura");

describe("CrossroadsTransports schema", () => {
  const TABLE_NAME = 'crossroads_transports'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});