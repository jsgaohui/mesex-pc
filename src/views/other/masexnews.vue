<template>
  <div class="page_assetintro user-main">
    <!--    <div class="crumbs"><span>What is MASEx</span></div>-->
    <div class="mod">

      <div class="cont">
        <div class="l_content">
          <h3>2020</h3>
          <ul class="flex-x-start">
            <ol>March</ol>
            <li>How artificial intelligence, STOs, decentralization, and financial inclusion will drive the future of investment</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a href="https://www.nbc-2.com/story/41915864/how-artificial-intelligence-stos-decentralization-and-financial-inclusion-will-drive-the-future-of-investment">https://www.nbc-2.com/story/41915864/how-artificial-intelligence-stos-decentralization-and-financial-inclusion-will-drive-the-future-of-investment</a></li>
          </ul>
          <ul class="flex-x-start">
            <ol>February 25</ol>
            <li><a href="static/TTChain.pdf">{{$t('common.provides')}}</a></li>
          </ul>
          <ul class="flex-x-start">
            <ol>January</ol>
            <li>{{$t('common.ready')}}</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>{{$t('common.ready1')}}</li>
          </ul>
          <ul v-if="locale==='zh'" class="flex-x-start">
            <ol></ol>
            <li >這個世界准备好了吗？</li>
          </ul>
          <ul v-if="locale==='zh'" class="flex-x-start">
            <ol></ol>
            <li>AI驱动、多类型资产、环球STO交易所</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>(PDF Pages 28-29; Print Magazine Pages 54-57)</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a href="http://corporateinvestmenttimes.com/CIT18/Corporate-Investment-Times-January-2020.pdf">http://corporateinvestmenttimes.com/CIT18/Corporate-Investment-Times-January-2020.pdf</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: "masexnews",
    data() {
      var type = navigator.appName;
      var lang;
      if (type == "Netscape"){
        lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
      }else{
        lang = navigator.browserLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
      };
      lang = lang.substr(0, 2);//获取浏览器配置语言前两位
      return{
        locale:Cookies.get("language")||lang
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/nc.scss";

  .l_content h3 {
    font-size: 20px;
    font-weight: normal
  }

  ul.flex-x-start {
    /*margin: 2px 0;*/
  }

  ul.flex-x-start ol {
    font-weight: bold;
    width: 150px;
    flex-shrink: 0;
  }
</style>
