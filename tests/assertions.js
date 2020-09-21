const _           = require('lodash')
const hasura      = require('./hasura');
const { expect }  = require('chai');

function getSchemaInfo(tableName) {
  return _.find(hasura.meta.tables, ['table.name', tableName]);
}

function getRelationship(tableName, relationship) {
  const {
    object_relationships = [],
    array_relationships = []
  } = getSchemaInfo(tableName);

  return (
    _.find(object_relationships,  ['name', relationship]) ||
    _.find(array_relationships,   ['name', relationship])
  )
}

/**
 *
 *
 * @param {string} tableName
 */
function assertSchemaExists(tableName, message = `Schema ${tableName} should be tracked on hasura`) {
  expect(hasura.meta.tables).to.be.a('array');
  expect(getSchemaInfo(tableName), message).to.exist
}


/**
 *
 *
 * @param {string} tableName
 * @param {string} relationship
 * @param {string} [message=`Relationship ${relationship} must exist`]
 */
function assertHasRelationship(tableName, relationship, message = `Relationship ${relationship} must exist`) {
  expect(getRelationship(tableName, relationship), message).to.be.an('object')
}

module.exports = {
  assertSchemaExists,
  assertHasRelationship
};