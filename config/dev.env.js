'use strict';

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // it would be nice to replace this with dev url of getAssetHoder service
  EXPLORE_URL: '"https://andromeda-explorer.onyxpay.co/"',
  TEST_EXPLORE_URL: '"https://cepheus-explorer.onyxpay.co/"',

  API_URL: '"https://andromeda-explorer.onyxpay.co/v2/"',
  TEST_API_URL: '"https://cepheus-explorer.onyxpay.co/v2/"',

  DAPP_NODE_URL: '"https://andromeda-sync.onyxpay.co:20334"',
  TEST_DAPP_NODE_URL: '"https://cepheus5.onyxpay.co:20334"',

  NET:true
});
