<template>
  <div :style="getUrlImage('token.jpg','bottom center no-repeat #000',{'background-size':'cover'})">
    <div class="index_top">
      <div class="header">
        <top-header></top-header>
      </div>
    </div>
    <!--行情-->
    <div class="flex-center">
      <!--<video src="static/westo.mp4" controls="controls" id="westo" v-show="showVedio">-->
      <!--</video>-->
      <!--<img src="static/images/t-logo.jpg" v-show="!showVedio"><br>-->

      <h1>{{$t('index.world')}}</h1>
      <br><div style="background: #fff;border-radius: 10px"><img src="@/assets/logo02.png" width="240"></div>
      <br>
      <h1>{{$t('index.global')}}</h1>
    </div>
    <div class="media-con">
      <div class="media-list">
        <h2>MASEx in the Media</h2>
        <div>
          <a href="https://www.nbc-2.com/story/42075869/how-artificial-intelligence-stos-decentralization-and-financial-inclusion-will-drive-the-future-of-investment" target="_blank"><img src="static/images/nbc2.webp"><p>NBC2 News</p></a>
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
  import TopHeader from "../layout/components/TopHeader"
  // import IndaxFooter from "../layout/components/Footer";

  export default {
    name: "index",
    components: {
      // IndaxFooter,
      TopHeader,
    },
    data() {
      return {
        showVedio: false,
        westo:null
      }
    },
    methods: {
      getUrlImage(imageName, styleParams, joinstyle) {
        if (styleParams) {
          if (joinstyle) {
            joinstyle.background = 'url(' + require('@/assets/images/' + imageName + '') + ') ' + styleParams;
            return joinstyle;
          } else {
            return {background: 'url(' + require('@/assets/images/' + imageName + '') + ') ' + styleParams}
          }
        }
        return {background: 'url(' + require('@/assets/images/' + imageName + '') + ') no-repeat center '}
      }
    },
    mounted() {
      // this.westo = document.querySelector("#westo")
      // let $this = this
      // window.setTimeout(function () {
      //   $this.showVedio = true
      //   $this.westo.play()
      // },3000)
      // this.westo.addEventListener("ended", function () {
      //   $this.showVedio = !$this.showVedio
      // }, false)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  /*@import "src/styles/nc.scss";*/

  body {
    /*background:url(static/images/token.jpg) center no-repeat #000;*/
    font-size: 14px;
    color: #fff;
    background-size: 100% 100%;
    background-attachment: fixed;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
  }

  ul li {
    float: left;
    list-style: none;
    margin-left: 30px;
    height: 60px;
    line-height: 60px;
  }

  header {
    height: 60px;
    line-height: 60px;

    padding: 0px 20px;
    margin: 0 auto;


  }

  a {
    color: #fff;
    text-decoration: none
  }

  a:hover {
    color: #fff;
  }

  .flex-center h1 {
    color: #fff;
    font-size: 30px;
    font-weight: normal;
    text-align: center;
    margin-top:80px;
  }

  .flex-center h1:first-of-type {
    margin-bottom: 80px;
    font-size: 40px;
    margin-top:0;
  }

  .flex-center {
    height: 100%;
    height: calc(100vh - 55px - 140px);

  }

  .flex-center img {
    /*margin-bottom: 30px;*/
  }

  .logo {
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    height: 30px;
    padding: 5px;
  }

  .logo img {
    width: 50px;
  }
  @media only screen and (min-height: 768px) and (max-height: 1119px) {
    .flex-center {
      height: 100%;
      height: calc(100vh - 55px);

    }
  }
  @media only screen and (min-width: 1280px) and (max-width: 1440px) {
    .flex-center {
      height: 100%;
      height: calc(100vh - 55px);

    }
    .flex-center h1 {
      color: #fff;
      font-size: 30px;
      font-weight: normal;
      text-align: center;
      margin-top:30px;
    }

    .flex-center h1:first-of-type {
      margin-bottom: 30px;
      font-size: 40px;
      margin-top:0;
    }
  }

  @media only screen and (min-width: 300px) and (max-width: 500px) {
    body {


      background-size: initial;
      background-attachment: initial;
    }

    ul li {
      float: left;
      list-style: none;
      margin-left: 10px;
      height: 60px;
      line-height: 60px;
    }
    header {
      height: 60px;
      line-height: 60px;
      padding: 0px 10px;
      margin: 0 auto
    }

    h1 {
      color: #fff;
      font-size: 20px;
    }
    h1:first-of-type {
      margin-bottom: 10px;
      font-size: 30px;
    }
    .logo {

      height: 20px;
      padding: 5px;
    }
    .logo img {
      width: 40px;
    }
    .flex-center {
      flex-direction: column

    }
    .flex-center img {
      width: 240px;
      margin-right: 0px;
      margin-bottom: 30px;
    }
  }
  .el-carousel {
    background: #313862;
    overflow:hidden;
    height:598px;
  }
  .el-carousel__button {
    background: #fff;
  }

</style>
