const _           = require('lodash');
const chalk       = require('chalk');
const { expect }  = require('chai');
const hasura      = require('./hasura');
const fs          = require('fs');
const path        = require('path');
const {
  getSchemaInfo,
  getRelationship,
  getAccessRule,
  getComputedFields
} = hasura;

const SNAPSHOT_PATH = path.join(__dirname, 'snapshots/hasura_config.snapshot.json');
const SNAPSHOT_META_PATH = path.join(__dirname, 'snapshots/hasura_config.snapshot.meta.json');

function persist(file, json) {
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n");
}

// ----------------------------------------------------------------
//    SCHEMA TESTING
// ----------------------------------------------------------------

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
 *
 *
 * @param {string} tableName
 * @param {string} computedPropName
 * @param {string} [message=`Computed property ${computedPropName} should exist`]
 */
function assertHasComputedProperty(tableName, computedPropName, message = `Computed property ${computedPropName} should exist`) {
  expect(
    _.find(getComputedFields(tableName), ['name', computedPropName]),
    message
  ).to.exist
}

// ----------------------------------------------------------------
//    RULE TESTING
// ----------------------------------------------------------------

function assertRuleExists(filter, left, operator, right, message) {
  let rules = _.get(filter, '_and', [filter]);

  let ref = _.find(rules, r => {
    const ruleDesc = _.get(r,left);
    return !!ruleDesc && _.isEqual(ruleDesc[operator], right);
  });
  expect(ref, message).to.exist;
}

const ruleMatchers = {
  requireOwnership: (userForeignkey = 'created_by_id') => (filter) => {
    assertRuleExists(filter, userForeignkey, '_eq', 'X-Hasura-User-Id', `${userForeignkey}/X-Hasura-User-Id match should be enforced`);
  },

  requirePolymorphicOwnership: (polyKeyPrefix) => (filter) => {
    const userForeignkey = `${polyKeyPrefix}_id`;
    assertRuleExists(filter, `${polyKeyPrefix}_type`, '_eq', 'User');
    ruleMatchers.requireOwnership(userForeignkey)(filter);
  },

  hidesSoftDeletes: (deletion_key = 'deleted_at') => (filter) => {
    assertRuleExists(filter, deletion_key, '_is_null', true)
  }
}

/**
 *
 *
 * @param {string} roleName
 */
function expectAccessRule(table, role) {
  const name            = `${role} <-> ${table}`;
  const permission      = _.get(getAccessRule(table, role), 'permission');
  const filter          = _.get(permission, 'filter');
  const hasFilters      = !!filter && _.keys(filter).length > 0;
  const exists          = !!permission;

  return {
    not: {
      to: {
        get exist() { expect(exists, `${name} permission should not exist`).to.be.false },

        accessColumn(col) {
          expect(_.find(permission.columns, c => c === col), `${name} access should not allow reading column ${col}`).to.be.null
        },
      }
    },
    to: {
      have: {
        a: {
          limitOf(size) {
            expect(permission.limit, `${name} access rule should limit row count to ${size}`).to.equal(size);
          }
        }
      },

      be: {
        get unfiltered() {
          expect(exists, `${name} permission should exist`).to.be.true
          expect(hasFilters, `${name} should be unfiltered`).to.be.false
        }
      },

      get exist() { expect(exists, `${name} permission should exist`).to.be.true },

      accessColumn(col) {
        expect(_.find(permission.columns, c => c === col), `${name} access should allow reading column ${col}`).not.to.be.null
      },

      matchRules(matchers) {
        _.each(matchers, m => m(filter));
      }
    }
  }
}

// ----------------------------------------------------------------
//    SNAPSHOT TESTING
// ----------------------------------------------------------------

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
  assertHasComputedProperty,
  createSnapshot,
  assertSnapshotIntegrity,
  expectAccessRule,
  ruleMatchers
};