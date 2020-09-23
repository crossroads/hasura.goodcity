const _                                   = require('lodash');
const { INCOMING_STAFF_ROLES, ALL_ROLES } = require('../constants.js');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

describe("Address schema", () => {
  const TABLE_NAME = 'addresses'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME);
  })

  it('has a district', () => {
    assertHasRelationship(TABLE_NAME, 'district');
  })

  describe("Access Rules", () => {
    const {
      requirePolymorphicOwnership,
      hidesSoftDeletes
    } = ruleMatchers;
    
    _.pull(ALL_ROLES, ...INCOMING_STAFF_ROLES).forEach(role => {
      context(`As a ${role}`, () => {
        it('allows me to see my own addresses',  () => {
          expectAccessRule(TABLE_NAME, role).to.exist;
          expectAccessRule(TABLE_NAME, role).to.matchRules([
            requirePolymorphicOwnership('addressable'),
            hidesSoftDeletes()
          ])
        });

        it('only allows me to read 25 records at a time', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      });
    });

    context("As a supervisor", () => {
      const ROLE = 'supervisor';

      it('allows me to see all non-deleted addresses',  () => {
        expectAccessRule(TABLE_NAME, ROLE).to.exist;
        expectAccessRule(TABLE_NAME, ROLE).to.matchRules([
          hidesSoftDeletes()
        ])
      });

      it('only allows me to read 25 records at a time', () => {
        expectAccessRule(TABLE_NAME, ROLE).to.have.a.limitOf(25)
      })
    });

    context("As a reviewer", () => {
      const ROLE = 'reviewer';

      it('allows me to see all non-deleted addresses',  () => {
        expectAccessRule(TABLE_NAME, ROLE).to.exist;
        expectAccessRule(TABLE_NAME, ROLE).to.matchRules([
          hidesSoftDeletes()
        ])
      });

      it('only allows me to read 25 records at a time', () => {
        expectAccessRule(TABLE_NAME, ROLE).to.have.a.limitOf(25)
      })
    });
  });
});