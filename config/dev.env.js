'use strict';

const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  EXPLORE_URL: '"http://ec2-3-17-77-100.us-east-2.compute.amazonaws.com:8080/"',
  TEST_EXPLORE_URL: '"http://ec2-18-189-125-117.us-east-2.compute.amazonaws.com:8080/"',

  API_URL: '"http://ec2-3-17-77-100.us-east-2.compute.amazonaws.com:8080/v2"',
  TEST_API_URL: '"http://ec2-18-189-125-117.us-east-2.compute.amazonaws.com:8080/v2"',

  // DAPP_NODE_URL: '"https://dappnode1.ont.io:10334"',
  // TEST_DAPP_NODE_URL: '"https://polaris1.ont.io:10334"',

  NET:true
});
