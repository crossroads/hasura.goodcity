const _ = require('lodash');
const {
  assertSchemaExists,
  assertHasRelationship
} = require("../assertions");

describe("UserRole schema", () => {
  const TABLE_NAME = 'user_roles'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'user',
    'role'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });
});