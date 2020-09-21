const _ = require('lodash');
const {
  assertSchemaExists,
  assertHasRelationship
} = require("../assertions");

describe("OffersPackage schema", () => {
  const TABLE_NAME = 'offers_packages'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'offer',
    'package',
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });
});