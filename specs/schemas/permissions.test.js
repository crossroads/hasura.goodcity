const _ = require('lodash');
const {
  assertSchemaExists
} = require("../assertions");

describe("Permission schema", () => {
  const TABLE_NAME = 'permissions'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })
});