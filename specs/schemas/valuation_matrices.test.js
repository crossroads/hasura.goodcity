const _ = require('lodash');
const { assertSchemaExists, expectAccessRule }  = require("../assertions");
const { getAllRelationships } = require('../hasura');
const { PUBLIC_ROLE, ALL_ROLES } = require("../constants");
const { expect } = require("chai");

describe("ValuationMatrices schema", () => {
  const TABLE_NAME = 'valuation_matrices'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  it('exposes no relationships', () => {
    expect(getAllRelationships(TABLE_NAME)).to.deep.equal([])
  });

  it('is publicly available', () => {
    _.each([ PUBLIC_ROLE, ...ALL_ROLES], (role) => {
      expectAccessRule(TABLE_NAME, role).to.be.unfiltered
    });
  });
});