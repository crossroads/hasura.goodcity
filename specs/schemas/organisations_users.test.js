const _                     = require('lodash');
const { ROLES, ALL_ROLES }  = require('../constants');
const {
  assertSchemaExists,
  assertHasRelationship,
  expectAccessRule,
  ruleMatchers
} = require("../assertions");

describe("OrganisationsUser schema", () => {
  const TABLE_NAME = 'organisations_users'

  it('exists on hasura', () => {
    assertSchemaExists(TABLE_NAME)
  })

  _.each([
    'user',
    'organisation'
  ], (rel) => {
    it(`has the '${rel}' relationship`, () => {
      assertHasRelationship(TABLE_NAME, rel);
    })
  });


  describe('Access rules', () => {
    const ALLOWED_ROLES = [
      ROLES.ORDER_FULFILMENT,
      ROLES.ORDER_ADMINISTRATOR
    ];

    _.each(ALLOWED_ROLES, role => {
      context(`As a ${role}`, () => {
        it('allows me to see all organisastions users', () => {
          expectAccessRule(TABLE_NAME, role).to.be.unfiltered
        })

        it('limits the number of rows to 25', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      })
    });

    _.pull(ALL_ROLES, ...ALLOWED_ROLES).forEach(role => {
      context(`As a ${role}`, () => {
        it('allows me to organisations I belong to', () => {
          expectAccessRule(TABLE_NAME, role).to.matchRules([
            ruleMatchers.requireOwnership('user_id')
          ])
        })

        it('limits the number of rows to 25', () => {
          expectAccessRule(TABLE_NAME, role).to.have.a.limitOf(25)
        })
      })
    });
  });
});