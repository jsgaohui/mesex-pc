<template>
  <div class="page_uc user-main">
    <div class="crumbs"><span>{{$t('fee.fees')}}</span></div>
    <div class="mod">
      <div class="mod_hd">{{$t('fee.trade')}}</div>
      <div class="mod_bd page_fee">
        <div class="l_th">
          <ul>
            <li>{{$t('fee.symbole')}}</li>
            <li>{{$t('fee.entrust')}}</li>
            <li>{{$t('fee.sellentrust')}}</li>
          </ul>
        </div>
        <div class="table">
          <ul  v-for="item in feeList">
            <li> {{item.symbol}}</li>
            <li> {{item.entrustcharge*100}}%</li>
            <li> {{item.eatcharge*100}}%</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mod">
      <div class="mod_hd">{{$t('fee.tips')}}</div>
      <div class="mod_bd">
        <div class="remind">
          <ul>
            <li>{{$t('fee.tip1')}}</li>
            <li>{{$t('fee.tip2')}}</li>
            <li>{{$t('fee.tip3')}}</li>
            <li>{{$t('fee.tip4')}}</li>
            <li>{{$t('fee.tip5')}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {fees} from "../../api/other";

  export default {
    name: "fees",
    data() {
      return {
        feeList: [],//费率
      }
    },
    created(){
      this.getfees();
    },
    methods:{
      getfees(){
        let $this=this;
        fees().then((response)=>{
          if(response.code===200){
            $this.feeList=response.data.fees;
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/nc.scss";
</style>

