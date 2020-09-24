const _                       = require('lodash');
const {
  ALL_ROLES,
  PUBLIC_ROLE
} = require('../constants');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule
} = require("../assertions");

describe("RolePermission schema", () => {
  const TABLE_NAME = 'role_permissions'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'role',
    'permission'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });

  describe('Access rules', () => {
    it('is not publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    });

    _.each(ALL_ROLES, role => {
      context(`As a ${role}`, () => {
        it('I can access role_permissions', () => {
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