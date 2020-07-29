<template>
  <!--最新价-->
  <div class="order_book table-container">
    <div class="head">
      <p class="title">{{$t('common.lastPrice')}} <span>{{quetaObj[tradeSymbol+"/"+basicSymbol]?quetaObj[tradeSymbol+"/"+basicSymbol].lastPrice.toFixed($parent.tradePriceDigit):0}}</span>
        <em class="uppercase">{{basicSymbol}}</em> <span class="ticker-transform">≈ {{(quetaObj[tradeSymbol+"/"+basicSymbol]?formatAmount(Number.parseFloat(quetaObj[tradeSymbol+"/"+basicSymbol].lastPrice*exchangeRate)):0)}} {{currencyRate}}</span>
      </p>
    </div>
    <div class="ex-depth">
      <div>
        <dl>
          <dt class="header"><span class="title"></span> <span class="price">{{$t('order.price')}}({{basicSymbol}})</span>
            <span class="amount">{{$t('trade.cumulative')}}<em class="uppercase">({{tradeSymbol}})</em></span>
            <span>{{$t('trade.cumulative')}}<em class="uppercase">({{basicSymbol}})</em></span></dt>
        </dl>
        <dl>
          <dd v-for="(item,index) in sellQuotation" @click="setbuySellValue(1,item.buyPrice)">
            <div class="inner">
              <span :class="'title '+color_sell">{{$t('common.sell')}} {{index+1}}</span>
              <span class="price">{{item.buyPrice}}</span>
              <span class="amount">{{item.buyTotalVolumn}}</span>
              <span>{{item.buyBasicVolumn}}</span>
              <b class="color-sell-bg"></b></div>
          </dd>
        </dl>
        <div class="dl-hr">
          <hr>
          <hr>
        </div>
        <dl>
          <dd v-for="(item,index) in buyQuotation" @click="setbuySellValue(0,item.buyPrice)">
            <div class="inner"><span :class="'title '+color_buy">{{$t('common.buy')}} {{index+1}}</span> <span class="price">{{item.buyPrice}}</span>
              <span class="amount">{{item.buyTotalVolumn}}</span>
              <span>{{item.buyBasicVolumn}}</span> <b
                class="color-buy-bg"></b></div>
          </dd>
        </dl>
      </div>
      <!--<div class="link-group clearFix">
        <div id="depth_select" class="depth-select">深度 <span id="depth_step">0.000001</span>
          <ul>
            <li class="active" data-depth="0">0.000001</li>
            <li data-depth="1">0.00001</li>
            <li data-depth="2">0.0001</li>
          </ul>
        </div>
        <a href="../depth/?trade=exchange">更多</a></div>-->
    </div>
  </div>
  <!--最新价END-->
  <!---登录后-委托历史END-->
</template>
<script>

  export default {
    props :{},
    computed:{
      color_buy:{
        get(){
          return this.$store.getters.tradeInfo.color_buy
        }
      },
      color_sell:{
        get(){
          return this.$store.getters.tradeInfo.color_sell
        }
      },
      //当前货币和美元的实时汇率
      exchangeRate:{
        get(){
          return this.$store.getters.tradeInfo.exchangeRate
        }
      },
      //当前币种
      currencyRate:{
        get(){
          return this.$store.getters.tradeInfo.currencyRate
        }
      },
      //基准虚拟货币
      basicSymbol:{
        get(){
          return this.$store.getters.tradeInfo.basicSymbol
        }
      },
      //交易虚拟货币
      tradeSymbol:{
        get(){
          return this.$store.getters.tradeInfo.tradeSymbol
        }
      },
      quetaObj:{
        get(){
          return this.$store.getters.tradeInfo.quetaObj
        }
      }
    },
    data(){
      return{
        //卖方队列
        sellQuotation:[],
        //买方队列
        buyQuotation:[],
      }

    },
    name: "latestPrice",
    methods:{

      setbuySellValue(type,price){
        this.$parent.setBuySellPrice(type,price);
      },
      refreshBuySell(quotation) {
        var buyArray = [], sellArray = [];
        //买方数据
        if (quotation.bidPrices) {
          for (var i = 0; i < quotation.bidPrices.length; i++) {
            var quote = {};
            quote.buyPrice = quotation.bidPrices[i].toFixed(this.$parent.tradePriceDigit);
            quote.buyTotalVolumn = parseFloat(quotation.bidVolumes[i]).toFixed(this.$parent.tradeInfo.minTradeDigit);
            quote.buyBasicVolumn = (parseFloat(quote.buyTotalVolumn)*parseFloat(quote.buyPrice)).toFixed(this.$parent.tradePriceDigit);
            buyArray.push(quote)
          }
        }
        //卖方数据
        if (quotation.askPrices) {
          for (var i = 0; i < quotation.askPrices.length; i++) {
            var quote = {};
            quote.buyPrice = quotation.askPrices[i].toFixed(this.$parent.tradePriceDigit);
            quote.buyTotalVolumn = parseFloat(quotation.askVolumes[i]).toFixed(this.$parent.tradeInfo.minTradeDigit);
            quote.buyBasicVolumn = (parseFloat(quote.buyTotalVolumn)*parseFloat(quote.buyPrice)).toFixed(this.$parent.tradePriceDigit);
            // sellArray.unshift(quote)
            sellArray.push(quote);
          }
        }
        //更新交易组件的买入价和卖出价
        this.$parent.updatePrice(sellArray,buyArray);

        this.sellQuotation=sellArray;
        this.buyQuotation=buyArray;
      },
      clearData(){
        this.sellQuotation=[];
        this.buyQuotation=[];
      }
    }

  }
</script>

