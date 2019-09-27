<template>
  <div class="e-container margin-top-15">
    <list-title :name="$t('txDetail.name')"></list-title>
    <detail-title :name="$t('txDetail.txHash')" :val="txData.tx_hash"></detail-title>

    <!-- Transaction Detail Basic Info: -->
    <detail-block
      :params="[{name:$t('txDetail.time'), val:$HelperTools.getTransDate(txData.tx_time)}]"></detail-block>
    <detail-block
      :params="[{name:$t('txDetail.type'), val:txData.tx_type === 209 ? $t('txDetail.sc') : $t('txDetail.deploySC')}]"></detail-block>
    <div class="d-none d-sm-block">
      <div class="row">
        <div class="col">
          <div class="detail-col">
            <span class="f-color">{{ $t('txDetail.detial') }}</span><span class="pointer important_color" @click="switchDetail()">{{ !detailFlag?$t('txDetail.open'):$t('txDetail.close') }}</span>
<!--             <pre v-if="detailFlag" class=" f-color pre-sc-detail" >{{JSON.stringify(SCDetail, null, 2)}}</pre>
            <pre v-else :class="!detailFlagFlag? 'f-color pre-sc-detail-close':'f-color pre-sc-detail-close-a'" >{{JSON.stringify(SCDetail, null, 2)}}</pre> -->
            <div class=" f-color pre-sc-detail" v-if="detailFlag">
              <vue-json-pretty
                :path="'res'"
                :showDoubleQuotes="false"
                :data="SCDetail"
                :showLine = "false"
                >
              </vue-json-pretty>
            </div>
            <div  :class="!detailFlagFlag? 'f-color pre-sc-detail-close':'f-color pre-sc-detail-close-a'"  v-else>
              <vue-json-pretty
                :path="'res'"
                :showDoubleQuotes="false"
                :data="SCDetail"
                :showLine = "false"
                >
              </vue-json-pretty>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--PC style-->
    <div class="d-none d-sm-block">
      <div class="row">
        <div class="col">
          <div class="detail-col detail-col-left">
            <span class="f-color">{{ $t('txDetail.height') }}</span>
            <span class="pointer important_color" @click="toBlockDetailPage(txData.block_height)">{{txData.block_height}}</span>
          </div>
        </div>
        <div class="col">
          <div class="detail-col detail-col-middle">
            <span class="f-color">{{ $t('txDetail.fee') }}</span>
            {{Number(txData.fee)}}
            <span class="important_color">ONG</span>
          </div>
        </div>
        <div class="col">
          <div class="detail-col detail-col-right">
            <span class="f-color">{{ $t('txDetail.status') }}</span>
            <span v-if="txData.confirm_flag === 1" class="s-color">{{ $t('all.confirmed') }}</span>
            <span v-else class="f-color">{{ $t('all.failed') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="d-block d-sm-none">
      <div class="detail-col font-size14">
        <div class="row">
          <div class="col">
            <div class="f-color">{{ $t('txDetail.height') }}</div>
            <div class="important_color" @click="toBlockDetailPage(txData.block_height)">{{txData.block_height}}</div>
          </div>
        </div>
      </div>
      <div class="detail-col font-size14">
        <div class="row">
          <div class="col">
            <div class="f-color">{{ $t('txDetail.fee') }}</div>
            <div class="important_color">{{ Number(txData.fee) + ' ONG'}}</div>
          </div>
        </div>
      </div>
      <div class="detail-col font-size14">
        <div class="row">
          <div class="col">
            <div class="f-color">{{ $t('txDetail.status') }}</div>
            <div v-if="txData.confirm_flag === 1" class="s-color">{{ $t('all.confirmed') }}</div>
            <div v-else class="normal_color">{{ $t('all.failed') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="pc-display">

      <!-- Transaction Detail Data Info: -->
      <table v-if="authflag" class="table table-hover">
        <thead>
        <tr>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="td11" style="padding: 34px 24px;">
            <p class="font-size24  p_margin_bottom n_color font-Regular">{{ $t('all.description') }}:
              {{txData.description}}</p>
          </td>
        </tr>
        </tbody>
      </table>

      <!--展示Issuer OntId和Description的数据块-->
      <detail-block v-if="recordflag" :params="issuerData"></detail-block>

      <!--展示ONT ID和Description的数据块-->
      <div v-if="idflag" class="row font-Regular font-size14">
        <div class="col">
          <div class="detail-col">
            <span class="font-size24 f-color font-Regular p_margin_bottom">{{ $t('all.ontId') }}</span>
            <p class="font-size14 important_color font-Regular p_margin_bottom pointer"
               @click="toOntIdDetailPage(txData.detail.ontid)">
              {{txData.detail.ontid}}
            </p>
            <span class="font-size24 f-color font-Regular p_margin_bottom">{{ $t('all.description') }}:</span>
            <p class="font-size14 font-Regular p_margin_bottom">
              {{txData.description}}
            </p>
          </div>
        </div>
      </div>

      <!--展示部署合约的数据块-->
      <div v-if="scflag" class="row font-Regular font-size14">
        <div class="col">
          <div class="detail-col">
            <span class="font-size24 f-color font-Regular p_margin_bottom">{{ $t('all.description') }}:</span>
            <p class="font-size14 font-Regular p_margin_bottom">
              {{txData.description}}
            </p>
          </div>
        </div>
      </div>

      <!--展示转账金额等详情的数据块-->
      <div v-if="txflag">
        <div  class="row font-size14" v-for="tx in txData.detail.transfers">
          <div class="col">
            <div class="detail-col trans-tx-col">
              <div class="row">
                <div class="col pointer" @click="toAddressDetailPage(tx.from_address)">{{tx.from_address}}</div>
                <div class="col">>></div>
                <div class="col-4 text-center font-weight-bold font-size18">{{tx.amount}} <span class="text-uppercase">{{getAssetName(tx.asset_name)}}</span>
                </div>
                <div class="col text-right">>></div>
                <div class="col text-right pointer" @click="toAddressDetailPage(tx.to_address)">{{tx.to_address}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="mobile-display">

      <!--展示Issuer OntId和Description的数据块-->
      <detail-block v-if="recordflag" :params="issuerData"></detail-block>

      <table v-if="authflag" class="table table-hover">
        <thead>
        <tr>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="td11" style="padding: 34px 24px;">
            <p class="font-size24  p_margin_bottom n_color font-Regular">Description:</p>
            <p class="font-size14 f-color p_margin_bottom font-Regular">{{txData.description}}</p>
          </td>
        </tr>
        </tbody>
      </table>

      <table v-if="idflag" class="table table-hover">
        <thead>
        <tr>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="td11" style="padding: 34px 24px;">
            <p class="font-size24  p_margin_bottom f-color font-Regular">OntId:</p>
            <p class="font-size14 important_color p_margin_bottom font-Regular pointer">{{txData.detail.ontid}}</p>
            <p class="font-size24  p_margin_bottom f-color font-Regular">Description:</p>
            <p class="font-size14 f-color p_margin_bottom font-Regular">{{txData.description}}</p>
          </td>
        </tr>
        </tbody>
      </table>
      <table v-if="scflag" class="table table-hover">
        <thead>
        <tr>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="td11" style="padding: 34px 24px;">
            <p class="font-size24  p_margin_bottom f-color font-Regular">Description:</p>
            <p class="font-size14 f-color p_margin_bottom font-Regular">{{txData.description}}</p>
          </td>
        </tr>
        </tbody>
      </table>
      <table v-if="txflag" class="table table-hover">
        <thead>
        <tr>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tx in txData.detail.transfers">
          <td class="td11" style="background-color:#32A4BE;color:white;padding: 34px 24px;">
            <div class="row ">
              <div class="col-lg-4 padding0-right" @click="toAddressDetailPage(tx.from_address)">{{tx.from_address}}</div>
              <div class="col-lg-1 ">>></div>
              <div class="col-lg-2 ">{{toMoney(tx)}} {{getAssetName(tx.asset_name)}}</div>
              <div class="col-lg-1 ">>></div>
              <div class="col-lg-4 padding0-left" @click="toAddressDetailPage(tx.to_address)">{{tx.to_address}}</div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import GetTransactionType from './../../common/OntMsg/GetTransactionType.js'
  import VueJsonPretty from 'vue-json-pretty'

  export default {
    name: "transaction-detail-page",
    data() {
      return {
        txflag: false,
        idflag: false,
        recordflag: false,
        authflag: false,
        scflag: false,
        detailFlag:false,
        detailFlagFlag:false,
      }
    },
    mounted() {
      this.getTxData()
      this.getTxDetail()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      console.log(window.location.href.indexOf("testnet")>-1)
    },
    watch: {
      '$route': 'getTxData',
      'txData': function () {
        /* console.log(this.txData) */
        if (this.txData.confirm_flag === 1) {
          this.getEventType(this.txData.event_type)
        } else {
          this.txflag = false;
          this.idflag = false;
        }
/*         console.log("id",this.idflag)
        console.log("tx",this.txflag)
        console.log("record",this.recordflag)
        console.log("record",this.txData.description.substr(0,4)) */
      },
      'SCDetail':function(){
/*         console.log(this.SCDetail) */
      }
    },
    computed: {
      ...mapState({
        txData: state => state.Transactions.Detail,
        SCDetail: state => state.Transactions.SCDetail,
      }),
      issuerData: function () {
        return [
          {name: this.$t('txDetail.issuer'), val: this.txData.description.substr(12, 42), rows: 2},
          {name: this.$t('all.description'), val: this.txData.description.substr(55), rows: 2}
        ]
      }
    },
    methods: {
      /**
       * 隐藏或显示交易详情
       */
      switchDetail(){
        this.detailFlag = !this.detailFlag
        this.detailFlagFlag = true
      },
      /**
       * 获取资产的真实名称
       *
       * @param name
       * @return {*|string}
       */
      getAssetName(name) {
        let realname = '';

        switch (name) {
          case 'pumpkin01':
            realname = this.$t('assetName.pumpkin01');
            break;
          case 'pumpkin02':
            realname = this.$t('assetName.pumpkin02');
            break;
          case 'pumpkin03':
            realname = this.$t('assetName.pumpkin03');
            break;
          case 'pumpkin04':
            realname = this.$t('assetName.pumpkin04');
            break;
          case 'pumpkin05':
            realname = this.$t('assetName.pumpkin05');
            break;
          case 'pumpkin06':
            realname = this.$t('assetName.pumpkin06');
            break;
          case 'pumpkin07':
            realname = this.$t('assetName.pumpkin07');
            break;
          case 'pumpkin08':
            realname = this.$t('assetName.pumpkin08');
            break;
          case 'ong':
            realname = 'ONG';
            break;
          case 'ont':
            realname = 'ONT';
            break;
          default:
            realname = name
        }

        return realname;
      },
      toMoney(txTmp) {
        /* console.log(txTmp) */
        if (txTmp.asset_name === 'ont') {
          let num = txTmp.amount;
       //   return num.split('').reverse().join('').substr(10, 10).split('').reverse().join('')
          return Number(txTmp.amount)
        } else {
          return Number(txTmp.amount)
        }
      },
      getTxData() {
        this.$store.dispatch('GetTransaction', this.$route.params).then()
      },
      getTxDetail() {
        this.$store.dispatch('GetTransactionDetail', this.$route.params).then()
      },
      getTransactionType($case) {
        return GetTransactionType.getTransactionType($case)
      },
      toBlockDetailPage($blockHeight) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'blockDetail', params: {param: $blockHeight}})
        } else {
          this.$router.push({name: 'blockDetailTest', params: {param: $blockHeight, net: "testnet"}})
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
      toOntIdDetailPage($ontid) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'OntIdDetail', params: {ontid: $ontid, pageSize: 20, pageNumber: 1}})
        } else {
          this.$router.push({
            name: 'OntIdDetailTest',
            params: {ontid: $ontid, pageSize: 20, pageNumber: 1, net: "testnet"}
          })
        }
      },
      getEventType($type){
        if($type == 0 || $type == 2 || $type == 6){
          this.txflag= false
          this.idflag= false
          this.recordflag= false
          this.authflag= false        
          this.scflag= false        
        }
        if($type == 1){
          this.txflag= false
          this.idflag= false
          this.recordflag= false
          this.authflag= false        
          this.scflag= true        
        }
        if($type == 5){
          this.txflag= false
          this.idflag= false
          this.recordflag= true
          this.authflag= false          
          this.scflag= false        
        }
        if($type == 4){
          this.txflag= false
          this.idflag= true
          this.recordflag= false
          this.authflag= false       
          this.scflag= false           
        }
        if($type == 3){
          this.txflag= true
          this.idflag= false
          this.recordflag= false
          this.authflag= false          
          this.scflag= false        
        }
      }
    },
    components: {
      VueJsonPretty
    }
  }
</script>

<style scoped>
  .trans-tx-col {
    background: #002766;
    color: white;
    font-size: 14px;
  }
  .pre-sc-detail{
    height: 300px;
    -webkit-animation-name: fadeIn; /*动画名称*/
    -webkit-animation-duration: 1s; /*动画持续时间*/
    -webkit-animation-iteration-count: 1; /*动画次数*/
    -webkit-animation-delay: 0s;
    margin-bottom: 0;
    overflow: auto;
  }
  @-webkit-keyframes fadeIn {
    0% {
    opacity: 0; /*初始状态 透明度为0*/
    height: 0px;
    }
    100% {
    opacity: 1; /*结尾状态 透明度为1*/
    height: 300px;
    }
  }
  .pre-sc-detail-close{
    height: 0px;
    margin-bottom: 0;
    opacity: 0;
  }
  .pre-sc-detail-close-a{
    height: 0px;
    -webkit-animation-name: fadeOut; /*动画名称*/
    -webkit-animation-duration: 1s; /*动画持续时间*/
    -webkit-animation-iteration-count: 1; /*动画次数*/
    -webkit-animation-delay: 0s;
    margin-bottom: 0;
    overflow: auto;
  }
  @-webkit-keyframes fadeOut {
    0% {
    opacity: 1; /*初始状态 透明度为0*/
    height: 300px;
    }
    100% {
    opacity: 0; /*结尾状态 透明度为1*/
    height: 0px;
    }
  }
  
  .vjs-tree .vjs-value__string {
      color: #002766 !important;
  }
</style>
