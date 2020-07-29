<template>
  <div>
  <div class="otc-account asset-content">
    <div class="asset-box flex-space-t">
      <!--左侧导航-->
      <div class="left-nav">
        <!--<h2><span>Assets><i>&gt;</i></span><span>Deposit & withdraw</span></h2>-->
        <!--<ul>-->
        <!--<li class="active"><a href="">币币账户</a></li>-->
        <!--&lt;!&ndash;<li><a href="">法币账户</a></li>&ndash;&gt;-->
        <!--<li><a href="">跟单账户</a></li>-->
        <h2>{{$t('common.assets')}}</h2>
        <ul>
          <li  class="active"><router-link to='otcaccount'>{{$t('fund.fbAccount')}}</router-link></li>
          <li><router-link to="tradeaccount">{{$t('fund.bbAccount')}}</router-link></li>
          <!--<li ><router-link to="fundaccount">{{$t('fund.fundAccount')}}</router-link></li>-->
        </ul>
      </div>
      <!--左侧导航END-->
      <!--右侧内容-->
      <!--右侧内容-->
      <div class="right-con">
        <div class="top-con flex-space">
          <div class="right" style="margin-left:20px">{{$t('assets.accounTotal')}}：
            <span id="my_balance_total" class="font_arial">{{totalAmount.toFixed(2) + ' '+sellMarket}}</span>
            <span class="ticker-transform font_arial"> ≈ &nbsp;&nbsp;{{formatAmount(convertTotalAmount)}} {{currency}}</span>
          </div>
          <router-link to="otcaccountlog"> {{$t('fund.fundlog')}}</router-link>
        </div>

        <el-table :data="fbAccountAssertList"
                  style="width: 100%"
                  class="list-table">
          <el-table-column
            :label="assertColumn[0].label"
            :key="assertColumn[0].name"
            :prop="assertColumn[0].prop"
          :width="200">
          </el-table-column>

          <el-table-column
            :label="assertColumn[1].label"
            :key="assertColumn[1].name"
            :prop="assertColumn[1].prop"
            align="right">
            <template slot-scope="scope">
              {{scope.row.availableAmount}} ≈ {{formatAmount(Number.parseFloat((symbolLastPrices[scope.row.dcCode + "/" +
              sellMarket]?symbolLastPrices[scope.row.dcCode + "/" + sellMarket]:0
              )*scope.row.availableAmount*exchangeRate))}}  {{currency}}
            </template>
          </el-table-column>

          <el-table-column
            :label="assertColumn[2].label"
            :key="assertColumn[2].name"
            :prop="assertColumn[2].prop"
            align="right">
            <template slot-scope="scope">
              {{scope.row.freezeAmount}} ≈ {{formatAmount(Number.parseFloat((symbolLastPrices[scope.row.dcCode + "/" +
              sellMarket]?symbolLastPrices[scope.row.dcCode + "/" + sellMarket]:0
              )*scope.row.freezeAmount*exchangeRate)) }} {{currency}}
            </template>
          </el-table-column>

          <el-table-column :label="$t('otc.operating')" key="4" align="center">
            <template slot-scope="scope">
              <el-button @click="showTransfer(true,scope.row)">
                {{$t('fund.turn_in')}}
              </el-button>
              <el-button @click="showTransfer(false,scope.row)">
                {{$t('fund.turn_out')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--<el-pagination-->
        <!--layout="prev, pager, next"-->
        <!--:total="50">-->
        <!--</el-pagination>-->

      </div>
    </div>

  </div>
    <!--确认购买-->

    <div class="dialog_wrap" style="display: block;" v-show="isShowTransfer">
      <div class="dialog">
        <div class="dia_tit">
          <div><b>{{this.fbAssertLogReqModel.changeType===5?$t('fund.inVolumeTip'):$t('fund.outVolumeTip')}}</b><span
            class="close" id="dia_close" @click="isShowTransfer=false">×</span></div>
          <p data="dia_title" class="dia_tit_more"></p>
        </div>
        <div class="dia_content">
          <div class="fund-buy-tips">
            <label>{{this.fbAssertLogReqModel.changeType===5?$t('fund.inVolume'):$t('fund.outVolume')}}<span>  {{this.fbAssertLogReqModel.changeType===5?$t('fund.enableInVolume'):$t('fund.enableOutVolume')}}&nbsp;{{this.availableAmount}}&nbsp;{{this.fbAssertLogReqModel.dcCode}}</span></label>
            <el-input-number  v-model="fbAssertLogReqModel.changeAmount" :precision="8" :max="availableAmount" :min="0" style="margin-bottom:20px;"></el-input-number>
            <label>{{$t('fund.payPassword')}}</label>
            <div class="pwd flex-space"><span><i class="el-icon-pwd"></i></span><input type="password" v-model="fbAssertLogReqModel.payPassword" maxlength="6" :disabled="this.user.isExitTradePwd === 0?true:false"></div>
            <div class="text-right"> <router-link to="addTradePwd" >{{ this.user.isExitTradePwd === 0?$t('fund.no_pay_password'):$t('login.forgetpwd')}}</router-link></div>
          </div>
        </div>
        <div class="dia_submit flex-box">
          <el-button class="btn btn_submit btn-primary" pro_name="btn_submit" @click="assetTransfer()" :disabled="this.user.isExitTradePwd === 0">  {{$t('otc.confirm')}}</el-button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--确认购买END-->
  </div>
</template>


<script>
  import {mapGetters} from "vuex";
  import {
    getMyAsset, assetTransfer
  } from "../../api/otc";
  import {reloadRate,onAction,removeListenRuner} from '@/utils/quotation'
  export default {
    name: "otcAccount",
    computed: {
      ...mapGetters(['token', 'user']),
      arrival() {
        if (this.extractInfo.tradeAmount) {
          return this.extractInfo.arrivalAmoumt = this.extractInfo.tradeAmount - this.extractInfo.chargeAmount;
        }
        return 0;
      },
      convertTotalAmount() {
        return (this.totalAmount * this.exchangeRate).toFixed(2);
      },
      chargeAmount() {
        return scientificToNumber(this.extractInfo.chargeAmount);
      },
    },
    created() {
      // this.connect();
      removeListenRuner('reloadSymbolKline')
      removeListenRuner('reloadOrders')
      removeListenRuner('fbOrders')
      removeListenRuner('reloadGearQuotation')
      removeListenRuner('reloadQuotation')
      reloadRate()
      let $this=this
      onAction('reloadRate',(rsp)=>{
        let rateList=rsp.list
        for (let i = 0; i < rateList.length; i++) {
          if (rateList[i].currencyName === 'USD' + $this.currency) {
            let rateMap = rateList[i].rateMap;//包含usdt,goldt对currency的汇率
            $this.exchangeRate = rateMap[$this.sellMarket];//基准市场汇率;如果当前是人民币,基准市场是goldt,这个就是goldt/人民币的汇率
          }
        }
      })
      this.getMyAsset();
    },
    beforeDestroy() {
      clearInterval(this.interval);
      // this.disconnect();
    },
    data() {
      return {
        isShowTransfer: false,
        availableAmount: 0,
        assertColumn: [
          {label: this.$i18n.t('otc.currency'), name: '1', prop: 'dcCode'},
          {label: this.$i18n.t('otc.available'), name: '2', prop: 'availableAmount'},
          {label: this.$i18n.t('otc.freeze'), name: '3', prop: 'freezeAmount'},
        ],
        fbAccountAssertList: [],
        fbAssertLogReqModel: {
          //变更数量
          changeAmount: null,
          //货币代码
          dcCode: null,
          //变更类型
          changeType: null,
          payPassword: '',
        },
        lastPrices: {},
        symbolLastPrices: {},
        totalAmount: 0,//总资金
        exchangeRate: 1, //实时汇率
      }
    },
    methods: {
      getMyAsset() {
        let $this = this;
        getMyAsset().then(response => {
          if (response.code === 200) {
            let data = response.data;
            data.fbAccountAssertList.forEach(item => {
                item.totolAmount = Number.parseFloat(item.totolAmount);
                item.availableAmount = Number.parseFloat(item.availableAmount);
                item.freezeAmount = Number.parseFloat(item.freezeAmount);
                item.bbAvailableAmount = Number.parseFloat(item.bbAvailableAmount);
            });
            this.fbAccountAssertList = data.fbAccountAssertList;
            $this.lastPrices = data.lastPrices;
            $this.currency = data.currency;
            $this.sellMarket = data.sellMarket;
            let cachePrices = data.lastPrices;
            let rateList = data.rateList;
            if (rateList) {
              for (let i = 0; i < rateList.length; i++) {
                if (rateList[i].currencyName === 'USD' + $this.currency) {
                  let rateMap = rateList[i].rateMap;//包含usdt,goldt对currency的汇率
                  $this.exchangeRate = rateMap[$this.sellMarket];//基准市场汇率;如果当前是人民币,基准市场是goldt,这个就是goldt/人民币的汇率
                  //$this.exchangeRate=rateList[i].currency;
                }
              }
            }
            $this.totalAmount = 0;
            for (let i = 0; i < data.fbAccountAssertList.length; i++) {
              var symbolData = data.fbAccountAssertList[i];
              var curPrice = cachePrices[symbolData.dcCode + "/" + data.sellMarket];
              var lastPrice = 0;
              if (!curPrice) {
                curPrice = cachePrices[data.sellMarket + "/" + symbolData.dcCode];
                if (curPrice) {
                  lastPrice = 1 / curPrice.lastPrice;
                }
              } else {
                lastPrice = curPrice.lastPrice;
              }
              if (symbolData.dcCode === data.sellMarket) {
                $this.symbolLastPrices[symbolData.dcCode + "/" + data.sellMarket] = 1.0;
              } else {
                $this.symbolLastPrices[symbolData.dcCode + "/" + data.sellMarket] = lastPrice;
              }
              if (cachePrices) {
                if (lastPrice !== 0) {
                  $this.totalAmount += symbolData.totolAmount * lastPrice;
                }
                if (symbolData.dcCode === $this.sellMarket) {
                  $this.totalAmount += symbolData.totolAmount;
                }
              }
            }


          }
        })
      },
      /**
       * 转移资产
       * @param isIn 是否是转入
       * @param item 币种
       */
      showTransfer(isIn, item) {
        this.isShowTransfer = true;
        if (isIn) {
          this.fbAssertLogReqModel.changeType = 5;//币币转法币
          this.availableAmount = item.bbAvailableAmount;
        } else {
          this.fbAssertLogReqModel.changeType = 4;//法币转币币
          this.availableAmount = item.availableAmount;
        }
        this.fbAssertLogReqModel.dcCode = item.dcCode;
        this.fbAssertLogReqModel.payPassword = '';
        this.fbAssertLogReqModel.changeAmount = 0;
      },
      assetTransfer() {
        if (this.fbAssertLogReqModel.changeAmount === undefined || isNaN(this.fbAssertLogReqModel.changeAmount)) {
          this.$message({
            type: 'error',
            message: this.$i18n.t('otc.transferVolumeNotEmpty')
          });
          return
        }
        if (this.fbAssertLogReqModel.changeAmount <= 0) {
          this.$message({
            type: 'error',
            message: this.$i18n.t('otc.theNumberOfTransactionsBePositive')
          });
          return
        }
        if (this.fbAssertLogReqModel.payPassword.length < 6) {
          this.$message({
            message: this.$i18n.t('fund.paypassword'),
            type: 'error',
            center: true
          });
          return
        }
        assetTransfer(this.fbAssertLogReqModel).then(response => {
          this.getMyAsset();
          if (response.code === 200) {
            this.isShowTransfer = false;
            this.$message({
              type: 'success',
              message: this.$i18n.t('otc.successfulTransfer')
            });
          } else {
            //有消息提示的话，不再提示转账失败
            if (!response || !response.msg) {
              this.$message({
                type: 'error',
                message: this.$i18n.t('otc.transferFailed')
              });
            }
          }
        })
      },
      // websocket 连接
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";
  @import "src/styles/nc.scss";
</style>

