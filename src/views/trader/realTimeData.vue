<template>
    <!--币种实时数据-->
    <div class="mod_hd" :class="parentClass"><span class="mod_show_btn">
          <button @click="toggleShowHide"><i></i></button>
          </span>
        <dl class="ticker_wrap collapse-wrap"  >
          <dt>{{tradeInfo.tradeSymbol}}/{{tradeInfo.basicSymbol}}<span class="ticker_close">{{getSymbolInfo?Number.parseFloat(getSymbolInfo.lastPrice).toFixed($parent.tradePriceDigit):0}}</span>
          </dt>
          <dd><span id="tickerCny_ticker_bar" class="">≈ {{getSymbolInfo?formatAmount(Number.parseFloat(getSymbolInfo.lastPrice*tradeInfo.exchangeRate)):0}} {{tradeInfo.currencyRate}}</span>
          </dd>
          <dd>{{$t('common.rose')}}<span name="rate" :class="getSymbolInfo?getSymbolInfo.rose>=0?tradeInfo.color_buy:tradeInfo.color_sell:tradeInfo.color_buy">{{getSymbolInfo?getSymbolInfo.rose>0?'+'+getSymbolInfo.rose:getSymbolInfo.rose:0}}%</span>
          </dd>
          <dd>{{$t('common.high')}} <span name="high">{{getSymbolInfo?Number.parseFloat(getSymbolInfo.highestPrice).toFixed($parent.tradePriceDigit):0}}</span>
          </dd>
          <dd>{{$t('common.low')}} <span name="low">{{getSymbolInfo?Number.parseFloat(getSymbolInfo.lowestPrice).toFixed($parent.tradePriceDigit):0}}</span>
          </dd>
          <dd>{{$t('common.tradeVolume')}} <span name="amount">{{getSymbolInfo?Number.parseFloat(getSymbolInfo.totolVolume).toFixed(tradeInfo.maxShowUnit):0}} {{tradeInfo.tradeSymbol}}</span>
          </dd>
          <dd class="ticker_logo"><img src="@/assets/images/logo.png"></dd>
        </dl>
    </div>
    <!--币种实时数据-->
</template>
<script>
  import {mapGetters} from "vuex";
  import CollapseTransition from "../../components/animate-contract";
  export default {
    components:{CollapseTransition},
    computed: {
      ...mapGetters(['tradeInfo']),
      getSymbolInfo(){
        var symbolInfo=this.tradeInfo.quetaObj[this.$parent.getCurrentSymbol()];
        if(symbolInfo){
          return symbolInfo;
        }
        return false;
      },
      parentClass(){
        return this.isActive?"":"hide";
      }
    },
    name: "realTimeData",
    data(){
      return{
        isActive:true
      }

    },
    methods:{
      toggleShowHide(){
        this.isActive=!this.isActive;
        this.$parent.toggleChart();
      }
    }

  }
</script>
