<template>
  <div class="e-container container-margin-top">
    <list-title :name="$t('transList.name')"></list-title>

    <ont-pagination :total="transactions.total"></ont-pagination>

    <div class="row justify-content-center">
      <div class="col">
        <o-load :type="listType" v-if="!(transactions.list && loadingFlag)" ></o-load>
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('all.hash') }}</th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('all.status') }}</th>
              <!--<th class="trl-tab-border-top-none font-size18" scope="col">txn type</th>-->
              <!--<th class="trl-tab-border-top-none font-size18" scope="col">block index</th>-->
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('all.height') }}</th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('all.fee') }}</th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('all.time') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="tx in transactions.list" class="font-size14 font-Regular">
              <td class="important_color pointer" @click="toTransactionDetailPage(tx.tx_hash)">
                {{tx.tx_hash.substr(0,8) + '...' + tx.tx_hash.substr(56)}}
              </td>
              <td :class="tx.confirm_flag === 1 ? 's-color' : 'err-color'">{{ tx.confirm_flag === 1 ? 'Confirmed' : 'Failed' }}</td>
              <td class="normal_color">{{tx.block_height}}</td>
              <td class="normal_color">{{$HelperTools.toFinancialVal(tx.fee)}}</td>
              <td class="normal_color">{{$HelperTools.getTransDate(tx.tx_time)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ont-pagination :total="transactions.total"></ont-pagination>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import GetTransactionType from './../../common/OntMsg/GetTransactionType.js'

  export default {
    data() {
      return {
        current: 1,
        showItem: 5,
        allpage: 1,
        allnum: '',
        size: 0,
        loadingFlag:false,
        listType:'littlelist',
      }
    },
    mounted() {
      this.getTransactions()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    watch: {
      '$route':function(){
        this.getTransactions()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      'transactions':function(){
        this.loadingFlag = true
        console.log(this.transactions)
      }
    },
    computed: {
      ...mapState({
        transactions: state => state.Transactions.List
      })
    },
    methods: {
      getTransactions() {
        this.loadingFlag = false
        this.testNetPageSizeCheck()
        this.$store.dispatch('GetTransactions', this.$route.params).then()
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
      toTransactionDetailPage($TxnId) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'TransactionDetail', params: {tx_hash: $TxnId}})
        } else {
          this.$router.push({name: 'TransactionDetailTest', params: {tx_hash: $TxnId, net: 'testnet'}})
        }
      },
      getTransactionType($case) {
        return GetTransactionType.getTransactionType($case)
      }
    }
  }
</script>

<style scoped>
</style>
