<template>
  <div class="e-container container-margin-top">
    <list-title :name="$t('nodes.stakeListTit')"></list-title>

    <!--To next round-->
    <div class="row justify-content-center">
      <div class="col-8 col-countdown text-center">
        <span><img class="img-timer" src="./../../assets/nodes/timer.png" alt=""></span>
        <span class="normal_color font-size18">{{ $t('nodes.toNextRound') }}</span>
        <span class="important_color font-size18 font-blod">{{countdown}}</span>
        <span class="normal_color font-size18">{{ $t('nodes.blocks') }}</span>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-xl-4 col-lg-5 col-md-8 col-sm-10 col-10 col-guide">
        <span style="">{{ $t('nodes.guideTxt') }}</span>
        <span class="font-blod">
          <a class="here-color"
             href="https://medium.com/ontologynetwork/owallet-stake-authorization-feature-released-11776706bb34"
             target="_blank">{{ $t('nodes.here') }}</a>
        </span>
      </div>
    </div>

    <!--Node authorization data process bar-->
<!--     <div v-show="fetchProcess !== 100" class="node-progress-row">
      <div class="row">
        <div class="col text-center">
          <div class="important_color"><p>{{ $t('nodes.processTip') }}</p></div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated"
                 :style="'width:' + fetchProcess + '%'"></div>
          </div>
        </div>
      </div>
    </div> -->

    <!--The node list-->
    <div  class="row justify-content-center">
      <div class="col">
        <o-load :type="listType" v-if="!(nodelist && loadingFlag)" ></o-load>
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('nodes.rank') }}</th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('nodes.name') }}</th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('all.pk') }}</th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('all.address') }}</th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('nodes.reward') }}
                <a href="#" data-toggle="tooltip" :title="$t('nodes.tooltipTit')" class="tooltip-style">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </a>
              </th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('nodes.stake') }}</th>
              <th class="trl-tab-border-top-none font-size18" scope="col">{{ $t('nodes.process') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="nL in nodelist" class="font-size14 font-Regular p-tb-18">
              <td><div class="rank-style font-blod">{{ nL.node_rank }}</div></td>
              <td class="important_color font-blod pointer" @click="toNodeDetail(nL.public_key)">{{ nL.name }}</td>
              <td class="f-color pointer2" @click="toNodeDetail(nL.public_key)">{{ nL.public_key.substr(0,12)}}...{{nL.public_key.substr(38) }}</td>
              <td class="f-color pointer2" @click="goToAddressDetail(nL.address)">{{ nL.address.substr(0,8)}}...{{nL.address.substr(26) }}</td>
              <td class="s_color">{{ nL.node_proportion }}</td>
              <td class="normal_color">{{ nL.current_stake }}</td>
              <td class="normal_color">{{ nL.progress }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

	export default {
    name: "stake-authorization",
    data() {
      return {
        loadingFlag:true,
        listType:'list'
      }
    },
    created() {
      window.open("https://node.ont.io/",'_self')
    },
    mounted() {
      $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
      });
      this.getNodeList()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.intervalBlock = setInterval(() => {
        this.getNodeList()
      }, 60000)
    },
    computed: {
      ...mapState({
/*         nodeList: state => state.NodeAuthorization.AuthorizationList,
        fetchProcess: state => state.NodeAuthorization.fetchProcess, */
        countdown: state => state.NodeAuthorization.Countdown,
        nodelist: state => state.NodeAuthorization.nodelist
      })
    },
    watch: {
      'nodelist':function(){
        this.loadingFlag = true
      }
    },
    methods: {
      getNodeList(){
        this.loadingFlag = true
        this.$store.dispatch('getNodelist', this.$route.params).then();
        this.getCountdown()
      },
      getCountdown(){
        this.$store.dispatch('fetchBlockCountdown', this.$route.params).then()
      },
      getNodeListInfo() {
        this.$store.dispatch('fetchNodeList', this.$route.params).then();
        this.$store.dispatch('fetchBlockCountdown', this.$route.params).then()
      },
      toNodeDetail($pk) {
        this.$router.push({name: 'NodeTeamDetail', params: {pk: $pk}})
      },
      toOntIdDetailPage($OntId) {
        if (this.$route.params.net === 'testnet') {
          this.$router.push({name: 'OntIdDetailTest', params: {ontid: $OntId, net: "testnet"}})
        } else {
          this.$router.push({name: 'OntIdDetail', params: {ontid: $OntId}})
        }
      },
      goToAddressDetail(address) {
        if (this.$route.params.net === 'testnet') {
          this.$router.push({
            name: 'AddressDetailTest',
            params: {address: address, assetName:"ALL", pageSize: 20, pageNumber: 1, net: 'testnet'}
          })
        } else {
          this.$router.push({
            name: 'AddressDetail',
            params: {address: address, assetName:"ALL", pageSize: 20, pageNumber: 1}
          })
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.intervalBlock)
    }
  }
</script>

<style scoped>
  .col-countdown {
    padding: 0 15px;
    margin-bottom: 24px;
  }

  .img-timer {
    width: 21px;
    margin-right: 21px;
    margin-top: -5px;
  }

  .col-guide {
    margin-bottom: 48px;
    background: #002766;
    color: #BBD5DD;
    padding: 15px 30px;
  }

  .here-color {
    color: white;
  }

  .node-progress-row {
    margin: 30px 0;
  }

  .progress-bar {
    background-color: #002766;
  }

  .rank-style {
    text-align: center;
    width:45px;
    height:19px;
    color: white;
    background: #002766;
    border-radius:10px;
  }

  .p-tb-18 > td {
    padding: 18px 12px;
  }
</style>
