const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require("../hasura");

describe("Contact schema", () => {
  const TABLE_NAME = 'contacts'

  it('exist on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});