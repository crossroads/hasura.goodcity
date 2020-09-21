const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require('../hasura');

describe("StorageType schema", () => {
  const TABLE_NAME = 'storage_types'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});