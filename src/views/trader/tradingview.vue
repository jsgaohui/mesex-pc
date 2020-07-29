<template>
  <CollapseTransition ref="CollapseTransition">
    <div id="tv_chart_container" v-show="isActive">
    </div>
  </CollapseTransition>
</template>
<script>
  import Datafeeds from '../../api/datafeed'
  import CollapseTransition from "../../components/animate-contract";
  import utils from '../../utils/tradeviewPageUtil';
  export default {
    name: 'Tradeview',
    components:{CollapseTransition},
    data() {
      return {
        chart: null,
        isActive:true,
        datafeeds:null,
      }
    },
    props: {
      coin: {
        type: String,
      },
      tradePriceDigit:{
        type :Number,
      }
    },
    computed: {
      symbolInfo() {
        return {
          isActive:true,
          name: this.coin,//商品名称，对应ETH/GOLDT商品名称。您的用户将看到它(作为一个字符串)。 此外，如果您不使用 tickers ，它将用于 数据请求
          ticker: this.coin,
          description: '',
          session: '24x7',
          supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
          minmov: 1,//最小波动
          minmov2: 0,
          pricescale: Math.pow(10,this.tradePriceDigit),//价格精度
          has_intraday: true,
          has_daily: true,
          has_empty_bars: false,
          has_seconds: false,
          volume_precision: 4,
          data_status: 'streaming',
          has_weekly_and_monthly: true,
          timezone: 'Asia/Seoul',
        }
      },
    },
    watch: {
      coin() {
        this.initFn();
      }
    },
    methods: {
      //切换图标隐藏显示状态
      toggleChart(){
        this.isActive = !this.isActive;
      },

      initChart() {
        let that = this;
        this.$nextTick(() => {
          this.datafeeds =new Datafeeds.UDFCompatibleDatafeed(this.symbolInfo);
          let params = {
            resolution: '15',
            datafeeds: this.datafeeds ,
            symbolInfo: this.symbolInfo,
          }
          const charView = require('../../../static/charting_library/charting_library.min')
          const Widget = charView.widget
          let chart = new Widget(utils.datafeedConfig(params))
           chart.onChartReady(() => {
            utils.chartReady(chart,that.datafeeds)
          })
          this.chart = chart;
          //订阅K线
          that.subcribeKline();
        })
1      },
      removeChart() {
        if (this.chart) {
          this.chart.remove()
          this.chart = null
        }
      },
      initFn() {
        this.initChart()
      },
      subcribeKline(){
        this.datafeeds.subcribeKline(15);
      }
    },
    created() {},
    mounted() {
      this.initFn()
    },
  }
</script>

<style lang="less" scoped>
  .container {}
</style>
