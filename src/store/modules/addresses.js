import axios from 'axios'
import * as types from "../mutation-type"
import $httpService from '../../common/utils'

export default {
  state: {
    List: {},
    Detail: {},
    TxList:{},
    AssetTxList:{},
    Oep4Balance:{},
    Oep5Balance:{},
    Oep8Balance:{},
    NativeBalance:{},
  },
  mutations: {
    [types.SET_ADDRESS_LIST_PAGE](state, payload) {
      state.List = payload.info
    },
    [types.SET_ADDRESS_DETAIL_PAGE](state, payload) {
      state.Detail = payload.info
    },
    [types.SET_ADDRESS_TX_PAGE](state, payload) {
      state.TxList = payload.info
    },
    [types.SET_ASSET_TX_PAGE](state, payload) {
      state.AssetTxList = payload.info
    },
    [types.SET_ADDRESS_OEP4_PAGE](state, payload) {
      state.Oep4Balance = payload.info
    },
    [types.SET_ADDRESS_OEP5_PAGE](state, payload) {
      state.Oep5Balance = payload.info
    },
    [types.SET_ADDRESS_OEP8_PAGE](state, payload) {
      state.Oep8Balance = payload.info
    },
    [types.SET_ADDRESS_NATIVE_PAGE](state, payload) {
      state.NativeBalance = payload.info
    },
  },
  actions: {
    GetAddressList({dispatch, commit}, $param) {
      let apiUrl = ($param.net === "testnet") ? process.env.TEST_EXPLORE_URL : process.env.EXPLORE_URL;
      let token = $param.token === "ont" ? "0100000000000000000000000000000000000000" : "0200000000000000000000000000000000000000";
      let url = apiUrl + 'getAssetHolder?qid=1&contract=' + token + '&'
        + 'from=' + (($param.pageNumber - 1) * $param.pageSize) + '&count=' + $param.pageSize;
      return axios.get(url).then(response => {
        commit({
          type: types.SET_ADDRESS_LIST_PAGE,
          info: {
            list: response.data.result,
            total: 1000,
            basicRank: (Number($param.pageNumber) - 1) * $param.pageSize + 1
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    GetAddressOep4Detail({dispatch, commit}, $param) {
      return $httpService.get('/addresses/' + $param.address + '/' + $param.contractType + '/balances').then(response => {
        commit({
          type: types.SET_ADDRESS_OEP4_PAGE,
          info: {
            list: response.result
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    GetAddressOep5Detail({dispatch, commit}, $param) {
      return $httpService.get('/addresses/' + $param.address + '/' + $param.contractType + '/balances').then(response => {
        commit({
          type: types.SET_ADDRESS_OEP5_PAGE,
          info: {
            list: response.result
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    GetAddressOep8Detail({dispatch, commit}, $param) {
      return $httpService.get('/addresses/' + $param.address + '/' + $param.contractType + '/balances').then(response => {
        commit({
          type: types.SET_ADDRESS_OEP8_PAGE,
          info: {
            list: response.result
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    GetAddressNativeDetail({dispatch, commit}, $param) {
      return $httpService.get('/addresses/' + $param.address + '/' + $param.contractType + '/balances').then(response => {
        commit({
          type: types.SET_ADDRESS_NATIVE_PAGE,
          info: {
            list: response.result
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    GetAddressTX({dispatch, commit}, $param) {

      return $httpService.get('/addresses/' + $param.address + '/transactions',{
        params: {
          page_size: $param.pageSize,
          page_number: $param.pageNumber
        }
      }).then(response => {
        commit({
          type: types.SET_ADDRESS_TX_PAGE,
          info: {
            list: response.result,
            total:
              response.result.length < Number($param.pageSize)
                ? (Number($param.pageSize) * (Number($param.pageNumber) - 1)) + response.result.length
                : Number($param.pageSize) * (Number($param.pageNumber) + 1)
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    GetAddressAssetTX({dispatch, commit}, $param) {

      return $httpService.get('/addresses/' + $param.address + '/' +$param.assetName+ '/transactions/',{
        params: {
          page_size: $param.pageSize,
          page_number: $param.pageNumber
        }
      }).then(response => {
        commit({
          type: types.SET_ASSET_TX_PAGE,
          info: {
            list: response.result,
            total:
              response.result.length < Number($param.pageSize)
                ? (Number($param.pageSize) * (Number($param.pageNumber) - 1)) + response.result.length
                : Number($param.pageSize) * (Number($param.pageNumber) + 1)
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    getAddressDetailAllData({dispatch}, $param) {
      let apiUrl = ($param.net === "testnet") ? process.env.TEST_API_URL : process.env.API_URL;
      let url = 'https://explorer.ont.io/api/v1/explorer/address/queryaddressinfo/' + $param.address;

      return axios.get(url).then(response => {
        return response.data.Result.TxnList
      }).catch(error => {
        console.log(error);
        return false
      });
    }
  }
}
