<template>
  <div class="footer-background">

    <div class="e-container footer-container mobile-container">

      <div class="footer-content-info">
        <div class="footer-content">
          <div class="mobile-foot-line-developer"></div>
          <div class="footer-content-title">{{ $t('footer.Development') }}</div>
          <div class="footer-content-div"><a class="footer-content-text" href="https://github.com/OnyxPay">{{ $t('footer.Github') }}</a></div>
        </div>

        <div class="footer-content">
          <div class="mobile-foot-line"></div>
          <div class="footer-content-title">{{ $t('footer.About') }}</div>
          <div class="footer-content-div"><a class="footer-content-text" href="https://www.onyxcoin.io/index2.php">{{ $t('footer.AboutOntology') }}</a></div>
          <div class="footer-content-div"><a class="footer-content-text" href="https://wallet.onyxpay.co/">{{ $t('footer.Wallet') }}</a></div>
          <div class="footer-content-div"><a class="footer-content-text" href="https://www.onyxcoin.io/files/docs/WP.pdf">{{ $t('footer.WhitePaper') }}</a></div>
        </div>

        <div class="footer-content">
          <div class="mobile-foot-line"></div>
          <div class="footer-content-title">{{ $t('footer.dApps') }}</div>
          <div class="footer-content-div"><a class="footer-content-text" href="mailto:onyxchain@example.com">{{ $t('footer.SubmitAdApp') }}</a></div>
          <div class="footer-content-div"><a class="footer-content-text" href="https://onyxpay.co/">{{ $t('footer.OnyxPay') }}</a></div>
        </div>
      </div>

      <div class="footer-line"></div>

      <div class="footer-link">
        <div style="display: inline-block">
          <a href="#"><img class="footer-link-telegram footer-link-img" src="../../assets/footer/telegram@2x.png"></a>
          <a href="#"><img class="footer-link-twitter footer-link-img" src="../../assets/footer/twitter@2x.png"></a>
          <a href="#"><img class="footer-link-facebook footer-link-img" src="../../assets/footer/facebook@2x.png"></a>
          <a href="mailto:onyxchain@example.com"><img class="footer-link-email footer-link-img" src="../../assets/footer/email@2x.png"></a>
          <a href="https://github.com/OnyxPay/OnyxChain"><img class="footer-link-github footer-link-img" src="../../assets/footer/github@2x.png"></a>
        </div>
      </div>
      <div class="footer-copyright">Copyright © 2019 The Onyxchain Team</div>


    </div>

  </div>
</template>

<script>
  import LangStorage from './../../helpers/lang'
export default {
  name: 'HelloWorld',
  props: {

  },
  methods:{
    changeLanguage($lang){
      this.$i18n.locale = $lang
      LangStorage.setLang(this.$i18n.locale)
    },
    toTechNews(){
      let lang = LangStorage.getLang('en')
      let url
      switch (lang) {
        case 'en':
          url = 'https://medium.com/ontologynetwork/tagged/tech'
          break
        case 'zh':
          url = 'https://medium.com/ontologynetwork/tagged/tech'
          break
        case 'jp':
          url = 'https://medium.com/ontologynetwork/tagged/tech'
          break
        case 'ko':
          url = 'https://medium.com/ontologynetwork/tagged/tech'
          break
        default:
          url = 'https://medium.com/ontologynetwork/tagged/tech'
          break;
      }
      window.location.href = url
    },
  }
}
</script>

<style scoped>
  .footer-copyright{
    margin-top: 20px;
  }
  .footer-background{
    background:#fff;
    padding-top: 40px;
    margin-top:64px;
  }

  .footer-width{
    width: 944px;
  }
  .footer-logo-title{
    margin-bottom: 25px;
  }
  .footer-logo-img{
    height: 18px;
  }
  .footer-logo-text{
    font-size:18px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight:400;
    color:#595757;
    line-height:23px;
  }
  .footer-logo-label{
    opacity:0.2;
    color: black;
    margin-left: 16px;
    margin-right: 16px;
  }

  .footer-content{
/*     width: 224px; */
    width: 24%;
    display: inline-block;
    vertical-align: top;
  }
  .footer-content-title{
    font-size:16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight:600;
    color:#595757;
    line-height:20px;
  }
  .footer-content-div{
    margin-top: 14px;
  }
  .footer-content-text{
    font-size:14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight:400;
    color:#AFACAC !important;
    line-height:18px;
    cursor: pointer;
  }
  .footer-content-text-active{
    font-size:14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight:400;
    color:#595757 !important;
    line-height:18px;
    cursor: pointer;
  }
  .footer-content-text:hover{
    color: var(--main-color);
    text-decoration:underline !important;
  }
  .footer-content-text:active{
    color: var(--main-color) !important;;
    text-decoration:underline !important;
  }
  .footer-line{
    height:1px;
    border:1px solid #AFACAC;
    margin-top: 25px;
  }
  .footer-link{
    text-align: center;
    margin-bottom: 24px;
  }
  .footer-link-telegram{
    width: 32px;
    cursor: pointer;
  }
  .footer-link-discord{
    width: 27px;
  }
  .footer-link-twitter{
    width: 32px;
  }
  .footer-link-facebook{
    width: 26px;
  }
  .footer-link-reddit{
    width: 32px;
  }
  .footer-link-medium{
    width: 26px;
  }
  .footer-link-email{
    width: 30px;
  }
  .footer-link-github{
    width: 32px;
  }
  .footer-link-linkedin{
    width: 26px;
  }
  .footer-link-img{
    opacity: 0.4;
    cursor: pointer;
    margin-top: 23px;
    margin-left:22px;
    margin-right: 22px;
  }
  .footer-link-img:hover,
  .footer-link-img:active{
    opacity: 1;
  }
  .footer-copyright{
    font-size:14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight:400;
    color:rgba(170,179,180,1);
    line-height:18px;
    text-align: center;
    padding-bottom: 40px;
  }
  /*手机*/
  @media screen and (max-width:576px) {
    .footer-content{
      display: unset;
    }
    .mobile-foot-line-developer{
      height: 1px;
      opacity: 0.2;
      border: 1px solid #ffffff;
      margin-top: -17px;
      margin-bottom: 8px;
    }
    .mobile-foot-line {
      height: 1px;
      opacity: 0.2;
      border: 1px solid #ffffff;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    .mobile-container{
      padding-left: 24px;
      padding-right: 24px;
    }
    .footer-background{
      background:#ffffff;
      padding-top: 22px
    }
    .footer-link-img{
      opacity: 0.4;
      cursor: pointer;
      margin-top: 23px;
      margin-left:37px;
      margin-right: 37px;
    }
  }
  @media screen and (min-width:576px) and (max-width:768px) {
    .footer-content{
      width: 110px;
    }

  }
  @media screen and (min-width:769px) and (max-width:992px)  {
    .footer-content{
      width: 160px;
    }
  }
.wailian-img{
  width: 11px;
  margin-left: 2px;
  margin-bottom:2px;
  opacity: 0.5;
}
</style>
