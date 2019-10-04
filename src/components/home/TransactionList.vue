<template>
  <div class="div-block-list">
    <div class="row title-color title-hover" @click="toTransactionListPage">
      <div class="col-8 block-title-wrapper">
        <p class="title font-blod">{{ $t('transList.name') }}</p>
      </div>
      <div class="col-4 block-title-wrapper">
        <p class="title-more float-right">{{ $t('all.more') }}</p>
      </div>
    </div>

    <div class="row">
      <div v-for="(tx,index) in latestTransactionList.info" class="col-12 block-item-wrapper">
        <div class="divider-line"></div>
        <div class="row  block-item-sub-wrapper">
          <div :class="( index <1) ?'block-item col-8 text-left padding0 font-size16':' font-size16 block-item col-8 text-left padding0 block-item-top'"
               @click="toTransactionDetailPage(tx.tx_hash)">
            <span class="txhash-text font700 padding0">{{tx.tx_hash.substr(0,8)}}...{{tx.tx_hash.substr(56)}}</span>
          </div>
          <span v-if="$HelperTools.getDateTime(tx.tx_time) < 60" class="font-size14 block-item col-4 text-right padding0 block-item-top">{{showtime[index]}}s ago</span>
          <span v-else class="font-size14 block-item col-4 text-right padding0 block-item-top">{{getShowDate(tx.tx_time)}} ago</span>
        </div>
        <div class="row  block-item-sub-wrapper-s">
          <span :class="( index >4) ? ' block-item col-12 text-left padding0 font-size14':'block-item col-12 text-left padding0  font-size14'">{{getTxtype(tx.tx_type)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import GetTransactionType from './../../common/OntMsg/GetTransactionType.js'

  export default {
    name: "transaction-list",
    data() {
      return {
        info: [],
        showtime: [0, 0, 0, 0, 0]
      }
    },
    mounted() {
      this.getTransactionList()
      this.intervalBlock2 = setInterval(() => {
        this.getTransactionList()
      }, 6000)
      this.intervalBlockstandard = setInterval(() => {
        for (var i = 0; i < 5; i++) {
          var time = this.showtime[i] + 1
          this.$set(this.showtime, i, time)
        }
      }, 1000)
    },
    watch: {
      '$route': 'getTransactionList',
      'latestTransactionList.info': function () {
        for (var i = 0; i < 5; i++) {
          this.showtime[i] = this.$HelperTools.getDateTime(this.latestTransactionList.info[i].tx_time)
        }
      }
    },
    computed: {
      ...mapState({
        latestTransactionList: state => state.TransactionList.LatestTransactionList
      })
    },
    methods: {
      getTransactionList() {
        this.$store.dispatch('getTransactionList', this.$route.params).then()
      },
      toTransactionListPage() {

        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'TransactionList', params: {pageSize: 20, pageNumber: 1}})
        } else {
          this.$router.push({name: 'TransactionListTest', params: {pageSize: 20, pageNumber: 1, net: "testnet"}})
        }
      },
      toTransactionDetailPage($TxnId) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'TransactionDetail', params: {tx_hash: $TxnId}})
        } else {
          this.$router.push({name: 'TransactionDetailTest', params: {tx_hash: $TxnId, net: "testnet"}})
        }
      },
      getTransactionType($case) {
        return GetTransactionType.getTransactionType($case)
      },
      getShowDate($time) {
        var time = this.$HelperTools.getDateTime($time)
        return this.$HelperTools.getShowDate(time)
      },
      countDownTime: function () {
        for (var i = 0; i < this.info.length; i++) {
          this.info[i].showtime = this.info[i].showtime + 1
        }
      },
      getTxtype: function ($type) {
        switch ($type) {
          case 208:
            return "Deploy Smart Contract"
          case 209:
            return "Invoke Smart Contract"
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.intervalBlock2)
      clearInterval(this.intervalBlockstandard)
    }
  }
</script>

<style scoped>
  .txhash-text{
    background-color: #fff;
    color:#003a8c;
    cursor: pointer;
    padding: 4px;
  }
  .txhash-text:hover{
    text-decoration: underline;
  }
</style>