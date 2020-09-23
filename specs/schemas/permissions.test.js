const _                           = require('lodash');
const { PUBLIC_ROLE, ALL_ROLES }  = require('../constants');
const {
  assertSchemaExists,
  expectAccessRule
} = require("../assertions");

describe("Permission schema", () => {
  const TABLE_NAME = 'permissions'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  describe('Access rules', () => {
    it('is not publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    });

    it('is accessible by all users', () => {
      _.each(ALL_ROLES, role => {
        expectAccessRule(TABLE_NAME, role).to.be.unfiltered
      });
    });

    it('has a limit of 100 rows', () => {
      _.each(ALL_ROLES, role => {
        expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(100)
      });
    });
  })
});