const _                                         = require('lodash');
const { assertSchemaExists, expectAccessRule }  = require("../assertions");
const { PUBLIC_ROLE, ALL_ROLES }                = require('../constants');

describe("OrganisationType schema", () => {
  const TABLE_NAME = 'organisation_types'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })
  
  describe('Access Rules', () => {
    it('is available to everyone', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.be.unfiltered
      _.each(ALL_ROLES, r => expectAccessRule(TABLE_NAME, r).to.be.unfiltered)
    });

    it('limits the number of rows to 100', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.have.a.limitOf(100)
      _.each(ALL_ROLES, r => expectAccessRule(TABLE_NAME, r).to.have.a.limitOf(100))
    })
  });
});