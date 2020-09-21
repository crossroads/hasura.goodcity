const _           = require('lodash');
const chalk       = require('chalk');
const { expect }  = require('chai');
const hasura      = require('./hasura');
const fs          = require('fs');
const path        = require('path');
const {
  getSchemaInfo,
  getRelationship
} = hasura;

const SNAPSHOT_PATH = path.join(__dirname, 'snapshots/hasura_config.snapshot.json');
const SNAPSHOT_META_PATH = path.join(__dirname, 'snapshots/hasura_config.snapshot.meta.json');

function persist(file, json) {
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n");
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

/**
 * Overwrites the snapshot of metadata
 *
 */
function createSnapshot() {
  expect(hasura.meta, 'Cannot create a snapshot unless Hasura metadata is preloaded').to.not.be.null

  console.log(chalk.cyanBright(`Generating new shapshot ${SNAPSHOT_PATH}`))

  persist(SNAPSHOT_PATH, hasura.meta);
  persist(SNAPSHOT_META_PATH, {
    snapshotRecordedAt: new Date().toTimeString(),
  })
}

/**
 * Compares the local json snapshot to the configuration fetched from Hasura for changes
 *
 */
function assertSnapshotIntegrity() {
  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH).toString());
  expect(snapshot, 'Cloud configuration should match snapshot').to.deep.equal(hasura.meta);
}


module.exports = {
  assertSchemaExists,
  assertHasRelationship,
  createSnapshot,
  assertSnapshotIntegrity
};