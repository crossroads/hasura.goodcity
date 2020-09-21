const _ = require('lodash');
const {
  assertSchemaExists
} = require("../assertions");

describe("OrganisationType schema", () => {
  const TABLE_NAME = 'organisation_types'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })
});