<template>
  <div class="e-container container-margin-top">
    <list-title :name="$t('addressDetail.name')"></list-title>
    <detail-title :name="$t('addressDetail.address')" :val="$route.params.address"></detail-title>

    <!--主要余额显示-->
    <detail-block-2 v-if="NativeBalance.list" :name1="$t('addressDetail.ontBalance')" :val1="nativeAssetsVal.ont" :rows1="'1.3'"
                    :name2="$t('addressDetail.ongBalance')" :val2="nativeAssetsVal.ong" :rows2="'1.3'">
    </detail-block-2>

    <!--可领取和未领取的ONG显示-->
    <div v-if="NativeBalance" class="detail-col">
      <div class="row">
        <div class="col table1_item_title">
          <span class="f-color">{{ $t('addressDetail.claimable') }}</span>
          <span class="important_color">{{nativeAssetsVal.unboundong}}</span>
        </div>
      </div>
      <div class="row table1_item_title">
        <div class="col">
          <span class="f-color">{{ $t('addressDetail.unbound') }}</span>
          <span class="important_color">{{nativeAssetsVal.waitboundong}}</span>
        </div>
      </div>
    </div>

    <!--2018年万圣节南瓜活动资产-->
    <div class="row" v-if="havePumpkin">
      <div class="col">
        <div class="detail-col">
          {{ $t('addressDetail.oep8Assets') }}
          <div class="row pumpkin-color font-size14 text-center" style="margin-top: 20px">
            <div class="col">
              <div>{{ $t('assetName.pumpkin08' ) }}</div>
              <div class="font-size24">{{zeroPlus(oep8AssetsVal.pumpkin08)}}</div>
            </div>
            <div class="col">
              <div>{{ $t('assetName.pumpkin01' ) }}</div>
              <div class="font-size24">{{zeroPlus(oep8AssetsVal.pumpkin01)}}</div>
            </div>
            <div class="col">
              <div>{{ $t('assetName.pumpkin02' ) }}</div>
              <div class="font-size24">{{zeroPlus(oep8AssetsVal.pumpkin02)}}</div>
            </div>
            <div class="col">
              <div>{{ $t('assetName.pumpkin03' ) }}</div>
              <div class="font-size24">{{zeroPlus(oep8AssetsVal.pumpkin03)}}</div>
            </div>
          </div>

          <div class="row pumpkin-color font-size14 text-center" style="margin-top: 20px">
            <div class="col">
              <div>{{ $t('assetName.pumpkin04' ) }}</div>
              <div class="font-size24">{{zeroPlus(oep8AssetsVal.pumpkin04)}}</div>
            </div>
            <div class="col">
              <div>{{ $t('assetName.pumpkin05' ) }}</div>
              <div class="font-size24">{{zeroPlus(oep8AssetsVal.pumpkin05)}}</div>
            </div>
            <div class="col">
              <div>{{ $t('assetName.pumpkin06' ) }}</div>
              <div class="font-size24">{{zeroPlus(oep8AssetsVal.pumpkin06)}}</div>
            </div>
            <div class="col">
              <div>{{ $t('assetName.pumpkin07' ) }}</div>
              <div class="font-size24">{{zeroPlus(oep8AssetsVal.pumpkin07)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--有其他的OEP-4资产-->
    <div class="row" v-if="have4Oep">
      <div class="col">
        <div class="detail-col">
          <span class="font-blod table1_item_title">{{ $t('addressDetail.oep4Assets') }}</span>
          <div v-for="(asset,index) in oep4AssetBalance"  class="row font-size14 oep-4-5-div">
            <div class="table1_item_title font-Regular">
              <span class="f-color">{{ asset.asset_name.toUpperCase() + ": " }}</span>
              <span class="important_color">{{parseFloat(asset.balance)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--有其他的OEP-5资产-->
    <div class="row" v-if="have5Oep">
      <div class="col">
        <div class="detail-col">
          <span class="font-blod table1_item_title">{{ $t('addressDetail.oep5Assets') }}</span>
          <div v-for="(asset,index) in oep5AssetBalance"  class="row font-size14 oep-4-5-div">
            <div class="table1_item_title font-Regular">
              <span class="f-color">{{ asset.asset_name.toUpperCase() + ": " }}</span>
              <span class="important_color">{{parseFloat(asset.balance)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--交易历史-->
    <div class="row">
      <div class="col">
        <div class="detail-col">
          <div class="row font-size18 font-blod normal_color">
            <div class="col">
              <!--{{ addressDetail.allPage }} {{ $t('addressDetail.txOnAddr') }}-->
              {{ $t('addressDetail.txns') }}
            </div>
            <div class="col">
              <to-excel :address="$route.params.address"></to-excel>
            </div>
          </div>

          <!-- <ont-pagination :total="showTxList.total"></ont-pagination> -->
          <o-load v-if="!loadingFlag" ></o-load>
          <div  v-else class="row table-responsive">
            <div class="col">
              <table v-if="info.TxnTotal !== 0" class="table">
                <thead>
                <tr>
                  <th class="td-tx-head table3_head font-size18 font-blod normal_color">{{$t('all.hash')}}</th>
                  <th class="td-tx-head table3_head font-size18 font-blod normal_color">{{$t('all.amount')}}</th>
                  <th class="td-tx-head table3_head font-size18 font-blod normal_color">{{$t('all.status')}}</th>
                  <th class="td-tx-head table3_head font-size18 font-blod normal_color">{{$t('all.time')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="tx in showTxList.list">
                  <td class="font-size14 font-Regular f-color pointer" @click="toTransactionDetailPage(tx.tx_hash)">
                    {{tx.tx_hash.substr(0,16) + '...'}}
                  </td>

                  <td class="font-size14 font-Regular">
                    <span v-for="(tl,index) in tx.transfers">
                      <!--支出-->
                      <span class="expenditure-color" v-if="tl.from_address === $route.params.address">
                        <span v-if="tl.asset_name.indexOf('pumpkin') > -1">
                          {{ '-' + $HelperTools.toFinancialVal(tl.amount) + ' ' + $t('assetName.' + tl.asset_name ) }}
                        </span>
                        <span v-else>
                          {{ '-' + $HelperTools.toFinancialVal(tl.amount) + ' ' + tl.asset_name.toUpperCase() }}
                        </span>
                      </span>
                      <!--收入-->
                      <span class="income-color" v-else>
                        <span v-if="tl.asset_name.indexOf('pumpkin') > -1">
                          {{ $HelperTools.toFinancialVal(tl.amount) + ' ' + $t('assetName.' + tl.asset_name ) }}
                        </span>
                        <span v-else>
                          {{ $HelperTools.toFinancialVal(tl.amount) + ' ' + tl.asset_name.toUpperCase() }}
                        </span>
                      </span>

                      <!--逗号分隔符-->
                      <span v-if="index !== tx.transfers.length - 1"
                            :class="tl.from_address === $route.params.address ? 'expenditure-color' : 'income-color'">
                        {{ ', ' }}
                      </span>
                    </span>
                  </td>
                  <td class="font-size14 font-Regular" :class="tx.confirm_flag === 1 ? 's-color' : 'err-color'">
                    {{ tx.confirm_flag === 1 ? 'Confirmed' : 'Failed' }}
                  </td>
                  <td class="font-size14 font-Regular normal_color">{{$HelperTools.getTransDate(tx.tx_time)}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ont-pagination :total="showTxList.total"></ont-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ToExcel from './../common/DownloadExcel'

  export default {
    data() {
      return {
        Ddo: {},
        claimflag: true,
        AssetBalance: [],
        nativeAssetBalance: [],
        oep4AssetBalance: [],
        oep5AssetBalance: [],
        oep8AssetBalance: [],
        otherAssetBalance: [],
        showOtherAssetBalance: [],
        havePumpkin: false, // 标识是否显示2018年万圣节南瓜资产
        haveOtherOep: false, // 标识是否显示OEP-4/5资产
        have4Oep:false,// 标识是否显示OEP-4/5资产
        have5Oep:false,// 标识是否显示OEP-4/5资产
        TxnList: [],
        info: [],
        tmpDown: '',
        showTxList:[],
        loadingFlag:false,
      }
    },
    mounted() {
      console.log(this.$route.params)
      if (this.$route.params.pageSize == 'testnet' || this.$route.params.pageNumber == 'testnet' || this.$route.params.assetName == 'testnet') {
        this.$route.params.net = 'testnet'
        this.toAddressDetailPage(this.$route.params.address)
      } else {
        if (this.$route.params.pageSize == undefined || this.$route.params.pageNumber == undefined || this.$route.params.assetName == undefined) {
          this.toAddressDetailPage(this.$route.params.address)
        } else {
          this.getAddressDetailData()
        }
      }
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    watch: {
      '$route': 'getAddressDetailData',
      'Oep4Balance':function(){
        this.oep4AssetBalance =[]
        this.oep4AssetBalance = this.oep4AssetBalance.concat(this.Oep4Balance.list)
        if(this.Oep4Balance.list.length>0){
          this.have4Oep = true
        }
      },
      'Oep5Balance':function(){
        this.oep5AssetBalance =[]
        this.oep5AssetBalance = this.oep5AssetBalance.concat(this.Oep5Balance.list)
        if(this.Oep5Balance.list.length>0){
          this.have5Oep = true
        }
      },
      'Oep8Balance':function(){
        this.oep8AssetBalance = this.oep8AssetBalance.concat(this.Oep8Balance.list)
        if(this.Oep8Balance.list.length>0){
          this.havePumpkin = true
        }
      },
      'NativeBalance':function(){
        this.nativeAssetBalance = this.nativeAssetBalance.concat(this.NativeBalance.list)
      },
      'TxList':function(){
        /* console.log("TxList",this.TxList) */
        this.showTxList = this.TxList
        this.loadingFlag = true
      },
      'AssetTxList':function(){
        /* console.log("AssetTxList",this.AssetTxList) */
        this.showTxList = this.AssetTxList
        this.loadingFlag = true
      }
    },
    computed: {
      ...mapState({
        Oep4Balance: state => state.Addresses.Oep4Balance,
        Oep5Balance: state => state.Addresses.Oep5Balance,
        Oep8Balance: state => state.Addresses.Oep8Balance,
        NativeBalance: state => state.Addresses.NativeBalance,
        TxList: state => state.Addresses.TxList,
        AssetTxList:state => state.Addresses.AssetTxList,
      }),
      /**
       * 取出全部原生资产名称和值
       */
      nativeAssetsVal: function () {
        let retAssets = {};

        for (let index in this.nativeAssetBalance) {
          retAssets[this.nativeAssetBalance[index].asset_name] = this.$HelperTools.toFinancialVal(this.nativeAssetBalance[index].balance)
        }
        return retAssets
      },
      /**
       * 取出全部oep4 oep5资产名称和值
       */
      oep4AssetsVal: function () {
        let retAssets = {};

        for (let index in this.oep4AssetBalance) {
          retAssets[this.oep4AssetBalance[index].asset_name] = this.$HelperTools.toFinancialVal(this.oep4AssetBalance[index].balance)
        }
        return retAssets
      },
      /**
       * 取出全部oep4 oep5资产名称和值
       */
      oep5AssetsVal: function () {
        let retAssets = {};

        for (let index in this.oep5AssetBalance) {
          retAssets[this.oep5AssetBalance[index].asset_name] = this.$HelperTools.toFinancialVal(this.oep5AssetBalance[index].balance)
        }
        return retAssets
      },
      /**
       * 取出全部oep8资产名称和值
       */
      oep8AssetsVal: function () {
        let retAssets = {};

        for (let index in this.oep8AssetBalance) {
          retAssets[this.oep8AssetBalance[index].asset_name] = this.$HelperTools.toFinancialVal(this.oep8AssetBalance[index].balance)
        }
        return retAssets
      }
    },
    methods: {
      getAddressDetailData() {
        this.loadingFlag = false
        var params = this.$route.params
        /* console.log(params) */
        params.contractType = 'native'
        this.$store.dispatch('GetAddressNativeDetail', params).then()
        params.contractType = 'oep4'
        this.$store.dispatch('GetAddressOep4Detail', params).then()
        params.contractType = 'oep5'
        this.$store.dispatch('GetAddressOep5Detail', params).then()
        params.contractType = 'oep8'
        this.$store.dispatch('GetAddressOep8Detail', params).then()
        if(params.assetName == "ALL"){
          this.$store.dispatch('GetAddressTX',params).then()
        }else{
          this.$store.dispatch('GetAddressAssetTX',params).then()
        }
      },
      /* 20190524 新增的接口设计是某种南瓜没有就不返回，所以手动补0 */
      zeroPlus(num){
        return num ? num : 0
      },
      toReturn() {
        this.$router.go(-1)
      },
      toTransactionDetailPage($TxnId) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'TransactionDetail', params: {tx_hash: $TxnId}})
        } else {
          this.$router.push({name: 'TransactionDetailTest', params: {tx_hash: $TxnId, net: "testnet"}})
        }
      },
      toAddressDetailPage($address) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'AddressDetail', params: {address: $address, assetName:"ALL", pageSize: 20, pageNumber: 1}})
        } else {
          this.$router.push({
            name: 'AddressDetailTest',
            params: {address: $address, assetName:"ALL", pageSize: 20, pageNumber: 1, net: "testnet"}
          })
        }
      },
      goToPage($Page) {
        var address = this.$route.params.address
        if (this.$route.params.net == undefined) {
          this.$router.push({
            name: 'AddressDetail',
            params: {address: address, pageSize: $Page.pageSize, pageNumber: $Page.pageNumber}
          })
        } else {
          this.$router.push({
            name: 'AddressDetailTest',
            params: {address: address, pageSize: $Page.pageSize, pageNumber: $Page.pageNumber, net: 'testnet'}
          })
        }
        this.getAddressDetailData()
      }
    },
    components: {ToExcel}
  }
</script>

<style scoped>
  .income-color {
    color: #00AE1D;
  }

  .expenditure-color {
    color: #002766;
  }

  .oep-4-5-div {
    margin-top: 15px;
    padding: 0 15px;
  }

  .table1_item_title {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    .table1_item_title {
      font-size: 14px;
    }
  }
</style>
