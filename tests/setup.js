const _           = require('lodash');
const { expect }  = require('chai');
const hasura      = require('./hasura');

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
})

before(() => {
  expect(hasura.meta, "Hasura metadata must be loaded").to.exist
})