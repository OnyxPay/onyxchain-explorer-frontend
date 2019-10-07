<template>
  <div class="e-container container-margin-top">
    <list-title :name="$t('ontIdList.name')"></list-title>

    <ont-pagination :total="ontIdList.total"></ont-pagination>

    <div class="row justify-content-center">
      <div class="col">
        <o-load :type="listType" v-if="!(ontIdList.list && loadingFlag)" ></o-load>
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="font-size18" scope="col">{{ $t('all.hash') }}</th>
              <th class="font-size18" scope="col">{{ $t('all.ontId') }}</th>
              <th class="font-size18" scope="col">{{ $t('all.content') }}</th>
              <th class="font-size18" scope="col">{{ $t('all.height') }}</th>
              <th class="font-size18" scope="col">{{ $t('all.fee') }}</th>
              <th class="font-size18" scope="col">{{ $t('all.time') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="OntId in ontIdList.list">
              <td class="font-size14 font-Regular important_color pointer" @click="toTransactionDetailPage(OntId.tx_hash)">{{OntId.tx_hash.substr(0,8) + '...' + OntId.tx_hash.substr(56)}}</td>
              <td class="font-size14 font-Regular important_color pointer" @click="toOntIdDetailPage(OntId.ontid)">{{OntId.ontid.substr(0,10)}}...{{OntId.ontid.substr(35,46)}}</td>
              <td class="font-size14 font-Regular normal_color">{{getOntIDEvent(OntId.description)}}</td>
              <td class="font-size14 font-Regular normal_color">{{OntId.block_height}}</td>
              <td class="font-size14 font-Regular normal_color">{{Number(OntId.fee)}}</td>
              <td class="font-size14 font-Regular normal_color">{{$HelperTools.getTransDate(OntId.tx_time)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ont-pagination :total="ontIdList.total"></ont-pagination>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import GetTransactionType from './../../common/OntMsg/GetTransactionType.js'

  export default {
    data() {
      return {
        listType:"list",
        loadingFlag:false,
      }
    },
    mounted() {
      this.getOntIdList()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    watch: {
      '$route': function(){
        this.getOntIdList()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      'ontIdList':function(){
        this.loadingFlag = true
        console.log(this.ontIdList)
      }
    },
    computed: {
      ...mapState({
        ontIdList: state => state.OntIDs.List,
      })
    },
    methods: {
      getOntIdList() {
        this.loadingFlag = false
        this.testNetPageSizeCheck()
        this.$store.dispatch('GetOntIdList', this.$route.params).then()
      },
      testNetPageSizeCheck(){
        if(this.$route.params.net == "testnet"){
          if(this.$route.params.pageSize > 30){
            this.$message({message: this.$t('error.pagesize')});
            this.$route.params.pageSize = 30
            this.$router.push({name: this.$route.name, params: this.$route.params})
            return
          }
        }
      },
      getTransactionType($case) {
        return GetTransactionType.getTransactionType($case)
      },
      toTransactionDetailPage($TxnId) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'TransactionDetail', params: {tx_hash: $TxnId}})
        } else {
          this.$router.push({name: 'TransactionDetailTest', params: {tx_hash: $TxnId, net: "testnet"}})
        }
      },
      toOntIdDetailPage($OntId) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'OntIdDetail', params: {ontid: $OntId,pageSize:10,pageNumber:1}})
        } else {
          this.$router.push({name: 'OntIdDetailTest', params: {ontid: $OntId,pageSize:10,pageNumber:1, net: "testnet"}})
        }
      },
      getOntIDEvent: function ($event) {
        switch ($event.substr(0, 12)) {
          case "register Ont":
            return "Register ONYX ID"
          case "add publicKe":
            return "Add publickey"
          case "remove publi":
            return "Remove publickey"
          case "add attribut":
            return "Add identity attribute"
          case "update attri":
            return "Update identity attribute"
          case "delete attri":
            return "Delete identity attribute"
          case "change recov":
            return "Change recovery"
          case "add recovery":
            return "Add recovery"
          case "remove attri":
            return "Remove attribute"
          case "create new c":
            return "Create new claim"
          case "revoke claim":
            return "revoke claim"
        }
      }
    }
  }
</script>

<style scoped>

</style>
