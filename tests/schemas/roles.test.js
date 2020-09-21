const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require('../hasura');

describe("Role schema", () => {
  const TABLE_NAME = 'roles'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});