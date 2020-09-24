const _                       = require('lodash');
const { getAllRelationships } = require('../hasura');
const {
  ROLES,
  PUBLIC_ROLE,
  STAFF_ROLES,
} = require('../constants');
const {
  assertSchemaExists,
  expectAccessRule
} = require("../assertions");

describe("Restriction schema", () => {
  const TABLE_NAME = 'restrictions'

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

    context('As a base user', () => {
      it('I have no access', () => {
        expectAccessRule(TABLE_NAME, ROLES.USER).not.to.exist
      })
    });

    _.each(STAFF_ROLES, role => {
      context(`As a ${role}`, () => {
        it('I can access restrictions', () => {
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