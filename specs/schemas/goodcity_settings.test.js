const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require("../hasura");

describe("GoodcitySetting schema", () => {
  const TABLE_NAME = 'goodcity_settings'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});