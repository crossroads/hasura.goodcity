const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require("../hasura");

describe("GogovanTransports schema", () => {
  const TABLE_NAME = 'gogovan_transports'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});