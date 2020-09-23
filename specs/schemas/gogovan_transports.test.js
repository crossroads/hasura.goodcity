const _                       = require('lodash')
const { getAllRelationships } = require("../hasura");
const { ALL_ROLES }           = require("../constants");
const {
  assertSchemaExists,
  expectAccessRule
} = require("../assertions");

describe("GogovanTransports schema", () => {
  const TABLE_NAME = 'gogovan_transports'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });

  describe('Access Rules', () => {
    it('is publicly available', () => {
      expectAccessRule(TABLE_NAME, 'public').to.exist
      expectAccessRule(TABLE_NAME, 'public').to.be.unfiltered
    });

    it('is is limited to 25 records', () => {
      expectAccessRule(TABLE_NAME, 'public').to.have.a.limitOf(25)
    });

    _.each(ALL_ROLES, role => {
      it(`is acessible by ${role} users`, () => {
        expectAccessRule(TABLE_NAME, role).to.exist
        expectAccessRule(TABLE_NAME, role).to.be.unfiltered
      });
    });
  })
});