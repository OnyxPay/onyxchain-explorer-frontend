<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col form-group search-area text-center">
          <h2 class="font-ExtraLight font-size40" style="color:white;font-weight:100;">{{$t('searchInput.slogan')}}</h2>
          <div class="input-group">
            <input type="text" class="form-control input-search search-input-txt"
                   v-model="searchContent" @keyup.13="submitSearch" :placeholder="$t('searchInput.placeholder')">
            <div class="search-cut-wrapper"><div class="search-cut"></div></div>
            <div class="input-group-addon input-submit-search search-input-txt search-btn text-center font-weight-bold"
                 @click="submitSearch">
              {{$t('searchInput.search')}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Verify claim</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div>
              <p><input class="font-Regular font-size14" type="text" style="width:100%;padding:12px"
                        placeholder="Input Your Claim URI"/></p>
            </div>
            <div>
              <p class="font-Regular font-size24" style="text-align: center;width:100%">Or</p>
            </div>
            <div>
              <p>
                <button type="button" class="upload_btn btn-primary font-Regular" data-dismiss="modal"
                        style="margin:auto"><i class="fa fa-lg fa-folder-open-o"></i> Choose Your Claim File
                </button>
              </p>
            </div>
          </div>
          <div class="modal-footer text-center" style="display:block">
            <div>
              <button type="button" class="veriy_btn btn-primary" disabled>Verify Your Claim on Blockchain</button>
            </div>
            <div><p class="font-Regular">Coming Soon</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $httpService from '../../common/utils'
  export default {

    components: {},
    name: "search-input",
    data() {
      return {
        searchContent: ''
      }
    },
    methods: {
      notFound(){
       // this.$toast.center(this.$t('error.format'));
       this.$message({message: this.$t('error.format')});
      },
      searchHash($searchContent){
        $httpService.get('/transactions/' + $searchContent).then(res=>{
            if(res.code != 0){
                this.notFound()
            }else{
                if (this.$route.params.net == undefined){
                    this.$router.push({name: 'TransactionDetail', params: {tx_hash: this.searchContent}})
                }else{
                    this.$router.push({
                      name: 'TransactionDetailTest',
                      params: {tx_hash: this.searchContent, net: 'testnet'}
                    })
                }
            }          
        }).catch(error => {
          this.notFound()
        })
      },
      searchAddress($searchContent){
          if($searchContent.substr(0,1)!= "A"){
                this.notFound()
          }else{
                if (this.$route.params.net == undefined) {
                  this.$router.push({
                    name: 'AddressDetail',
                    params: {address: this.searchContent, assetName:"ALL", pageSize: 20, pageNumber: 1}
                  })
                } else {
                  this.$router.push({
                    name: 'AddressDetailTest',
                    params: {address: this.searchContent, assetName:"ALL", pageSize: 20, pageNumber: 1, net: 'testnet'}
                  })
                }
          }
      },
      searchContract($searchContent){
        $httpService.get('/contracts/'+$searchContent).then(res => {
            if(res.code != 0){
                this.notFound()
            }else{
              console.log(res)
              console.log("this.$route",this.$route)
                if(res.result == null){
                  this.notFound()
                }else{
                  if(res.result.type == ""){
                    if (this.$route.params.net == undefined){
                      this.$router.push({
                        name: 'ContractDetail',
                        params: {contractHash: this.searchContent, contractType:"other",pageSize: 10, pageNumber: 1}
                      })
                    }else{
                      this.$router.push({
                        name: 'ContractDetailTest',
                        params: {contractHash: this.searchContent, contractType:"other", pageSize: 10, pageNumber: 1, net: 'testnet'}
                      })
                    }
                  }else{
                    if (this.$route.params.net == undefined) {
                      this.$router.push({
                          name: 'TokenDetail', 
                          params: {
                            contractType: res.result.type,
                            tokenName: res.result.name,
                            contractHash: this.searchContent,
                            pageSize: 10,
                            pageNumber: 1
                          }
                      })
                    } else {
                      this.$router.push({
                          name: 'TokenDetailTest', 
                          params: {
                            contractType: res.result.type,
                            tokenName: res.result.name,
                            contractHash: this.searchContent,
                            pageSize: 10,
                            pageNumber: 1,
                            net: 'testnet'
                          }
                      })
                    }
                  }
                }
            }  
        }).catch(error => {
          this.notFound()
        })
      },
      searchONTID($searchContent){
        $httpService.get('/ontids/'+$searchContent+'/ddo').then(res => {
            if(res.code != 0){
              
                this.notFound()
            }else{
              if (this.$route.params.net == undefined) {
                this.$router.push({
                  name: 'OntIdDetail',
                  params: {ontid: this.searchContent, pageSize: 20, pageNumber: 1}
                })
              } else {
                this.$router.push({
                  name: 'OntIdDetailTest',
                  params: {ontid: this.searchContent, pageSize: 20, pageNumber: 1, net: 'testnet'}
                })
              }        
            }      
        }).catch(error => {
          this.notFound()
        })
      },
      searchHeight($searchContent){
        $httpService.get('/blocks/' + $searchContent).then(response => {
            if(response.code != 0){
                this.notFound()
            }else{
              if (this.$route.params.net == undefined) {
                this.$router.push({name: 'blockDetail', params: {param: this.searchContent}})
              } else {
                this.$router.push({name: 'blockDetailTest', params: {param: this.searchContent, net: 'testnet'}})
              }              
            }          
        }).catch(error => {
          this.notFound()
        })
      },
      submitSearch() {
        if (this.searchContent !== '') {
          this.searchContent = this.searchContent.trim();
          switch (this.searchContent.length) {
            /* txhash */
            case 64:
              this.searchHash(this.searchContent)
              break;
            /* address */
            case 34:
              this.searchAddress(this.searchContent)
              break;
            /* contract hash */
            case 40:
              this.searchContract(this.searchContent)
              break;
            /* ontid */
            case 42:
              this.searchONTID(this.searchContent)
              break;
            /* block height */
            case 1:
              this.searchHeight(this.searchContent)
              break;
            case 2:
              this.searchHeight(this.searchContent)
              break;
            case 3:
              this.searchHeight(this.searchContent)
              break;
            case 4:
              this.searchHeight(this.searchContent)
              break;
            case 5:
              this.searchHeight(this.searchContent)
              break;
            case 6:
              this.searchHeight(this.searchContent)
              break;
            case 7:
              this.searchHeight(this.searchContent)
              break;
            case 8:
              this.searchHeight(this.searchContent)
              break;
            case 9:
              this.searchHeight(this.searchContent)
              break;
            case 10:
              this.searchHeight(this.searchContent)
              break;
            default:
              this.notFound();
          }
        }
      },
    }
  }
</script>

<style scoped>
  .search-area {
    margin-top: 52px;
  }

  .input-submit-search:hover {
    cursor: pointer;
  }

  .input-group {
    height: 48px;
    max-width: 620px;
    margin: 60px auto 0;
    background-color: #fff;
  }

  .input-search {
    padding: 0.5rem 1.1rem;
    color: #495057;
    height: 100%;
  }

  .input-search::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #cacaca;
  }

  .input-search:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #cacaca;
  }

  .input-search::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #cacaca;
  }

  .input-search:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #cacaca;
  }

  .search-input-txt {
    font-size: 14px;
    border: 1px solid rgba(255, 255, 255, 1);
  }

  .search-btn {
    padding: 12px 1.1rem;
    line-height: 20px;
    max-width: 150px;
    width: 150px;
    color: #003a8c;
    font-weight: 700;
    font-size: 18px;
  }

  .form-control:focus {
    color: none;
    background-color: none;
    border-color: #ffffff;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .TSE-text {
    color: white;
    font-weight: 100;
    margin-top: 10px;
    max-width: 670px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
  }

  .TSE-text-link {
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline !important;
  }

  .veriy_btn {
    width: 100%;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.5rem 1.1rem;
    font-size: 1.063rem;
    line-height: 1.5;
    border-radius: 0;
    background: #AFACAC;
    /*  background-color: #AFACAC; */
    -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  }

  .upload_btn {
    height: 49px;
    width: 100%;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.5rem 1.1rem;
    font-size: 1.063rem;
    line-height: 1.5;
    border-radius: 0;
    border-color: #003a8c;
    background: #ffffff;
    color: #003a8c;
    /*  background-color: #AFACAC; */
    -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  }

  .upload_btn:hover {
    color: white;
    background: #003a8c;
    border-color: #003a8c !important;
    box-shadow: 0 0 0 0rem rgba(69, 130, 236, 0) !important;
  }

  .upload_btn:focus {
    color: white;
    background: #003a8c;
    border-color: #003a8c !important;
    box-shadow: 0 0 0 0rem rgba(69, 130, 236, 0) !important;
  }

  .upload_btn:active {
    color: white;
    background-color: #003a8c !important;
    border-color: #003a8c !important;
    box-shadow: 0 0 0 0rem rgba(69, 130, 236, 0) !important;
  }
  .search-cut-wrapper{
    width: 1px;
    padding:9px 0;
    background: #fff;
  }
  .search-cut{
    border-left:1px solid #003a8c;
    height: 30px;
  }
</style>
