<template>
  <div class="page_assetintro user-main">
    <div class="crumbs"><span>Past Events</span></div>
    <div class="mod">

      <div class="cont">
        <div class="l_content">
          <h3>2019</h3>
          <ul class="flex-x-start">
            <ol>Deember 23</ol>
            <li>i5 Global Fintech Summit - Seoul</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto12 = true" class="photo-btn" style="background:none;color:#64acf5">Seoul Conference Photos</el-button>
            </li>
            <el-dialog title="Seoul Conference Photos" :visible.sync="showPhoto12">
              <el-carousel :interval="3000" arrow="always" >
                <el-carousel-item v-for="(item) in 11" :key="item" >
                  <img v-lazy="'static/images/Seoul/2.'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>November 23-25</ol>
            <li>10th Global Family Office Investment Sumit</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto11 = true" class="photo-btn" style="background:none;color:#64acf5">Dubai Conference Photos</el-button>
            </li>
            <el-dialog title="Dubai Conference Photos" :visible.sync="showPhoto11">
              <el-carousel :interval="3000" arrow="always" >
                <el-carousel-item v-for="(item) in 8" :key="item" >
                  <img v-lazy="'static/images/Dubai3/1.'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>October 21-22</ol>
            <li><a href="http://www.worldblockchainstosummit.com/" target="_blank">World Blockchain STO Summit – Dubai</a></li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto10 = true" class="photo-btn" style="background:none;color:#64acf5">Dubai Conference Photos</el-button>
            </li>
            <el-dialog title="Dubai Conference Photos" :visible.sync="showPhoto10">
              <el-carousel :interval="3000" arrow="always" >
                <el-carousel-item v-for="(item) in 5" :key="item" >
                  <img v-lazy="'static/images/Dubai2/D'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>August 10</ol>
            <li><a target="_blank" href="https://tokyoblockchainpowerhouse.com">Tokyo Blockchain Powerhouse – Tokyo</a></li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a target="_blank" href="https://youtu.be/22vCLuzWORg">Aaron Tsai, First Keynote Speech </a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto1 = true" class="photo-btn" style="background:none;color:#64acf5">Tokyo Conference Photos</el-button>
            </li>
            <el-dialog title="Tokyo Conference Photos" :visible.sync="showPhoto1">
              <el-carousel :interval="3000" arrow="always" >
                <el-carousel-item v-for="(item) in 9" :key="item" >
                  <img v-lazy="'static/images/Tokyo/T'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>July 31</ol>
            <li><a target="_blank" href="http://mu.worldblockchainstosummit.com">World BlockChain STO Summit - Mauritius</a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>Mauritius Newspaper Article</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto2 = true" class="photo-btn" style="background:none;color:#64acf5">Mauritius Conference Photos</el-button>
            </li>
            <el-dialog title="Mauritius Conference Photos" :visible.sync="showPhoto2">
              <el-carousel :interval="3000" arrow="always">
                <el-carousel-item v-for="(item) in 4" :key="item" >
                  <img v-lazy="'static/images/Maritius/M'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>June 25-26</ol>
            <li><a target="_blank" href="https://kryptonevents.com/bangkok">Next Block Asia "Beyong Crypto" - Bangkok</a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto3 = true" class="photo-btn" style="background:none;color:#64acf5">Bangkok Conference Photos</el-button>
            </li>
            <el-dialog title="Bangkok Conference Photos" :visible.sync="showPhoto3">
              <el-carousel :interval="3000" arrow="always"  >
                <el-carousel-item v-for="(item) in 6" :key="item" >
                  <img v-lazy="'static/images/Bangkok/B'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>June 18-19</ol>
            <li><a target="_blank" href="https://securitytokensrealised.com">Security Tokens Realised - Hong Kong</a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a target="_blank" href="https://www.youtube.com/watch?v=ysfQ6Oe6AT0">Aaron Tsai Interview Video</a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto4 = true" class="photo-btn" style="background:none;color:#64acf5">Hong Kong Conference Photos</el-button>
            </li>
            <el-dialog title="Hong Kong Conference Photos" :visible.sync="showPhoto4">
              <el-carousel :interval="3000" arrow="always"  >
                <el-carousel-item v-for="(item) in 6" :key="item" >
                  <img v-lazy="'static/images/Hong Kong/H'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>April 29-30</ol>
            <li><a target="_blank" href="https://worldblockchainstosummit.com">World BlockChain STO Summit - Dubai</a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto5 = true" class="photo-btn" style="background:none;color:#64acf5">Dubai Conference Photos</el-button>
            </li>
            <el-dialog title="Dubai Conference Photos" :visible.sync="showPhoto5">
              <el-carousel :interval="3000" arrow="always" >
                <el-carousel-item v-for="(item) in 6" :key="item" >
                  <img v-lazy="'static/images/Dubai/D'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>April 9-10</ol>
            <li>Crypto Invest Summit – Los Angeles</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto6 = true" class="photo-btn" style="background:none;color:#64acf5">CIS Conference Photos</el-button>
            </li>
            <el-dialog title="CIS Conference Photos" :visible.sync="showPhoto6">
              <el-carousel :interval="3000" arrow="always" >
                <el-carousel-item v-for="(item) in 6" :key="item" >
                  <img v-lazy="'static/images/CIS/L'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>April 8</ol>
            <li>Security Token Summit</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a target="_blank"
              href="https://www.youtube.com/watch?v=wzx3cTxyKLY&t=31s">Age of Tokenization - Decentralization vs. Regulation Video</a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto7 = true" class="photo-btn" style="background:none;color:#64acf5">STS Photos</el-button>
            </li>
            <el-dialog title="STS Photos" :visible.sync="showPhoto7">
              <el-carousel :interval="3000" arrow="always" >
                <el-carousel-item v-for="(item) in 3" :key="item" >
                  <img v-lazy="'static/images/STS/S'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <ul class="flex-x-start">
            <ol>February 15</ol>
            <li>
              <el-button type="text" @click="showPhoto8 = true" class="photo-btn" style="background:none;color:#64acf5">Road to IPO – Kuala Lumpur Photo</el-button>
            </li>
            <el-dialog title="Road to IPO – Kuala Lumpur Photo" :visible.sync="showPhoto8">
              <el-carousel :interval="3000" arrow="always">
                <el-carousel-item v-for="(item) in 6" :key="item">
                  <img v-lazy="'static/images/Kuala Lumpur/K'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
          <br>
          <h3>2018</h3>
          <ul class="flex-x-start">
          <ol>December 16</ol>
          <li>The 15th China International Financial Forum - Shanghai</li>
        </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a target="_blank"
                   href="https://finance.sina.com.cn/hy/hyjz/2018-12-16/doc-ihmutuec9781554.shtml">Aaron Tsai speech</a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol>May 21-22 </ol>
            <li> Finwise Summit Tokyo</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a target="_blank"
                   href="static/images/pdf/TokyoSpeech.pdf">Aaron Tsai Keynote PPT - The Prospect of Blockchain Financial Applications</a>
            </li>
          </ul>
          <br>
          <h3>2017</h3>
          <ul class="flex-x-start">
            <ol>December 16</ol>
            <li>The 14th China International Financial Forum - Shanghai</li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li><a target="_blank"
                   href="https://finance.sina.com.cn/meeting/2017-12-16/doc-ifypsqka3724297.shtml">Aaron Tsai speech </a>
            </li>
          </ul>
          <br>
          <h3>2013</h3>
          <ul class="flex-x-start">
            <ol>September 7</ol>
            <li><a target="_blank" href="http://www.xmhouse.com/union/2013/ljs">CIFIT The 11th Capital Forum – Xiamen</a>
            </li>
          </ul>
          <ul class="flex-x-start">
            <ol></ol>
            <li>
              <el-button type="text" @click="showPhoto9 = true" class="photo-btn" style="background:none;color:#64acf5">CIFIT Photos</el-button>
            </li>
            <el-dialog title="CIFIT Photos" :visible.sync="showPhoto9">
              <el-carousel :interval="3000" arrow="always">
                <el-carousel-item v-for="(item) in 9" :key="item">
                  <img v-lazy="'static/images/CIFIT/'+item+'.jpg'">
                </el-carousel-item>
              </el-carousel>
            </el-dialog>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueLazyload from 'vue-lazyload'

    Vue.use(VueLazyload,{
      preLoad: 1.3,
      loading: 'static/images/loading.gif',
      attempt: 1
    })
  export default {
    name: "Past-Events",
    data() {
      return {
        showPhoto1: false,
        showPhoto2: false,
        showPhoto3: false,
        showPhoto4: false,
        showPhoto5: false,
        showPhoto6: false,
        showPhoto7: false,
        showPhoto8: false,
        showPhoto9: false,
        showPhoto10: false,
        showPhoto11:false,
        showPhoto12:false
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
    margin: 10px 0;
  }

  ul.flex-x-start ol {
    font-weight: bold;
    width: 150px;
    flex-shrink: 0;
  }

  a {
    color: #a12643;
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~幻灯片~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  .el-carousel {
    background: #fff;
    overflow:hidden;
    height:598px;
  }
  .el-carousel__container {
    position:relative;
    height:598px
  }
  .el-carousel__arrow {
    border:none;
    outline:0;
    padding:0;
    margin:0;
    height:36px;
    width:36px;
    cursor:pointer;
    -webkit-transition:.3s;
    transition:.3s;
    border-radius:50%;
    background-color:rgba(31, 45, 61, .6);
    color:#fff;
    position:absolute;
    top:50%;
    z-index:10;
    -webkit-transform:translateY(-50%);
    transform:translateY(-50%);
    text-align:center;
    font-size:12px
  }
  .el-carousel__arrow--left {
    left:16px
  }
  .el-carousel__arrow--right {
    right:16px
  }
  .el-carousel__arrow:hover {
    background-color:rgba(31, 45, 61, .9)
  }
  .el-carousel__arrow i {
    cursor:pointer
  }
  .el-carousel__indicators {
    position:absolute;
    list-style:none;
    bottom:10px;
    left:50%;
    -webkit-transform:translateX(-50%);
    transform:translateX(-50%);
    margin:0;
    padding:0;
    z-index:2
  }
  .el-carousel__indicators--outside {
    bottom:26px;
    text-align:center;
    position:static;
    -webkit-transform:none;
    transform:none
  }
  .el-carousel__indicators--outside .el-carousel__indicator:hover button {
    opacity:.64
  }
  .el-carousel__indicators--outside button {
    background-color:#c0c4cc;
    opacity:.24
  }
  .el-carousel__indicators--labels {
    left:0;
    right:0;
    -webkit-transform:none;
    transform:none;
    text-align:center
  }
  .el-carousel__indicators--labels .el-carousel__button {
    height:auto;
    width:auto;
    padding:2px 18px;
    font-size:12px
  }
  .el-carousel__indicators--labels .el-carousel__indicator {
    padding:6px 4px
  }
  .el-carousel__indicator {
    display:inline-block;
    background-color:transparent;
    padding:12px 4px;
    cursor:pointer
  }
  .el-carousel__indicator:hover button {
    opacity:.72
  }
  .el-carousel__indicator.is-active button {
    opacity:1
  }
  .el-carousel__button {
    display:block;
    opacity:.48;
    width:8px;
    height:8px;
    background:#313862;
    border:none;
    border-radius:4px;
    outline:0;
    padding:0;
    margin:0;
    cursor:pointer;
    -webkit-transition:.3s;
    transition:.3s
  }
  .carousel-arrow-left-enter, .carousel-arrow-left-leave-active {
    -webkit-transform:translateY(-50%) translateX(-10px);
    transform:translateY(-50%) translateX(-10px);
    opacity:0
  }
  .carousel-arrow-right-enter, .carousel-arrow-right-leave-active {
    -webkit-transform:translateY(-50%) translateX(10px);
    transform:translateY(-50%) translateX(10px);
    opacity:0
  }

  .el-carousel__item {
    top:0;
    left:0;
    position:absolute;
    width:100%;
    overflow:hidden;
    z-index:0;
    display:flex;
    justify-content:center;
    align-items:center;
    float:left;
  }
  .el-carousel__item.is-active {
    z-index:2
  }
  .el-carousel__item.is-animating {
    -webkit-transition:-webkit-transform .4s ease-in-out;
    transition:-webkit-transform .4s ease-in-out;
    transition:transform .4s ease-in-out;
    transition:transform .4s ease-in-out, -webkit-transform .4s ease-in-out
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #fff;
  }

  .el-carousel__item img,.mapimg img{
    clear: both;
    display: block;
    margin:auto;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
.photo-btn{
  font-size:14px;
  padding:0px;
  height:32px;
  line-height:32px;
  background:none;
  color:#64acf5
}
  .photo-btn:hover,.photo-btn:active{
    background:none;
    color:#64acf5
  }

</style>

