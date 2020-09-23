const _                       = require('lodash');
const { ALL_ROLES }           = require('../constants.js');
const { getAllRelationships } = require("../hasura");
const {
  assertSchemaExists,
  expectAccessRule
} = require("../assertions");

describe("CancellationReason schema", () => {
  const TABLE_NAME = 'cancellation_reasons'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });

  describe("Access Rules", () => {
    it("is not publicly available", () => {
      expectAccessRule(TABLE_NAME, 'public').not.to.exist;
    });

    _.each(ALL_ROLES, role => {
      context(`As a ${role}`, () => {
        it('allows me to see all records',  () => {
          expectAccessRule(TABLE_NAME, role).to.exist;
          expectAccessRule(TABLE_NAME, role).to.be.unfiltered;
        });
      });
    });
  })
});