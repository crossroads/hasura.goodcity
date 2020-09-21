const _ = require('lodash');
const {
  assertSchemaExists,
  assertHasRelationship
} = require("../assertions");

describe("Offer schema", () => {
  const TABLE_NAME = 'offers'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'closed_by',
    'created_by',
    'reviewed_by',
    'received_by',
    'offers_packages',
    'crossroads_transport',
    'gogovan_transport',
    'deliveries',
    'items',
    'cancellation_reason'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });
});