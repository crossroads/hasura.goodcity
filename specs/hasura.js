const { expect }  = require('chai');
const axios       = require('axios');
const _           = require('lodash');

let meta = null;

async function preload(host, adminKey) {
  if (!meta) {
    const url = `https://${host}/v1/query`;

    const { data } = await axios.default.post(url, {
      type: "export_metadata",
      args: {}
    }, {
      headers: { "x-hasura-admin-secret": adminKey }
    });
  
    meta = data;
  }

  return meta;
}

function getSchemaInfo(tableName) {
  return _.find(meta.tables, ['table.name', tableName]);
}

function getAllRelationships(tableName) {
  const {
    object_relationships = [],
    array_relationships = []
  } = getSchemaInfo(tableName);

  return [
    ...object_relationships,
    ...array_relationships,
  ]
}

function getRelationship(tableName, relationship) {
  return _.find(getAllRelationships(tableName),  ['name', relationship]);
}

function hasRelationship(tableName, relationship) {
  return !!getRelationship(tableName, relationship);
}

function getAccessRule(tableName, roleName) {
  const { select_permissions } = getSchemaInfo(tableName)
  return _.find(select_permissions, ['role', roleName]);
}

function hasAccessRule(tableName, roleName) {
  return !!getAccessRule(tableName, roleName);
}

function getComputedFields(tableName) {
  const { computed_fields = [] } = getSchemaInfo(tableName);
  return computed_fields;
}

module.exports = {
  preload,
  getSchemaInfo,
  getAllRelationships,
  getRelationship,
  hasRelationship,
  getAccessRule,
  hasAccessRule,
  getComputedFields,

  get meta() {
    return meta;
  }
}