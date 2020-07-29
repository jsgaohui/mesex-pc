<template>
  <div class="layout_foot doc_foot">
    <div class="doc_foot_wrap">
      <dl class="first-dl">
        <dt>
          <h1><img src="@/assets/logo-foot.png" ></h1>
        </dt>
      </dl>
      <div style="width:40%; display: flex;justify-content: flex-start">
      <dl>
        <dt>
          <h2>{{$t('common.serviceSupport')}}</h2>
        </dt>
        <!--<dd><a href="#" target="_blank">{{$t('common.api')}}</a></dd>-->
        <dd><router-link to="help">{{$t('common.help')}}</router-link></dd>
        <dd><router-link to="intro">{{$t('common.coinIntro')}}</router-link></dd>
        <dd><router-link to="contactus">{{$t('common.contactus')}}</router-link></dd>
        <!--<dd><a href="#" target="_blank">交易申请及说明</a></dd>-->
      </dl>
      <dl>
        <dt>
          <h2>{{$t('common.about')}}</h2>
        </dt>
        <dd><router-link to="fees">{{$t('common.rate')}}</router-link></dd>
        <dd><router-link to="notice">{{$t('common.notice')}}</router-link></dd>
        <!--<dd><a href="#" target="_blank">{{$t('common.aboutus')}}</a></dd>
        <dd><a href="#" target="_blank">{{$t('common.contactus')}}</a></dd>-->
      </dl>
      <dl>
        <dt>
          <h2>{{$t('common.law')}}</h2>
        </dt>
        <dd><router-link to="legal">{{$t('common.userProtocol')}}</router-link></dd>
        <dd><router-link to="privacy">{{$t('common.privacyClause')}}</router-link></dd>
        <!--<dd><a href="#" target="_blank">{{$t('common.legalDeclaration')}}</a></dd>-->
      </dl>
      <dl>
        <dt>
          <h2>{{$t('common.contactus')}}</h2>
        </dt>
        <dd class="email"><a href="mailto:">{{$t('common.connectEmail')}}</a></dd>
        <!--<dd class="icons">-->
          <!--<div class="icons_line"><a href="#" target="_blank"><i class="hb_icon_weibo"></i> </a><a href="javascript:void(0);" class="has_qr"><i class="hb_icon_wechat"></i>-->
            <!--<div class="qr_wechat"></div>-->
          <!--</a><a href="#" target="_blank"><i class="hb_icon_twitter"></i> </a><a href="#" target="_blank"><i class="hb_icon_telegram"></i></a></div>-->
          <!--<div><a href="#" target="_blank"><i class="hb_icon_youtube"></i> </a><a href="#" target="_blank"><i class="hb_icon_medium"></i></a></div>-->
        <!--</dd>-->
      </dl>
      </div>
    </div>
    <div class="media-con">
      <div class="media-list">
        <h2>MASEx in the Media</h2>
        <div>
          <a href="https://www.nbc-2.com/story/41915864/how-artificial-intelligence-stos-decentralization-and-financial-inclusion-will-drive-the-future-of-investment" target="_blank"><img src="static/images/nbc2.webp"><p>NBC2 News</p></a>
                    <a href="https://www.forbes.com/sites/ryanrobinson/2019/10/17/4-changes-your-business-needs-to-make-today-to-become-better-at-solving-problems/#6e802541611f" target="_blank"><img src="@/assets/images/m06.jpg"><p>Forbes</p></a>
          <a href="http://www.forbeschina.com/business/44730?from=timeline" target="_blank"><img src="@/assets/images/m07.png"><p>Forbes 福布斯</p></a>
          <a href="http://www.forbeschina.com/technology/43539" target="_blank"><img src="@/assets/images/m01.jpg"><p>Forbes China <br>Forbes 福布斯</p></a>
          <a href="https://www.wsj.com/articles/SB941153073516934612" target="_blank"><img src="@/assets/images/m02.jpg"><p>Wall Street Journal <br>华尔街日报</p></a>
          <a href="https://m.investing.com/analysis/decentralization-do-we-need-regulated-frameworks-for-blockchain-securities-200446408?from=timeline&isappinstalled=0" target="_blank"><img src="@/assets/images/m05.jpg"><p>Investing.com</p></a>
          <!--          <a href="https://economy.china.com/cydt/fin/ztch/201809/10/580545.html" target="_blank"><img src="@/assets/images/m04.jpg"><p>China.com <br>中华网投资 </p></a>-->
        </div>
        <h2>STO Advisors</h2>
        <div>
          <a href="#"><img src="@/assets/images/digimasx.jpg"><p>Digimax</p></a>
          <router-link to="wes"><img width="80" height="46" src="@/assets/images/wset.jpg"><p>WES CONSULTING</p></router-link>
          <a href="http://www.mascapital.com" target="_blank"><img src="@/assets/images/m03.jpg"><p>MAS Capital</p></a>
          <a href="http://www.mascapital.cn" target="_blank"><img src="@/assets/images/mas.jpg"><p>MAS Capital Group</p></a>
        </div>
      </div>
      <!--      <div class="media-list">-->
      <!--        -->
      <!--      </div>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: "indaxFooter"
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .media-con{
    background: #363e77;
    /*border-top:1px solid #eee;*/
    color:#fff;
    height:340px;
    padding: 0 190px;
    display:grid;
    justify-content:start;
    grid-template-columns: 80% 20%;
    grid-template-rows: repeat(2,170px);

  }
  .media-con h2{
    font-size:14px;
margin:20px 0;

  }
  .media-con .media-list{

  }
  .media-con .media-list div{
    display:grid;
    justify-content:start;
    grid-template-columns: repeat(6,150px);
    grid-template-rows: repeat(1,100px);
  }


  .media-con a{
    text-align:center;
    width:120px;
  }
  .media-con a img{

    width:80px;
  }

  .media-con a{
    color:#fff;

    font-size:12px;
  }
  .doc_foot_wrap dl:last-of-type{
    margin-right:0px;
  }
  @media only screen and (min-width: 1921px) and (max-width: 2561px) {
    .media-con {
      padding:0 300px!important;
    }
  }
  @media only screen and (min-width: 800px) and (max-width: 1441px) {
    .media-con {
      padding:0 80px;
    }
  }
</style>
