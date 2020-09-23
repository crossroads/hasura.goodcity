const _                                   = require('lodash');
const { STAFF_ROLES, ROLES, PUBLIC_ROLE } = require('../constants');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule
} = require("../assertions");

describe("PackageSet schema", () => {
  const TABLE_NAME = 'package_sets'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'package_type',
    'packages'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  it('is not publicly available', () => {
    expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
  });

  it('is not available to base users', () => {
    expectAccessRule(TABLE_NAME, ROLES.USER).not.to.exist
  });

  _.each(STAFF_ROLES, role => {
    it(`is acessible by ${role} users`, () => {
      expectAccessRule(TABLE_NAME, role).to.exist
      expectAccessRule(TABLE_NAME, role).to.be.unfiltered
    });

    it('is is limited to 25 records', () => {
      expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
    });
  });
});