const _                       = require('lodash');
const { assertSchemaExists, expectAccessRule }  = require("../assertions");
const { getAllRelationships } = require("../hasura");
const { ALL_ROLES }           = require("../constants");

describe("Contact schema", () => {
  const TABLE_NAME = 'contacts'

  it('exist on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });

  describe('Access Rules', () => {
    it("isn't accessible by anyone", () => {
      _.each(ALL_ROLES, role => {
        expectAccessRule('contacts', role).not.to.exist
      });
    });
  })
});