<template xmlns:el="http://www.w3.org/1999/html">
  <div class="doc_container row">

    <!--主体内容切换区域-->
    <div class="main-tabbox">
      <!--头部搜索区域-->
      <div class="top-search flex-space" >
        <div class="fl" v-if="tradeInfo.tradeSymbol ==='WESTO'">
          <h1>Westrend Consulting </h1>
          <h1>MASEx Entry Board: WESTO</h1>
          <!--<totalAsset ref="TotalAsset"></totalAsset>-->
        </div>
        <div class="fl" v-else-if="tradeInfo.tradeSymbol ==='TRAT'" style="display:flex; justify-content: flex-start;align-items:center;">
          <img src="static/images/trat.png">
          <div>
          <h1>Tratok Token</h1>
          <h1>Travel Utility Token: TRAT</h1>
          </div>
          <!--<totalAsset ref="TotalAsset"></totalAsset>-->
        </div>
        <!--<div class="drawer" id="drawer">-->
          <!--<div class="search_wrap">-->
            <!--<input type="text" v-model="searchKey" @keyup="searchSymbol" class="uppercase" pro_name="search" value=""-->
                   <!--maxlength="7">-->
            <!--<i style="display: none" class="search_clear hb_icon_clear"></i><i class="hb_icon_search"-->
                                                                               <!--@click="searchSymbol"></i>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <!--头部搜索区域-->
      <div>
        <ul class="trade-menu" >
          <li class="on" id="chart" @click="changeTag('chart')">{{$t('common.chat')}}</li>
          <li id="history" @click="changeTag('history')">{{$t('common.history')}}</li>
<!--          <li id="security" @click="changeTag('security')">{{$t('common.securityDetail')}}</li>-->
          <li id="profile" @click="changeTag('profile')">{{$t('common.companyProfile')}}</li>
<!--          <li id="financials" @click="changeTag('financials')">{{$t('common.financials')}}</li>-->
          <li id="news" @click="changeTag('news')">{{$t('common.news')}}</li>
<!--          <li id="vedio" @click="changeTag('vedio')">{{$t('common.vedio')}}</li>-->
        </ul>
        <div>
            <!--CHART--->
            <div class="chart-con" id="show_chart" style="display:block">
              <!--左边内容-->
              <div class="sidebar">
                <!--登录后显示-净资产折合-->
                <totalAsset ref="TotalAsset"></totalAsset>
                <!--市场内容  begin-->
                <div class="drawer" id="drawer"><strong>{{$t('trade.market')}}</strong>
                  <!-- 搜索框  -->
                  <div class="search_wrap">
                    <input type="text" v-model="searchKey" @keyup="searchSymbol" class="uppercase" pro_name="search" value=""
                           maxlength="7">
                    <i style="display: none" class="search_clear hb_icon_clear"></i><i class="hb_icon_search"
                                                                                       @click="searchSymbol"></i>
                  </div>
                  <!--币种类型   cny  usd  KRW -->
                  <div class="switch_wrap uppercase" action="switch_quote"><i class="hb_icon_split_coin"></i><b>{{tradeInfo.currencyRate}}</b></div>
                  <!-- 币种类型结束  -->

        <!--加载市场交易队 -->
        <div class="coin_filter" >
          <el-tabs v-model="activeName"  @tab-click="tabClick"  v-loading.body="tradeInfo.listLoading">
            <el-tab-pane
              v-for="(value,key) in symbolMaps" :key="key" :label="key" :name="key">
              <div class="coin_table">
                <el-table  :row-class-name="tableRowClassName"
                  :data="value" @row-click="rowClick" :empty-text="$t('common.nodata')"
                  style="width: 100%">
                  <el-table-column
                    :label="$t('assets.coin')"
                    sortable
                    width="120">
                    <template slot-scope="scope">
                      <img :src="require('@/assets/images//icon_b/'+scope.row.targetDcCode+'.png')" > {{ scope.row.targetDcCode}}
                      <!--<i :class="'el-icon-'+scope.row.targetDcCode.toLowerCase()"></i>{{ scope.row.targetDcCode}}-->
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('common.lastPrice')"
                    sortable
                    prop="lastPrice"
                    width="150">
                    <template slot-scope="scope">
                      <span>{{scope.row.lastPrice.toFixed(scope.row.tradePriceDigit)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    sortable
                    :label="$t('common.rose')">
                    <template slot-scope="scope">
                      <span :class="scope.row.rose>=0?tradeInfo.color_buy:tradeInfo.color_sell">{{ scope.row.rose>0?'+'+scope.row.rose:scope.row.rose}}%</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
          <!--<b action="showmarked"><i class="hb_icon_marked"></i>自选</b>--></div>
        <!--USDT-->
        <!--<div class="coin_table">-->
        <!--</div>-->
        <!--USDT-->
      </div>
      <!--市场END-->
      <!--实时成交记录-->
      <realTimeTradeRecord ref="RealTimeTradeRecord"></realTimeTradeRecord>
      <!--实时成交记录END-->
      <!--公告-->

      <!--公告END-->
    </div>
    <!--左边内容END-->
    <!--右边内容-->
    <div class="page_content">
      <!--行情走势-->
      <div class="mod trading_chart">
        <realTimeData  ref="RealTimeData" ></realTimeData>

        <tradeview :coin="coin" :tradePriceDigit="tradePriceDigit"  ref="Tradeview" v-if="coin "></tradeview>
        <div class="empty-status" v-else/>
        <!--<div class="chartMask" id="chartMask" action="activeChart"></div>-->
      </div>
      <!--行情走势END-->
      <!--买卖盘-->
      <div class="trade_wrap">
        <!--登录前-限价交易-->
        <trade ref="Trade"></trade>
        <!--限价交易END-->
        <!-- end unlogin trade_panel -->
        <!--最新价-->
        <latest-price ref="LatestPrice" ></latest-price>

                  <!--最新价END-->
                </div>
                <!--买卖盘END-->
      <!--实时成交记录-->
      <entrustment v-if="tradeInfo.digitalSymbol.dcCode!=='WESTO'"  ref="Entrustment"></entrustment>
      <!--实时成交记录-->
              </div>
              <!--右边内容END-->
            </div>
            <!--CHART END--->
            <!--实时成交记录-->
            <div id="show_history" v-if="tradeInfo.digitalSymbol.dcCode==='WESTO'" style="display: none">
              <div class="desktop not_login" style="width:1200px;margin:0 auto;text-align:center" v-if="!token">
                <router-link to="login" class="logout">{{$t('login.logIn')}}</router-link>
                {{$t('common.or')}}
                <router-link to="register" class="logout">{{$t('register.reg')}}</router-link>
              </div>
              <entrustment  ref="Entrustment"></entrustment>
            </div>
            <!--实时成交记录END-->
            <!--币种介绍-->
            <div id="show_security" style="display: none">
            <digital-symbol ref="DigitalSymbol"></digital-symbol>
            </div>
            <!--币种介绍 END-->
            <!--币种简介-->
            <div class="company-con" id="show_profile" style="display: none">
              <div class="tit">
                {{$t('trade.companyProfile')}}
              </div>
              <div class="in">
                <h3>{{tradeInfo.digitalSymbol.dcCode}}</h3>
                <p v-html="tradeInfo.digitalSymbol.summary"></p>
              </div>
            </div>
            <!--币种简介 end-->
          <div id="show_financials"  style="display: none">
            <div class="coin_table-trader">
              <el-table  :row-class-name="tableRowClassName" header-align="center"
                         :data="filings":empty-text="$t('common.nodata')"
                         style="width: 100%">
                <el-table-column
                  :label="$t('FORM TYPE')"
                  prop="formType"
                  align="center">
                  <template slot-scope="scope">
                    <a href="static/Financial Statement- Westrend.pdf" style="color:blue">{{scope.row.formType}}</a>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('RECEIVED')"
                  align="center"
                  sortable
                  prop="receivedDate"
                 >
                </el-table-column>
                <el-table-column
                  :label="$t('PERIOD END DATE')"
                  align="center"
                  sortable
                  prop="periodEndDate"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
            <!--公告-->
            <div id="show_news" style="display: none">
            <notice   ref="Notice"></notice>
            </div>
            <!--公告END-->

<!--          <div id="show_vedio" style="display: none">-->
<!--            &lt;!&ndash;<iframe style="width:98%;height: 450px;"&ndash;&gt;-->
<!--                    &lt;!&ndash;src="https://drive.google.com/file/d/1ZRRI-4tgUs7cf0MxhzaWCwWursMLMveb/view"&ndash;&gt;-->
<!--                    &lt;!&ndash;frameborder=0&ndash;&gt;-->
<!--                    &lt;!&ndash;allowfullscreen="true"&ndash;&gt;-->
<!--                    &lt;!&ndash;webkitallowfullscreen="true"&ndash;&gt;-->
<!--                    &lt;!&ndash;mozallowfullscreen="true" />&ndash;&gt;-->
<!--            &lt;!&ndash;<div align="center">&ndash;&gt;-->
<!--              <div class="sidebar_notice">-->
<!--                <div class="tit">{{$t('common.download')}}</div>-->
<!--                <div class="in">-->
<!--                  <ul id="notice_list">-->
<!--                    <li>-->
<!--                      <p>Inroduction Video - Aaron Tsai </p>-->
<!--                      <a style="color:#0d97fe" href="https://drive.google.com/uc?export=download&confirm=VZbu&id=1ZRRI-4tgUs7cf0MxhzaWCwWursMLMveb" target="_blank">Download</a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <p>MASX Speech (LA) 08-04-19</p>-->
<!--                      <a style="color:#0d97fe" href="https://admin.udax.kr/upload/masex.pdf" target="_blank">Download</a>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </div>-->
<!--              &lt;!&ndash;<span><a href="https://drive.google.com/uc?export=download&confirm=VZbu&id=1ZRRI-4tgUs7cf0MxhzaWCwWursMLMveb" target="_blank">{{$t('common.download')}}</a></span>&ndash;&gt;-->
<!--            &lt;!&ndash;<video style="width:80%;height: 500px" src="https://drive.google.com/uc?export=download&confirm=VZbu&id=1ZRRI-4tgUs7cf0MxhzaWCwWursMLMveb" controls>&ndash;&gt;-->
<!--              &lt;!&ndash;Your browser does not support <code>video</code> tag.&ndash;&gt;-->
<!--            &lt;!&ndash;</video>&ndash;&gt;-->
<!--            &lt;!&ndash;</div>&ndash;&gt;-->
<!--          </div>-->
        </div>
      </div>
      <!--交易记录-->

      <!--交易记录 end-->

    </div>
    <!--主体内容切换区域 END-->

  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapGetters} from 'vuex';
  import {marketTrade} from "../../api/trader";
  import Tradeview from "./tradingview";//交易图表
  import {hisQuotation, getServerTime} from "../../api/quotation"
  import Notice from "./notice";//公告
  import TotalAsset from "./totalAsset";//总资产
  import DigitalSymbol from "./digitalSymbol";//
  import LatestPrice from "./latestPrice";//最新价
  import Trade from "./trade";//交易模块
  import Entrustment from "./entrustment";//委托记录
  import RealTimeData from "./realTimeData";//实时币种数据
  import RealTimeTradeRecord from "./realTimeTradeRecord";//实时成交纪录组件
  import Cookies from 'js-cookie'
  import {reloadQuotation,reloadRate,onAction,removeListenRuner,reloadGearQuotation,reloadOrders,reloadKline} from '@/utils/quotation'
  import ElButton from "element-ui/packages/button/src/button";


  export default {
    components: {
      ElButton,
      Tradeview,Notice,DigitalSymbol,LatestPrice,Entrustment,RealTimeTradeRecord,RealTimeData,TotalAsset,Trade},
    name: "index",
    beforeRouteLeave (to, from, next) {
      this.$refs.TotalAsset.clearInterval();
      // this.disconnect();
      next();
    },
    computed: {
      ...mapGetters(['token', 'user']),

    },
    created() {
      //从其他页面带参数过来
      if (this.$route.params.basicSymbol) {
        this.tradeInfo.basicSymbol = this.$route.params.basicSymbol;
        this.tradeInfo.tradeSymbol = this.$route.params.tradeSymbol;
        this.listQuery.symbol = this.getCurrentSymbol();
      }else{
        var initSymbol=sessionStorage.getItem("initSymbol");
        if(initSymbol){
          this.listQuery.symbol = initSymbol;
        }
      }
      this.getList();

      //连接websocket,初始化操作
      removeListenRuner('fbOrders')
      reloadQuotation()
      reloadRate()
      reloadOrders()
      let $this=this
      onAction('reloadQuotation',(rsp)=>{  //实时行情
        var quotation=rsp.list
        var quaSymbol = quotation.symbol;
        var symbol = $this.getCurrentSymbol();
        if (symbol === quaSymbol) {
          //更新最新价格
          // $this.tradeInfo.lastPrice = quotation.lastPrice;
          //  setTimeout(()=>$this.$refs.LatestPrice.refreshBuySell(quotation),10);  //切换到新的订阅中处理

          if(quotation.lastPrice > 0){
            var tradeObj=$this.tradeInfo.quetaObj[quaSymbol];
            var tradeInfo = {};
            tradeInfo.direction =quotation.orderDir;
            tradeInfo.price = quotation.lastPrice;
            tradeInfo.volume = Number.parseFloat(quotation.lastVolume).toFixed($this.tradeInfo.minTradeDigit);
            tradeInfo.tradeTime = quotation.updateTime;
            tradeInfo.totalVolume=quotation.totolVolume;
            if(tradeObj&&(quotation.totolVolume-tradeObj['totolVolume'])>0){
              tradeInfo.volume = Number.parseFloat(quotation.totolVolume-tradeObj['totolVolume']).toFixed($this.tradeInfo.minTradeDigit);
              if ($this.tradeInfo.tradeList.length < 50) {
                $this.tradeInfo.tradeList.unshift(tradeInfo);
              } else {
                $this.tradeInfo.tradeList.pop();
                $this.tradeInfo.tradeList.unshift(tradeInfo);
              }
            }else{
              if($this.tradeInfo.tradeList.length===0&&tradeInfo.volume>0){
                $this.tradeInfo.tradeList.unshift(tradeInfo);
              }
            }
            //更新实时成交记录
            $this.saveTradeInfo(true);
          }
        }

        //获取货币的最新价和涨幅，取推送过来的最新行情去替换集合中的数据
        if ($this.tradeInfo.quetaObj[quotation.symbol]) {
          $this.tradeInfo.quetaObj[quotation.symbol].lastPrice = quotation.lastPrice;
          var roseNum = Number.parseFloat((((quotation.lastPrice - quotation.openPrice) / quotation.openPrice) * 100));
          if(!roseNum){
            return;
          }
          $this.tradeInfo.quetaObj[quotation.symbol].rose = roseNum.toFixed(2);
          $this.tradeInfo.quetaObj[quotation.symbol].highestPrice = quotation.highestPrice.toFixed($this.tradeInfo.maxShowUnit); //最高价
          $this.tradeInfo.quetaObj[quotation.symbol].lowestPrice = quotation.lowestPrice.toFixed($this.tradeInfo.maxShowUnit); //最低价
          $this.tradeInfo.quetaObj[quotation.symbol].totolVolume = quotation.totolVolume; //总成交量
        } else {
          if($this.tradeInfo.lastPrices){
            var queot = $this.tradeInfo.lastPrices[quotation.symbol];
            if (queot) {
              $this.tradeInfo.quetaObj[quotation.symbol].lastPrice = queot.lastPrice;
              var roseNum = Number.parseFloat((((queot.lastPrice - queot.openPrice) / quotation.openPrice) * 100));
              $this.tradeInfo.quetaObj[quotation.symbol].rose = roseNum.toFixed(2);
              $this.tradeInfo.quetaObj[quotation.symbol].highestPrice = queot.highestPrice.toFixed($this.tradeInfo.maxShowUnit); //最高价
              $this.tradeInfo.quetaObj[quotation.symbol].lowestPrice = queot.lowestPrice.toFixed($this.tradeInfo.maxShowUnit); //最低价
              $this.tradeInfo.quetaObj[quotation.symbol].totolVolume = queot.totolVolume; //总成交量
            }
          }
        }
        //更新信息.
        $this.saveTradeInfo(false);
        for (let key in $this.marketList) {
          for (let i = 0; i < $this.marketList[key].length; i++) {
            var symbolObj = $this.marketList[key][i];
            if (quotation.symbol === symbolObj.symbol) {
              var roseNum = 0;
              if (quotation.lastPrice > 0) {
                roseNum = new Number((((quotation.lastPrice - quotation.openPrice) / quotation.openPrice) * 100));
              }
              symbolObj.lastPrice = quotation.lastPrice;
              symbolObj.rose = roseNum.toFixed(2) ;
            }
          }
        }


        for (let key in $this.symbolMaps) {
          for (let i = 0; i < $this.symbolMaps[key].length; i++) {
            var symbolObj = $this.symbolMaps[key][i];
            if (quotation.symbol === symbolObj.symbol) {
              var roseNum = 0;
              if (quotation.lastPrice > 0) {
                roseNum = new Number((((quotation.lastPrice - quotation.openPrice) / quotation.openPrice) * 100));
              }
              symbolObj.lastPrice = quotation.lastPrice;
              symbolObj.rose = roseNum.toFixed(2);
            }
          }
        }
      })
      onAction('reloadRate',(rsp)=>{  //实时汇率
        let rateList=rsp.list
        for(let i=0;i<rateList.length;i++){
          if(rateList[i].currencyName==='USD'+$this.tradeInfo.currencyRate){
            var rateMap=rateList[i].rateMap; //当前汇率(包含了usdt,goldt对当前币种 的汇率// )
            if($this.tradeInfo.basicSymbol){
              var symbolRate =  rateMap[$this.tradeInfo.sellteMarket];
              $this.tradeInfo.initRate=symbolRate;
              var curPrice=$this.tradeInfo.quetaObj[$this.tradeInfo.basicSymbol + "/" + $this.tradeInfo.sellteMarket];
              if(curPrice){//判断在历史行情中是否有该价格
                symbolRate=symbolRate*curPrice.lastPrice;//需要根据基础市场下交易对行情最新价换算折合的法币价值
              }
              $this.tradeInfo.exchangeRate=symbolRate;
            }else{
              $this.tradeInfo.exchangeRate=rateList[i].currencyRate;
            }
          }
        }
        $this.saveTradeInfo(false);
      })
      onAction('reloadOrders',(rsp)=>{ //交易订阅触发
        let orderInfo=rsp.list
        //如果不是当前交易队的信息,不处理
        if(orderInfo.symbol != $this.getCurrentSymbol()){
          return;
        }
        $this.addCurOrderList(orderInfo);

        //如果不是撤单成功  8
        if(orderInfo.orderStatus!==8){
          if(!$this.$refs.Entrustment.getSyncbalance()){ //获取子类是否需要刷新资产
            $this.setSyncbalance(true)
            //重新刷新资产数据
            $this.refreshAssert(true);
          }
        }
      })
      onAction('reloadGearQuotation',(rsp)=>{  //档位行情订阅触发
        $this.$refs.LatestPrice.refreshBuySell(rsp.list)
      })

      // this.showHistory();//加载tsla历史行情数据
      this.showFilings();
    },
    mounted (){
      this.$refs.Notice.noticeInfo();
    },
    data() {

      let locale=Cookies.get('language');
      return {
        coin: null,//子组件参数
        langugue:'',//子组件参数
        marketList: [], //交易市场集合
        searchKey: '',//代币代码索引
        symbolMaps: [],//查询后的集合数据数据
        tradeInfo:{
          color_buy:locale?locale==='ko'?"kr-color-buy":"color-buy":"color-buy",
          color_sell:locale?locale==='ko'?"kr-color-sell":"color-sell":"color-sell",
          sellQuotation:[],//最新价格列表买方信息
          buyQuotation:[],//最新价格列表卖方信息
          quetaObj: {},//交易对的高开低收价格,以及涨幅,总交易量
          initRate : 1,//初始汇率
          exchangeRate: 1, //实时汇率
          currencyRate:'',//换算的货币代码
          basicSymbol: '',//基准市场  EHT/GOLDT中的后者
          tradeSymbol: '',//交易币   ETH/GOLDT中的前者
          digitalSymbol: {},//代币信息,币种简介信息
          noticeList: [],//公告列表
          tradeList: [], //实时成交记录,
          listLoading: true,
          maxShowUnit: 0,//小数位最大保留几位小数
          sellteMarket: '',//基准结算市场  目前是GoldT
          lastPrices: [], //所有币种默认最新价集合
          minTradeDigit:0,
          buysellScale: {},//买入卖出限额比例
          tradeRate: 0 // 币币交易手续费
        },
        listQuery: {//当前委托
          symbol: ''
        },
        tradePriceDigit:'',
        activeName: '',
        lastPrice: 0,
        stompLoad: false,
        subgears:[], //储存已订阅的交易对信息(档位行情)
        tslas:[],//tslas数据
        filings:[],//filings数据
      }
    }
    , methods: {
      changeTag(key){
        var curDoc=document.querySelector("#"+key);
        var curList=curDoc.parentNode.children;
        for(var i=0;i<curList.length;i++){
          if(curList[i].id!=key){
            curList[i].setAttribute("class","");
          }
        }
        curDoc.setAttribute("class","on");
        var tagKey="show_"+key;
        var currentDom=document.querySelector("#" + tagKey);
        var domParent=currentDom.parentNode;
        var childList=domParent.children;
        for(var i=0;i<childList.length;i++){
          if(childList[i].id!=tagKey){
            childList[i].setAttribute("style","display:none;");
          }
        }
        currentDom.setAttribute("style","display:block;");
      },
      /**子组件之间相互调用的方法,放在父组件里**/
      //更新可用资产数据
      updateAvailableAssert(availableList,ifFromTrade){
        // setTimeout(()=>this.$refs.Trade.syncAvailableAssert(availableList,ifFromTrade),10);
        this.$refs.Trade.syncAvailableAssert(availableList,ifFromTrade);
      },
      //设置委托历史里的控制变量
      setSyncbalance(flag){
        this.$refs.Entrustment.setSyncbalance(flag);
      },
      //设置限价交易里的input输入框内容
      setBuySellPrice(type,price){
        this.$refs.Trade.setBuySellPrice(type,price);
      },
      //更新限价交易里的input输入框
      updatePrice(sellArray,buyArray){
        this.$refs.Trade.updatePrice(sellArray,buyArray);
      },
      //添加挂单系统数据
      addCurOrderList(orderInfo){
        this.$refs.Entrustment.addCurOrderList(orderInfo);
      },
      refreshAssert(ifFromTrade){
        this.$refs.TotalAsset.refreshAssert(true);
      },
      toggleChart(){
        this.$refs.Tradeview.toggleChart();
      },
      getKlineList(){

        let endTimeStamp = Math.round(new Date().getTime()/1000) ;
        let startTimeStamp = endTimeStamp - 86400 * 4 ;//减去4天的时间
        hisQuotation({
            symbol: this.getCurrentSymbol(),
            startTimeStamp: startTimeStamp,
            endTimeStamp: endTimeStamp,
            step: 15
          }
        ).then((response) => {
          var cacheData = [];
          if (!response.data) {
            return;
          }
          let kLineData = response.data.kLineData;
          if (!kLineData) {
            return;
          }
          let klineList = kLineData.kLineList;

          if (!klineList) {
            return;
          }
          var replaceLast = false;
          for (let i = 0; i < klineList.length; i++) {
            var quotation = klineList[i];
            if (quotation) {
              var time = quotation.sTimeStamp * 1000;
              if (!replaceLast) {
                cacheData.push({
                  time: time,
                  close: quotation.close,
                  open: quotation.open,
                  high: quotation.high,
                  low: quotation.low,
                  volume: quotation.volume
                });
              }
            }
          }
          sessionStorage.setItem("cacheData",JSON.stringify(cacheData));
        })
      },
      /**子组件之间相互调用的方法,放在父组件里结束**/
      getList() {
        let $this = this;
        this.tradeInfo.listLoading = true;
        marketTrade(this.listQuery).then((response) => {
          if (response.code === 200) {
            const data = response.data;
            $this.tradeInfo.sellteMarket = data.sellteMarket;//基准市场
            $this.marketList = data.resultMap;//市场和交易队的map
            $this.tradeInfo.currencyRate=data.currencyRate;//当前币种名称
            $this.tradeInfo.initRate=data.exchangeRate;//当前货币和美元的汇率
            $this.tradeInfo.maxShowUnit=data.maxShowUnit;//最大显示位数
            $this.tradeInfo.minTradeDigit=data.minTradeDigit;
            $this.tradePriceDigit = data.tradePriceDigit;
            $this.tradeInfo.buysellScale=data.buysellScale;
            $this.tradeInfo.tradeRate=data.tradeRate;
            $this.saveTradeInfo(false);


            //先从缓存中获取货币的最新价和涨幅
            $this.tradeInfo.lastPrices = data.lastPrices;
            if (data.basicTradeSymbol) { //初始化显示的交易对信息
              $this.tradeInfo.tradeSymbol = data.basicTradeSymbol.tradeSymbol;
              $this.tradeInfo.basicSymbol = data.basicTradeSymbol.basicSymbol;
              $this.activeName = $this.tradeInfo.basicSymbol;
            }

            reloadGearQuotation(this.getCurrentSymbol()) //订阅当前交易对档位行情


            if($this.tradeInfo.sellteMarket===$this.tradeInfo.basicSymbol){
              $this.tradeInfo.exchangeRate=$this.tradeInfo.initRate;
            }else{
              var symbolRate=$this.tradeInfo.initRate; //当前汇率
              var curPrice=$this.tradeInfo.lastPrices[$this.tradeInfo.basicSymbol + "/" + $this.tradeInfo.sellteMarket];
              if(curPrice){//判断在历史行情中是否有该价格
                symbolRate=symbolRate*curPrice.lastPrice;
              }
              $this.tradeInfo.exchangeRate=symbolRate;
            }


            //初始化总资产数据
            $this.$refs.TotalAsset.initAssets(data.availableList);
            //初始化可用资产数组
            $this.$refs.Trade.syncAvailableAssert(data.availableList,false);
            //提供一个函数,给totalAsset.vue调用
            //$this.updateAvailableAssert(data.availableList,true);
            //$this.$refs.TotalAsset.refreshAssert(false);
            $this.$refs.Trade.setTradeParam(data);
            // var flag = true;
            let symbol = $this.getCurrentSymbol();
            $this.coin = symbol
            // $this.$emit("createWidget",symbol);
            if ($this.tradeInfo.lastPrices) {
              for (let key in $this.marketList) {  //市场交易对 最新行情和涨幅
                for (let i = 0; i < $this.marketList[key].length; i++) {
                  var symbolObj = $this.marketList[key][i];
                  var cacheSymbol = $this.tradeInfo.lastPrices[symbolObj.symbol];
                  if (cacheSymbol) {
                    var roseNum = 0;
                    if (cacheSymbol.lastPrice > 0) {
                      roseNum = new Number((((cacheSymbol.lastPrice - cacheSymbol.openPrice) / cacheSymbol.openPrice) * 100));
                    }
                    symbolObj.lastPrice = cacheSymbol.lastPrice;
                    symbolObj.rose = roseNum.toFixed(2);
                  }
                }
              }
              for (let key in $this.tradeInfo.lastPrices) {  //存储历史最新行情
                var lastCache = $this.tradeInfo.lastPrices[key];
                var roseNum = 0;
                if (lastCache.lastPrice > 0) {
                  roseNum = new Number((((lastCache.lastPrice - lastCache.openPrice) / lastCache.openPrice) * 100));
                }
                var jsonObj = {};
                jsonObj.lastPrice = lastCache.lastPrice;
                jsonObj.rose = roseNum.toFixed(2);
                jsonObj.highestPrice = lastCache.highestPrice; //最高价
                jsonObj.lowestPrice = lastCache.lowestPrice; //最低价
                jsonObj.totolVolume = lastCache.totolVolume; //总成交量
                // $this.quetaObj[key] = jsonObj;
                Vue.set($this.tradeInfo.quetaObj,key,jsonObj);
                // if (key === symbol) {
                //   flag = false;
                // }
              }
            }
            if(data.getGearQuotation){
              $this.$refs.LatestPrice.refreshBuySell(data.getGearQuotation);
            }

            if(data.tradeList){
              $this.tradeInfo.tradeList=data.tradeList;
            }else{
              $this.tradeInfo.tradeList=[];
            }
            $this.symbolMaps = Object.assign({}, $this.marketList);//复制市场行情对象给filter结果集对象
            // $this.filterCurOrderList = $this.curOrderList.slice(0);

            // $this.readKx(data.quotationMap) //读取K线数据
            if($this.tradeInfo.tradeSymbol&&$this.tradeInfo.basicSymbol){
              sessionStorage.setItem("initSymbol",$this.getCurrentSymbol())
            }

          }
          $this.tradeInfo.listLoading = false;


         // $this.tradeInfo.quetaObj=$this.quetaObj;
          $this.saveTradeInfo(false);
          if(this.token){
            //加载委托记录和委托记录记录
            $this.$refs.Entrustment.readCurOrders();
            $this.$refs.Entrustment.readOrders();
          }
          $this.$refs.DigitalSymbol.symbolIntro($this.tradeInfo.tradeSymbol);
        })
      },
      // initNotice(){
      //   let $this = this;
      //   Vue.nextTick(function() {
      //     $this.$refs.Notice.noticeInfo();
      //   } );
      //
      // },
      searchSymbol() {
        if (this.searchKey) {
          var oldList = this.marketList[this.activeName];
          this.symbolMaps[this.activeName] = [];
          for (let i = 0; i < oldList.length; i++) {
            if (oldList[i].targetDcCode.toUpperCase().indexOf(this.searchKey.toUpperCase()) === 0) {
              this.symbolMaps[this.activeName].push(oldList[i]);
            }
          }
        } else {
          for (let mapKey in this.marketList) {
            if (this.marketList[mapKey].length !== this.symbolMaps[mapKey].length) {
              this.symbolMaps = Object.assign({}, this.marketList);
            }
          }
        }
      },
      tabClick(tab, event) {
        this.activeName = tab.name;
        this.searchSymbol();
      },
      rowClick(row, event, column) {
        this.tradeInfo.basicSymbol = row.basicDcCode;
        this.tradeInfo.tradeSymbol = row.targetDcCode;
        this.$refs.Trade.initTradeParam();
        this.$refs.LatestPrice.clearData();
        this.listQuery.symbol = this.getCurrentSymbol();
        this.getList();
      },
      //高亮当前选择行
      tableRowClassName(row,rowIndex){
          if(row.row.symbol===this.getCurrentSymbol()){
            return "success-row"
          }
      },
      getCurrentSymbol(){
        return this.tradeInfo.tradeSymbol + "/" + this.tradeInfo.basicSymbol;
      },
      //tradeInfo所有子组件公用
      saveTradeInfo(ifSort){
        //this.debugList();
        if(ifSort){
          this.tradeInfo.tradeList = this.quickSort(this.tradeInfo.tradeList,"tradeTime",true);
        }
       // this.debugList();
        this.$store.dispatch('saveTradeInfo',this.tradeInfo);
      },
      // disconnect() {
      //   if (this.stompClient) {
      //     this.stompClient.deactivate();
      //   }
      // },
      quickSort(arr,name,snum){
      //如果数组<=1,则直接返回
        if(arr.length<=1){return arr;}
        var pivotIndex=Math.floor(arr.length/2);
    //找基准，并把基准从原数组删除
        var pivot=arr.splice(pivotIndex,1)[0];
        var middleNum=pivot[name].replace(new RegExp(":",'gm'),"");
    // 定义左右数组
        var left=[];
        var right=[];
    //比基准小的放在left，比基准大的放在right
        if(snum){
          for(var i=0;i<arr.length;i++){
            if(Number(arr[i][name].replace(new RegExp(":",'gm'),""))<=Number(middleNum) ){
              //left.push(arr[i]);
              right.unshift(arr[i]);
            }else{
              left.unshift(arr[i]);
              //right.push(arr[i]);
            }
          }
        }else{
          for(var i=0;i<arr.length;i++){
            if(arr[i][name].replace(new RegExp(":",'gm'),"")<=middleNum){
              left.push(arr[i]);
            }else{
              right.push(arr[i]);
            }
          }
        }
      //递归,返回所需数组
        return this.quickSort(left,name,snum).concat([pivot],this.quickSort(right,name,snum));

      },
      showHistory(){
        tsla().then((response) => {
          let quotation=response;
          let timeArray=quotation.chart.result[0].timestamp;
          let timelen=timeArray.length
          for(let i=0;i<timelen;i++){
            let highs=quotation.chart.result[0].indicators.quote[0]['high'][timelen-i-1];
            let lows=quotation.chart.result[0].indicators.quote[0]['low'][timelen-i-1];
            let opens=quotation.chart.result[0].indicators.quote[0]['open'][timelen-i-1];
            let closes=quotation.chart.result[0].indicators.quote[0]['close'][timelen-i-1];
            let volumes=quotation.chart.result[0].indicators.quote[0]['volume'][timelen-i-1];
            let quota={};
            quota.showtime=this.getLocalTime(timeArray[timelen-i-1]*1000);
            quota.high=parseFloat(highs).toFixed(2);
            quota.low=parseFloat(lows).toFixed(2);
            quota.open=parseFloat(opens).toFixed(2);
            quota.close=parseFloat(closes).toFixed(2);
            quota.volume=parseFloat(volumes).toFixed(2);
            this.tslas.push(quota)
          }
        })
      },
      showFilings(){
        // if(this.tradeInfo.digitalSymbol.dcCode==='WESTO'){
          let quota={}
          quota.receivedDate='2019-10-30';
          quota.periodEndDate='2019-9-30';
          quota.formType='Quarterly Financial Statement';
          this.filings.push(quota)
        // }
        // filings().then((response) => {
        //   let quotation=response;
        //   let records=quotation.records;
        //   let len=records.length
        //   for(let i=0;i<len;i++){
        //     let quota={};
        //     quota.receivedDate=this.getLocalTime(records[i].receivedDate);
        //     quota.periodEndDate=this.getLocalTime(records[i].periodEndDate);
        //     quota.formType=records[i].formType;
        //     this.filings.push(quota)
        //   }
        // })
      },
      getLocalTime(timestamp) {
        if (timestamp) {
          var time = new Date(timestamp);
          var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
          var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
          var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
          var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
          var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
          var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
          return y + '-' + M + '-' + d
            // + ' ' + h + ':' + m + ':' + s;
        } else {
          return '';
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/usdt.scss";
  /*.el-table .success-row {*/
    /*background: #f0f9eb;*/
  /*}*/
  .empty-status{
    height: 455px;
  }
</style>
