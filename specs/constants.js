const _ = require('lodash');

const PUBLIC_ROLE = 'public';

const ROLES = Object.freeze({
  USER:                 'user',
  REVIEWER:             'reviewer',
  SUPERVISOR:           'supervisor',
  STOCK_FULFILMENT:     'stock_fulfilment',
  STOCK_ADMINISTRATOR:  'stock_administrator',
  ORDER_FULFILMENT:     'order_fulfilment',
  ORDER_ADMINISTRATOR:  'order_administrator',
});

const ALL_ROLES = _.values(ROLES);

const STAFF_ROLES = _.filter(ALL_ROLES, r => r !== ROLES.USER);

const INCOMING_STAFF_ROLES = Object.freeze([
  ROLES.REVIEWER,
  ROLES.SUPERVISOR
]);

const MANAGER_ROLES = Object.freeze([
  ROLES.SUPERVISOR,
  ROLES.STOCK_ADMINISTRATOR,
  ROLES.ORDER_ADMINISTRATOR
]);

module.exports = {
  ROLES,
  ALL_ROLES,
  STAFF_ROLES,
  MANAGER_ROLES,
  INCOMING_STAFF_ROLES,
  PUBLIC_ROLE
}