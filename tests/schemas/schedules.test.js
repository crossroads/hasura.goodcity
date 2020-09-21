const { assertSchemaExists }  = require("../assertions");
const { getAllRelationships } = require('../hasura');

describe("Schedule schema", () => {
  const TABLE_NAME = 'schedules'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });
});