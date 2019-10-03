<template>
  <div class="div-block-list">
    <div class="row title-color title-hover" @click="toOntIdListPage">
      <div class="col-8 block-title-wrapper">
        <p class="title font-blod">{{ $t('ontIdList.name') }}</p>
      </div>
      <div class="col-4 block-title-wrapper">
        <p class="title-more float-right">{{ $t('all.more') }}</p>
      </div>
    </div>

    <div class="row">
      <div v-for="(OntId,index) in latestOntIdList.info" class="col-12 block-item-wrapper">
        <div class="divider-line"></div>
        <div class="row padding0 block-item-sub-wrapper">
          <div :class="( index <1) ?'block-item col-8 text-left padding0 font-size16':'block-item col-8 text-left padding0 block-item-top font-size16'"
               @click="toTransactionDetailPage(OntId.tx_hash)">
            <span class="ontID-text font700 padding0">{{OntId.tx_hash.substr(0,8)}}...{{OntId.tx_hash.substr(56)}}</span>
          </div>
          <span v-if="$HelperTools.getDateTime(OntId.tx_time) <60" class="font-size14 block-item col-4 text-right padding0 block-item-top">
            {{showtime[index]}}s ago
          </span>
          <span v-else class="font-size14 block-item col-4 text-right padding0 block-item-top">
            {{getShowDate(OntId.tx_time)}} ago
          </span>
        </div>
        <div class="row padding0 block-item-sub-wrapper-s">
          <span :class="( index >4) ? ' block-item col-12 text-left padding0 font-size14 ':'block-item col-12 text-left padding0  font-size14 '"
                >{{getOntIDEvent(OntId.description)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import GetTransactionType from './../../common/OntMsg/GetTransactionType.js'

  export default {
    name: "ont-id-list",
    data() {
      return {
        info: [],
        showtime: [0, 0, 0, 0, 0]
      }
    },
    mounted() {
      this.getOntIdList()
      this.intervalBlock1 = setInterval(() => {
        this.getOntIdList()
      }, 6000)
      this.intervalBlockstandard = setInterval(() => {
        for (var i = 0; i < 5; i++) {
          var time = this.showtime[i] + 1
          this.$set(this.showtime, i, time)
        }
      }, 1000)
    },
    watch: {
      '$route': 'getOntIdList',
      'latestOntIdList.info': function () {
        for (var i = 0; i < this.latestOntIdList.info.length; i++) {
          this.showtime[i] = this.$HelperTools.getDateTime(this.latestOntIdList.info[i].tx_time)
        }
      }
    },
    computed: {
      ...mapState({
        latestOntIdList: state => state.OntIdList.LatestOntIdList
      })
    },
    methods: {
      getOntIdList() {
        this.$store.dispatch('getOntIdList', this.$route.params).then()
      },
      toOntIdListPage() {
        if (this.$route.params.net === 'testnet') {
          this.$router.push({name: 'OntIdListDetailTest', params: {pageSize: 20, pageNumber: 1, net: 'testnet'}})
        } else {
          this.$router.push({name: 'OntIdListDetail', params: {pageSize: 20, pageNumber: 1}})
        }
      },
      getShowDate($time) {
        let time = this.$HelperTools.getDateTime($time)
        return this.$HelperTools.getShowDate(time)
      },
      getTransactionType($case) {
        return GetTransactionType.getTransactionType($case)
      },
      toTransactionDetailPage($TxnId) {
        if (this.$route.params.net === 'testnet') {
          this.$router.push({name: 'TransactionDetailTest', params: {tx_hash: $TxnId, net: 'testnet'}})
        } else {
          this.$router.push({name: 'TransactionDetail', params: {tx_hash: $TxnId}})
        }
      },
      toOntIdDetailPage($OntId) {
        if (this.$route.params.net === 'testnet') {
          this.$router.push({name: 'OntIdDetailTest', params: {ontid: $OntId, net: 'testnet'}})
        } else {
          this.$router.push({name: 'OntIdDetail', params: {ontid: $OntId}})
        }
      },
      countDownTime: function () {
        for (var i = 0; i < this.info.length; i++) {
          this.info[i].showtime = this.info[i].showtime + 1
        }
      },
      getOntIDEvent: function ($event) {
        switch ($event.substr(0, 12)) {
          case "register Ont":
            return "Register ONYX ID";
          case "add publicKe":
            return "Add publickey";
          case "remove publi":
            return "Remove publickey";
          case "add attribut":
            return "Add identity attribute";
          case "update attri":
            return "Update identity attribute";
          case "delete attri":
            return "Delete identity attribute";
          case "change recov":
            return "Change recovery";
          case "add recovery":
            return "Add recovery";
          case "remove attri":
            return "Remove attribute";
          case "create new c":
            return "Create new claim"
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.intervalBlock1);
      clearInterval(this.intervalBlockstandard)
    }
  }
</script>

<style scoped>
  .ontID-text{
    background-color: #fff;
    color:#003a8c;
    cursor: pointer;
    padding: 4px;
  }
  .ontID-text:hover{
    text-decoration: underline;
  }
</style>
