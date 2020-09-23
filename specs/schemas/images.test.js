const _                                     = require('lodash')
const { PUBLIC_ROLE, ROLES, STAFF_ROLES }   = require("../constants");
const {
  assertSchemaExists,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

describe("Image schema", () => {
  const TABLE_NAME = 'images'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  describe('Access Rules', () => {
    const { hidesSoftDeletes } = ruleMatchers;

    it('is NOT publicly available', () => {
      expectAccessRule(TABLE_NAME, PUBLIC_ROLE).not.to.exist
    });

    it('is NOT available to base users', () => {
      expectAccessRule(TABLE_NAME, ROLES.USER).not.to.exist
    });
    
    _.each(STAFF_ROLES, role => {
      it(`is acessible by ${role} users`, () => {
        expectAccessRule(TABLE_NAME, role).to.exist
        expectAccessRule(TABLE_NAME, role).to.matchRules([
          hidesSoftDeletes()
        ])
      });

      it('is is limited to 25 records', () => {
        expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
      });
    });
  })
});