const _               = require('lodash')
const { ALL_ROLES }   = require("../constants");
const {
  assertSchemaExists,
  assertHasRelationship, 
  expectAccessRule
} = require("../assertions");

describe("District schema", () => {
  const TABLE_NAME = 'districts'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  it('has a territory', () => {
    assertHasRelationship(TABLE_NAME, 'territory');
  })

  describe('Access Rules', () => {
    it('is publicly available', () => {
      expectAccessRule(TABLE_NAME, 'public').to.exist
      expectAccessRule(TABLE_NAME, 'public').to.be.unfiltered
    });

    it('is is limited to 200 records', () => {
      expectAccessRule(TABLE_NAME, 'public').to.have.a.limitOf(200)
    });

    _.each(ALL_ROLES, role => {
      it(`is acessible by ${role} users`, () => {
        expectAccessRule(TABLE_NAME, role).to.exist
        expectAccessRule(TABLE_NAME, role).to.be.unfiltered
      });
    });
  })
});