const _                           = require('lodash');
const { ALL_ROLES, PUBLIC_ROLE }  = require('../constants');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule
} = require("../assertions");

describe("PackageType schema", () => {
  const TABLE_NAME = 'package_types'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'location'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe('Access rules', () => {
    it('is publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.be.unfiltered
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).to.have.a.limitOf(100)
    })

    it('is available to all users', () => {
      _.each(ALL_ROLES, role => {
        expectAccessRule(TABLE_NAME, role).to.be.unfiltered
        expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(100)
      });
    });
  });
});