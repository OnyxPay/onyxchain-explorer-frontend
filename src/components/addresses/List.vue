<template>
  <div class="e-container container-margin-top">
    <list-title :name="$t('addressList.nickname')"></list-title>

    <div class="btn-group">
      <button type="button"
              :disabled="$route.params.token === 'onyx'"
              @click="toAddressListPage('onyx')"
              :class="$route.params.token === 'onyx' ? 'btn-current' : 'btn-choose'"
              class="btn">ONYX</button>
      <button type="button"
              :disabled="$route.params.token === 'oxg'"
              @click="toAddressListPage('oxg')"
              :class="$route.params.token === 'oxg' ? 'btn-current' : 'btn-choose'"
              class="btn btn-left-0-border">OXG</button>
    </div>

    <ont-pagination :total="addressList.total"></ont-pagination>

    <div class="row justify-content-center">
      <div class="col">
        <o-load :type="listType" v-if="!(addressList && loadingFlag)" ></o-load>
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th class="font-size18" scope="col">{{ $t('addressList.rank') }}</th>
              <th class="font-size18" scope="col">{{ $t('addressList.name') }}</th>
              <th class="font-size18" scope="col">{{ ($route.params.token === 'onyx' ? $t('assetName.ont') : $t('assetName.ong')) + $t('addressList.balance') }}</th>
              <th class="font-size18" scope="col">{{ $t('addressList.percent') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(address,index) in rankList">
              <td class="font-size14 font-Regular normal_color">{{Number(addressList.basicRank) + index}}</td>
              <td class="font-size14 font-Regular important_color pointer"
                  @click="goToAddressDetail(address.address)">
                {{address.address.substr(0,6) + '...' + address.address.substr(28)}}
              </td>
              <td class="font-size14 font-Regular normal_color">{{$HelperTools.toFinancialVal(address.balance)}}</td>
              <td class="font-size14 font-Regular normal_color">{{(address.percent * 100).toFixed(4)}}%</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ont-pagination :total="addressList.total"></ont-pagination>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    mounted() {
      this.getAddressListInfo()
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    watch: {
      '$route': function(){
        this.getAddressListInfo()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      'addressList':function(){
        this.loadingFlag = true
      }
    },
    computed: {
      ...mapState({
        addressList: state => state.Addresses.List
      }),
      rankList() {
        if (this.addressList.list) {
          let lists = this.addressList.list;

          if (this.$route.params.token === 'oxg' || this.$route.params.token === 'onyx') {
            for (let i in lists) {
              let tmpB = lists[i].balance.toString();
              lists[i].balance = tmpB.substring(0, tmpB.length - 9) + '.' + tmpB.substring(tmpB.length - 9)
            }
          };
          // for(let j in lists ){
          //   if(lists[j].address === "0700000000000000000000000000000000000000"){
          //     lists[j].address = "AFmseVrdL9f9oyCzZefL9tG6UbviEH9ugK"
          //   }
          //   if(lists[j].address === "0100000000000000000000000000000000000000"){
          //     lists[j].address = "AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV"
          //   }
          // };

          return lists;
        } else {
          return {}
        }
      }
    },
    data() {
      return {
        loadingFlag:false,
        listType:'list',
      }
    },
    methods: {
      getAddressListInfo() {
        this.loadingFlag = false;
        this.$store.dispatch('GetAddressList', this.$route.params).then()
      },
      toAddressListPage($token) {
        if (this.$route.params.net == undefined) {
          this.$router.push({name: 'addressList', params: {token: $token, pageSize: 20, pageNumber: 1}})
        } else {
          this.$router.push({
            name: 'addressListTest',
            params: {token: $token, pageSize: 20, pageNumber: 1, net: "testnet"}
          })
        }
      },
      goToAddressDetail(address) {
        if (this.$route.params.net == undefined) {
          this.$router.push({
            name: 'AddressDetail',
            params: {address: address, assetName:"ALL", pageSize: 20, pageNumber: 1}
          })
        } else {
          this.$router.push({
            name: 'AddressDetailTest',
            params: {address: address, assetName:"ALL", pageSize: 20, pageNumber: 1, net: 'testnet'}
          })
        }
      }
    }
  }
</script>

<style scoped>
  .btn-current,
  .btn-choose {
    border-radius: 0;
    min-width: 96px;
    height: 32px;
    line-height: 10px;
  }
  .btn-current {
    border: 1px solid #002766;
    background-color: #002766;
    opacity: 1;
    color: white;
  }

  .btn-choose {
    border: 1px solid #002766;
    color: #002766;
  }
</style>
