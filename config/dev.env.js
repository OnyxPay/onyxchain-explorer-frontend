'use strict';

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  EXPLORE_URL: '"http://10.200.1.14:8082/"',
  TEST_EXPLORE_URL: '"http://ec2-18-189-125-117.us-east-2.compute.amazonaws.com:8080/"',

  API_URL: '"http://10.200.1.14:8090/v2"',
  TEST_API_URL: '"http://ec2-18-189-125-117.us-east-2.compute.amazonaws.com:8080/v2"',

  DAPP_NODE_URL: '"https://andromeda-sync.onyxpay.co:20334"',
  TEST_DAPP_NODE_URL: '"https://cepheus5.onyxpay.co:20334"',

  NET:true
});
