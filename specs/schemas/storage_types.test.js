const _                                         = require('lodash');
const { assertSchemaExists, expectAccessRule }  = require("../assertions");
const { getAllRelationships }                   = require('../hasura');
const { PUBLIC_ROLE, ALL_ROLES }                = require('../constants');

describe("StorageType schema", () => {
  const TABLE_NAME = 'storage_types'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });

  describe('Access rules', () => {
    it('is not publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    });

    _.each(ALL_ROLES, (role) => {
      context(`As a ${role}`, () => {
        it('allows unfiltered access', () => {
          expectAccessRule(TABLE_NAME, role).to.be.unfiltered
        })

        it('i can only fetch 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      });
    });
  });
});