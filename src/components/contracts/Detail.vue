<template>
  <div class="e-container margin-top-15 explorer-detail-tab">
    <list-title :name="$t('contracts.detail.name')"></list-title>

    <div class="detail-col font-Regular detail-col-fix">
      <div class="row detail-title-content">
        <div class="col">
          <div class="d-flex">
            <div class="img-sc-detail">
              <img v-if="contract.list.logo !== ''" :src="contract.list.logo" alt="">
              <div v-else class="sc-no-logo-detail">C</div>
            </div>
            <div class="sc-detail-desc">
              <h4>{{ contract.list.name }}</h4>
              <div class="f-color word-break d-block height-100 font-size14">
                <p class="word-break-word">{{ contract.list.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    <detail-title-1 :name="$t('contracts.detail.hash')" :val="$route.params.contractHash"></detail-title-1>

    <detail-block-3 :name1="$t('contracts.detail.creator')" :val1="contract.list.creator" :rows1="'1.2'"
                    :params1="['address', contract.list.creator]"
                    :name2="$t('contracts.detail.createdTime')"
                    :val2="$HelperTools.getTransDate(contract.list.create_time)" :rows2="'1.1'">
    </detail-block-3>

<!-- detail info -->
      <div class="row font-size14" v-for="(scVal, scKey, scIndex) in contract.list.contact_info">
        
        <div v-if="scIndex !== contract.list.contact_info.length" class="sc-detail-divider-line"></div>
        <div class="col-2"><span class="normal_color">{{ scKey }}:</span></div>
        <div class="col-10">
          <span class="f-color word-break d-block height-100 font-size14">
            <div class="height-100"><div class="height-100 font-size14 important_color pointer" @click="turnTo(scVal)">{{ scVal }}</div></div>
          </span>
        </div>
        
      </div>
    </div>

    <div class="row">
      <div class="vol-col">
        <div class="detail-col detail-col-left">
          <div class="t-color">{{ $t('tokens.list.tab.addressCount') }}&nbsp;
          </div>
          <div class="tt-color font-size24 text-center line-height72">{{ $HelperTools.toFinancialVal(contract.list.address_count) }}</div>
        </div>
      </div>
      <div class="vol-col">
        <div class="detail-col detail-col-middle">
          <div class="t-color">{{ $t('tokens.detail.txn') }}</div>
          <div class="tt-color font-size24 text-center line-height72">{{ $HelperTools.toFinancialVal(contract.list.tx_count) }}</div>
        </div>
      </div>
      <div class="vol-col">
        <div class="detail-col detail-col-right">
          <div class="t-color">{{ $t('tokens.detail.volume') }}&nbsp;
          </div>
          <div class="tt-color font-size24 text-centerc volume-height">
            <div class="volume-font">{{ $HelperTools.toFinancialVal(parseInt(contract.list.ont_sum)) + ' ONYX'}}</div>
            <div class="volume-font">{{$HelperTools.toFinancialVal(contract.list.ong_sum) + ' OXG'}}</div>
          </div>
        </div>
      </div>
    </div>


    <!-- Tab Control -->
    <ul class="nav nav-tabs f-color" role="tablist" style="margin-top: 8px;">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#scTxn">{{ $t('all.txns') }} </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#scCode">{{ $t('tokens.detail.code') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#scABI">{{ $t('tokens.detail.abi') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#scStatistic">{{ $t('tokens.detail.statistic') }}&nbsp;
          <a href="#" data-toggle="tooltip" class="tooltip-style" :title="$t('tokens.detail.tip')">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </a>
        </a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div id="scTxn" class=" tab-pane active">
        <div class="row " v-if="contractTxList.total !== 0">
          <div  class="col ">
            <div class="detail-col">
              <!-- <ont-pagination :total="contract.total"></ont-pagination> -->
              <o-load v-if="!(contractTxList.list && loadingFlag)" ></o-load>
              <div v-else class="table-responsive">
                <table class="table">
                  <thead>
                  <tr class="f-color">
                    <th class="td-tx-head font-size18 font-Blod">{{ $t('all.hash') }}</th>
                    <th class="td-tx-head font-size18 font-Blod">{{ $t('all.fee') }}</th>
                    <th class="td-tx-head font-size18 font-Blod">{{ $t('all.status') }}</th>
                    <th class="td-tx-head font-size18 font-Blod">{{ $t('all.block') }}</th>
                    <th class="td-tx-head font-size18 font-Blod">{{ $t('all.time') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="tx in contractTxList.list">
                    <td class="font-size14 important_color font-Regular pointer" >
                      <span v-if="tx.tx_hash" @click="toTransDetailPage(tx.tx_hash)">{{tx.tx_hash.substr(0,16) + '...' + tx.tx_hash.substr(60)}}</span>
                    </td>
                    <td class="normal_color">{{Number(tx.fee).toString()}}</td>
                    <td class="font-size14 s-color font-Regular" v-if="tx.confirm_flag === 1">
                      Confirmed
                    </td>
                    <td class="font-size14 err-color font-Regular" v-else>
                      Failed
                    </td>
                    <td class="font-size14 normal_color font-Regular">
                      {{tx.block_height}}
                    </td>
                    <td class="font-size14 normal_color font-Regular">
                      {{$HelperTools.getTransDate(tx.tx_time)}}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <ont-pagination :total="contractTxList.total"></ont-pagination>
            </div>
          </div>
        </div>
      </div>
      <div id="scCode" class=" tab-pane">
        <div class="row">
          <div class="col ">
            <div class="detail-col">
              <div class="copy-bottom">
                <span class="pull-right pointer font-size14">
                  <i @click="copyDetailVal('scCodeData')"
                     data-clipboard-target="#scCodeData"
                     class="copy-success l-25px fa fa-clone"
                     aria-hidden="true"></i>
                </span>
                <span class="pull-right font-size14 font-ExtraLight copied-right" v-show="showCodeCopied">Copied!</span>
              </div>
              <textarea id="scCodeData" readonly rows="6">{{ contract.list.code }}</textarea>
            </div>
          </div>
        </div>
      </div>
      <div id="scABI" class=" tab-pane">
        <div class="row">
          <div class="col ">
            <div class="detail-col"><div class="copy-bottom">
                <span class="pull-right pointer font-size14">
                  <i @click="copyDetailVal('scABIData')"
                     data-clipboard-target="#scABIData"
                     class="copy-success l-25px fa fa-clone"
                     aria-hidden="true"></i>
                  </span>
                <span class="pull-right font-size14 font-ExtraLight copied-right" v-show="showABICopied">Copied!</span>
              </div>
              <textarea id="scABIData" readonly rows="6">{{contract.list.abi}}</textarea>
            </div>
          </div>
        </div>
      </div>
      <div id="scStatistic" class=" tab-pane">
        <div class="row">
          <div class="col ">
            <div class="detail-col">
              <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12" v-for="item in statisticsData.data">
                  <line-chart v-if="hackReset"
                              class="line-chart-style"
                              :labels="statisticsData.labels"
                              :label="14 + $t('statistics.day') + $t('statistics.' + item.label)"
                              :data="item.list"
                  >
                  </line-chart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Clipboard from 'clipboard';

  export default {
    name: "Contracts-Detail",
    mounted() {
      if (this.$route.params.pageSize == undefined || this.$route.params.pageNumber == undefined || this.$route.params.contractType == undefined) {
        this.toContractDetailPage(this.$route.params.contractHash)
      }else{    
        this.getContractData();
        this.getStatisticsData();
      }
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    watch: {
      '$route': ['getContractData', 'getStatisticsData'],
      'contractTxList':function(){
        this.loadingFlag = true
      //  console.log(this.contractTxList)
      },
    },
    computed: {
      ...mapState({
        contract: state => state.Contracts.Detail,
        contractTxList: state => state.Contracts.TxList,
        statisticsData: state => state.Statistics.StatisticsData
      }),
    },
    data() {
      return {
        showCodeCopied: false,
        showABICopied: false,
        hackReset: false,
        loadingFlag:false,
      }
    },
    methods: {
      turnTo(scVal){
        if(scVal.substr(0,4) != "http"){
          window.open("http://"+scVal)
        }else{
          window.open(scVal)
        }
      },
      getContractData() {
        this.contract.list = '';
        this.loadingFlag = false
        if(this.$route.params.contractType == undefined){
          this.$route.params.contractType = "all"
        }
        this.$store.dispatch('GetContract', this.$route.params).then();
        this.$store.dispatch('GetContractTx', this.$route.params).then();
      },
      toContractDetailPage($hash){
        if (this.$route.params.net === 'testnet') {
          this.$router.push({name: 'ContractDetailTest', params: {contractType: 'all',contractHash:$hash, pageSize: 10, pageNumber: 1, net: 'testnet'}})
        } else {
          this.$router.push({name: 'ContractDetail', params: {contractType: 'all',contractHash:$hash, pageSize: 10, pageNumber: 1}})
        }
      },
      toTransDetailPage($TxnId) {
        if (this.$route.params.net === 'testnet') {
          this.$router.push({name: 'TransactionDetailTest', params: {tx_hash: $TxnId, net: 'testnet'}})
        } else {
          this.$router.push({name: 'TransactionDetail', params: {tx_hash: $TxnId}})
        }
      },
      copyDetailVal($id) {
        let clipboard = new Clipboard('.copy-success');

        clipboard.on('success', function (e) {
          e.clearSelection();
        });

        if ($id === 'scCodeData') {
          this.showCodeCopied = true
        } else {
          this.showABICopied = true
        }
      },
      getStatisticsData() {
        this.statisticsData.data = '';

        this.hackReset = false;
        this.$nextTick(() => {
          this.hackReset = true
        });

        this.$store.dispatch('getStatisticsData', this.$route.params).then()
      }
    }
  }
</script>

<style scoped>
  .nav-tabs .nav-link {
    border: 0;
    border-radius: 0;
  }

  .tab-content > .container {
    padding: 0;
  }

  .tab-content > .container .detail-col {
    margin-top: 0;
  }

  .nav-item > a {
    color: #002766;
  }

  .tab-content textarea {
    border: none;
    width: 100%;
    padding: 24px;
    font-size: 14px;
    color: #595757;
    background-color: #edf2f5;
  }

  .detail-col-fix {
    padding: 21px 24px 10px !important;;
  }

  .height-100 {
    height: 100%;
  }

  .b-detail-divider-line {
    background: #e5e4e4;
    height: 1px;
    margin: 15px 0;
    width: 100%;
  }

  .img-sc-detail,
  .img-sc-detail > img {
    height: 106px;
    width: 106px;
  }

  .sc-detail-desc {
    margin-left: 30px;
  }

  .sc-no-logo-detail {
    width: 106px;
    height: 106px;
    background-color: #002766;
    color: white;
    font-size: 32px;
    font-weight: bold;
    line-height: 106px;
    text-align: center;
  }

  .sc-detail-divider-line {
    background: #e5e4e4;
    height: 1px;
    margin: 10px;
    width: 100%;
  }

  .copied-right {
    margin-right: 10px;
  }

  .copy-bottom {
    margin-bottom: 5px;
  }

  .line-chart-style {
    width: 100%;
    height: 240px;
    margin: 0 0 15px;
    background-color: transparent;
    border: 1px solid #edf2f5;
  }
  .detail-title-content{
    padding-bottom:52px;
  }
  /*手机*/
  @media screen and (max-width:576px) {
    .s-show{
       display: block;
    }
    .m-show{
       display: none;
    }
    .l-show{
       display: none;
    }
  }
  @media screen and (min-width:576px) and (max-width:768px) {
    .s-show{
       display: none;
    }
    .m-show{
       display: block;
    }
    .l-show{
       display: none;
    }

  }
  @media screen and (min-width:769px) and (max-width:992px)  {
    .s-show{
       display: none;
    }
    .m-show{
       display: none;
    }
    .l-show{
       display: block;
    }
  }
.padding0{
  padding:0 !important;
}
</style>
