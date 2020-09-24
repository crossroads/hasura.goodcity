const _                                         = require('lodash');
const { assertSchemaExists, expectAccessRule }  = require("../assertions");
const { getAllRelationships }                   = require('../hasura');
const { ALL_ROLES, PUBLIC_ROLE }                = require("../constants");

describe("Territories schema", () => {
  const TABLE_NAME = 'territories'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });

  describe('Access rules', () => {
    it('is publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.be.unfiltered
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.have.a.limitOf(100)
    });

    _.each(ALL_ROLES, role => {
      context(`As a ${role}`, () => {
        it('i have unrestricted access', () => {
          expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.be.unfiltered
          expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.have.a.limitOf(100)
        })
      });
    })

  });
});