const _                                     = require('lodash');
const { PUBLIC_ROLE, STAFF_ROLES, ROLES }   = require('../constants');
const {
  assertSchemaExists,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

describe("Location schema", () => {
  const TABLE_NAME = 'locations'

  it('exist on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  describe('Access rules', () => {
    it('is not publicly accessible', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    });

    it('is not accessible to users', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    });

    _.each(STAFF_ROLES, role => {
      context(`As a ${role}`, () => {
        it(`allows me to access items`, () => {
          expectAccessRule(TABLE_NAME, role).to.exist
          expectAccessRule(TABLE_NAME, role).to.be.unfiltered
        });

        it(`limits the number of records to 200`, () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(200)
        })
      });
    });
  });
});