const _                   = require('lodash');
const hasura              = require('./hasura');
const chai                = require('chai');
const { createSnapshot }  = require('./assertions');

// ----------------
//  Chai Setup
// ----------------

before(() => {
  // Chai setup
  global.expect = chai.expect;
})

// ----------------
//  Preload Hasura Config
// ----------------

before(async () => {
  _.each([
    'HASURA_GRAPHQL_HOST',
    'HASURA_GRAPHQL_ADMIN_SECRET'
  ], key => {
    expect(process.env[key], `${key} must be set`).to.exist
  });

  await hasura.preload(
    process.env.HASURA_GRAPHQL_HOST,
    process.env.HASURA_GRAPHQL_ADMIN_SECRET
  );

  expect(hasura.meta, "Hasura metadata must be loaded").to.exist
})

// ----------------
//  Update snapshot
// ----------------

before(() => {
  if (_.find(process.argv, (arg) => arg === '--update-snapshot')) {
    createSnapshot();
  }
})