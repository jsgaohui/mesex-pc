<template>
  <div>
    <div class="header">
      <top-header></top-header>
    </div>
    <div class="layout_doc">
      <!--账户安全-->
      <div class="page_assetintro user-main">
        <div class="crumbs"><span>{{$t('common.coinIntro')}}</span></div>
        <div class="cont flex-space-t">
          <div class="mod sider">
            <div class="mod_hd">{{$t('common.coinIntroList')}}</div>
            <div class="mod_bd" id="sider">
              <dl>
                <div class="sider_flow">
                  <dd v-for="(item,index) in symbolList" :class="index===curIndex?'cur':''">
                    <span class="slider_inner" @click="showDetail(item.symbol,index)"> <span class="uppercase">{{item.symbol}}</span> <span>({{item.name}})</span> </span>
                  </dd>
                </div>
              </dl>
              <!----></div>
          </div>
          <div class="mod assetintro_content" id="assetintro">
            <div class="mod_hd"> {{detailInfo.symbol}} ({{detailInfo.name}}) <router-link to="trader" class="mod_but">{{$t('common.goTrade')}}</router-link></div>
            <div class="mod_bd">
              <p v-html="detailInfo.remark"></p>
            </div>
          </div>
        </div>
      </div>
      <!--账户安全 END-->
    </div>
    <indax-footer></indax-footer>
  </div>
</template>

<script>
  import IndaxFooter from "../layout/components/Footer";
  import TopHeader from "../layout/components/TopHeader"
  import {symbolList, symbolDetail} from "../../api/help";
  import {escape2Html} from "../../utils/stringUtil";


  export default {
    name: "intro",
    components: {
      IndaxFooter,
      TopHeader
    },
    data(){
      return{
        symbolList:[],//代币集合
        curIndex:0,
        detailInfo:{
          symbol:'',
          name:'',
          remark:''
        }
      }
    },
    created() {
      this.initList();
    },
    methods: {
      initList() {
        let $this=this;
        symbolList().then((response)=>{
          if(response.code===200){
            var data=response.data.result;
            $this.symbolList=data;
            if(data){
              $this.detailInfo.name=data[0].name;
              $this.detailInfo.symbol=data[0].symbol;
              if(data[0].remark){
                $this.detailInfo.remark=escape2Html(data[0].remark);
              }
            }
          }
        })
      },
      showDetail(symbol,index){
        let $this=this;
        this.curIndex=index;
          symbolDetail(symbol).then((response)=>{
            if(response.code===200){
              $this.detailInfo.name=response.data.digital.name;
              $this.detailInfo.symbol=response.data.digital.symbol;
              if(response.data.digital.remark){
                $this.detailInfo.remark=escape2Html(response.data.digital.remark);
              }else{
                $this.detailInfo.remark='';
              }
            }
          })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/nc.scss";
</style>
