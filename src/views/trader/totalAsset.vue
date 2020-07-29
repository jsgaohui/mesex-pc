<template>
    <!--总资产-->
    <div class="desktop" v-if="token">
      <dl>
        <dt>{{$t('trade.totalAsset')}}:</dt>
        <dd><b class="font_arial">{{totalAssets.toFixed(tradeInfo.maxShowUnit)}}</b><i class="upper">{{tradeInfo.sellteMarket}}</i><span
          class="font_arial"
          style="opacity:.5"> ≈ {{(formatAmount(totalAssets*tradeInfo.initRate))}} {{tradeInfo.currencyRate}}</span>
        </dd>
      </dl>
      <i class="eyes hb_icon_visible" action="changeEyes" id="total_eyes"></i>
    </div>
    <!--净资产折合END-->
    <div class="desktop not_login" v-else>
      <router-link to="login" class="logout">{{$t('login.logIn')}}</router-link>
      {{$t('common.or')}}
      <router-link to="register" class="logout">{{$t('register.reg')}}</router-link>
      {{$t('trade.startTrade')}}
    </div>
    <!--总资产END-->
</template>
<script>
  import {mapGetters} from "vuex";
  import {calBalance,symbolBalance} from "../../api/account";

  export default {
    computed: {
      ...mapGetters(['tradeInfo', 'token'])

    },
    name: "totalAsset",

    created(){
      if (this.token) {
        if(this.interval===0){
         let $this = this;
         // window.setTimeout( function(){
           $this.interval=window.setInterval(()=>{ $this.refreshAssert(false)}, 10000)
         // },10000);
        }
      }
    },
    data(){
      return{
        totalAssets: 0,//总资产
        interval:0,//定时器id
      }
    },
    methods:{
      //清除定时器
      clearInterval () {
        clearInterval(this.interval);
      },
      //初始化总资产
      initAssets(availableList){
        var cachePrices =this.tradeInfo.lastPrices;
        if (availableList) { //计算净资产
          this.totalAssets = 0;
          //获取所有资产货币,和货币对应的最新价格相乘得到换算后的总GOLD数量
          for (let i = 0; i < availableList.length; i++) {
            var account = availableList[i];
            var itemKey = account.dcCode;
            if (cachePrices) {
              var curPrice = cachePrices[itemKey + "/" + this.tradeInfo.sellteMarket]
              var lastPrice=0;
              if(!curPrice){
                curPrice=cachePrices[this.tradeInfo.sellteMarket + "/" + account.dcCode];
                if(curPrice){
                  lastPrice=1/curPrice.lastPrice;
                }
              }else{
                lastPrice=curPrice.lastPrice;
              }
              if (lastPrice!==0) {
                this.totalAssets += account.totolAmount * lastPrice;
              }
            }
            if(itemKey===this.tradeInfo.sellteMarket){
              this.totalAssets += account.totolAmount;
            }
          }

        }
      },
      refreshAssert(ifFromTrade) { //获取余额计算
        if(!this.token) {
          clearInterval(this.interval);
        }

        let $this = this;
        calBalance().then((response) => {
          if (response.code === 200) {
            var data = response.data;
            $this.tradeInfo.lastPrices = data.lastPrices;
            var availableList = data.availableList;
            $this.initAssets(availableList);
            //更新可用资产
            $this.$parent.updateAvailableAssert(availableList,ifFromTrade);
          }
        })

      },

    }
  }
</script>
