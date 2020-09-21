const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require("../hasura");

describe("CancellationReason schema", () => {
  const TABLE_NAME = 'cancellation_reasons'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});