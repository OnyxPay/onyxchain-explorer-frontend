<template>
  <div class="e-container margin-top-15">
    <list-title :name="$t('contracts.list.name')"></list-title>

<!--     <div class="row contract-count-view">
      <div class="col checkin-btn-content">
        <div class="  checkin-btn text-center font-weight-bold" @click="checkIn()">
          {{ $t('contracts.list.tit.checkIn') }}
        </div>
      </div>
    </div> -->

    <ont-pagination :total="contracts.total"></ont-pagination>

    <div class="row justify-content-center">
      <div class="col">
        <o-load :type="listType" v-if="!(contracts.list && loadingFlag)" ></o-load>
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="font-size18" scope="col"></th>
              <th class="font-size18" scope="col">{{ $t('contracts.list.tab.name') }}</th>
              <th class="font-size18" scope="col">{{ $t('contracts.list.tab.hash') }}</th>
              <th class="font-size18" scope="col">{{ $t('contracts.list.tab.txns') }}</th>
              <th class="font-size18" scope="col">{{ $t('contracts.list.tab.time') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="contract in contracts.list">
              <td class="font-size14 font-Regular normal_color logo-td-width">
                <img v-if="contract.logo !== ''" class="sc-list-img" :src="contract.logo" alt="">
                <div v-else class="sc-no-logo">C</div>
              </td>
              <td class="font-size14 font-Regular normal_color sc-pointer"
                  @click="goToContractDetail(contract)">
                <div class="font-blod font-size16">{{ contract.name }}</div>
                <div class="f-color font-size14 token-td token-desc">{{ contract.description ? contract.description.length > 128 ? contract.description.substr(0,128) + '...' : contract.description.substr(0,128) : '' }}</div>
              </td>
              <td class="font-size14 font-Regular important_color pointer"
                  @click="goToContractDetail(contract)">
                {{ contract.contract_hash.substr(0,8) + '...' + contract.contract_hash.substr(32)}}
              </td>
              <td class="font-size14 font-Regular normal_color" style="width: 100px">{{ contract.tx_count }}</td>
              <td class="font-size14 font-Regular normal_color" style="width: 180px">{{ $HelperTools.getTransDate(contract.update_time) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ont-pagination :total="contracts.total"></ont-pagination>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Contracts-List",
    data() {
      return {
        loadingFlag:false,
        listType:'list',
        applyForUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdszQp1BbviS83psIZUZYMKoNkn0e4zcYxrVqM6v5Qbmzby3g/viewform?vc=0&c=0&w=1'
      }
    },
    mounted() {
      this.getContractsData()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    watch: {
      '$route': function(){
        this.getContractsData()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      'contracts':function(){
        console.log(this.contracts)
        this.loadingFlag = true
      }
    },
    computed: {
      ...mapState({
        contracts: state => state.Contracts.List,
      }),
    },
    methods: {
      getContractsData() {
        this.loadingFlag =false
        this.testNetPageSizeCheck()
        this.$store.dispatch('GetContracts', this.$route.params).then()
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
      checkIn(){
        window.open(this.applyForUrl)
      },
      goToContractDetail(contract) {
        if (this.$route.params.net == undefined) {
          this.$router.push({
            name: 'ContractDetail', params: {
              contractHash: contract.contract_hash,
              contractType: contract.type==''?'other':contract.type,
              pageSize: 10,
              pageNumber: 1
            }
          })
        } else {
          this.$router.push({
            name: 'ContractDetailTest', params: {
              contractHash: contract.contract_hash,
              contractType: contract.type==''?'other':contract.type,
              pageSize: 10,
              pageNumber: 1,
              net: 'testnet'
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .contract-count-view {
    margin-bottom: 15px;
  }

  .sc-list-img {
    width: 32px;
    height: 32px;
  }

  .logo-td-width {
    width: 32px;
  }

  .sc-no-logo {
    width: 32px;
    height: 32px;
    background-color: #002766;
    color: white;
    font-weight: bold;
    line-height: 32px;
    text-align: center;
  }

  .sc-pointer:hover {
    cursor: pointer;
    color: #002766;
    text-decoration: underline;
  }

  .token-td {
    margin-top: 8px;
  }
  .table-responsive{
    padding:0 24px;
    background-color: white;
  }
  .token-desc{
    line-height: 18px;
  }
  .checkin-btn-content{
    display: flex;
    justify-content: flex-end;
  }
  .checkin-btn {
    line-height: 30px;
    width: 128px;
    color: #002766;
    background-color:#fff;
    border:1px solid #002766;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
  }
</style>
