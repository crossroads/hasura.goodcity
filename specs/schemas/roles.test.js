const _                       = require('lodash');
const { getAllRelationships } = require('../hasura');
const {
  ALL_ROLES,
  PUBLIC_ROLE
} = require('../constants');
const {
  assertSchemaExists,
  expectAccessRule
} = require("../assertions");

describe("Role schema", () => {
  const TABLE_NAME = 'roles'

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

    _.each(ALL_ROLES, role => {
      context(`As a ${role}`, () => {
        it('I can access roles', () => {
          expectAccessRule(TABLE_NAME, role).to.exist
          expectAccessRule(TABLE_NAME, role).to.be.unfiltered
        });

        it('I can read 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        });
      });
    });
  });
});