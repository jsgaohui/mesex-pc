<template>
  <div class="otc-main bg-color border-blue box box-x-left">
    <div class="issue-left">
      <div class="title">{{$t('otc.currencyCategory')}}</div>
      <ul v-for="currencyItem in  currencySymbolList" >
        <li v-for="coinItem in  coinList" :class="{active:isCurrencyNameActive(coinItem + '/' + currencyItem)}"
            :key="coinItem + '/' + currencyItem">
          <a href="#" @click="switchCurrency(coinItem,currencyItem)">{{coinItem + '/' + currencyItem}}</a>
        </li>
      </ul>
    </div>
    <div class="issue-right">
      <div class="top box box-x-center box-space-bettwen">
        <div class="info">
          <span>{{activeCurrencyName}}</span>
          <span>{{$t('otc.realTimePrice')}} {{ this.realTimePrice ?   this.realTimePrice + ' ' + this.entrustForm.currencySymbol: ''}}</span>
          <span>{{$t('otc.upsAndDowns')}} <font class="color_down">{{this.upsAndDowns + '%'}}</font></span>
          <span>{{$t('otc.highestPrice')}} {{ this.highestPrice ?  this.highestPrice + ' ' + this.entrustForm.currencySymbol: ''}}</span>
          <span>{{$t('otc.floorPrice')}} {{ this.floorPrice ?   this.floorPrice + ' ' + this.entrustForm.currencySymbol: ''}}</span>
        </div>
        <a v-if="false" href="" @click.prevent="toggleEntrust">{{this.isBusiness ? $t('otc.iAmARegularUser') :
          $t('otc.iAmACertifiedMerchant')}}</a>
      </div>
      <el-form class="form-con box box-x-left" :model="entrustForm" :rules="entrustFormRules" ref="entrustForms">
        <div class="left">
          <div class="tab-con">
            <div class="tab-hd box box-x-center">
              <a href="#" :class="{active:!isBuy}" @click.prevent="toggleDirection(2)">{{$t('otc.sell')}}</a>
              <a href="#" :class="{active:isBuy}" @click.prevent="toggleDirection(1)">{{$t('otc.buy')}}</a>
            </div>
            <div class="tab-bd">
              <div class="box box-x-center box-y-center">
                <span>{{this.sellPrice}}</span>
                <em>{{isBuy ? $t('otc.buyEvaluate') : $t('otc.sellEvaluate')}}</em>
              </div>
              <p>{{$t('otc.referenceDayRisesAndFalls')}}
                <br>
                <span
                  class="color_down font16">{{this.upsAndDowns + '%'}}{{this.calLitter}}</span>
              </p>
            </div>
          </div>
          <!--支付方式-->
          <div class="pay">
            <a v-if="myPayMethodList.length>0" class="set"><router-link to="paymentMethod">{{$t('otc.addOrModify')}}</router-link></a>
            <div>
            <div v-if="myPayMethodList.length>0" class="pay-txt">{{isBuy?  $t('otc.selectPaymentMethod2'):  $t('otc.selectPaymentMethod')}}</div>
            <div class="pay-con box box-x-center">
              <div v-for="item in myPayMethodList" :class="'pay-icon'+' '+item.cssName+'-bg'" :key="item.paymentTypeId">
                <input :id="item.id" @click="selectPayment(item.paymentTypeId)" type="checkbox" class="small online-icon">
                <label :for="item.id"><i :class="'iconfont'+' '+'icon-'+item.cssName"></i></label>
              </div>
              <div v-if="myPayMethodList.length===0"><router-link to="paymentMethod">{{$t('otc.paymentIsNeed')}}</router-link></div>
            </div>
            </div>
            <el-form-item prop="payTypes">
              <el-input type="hidden" name="payTypes"></el-input>
            </el-form-item>
          </div>
        </div>
        <!--商家版-->
        <div class="right" v-show="isBusiness">
          <!--金额-->
          <div class="from-box bg-color02 border-blue box-radius">
            <div class="box-top box box-space-bettwen">
              <b>{{$t('otc.amount') + entrustForm.currencySymbol}}</b>
              <div class="price-tab box box-x-center">
                <a href="#" :class="{active:!isFluctuationPrice}" @click.prevent="entrustForm.priceFloowMarket =0">{{$t('otc.fixedPricing')}}</a>
                <a href="#" :class="{active:isFluctuationPrice}" @click.prevent="entrustForm.priceFloowMarket =1">{{$t('otc.floatingPricing')}}</a>
              </div>
            </div>
            <div class="box-con" v-show="isFluctuationPrice">
              <div class="box box-x-left">
                  <el-form-item prop="spread" :label="$t('otc.spreadRange')" class="popover">
                    <el-popover
                      placement="top"
                      :title="$t('otc.spreadRange')"
                      width="200"

                      trigger="hover"
                      :content="$t('otc.spreadDes')">
                      <i class="el-icon-info"  slot="reference"></i>
                    </el-popover>
                    <el-input-number :controls="false" v-model.number="entrustForm.spread" :precision="2" :min="-10000000000000000000" :max="10000000000000000000"/>
                  </el-form-item>
                <el-form-item prop="offset" :label="$t('otc.transactionDeviation')" class="popover">
                  <el-popover
                    placement="top"
                    :title="$t('otc.transactionDeviation')"
                    width="200"

                    trigger="hover"
                    :content="$t('otc.transactionDeviationDes')">
                    <i class="el-icon-info"  slot="reference"></i>
                  </el-popover>
                  <el-input-number :controls="false" v-model.number="entrustForm.offset" :precision="2" :max="999999999999.99"/>

                </el-form-item>
              </div>
            </div>
            <div class="box-con" v-show="!isFluctuationPrice">
              <div class="box box-x-left">
                <el-form-item prop="initOrderPrice" :label="$t('otc.amount')">
                  <el-input-number :controls="false" v-model.number="entrustForm.initOrderPrice" :precision="2" :max="999999999999.99"/>
                </el-form-item>
              </div>
            </div>


          </div>
          <!--交易限额-->
          <div class="from-box bg-color02 border-blue box-radius">
            <div class="box-top box box-space-bettwen">
              <b>{{$t('otc.transactionLimit')}}</b>
            </div>
            <div class="box-con">
              <div class="box box-x-left">
                <el-form-item prop="orderVolume" :label="$t('otc.numberOfTransactions')" style="width:inherit;">
                  <el-input-number :controls="false" v-model.number="entrustForm.orderVolume" :precision="8" :max="getMaxVolume"/>

                </el-form-item>

                <div v-show="!isBuy" style="line-height:40px;"><span> {{$t('otc.quantityAvailable')+ getFixQuantity(assetMap[entrustForm.dcCode])+ ' '+entrustForm.dcCode }}</span>
                  <a style="padding-left: 10px;" @click="goTransfer()">
                    {{$t('otc.transferToMore')}}</a></div>
              </div>
              <div class="box box-x-left">
                <!--<el-form-item class="rel" prop="limitDate" :label="$t('otc.expirationOfPay')">-->
                  <!--<el-input v-model.number="entrustForm.limitDate" type="number" class="input-txt" pattern="[0-9]"/>-->
                  <!--<span class="time">({{$t('otc.minute')}})</span></el-form-item>-->
                <el-form-item prop="limitMin" :label="$t('otc.minimumSingleLimit')">
                  <el-input-number :controls="false" v-model.number="entrustForm.limitMin" :precision="2"/>
                </el-form-item>
                <el-form-item class="rel" prop="limitMax" :label="$t('otc.maximumSingleLimit')">
                  <el-input-number :controls="false" v-model.number="entrustForm.limitMax" :precision="2" :max="10000000000000000000"/>
                  <span class="r-icon" @click="getMaxAmount()"><i class="iconfont icon-up02"></i></span>
                </el-form-item>
              </div>
            </div>
          </div>
          <!--确认委托-->
          <div class="from-box bg-color02 border-blue box-radius">
            <div class="box-top box box-space-bettwen">
              <b>{{$t('otc.confirmationCommission')}}</b>
            </div>
            <div class="box-con trader-pwd">
              <div class="box-y-center" v-if="!isNotSetTradePwd" style="align-items: flex-start">
                <!--<label>{{$t('otc.transactionPassword')}}</label>-->
                <el-form-item prop="payPassword" :label="$t('otc.transactionPassword')">
                  <el-input
                    :placeholder="$t('otc.pleaseEnterYourPassword')"
                    v-model="entrustForm.payPassword"
                    maxlength="6"
                    clearable
                    type="password">
                  </el-input>

                </el-form-item>
                <a  @click="goSetPayPassword()" style="padding-top:6px;">{{$t('login.forgetpwd')}}</a>
              </div>
              <!--设置交易密码-->
              <div class="box-y-center" v-if="isNotSetTradePwd" style="padding-left:28px;">
                <label>{{$t('otc.transactionPassword')}}</label>
                <a class="set-passwd" @click="goSetPayPassword()">{{$t('otc.setTheTransactionPassword')}}</a>
              </div>
              <!--设置交易密码 END-->
              <div class="notes box-y-center">
                <el-checkbox v-model="isAgree">{{$t('otc.agreedToTheTransaction')}}</el-checkbox>
                <a @click.prevent="showTradingInstruction(true)"> {{$t('otc.legalCurrencyTradingInstructions')}}</a>
              </div>
              <div class="btn-box">
                <el-button  class="otc-btn" @click="doDeal">{{$t('otc.confirmRelease')}}</el-button>
              </div>
            </div>
          </div>
          <!--确认委托 END-->
        </div>
        <!--用户版 -->
      <!--  <div class="right" v-show="!isBusiness">
          &lt;!&ndash;具体操作&ndash;&gt;
          <div class="from-box bg-color02 border-blue box-radius">
            <div class="box-top box box-space-bettwen">
              <b>{{$t('otc.specificOperation')}}</b>

            </div>
            <div class="box-con">
              <div class="box box-x-left">
                <el-form-item :label="$t('otc.sellVolume')">
                  <el-input v-model.number="entrustForm.initOrderPrice" type="number" class="input-txt"/>
                </el-form-item>
                <el-form-item :label="$t('otc.amount')">
                  <el-input v-model.number="entrustForm.orderVolume" type="number" class="input-txt"/>
                </el-form-item>
              </div>
            </div>
          </div>

          &lt;!&ndash;确认委托&ndash;&gt;
          <div class="from-box bg-color02 border-blue box-radius" style="display:block">
            <div class="box-top box box-space-bettwen">
              <b>{{$t('otc.confirmationCommission')}}</b>
            </div>
            <div class="box-con trader-pwd">
              <div class="box-y-center" v-if="!isNotSetTradePwd">
                <label>{{$t('otc.transactionPassword')}} </label>
                <el-input
                  :placeholder="$t('otc.pleaseEnterYourPassword')"
                  v-model="entrustForm.payPassword"
                  type="password">
                </el-input>
                <a class="reset">{{$t('otc.reset')}}</a>
              </div>
              &lt;!&ndash;设置交易密码&ndash;&gt;
              <div class="box-y-center" v-if="isNotSetTradePwd">
                <label>{{$t('otc.transactionPassword')}}</label>
                <a class="set-passwd" @click="goSetPayPassword()">{{$t('otc.setTheTransactionPassword')}}</a>
              </div>
              &lt;!&ndash;设置交易密码 END&ndash;&gt;

              <div class="notes box-y-center">
                <input id="changeListState2" action="changeListState2" type="checkbox" class="small" v-model="isAgree">
                <label for="changeListState2">{{$t('otc.agreedToTheTransaction')}}</label>
              </div>
              <div class="btn-box">
                <el-button :disabled="!isAgree" class="otc-btn">{{$t('otc.confirmRelease')}}</el-button>
              </div>
            </div>
          </div>
          &lt;!&ndash;确认委托 END&ndash;&gt;
        </div>-->
      </el-form>
    </div>
    <!--成功提醒 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowGoMarket">
      <div class="dialog" style="width:524px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.prompt')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowGoMarket=false">×</span></div>
          </div>
        </div>
        <div class="dia_content tips-removal">
          <div class="text">{{$t('otc.doGoMarket')}}</div>
          <div class="icon-btn"><i class="iconfont icon-close" @click="isShowGoMarket=false"></i><i
            class="iconfont icon-done" @click="goMarket()"></i></div>
        </div>

      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--成功提醒 End-->
    <!--交易须知 Begin-->
    <trading-instructions :is-show-instructions.sync="isShowInstructions" :set-show-instructions="showTradingInstruction"/>
    <!--交易须知 End-->

    <!--手机绑定提醒 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowPhoneVerification">
      <div class="dialog" style="width:524px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.prompt')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowPhoneVerification=false">×</span></div>
          </div>
        </div>
        <div class="dia_content tips-removal">
          <div class="text">{{isShowPhoneBind? $t('otc.doBindPhone2'): $t('otc.doBindPhoneVerification2')}}</div>
          <div class="icon-btn"><i class="iconfont icon-close" @click="isShowPhoneVerification=false"></i><i class="iconfont icon-done" @click="goPhoneValid()"></i></div>
        </div>

      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--手机绑定提醒 End-->
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {getFbBusinessCoinList, marketTrade, publishOrder} from "../../api/otc";
  import Cookies from 'js-cookie'
  import TradingInstructions from "./tradingInstructions";
  import {reloadQuotation,reloadRate,onAction,removeListenRuner} from '@/utils/quotation'
  export default {
    name: "businessEntrust",
    components: {TradingInstructions},
    computed: {
      ...mapGetters(["token", "user"]),

      /* 是否是买入*/
      isBuy() {
        return this.entrustForm.direction === 1;
      },
      /* 是否是浮动定价*/
      isFluctuationPrice() {
        return this.entrustForm.priceFloowMarket === 1;
      },
      /**
       * 是否是商家委托
       */
      isBusiness() {
        return this.$route.name === "businessEntrust";
      },
      /**
       * 未設置支付密碼
       */
      isNotSetTradePwd() {
        return (
          !this.user ||
          !this.user.isExitTradePwd ||
          this.user.isExitTradePwd === 0
        );
      },
      calLitter() {
        if (this.upsAndDowns && this.realTimePrice) {
          return '(' + (this.upsAndDowns * this.realTimePrice / 100).toFixed(2) + ')';
        } else {
          return '(0)';
        }
      },
      getMaxVolume() {
        if (this.isBuy){
          return Infinity;
        } else {
          return this.assetMap[this.entrustForm.dcCode];
        }
      },
    },
    data() {
      let $this = this;
      /* 交易密码限制*/
      const validPayPassword = (rule, value, callback) => {
        if (!value || value.length < 6) {
          callback(new Error($this.$i18n.t("fund.paypassword")));
          return;
        }
        callback();
      };
      /* 匹配数量限制*/
      const validLimitMaxNumber = (rule, value, callback) => {
        if (!value || value < 0) {
          callback(new Error($this.$i18n.t("otc.limitRightNumber")));
          return;
        }
        if ($this.entrustForm.limitMin) {
          if (value <= $this.entrustForm.limitMin) {
            callback(new Error($this.$i18n.t("otc.limitMaxNumber")));
            return;
          }
        }
        callback();
      };
      const validLimitMinNumber = (rule, value, callback) => {
        if (!value || value < 0) {
          callback(new Error($this.$i18n.t("otc.limitRightNumber")));
          return;
        }
        if ($this.entrustForm.limitMax) {
          if (value > $this.entrustForm.limitMax) {
            callback(new Error($this.$i18n.t("otc.limitMinNumber")));
            return;
          }
        }
        if ($this.isFluctuationPrice && $this.entrustForm.spread != null && $this.entrustForm.orderVolume != null && $this.entrustForm.orderVolume > 0) {
          let amountTemp = ((Number.parseFloat($this.realTimePrice) + Number.parseFloat($this.entrustForm.spread)) * Number.parseFloat($this.entrustForm.orderVolume));
          if (amountTemp < value) {
            callback(new Error($this.$i18n.t("otc.theMinimumCannotBeLowerTotal")));
            return;
          }
        }
        if (!$this.isFluctuationPrice && $this.entrustForm.orderVolume != null && $this.entrustForm.orderVolume > 0) {
          if ($this.realTimePrice * $this.entrustForm.orderVolume < value) {
            callback(new Error($this.$i18n.t("otc.theMinimumCannotBeLowerTotal")));
            return;
          }
        }
        callback();
      };
      /* 成交时间限制*/
      // const validlimitTime = (rule, value, callback) => {
      //   if (!value || value < 0) {
      //     callback(new Error(this.$i18n.t("otc.limitRightTime")));
      //   } else {
      //     callback();
      //   }
      // };
      /* 订单数量验证*/
      const validOrderVolume = (rule, value, callback) => {
        if (!value || value < 0 || value > this.getMaxVolume) {
          callback(new Error($this.$i18n.t("otc.tradeRightVolume")));
        } else {
          callback();
        }
      };
      //价格验证
      const validOrderPrice = (rule, value, callback) => {
        if (!value || value < 0) {
          callback(new Error($this.$i18n.t("otc.tradeRightVolume")));
        } else {
          callback();
        }
      };
      /* 偏差验证*/
      const validOffsetNumber = (rule, value, callback) => {
        if ($this.isFluctuationPrice) {
          if (!value || value < 0) {
            callback(new Error($this.$i18n.t("otc.offsetRightNumber")));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      /* 点差验证*/
      const validSpreadNumber = (rule, value, callback) => {
        if ($this.isFluctuationPrice) {
          if (!value && value !== 0) {
            callback(new Error($this.$i18n.t("otc.offsetRightNumber")));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      /* 支付方式验证*/
      const validPayTypes = (rule, value, callback) => {
        if ($this.entrustForm.payTypes.length===0) {
            callback(new Error($this.$i18n.t("otc.paymentIsNeed")));
        } else {
          callback();
        }
      };
      let locale = Cookies.get('language');
      return {
        realTimePrice: 0,
        upsAndDowns: 0,
        highestPrice: 0,
        floorPrice: 0,
        sellPrice: 0,
        coinList: [],
        currencySymbolList: [],
        myPayMethodList: [],//我所有已激活的收款方式
        //资产信息
        assetMap:{},
        sellMarket: null,//基准结算市场  目前是GoldT
        isLoading: true,
        activeCurrencyName: null,
        //是否显示法律协议
        isShowInstructions:false,
        //是否显示成功提示
        isShowGoMarket: false,
        //是否显示手机绑定
        isShowPhoneBind:false,
        //是否显示手机验证
        isShowPhoneVerification:false,
        entrustForm: {
          /**
           * 交易币编码
           */
          dcCode: "",
          /**
           * 买卖方向（1买入；2卖出）
           */
          direction: 2,
          /**
           * 币种符号
           */
          currencySymbol: '',
          /**
           * 发布价
           */
          initOrderPrice: null,
          /**
           * 当前价（行情+点差）
           */
          currOrderPrice: null,
          /**
           * 是否跟随行情变动(0:不跟随，1:跟随)
           */
          priceFloowMarket: 1,
          /**
           * 行情价点差
           */
          spread: null,
          /**
           * 允许成交的偏差范围值
           */
          offset: null,
          /**
           * 挂牌数量
           */
          orderVolume: null,
          /**
           * 单次最小配对数量
           */
          limitMin: null,
          /**
           * 单次最大配对数量
           */
          limitMax: null,
          /**
           * 支付方式
           */
          payTypes:[],
          /**
           * 支付密码
           */
          payPassword:'',
        },
        entrustFormRules: {
          // limitDate: [{required: true, validator: validlimitTime}],
          initOrderPrice: [{required: true, validator: validOrderPrice}],
          orderVolume: [{required: true, validator: validOrderVolume}],
          limitMax: [{required: true, validator: validLimitMaxNumber}],
          limitMin: [{required: true, validator: validLimitMinNumber}],
          offset: [{required: true, validator: validOffsetNumber}],
          spread: [{required: true, validator: validSpreadNumber}],
          payTypes: [{required: true, validator: validPayTypes}],
          spread: [{required: true, validator: validSpreadNumber}],
          payPassword: [{required: true, validator: validPayPassword}]
        },
        isAgree: true, /*是否同意协议*/
        tradeInfo: {
          exchangeRate: 1, //实时汇率
          rateList: [], //所有汇率集合
          currencySymbol: '',//当前货币
          lastPrices: [], //所有币种默认最新价集合
          initRate: 1,//初始汇率
        },
      };
    },
    created() {
      if (this.isBusiness){
        //用户只有固定
        this.entrustForm.priceFloowMarket = 0;
      } else {
        //商家默认浮动
        this.entrustForm.priceFloowMarket = 1;
      }
      this.getFbCoinList();

      //汇率相关Begin
      //连接websocket,初始化操作
      removeListenRuner('reloadSymbolKline')
      removeListenRuner('reloadOrders')
      removeListenRuner('fbOrders')
      removeListenRuner('reloadGearQuotation')
      reloadQuotation()
      reloadRate()
      let $this=this
      onAction('reloadQuotation',(rsp)=> {  //实时行情
        let quotation=rsp.list
        let quaSymbol = quotation.symbol;
        if (quotation && quaSymbol) {
          let symbolData = {};
          symbolData.symbol = quotation.symbol;  // 交易对代码
          symbolData.lastPrice = quotation.lastPrice;    // 最新成交价
          symbolData.lastVolume = quotation.lastVolume;              // 最新成交量
          symbolData.openPrice = quotation.openPrice;    // 今开盘
          symbolData.highestPrice = quotation.highestPrice;     // 最高价
          symbolData.lowestPrice = quotation.lowestPrice;         // 最低价

          if ($this.tradeInfo.lastPrices == null){
            $this.tradeInfo.lastPrices = [];
          }
          $this.tradeInfo.lastPrices[quaSymbol] = symbolData;

          let symbol =  $this.entrustForm.dcCode + '/' +  $this.sellMarket;
          if (symbol === quaSymbol) {
            //更新最新价格
            $this.setQuotation();
          }
        }
      })

      onAction('reloadRate',(rsp)=> {  //实时行情
        $this.tradeInfo.rateList = rsp.list;
        $this.getRate();
        $this.setQuotation();
      })
    },
    watch: {},
    methods: {
      toggleEntrust() {
        if (this.isBusiness) {
          /* 去普通委托 */
          this.$router.push({name: "normalEntrust"});
        } else {
          /* 去商家委托 */
          this.$router.push({name: "businessEntrust"});
        }
      },
      isCurrencyNameActive(currencyName) {
        return currencyName === this.activeCurrencyName;
      },
      toggleDirection(index) {
        this.entrustForm.direction = index;
      },
      /* 切换币种 */
      switchCurrency(currencyName, currencySymbol) {
        this.isLoading = true;
        this.activeCurrencyName = currencyName + '/' + currencySymbol;
        this.entrustForm.dcCode = currencyName;
        this.entrustForm.currencySymbol = currencySymbol;
        this.entrustForm.initOrderPrice = 0;
        this.entrustForm.limitMax = 0;
        this.entrustForm.limitMin = 0;
        this.entrustForm.orderVolume = 0;
        //切换币种数据
        this.getRate();
        this.setQuotation();
      },
      /* 选择支付方式 */
      selectPayment(paymentTypeId) {
        let $this = this;
        var myPay = $this.entrustForm.payTypes;
        var count = 0;
        if(myPay.length>0){
          for(var i=0;i<myPay.length;i++){
             if(myPay[i]===paymentTypeId){//表示已选择,则取消
               $this.entrustForm.payTypes.splice(i,1);
               count++;
             }
          }
        }
        if(count===0){
          $this.entrustForm.payTypes.push(paymentTypeId);
        }
      },
      getFbCoinList() {
        getFbBusinessCoinList().then(response => {
          if (response.code === 200) {
            let data = response.data;
            this.coinList = data.fbTradeCoinList;
            this.myPayMethodList = data.myPayMethod;
            this.sellMarket = data.sellMarket;//基准结算市场  目前是GoldT
            this.assetMap  = data.assetMap;
            this.currencySymbolList=data.currencySymbol;
            //默认第一个货币
            this.entrustForm.dcCode = this.coinList[0];
            this.entrustForm.currencySymbol = data.currencySymbol[0];
            this.activeCurrencyName = this.coinList[0] + '/' + this.entrustForm.currencySymbol;
            this.getCurrencyQuotation();
          }
        });
      },
      //提示手机验证
      showPhoneTip(isNeedBind) {
        this.isShowPhoneBind = isNeedBind;
        this.isShowPhoneVerification = true;
      },
      //去手机绑定
      goPhoneValid() {
        this.isShowPhoneVerification = false;
        if (this.isShowPhoneBind){
          this.$router.push({name: "editphone"});
        }else {
          this.$router.push({name: "userinfo"});
        }
      },
      doDeal() {
        let $this = this;
        if (!$this.token) {
          $this.$router.push({path: "login"});
          return;
        }
        //没有绑定手机号
        if ($this.user.mobile === null || $this.user.mobile === '') {
          $this.showPhoneTip(true);
          return;
        }
        //没有开启手机验证
        if ($this.user.openPhoneValid !== 1) {
          $this.showPhoneTip(false);
          return;
        }
        if (!$this.isAgree){
          $this.$message({
            type: 'error',
            message:this.$i18n.t('otc.consentToTrade')
          });
          return
        }
        // $this.entrustForm.initOrderPrice = 121;
        // $this.entrustForm.limitDate = new Date;
        // $this.entrustForm.countryCode = '1';
        $this.entrustForm.currOrderPrice = $this.realTimePrice;
        if ($this.isFluctuationPrice){
          $this.entrustForm.initOrderPrice = $this.realTimePrice;
        }
        $this.$refs.entrustForms.validate(isValid => {
          if (isValid) {
            if ($this.entrustForm.payPassword.length < 6) {
              $this.$message({
                message: $this.$i18n.t('fund.transactionPasswordMustBeSet'),
                type: 'error',
                center: true
              });
              return
            }

            publishOrder($this.entrustForm).then(response => {
              if (response.code === 200) {
                $this.entrustForm.payPassword = '';
                this.showGoMarket();
                // this.$alert(this.$i18n.t('otc.releaseAccepted'),this.$i18n.t('otc.prompt'), {
                //   confirmButtonText: this.$i18n.t('otc.confirm'),
                //   callback: action => {
                    // $this.$router.push({name: "otctrade"});
                    // this.$message({
                    //   type: 'info',
                    //   message: `action: ${ action }`
                    // });
                //   }
                // });
              }
            });
          }
        });
      },
      //提示是否去市场
      showGoMarket() {
        this.isShowGoMarket = true;
      },
      //去手机绑定
      goMarket() {
        this.isShowGoMarket = false;
        this.$router.push({name: "otctrade"});
      },
      /* 获取币种行情数据 */
      getCurrencyQuotation() {
        let $this = this;
        marketTrade().then((response) => {
          if (response.code === 200) {
            const data = response.data;
            $this.tradeInfo.rateList = data.rateList;
            // $this.tradeInfo.initRate = data.exchangeRate;//当前货币和美元的汇率
            $this.tradeInfo.lastPrices = data.lastPrices;  //先从缓存中获取货币的最新价和涨幅
            $this.getRate();
            $this.setQuotation()
          }
        })
      },
      /**
       * 计算汇率
       */
      getRate() {
        for (let i = 0; i < this.tradeInfo.rateList.length; i++) {
          if (this.tradeInfo.rateList[i].currencyName === 'USD' + this.entrustForm.currencySymbol) {
            let rateMap = this.tradeInfo.rateList[i].rateMap; //当前汇率(包含了usdt,goldt对当前币种 的汇率// )
            this.tradeInfo.initRate = rateMap[this.sellMarket];
          }
        }
      },
      /**
       * 根据币种设置行情数据
       */
      setQuotation() {
        let data;
        try {
          data = this.tradeInfo.lastPrices[this.entrustForm.dcCode + '/' + this.sellMarket];
        } catch (e) {
        }
        if (data == null && this.entrustForm.dcCode === 'GOLDT') {
          data = {lastPrice: 1, highestPrice: 1, lowestPrice: 1, openPrice: 1}
        }
        if (data != null) {
          this.sellPrice = (data.lastPrice * this.tradeInfo.initRate).toFixed(2);
          this.realTimePrice = (data.lastPrice * this.tradeInfo.initRate).toFixed(2);
          this.highestPrice = (data.highestPrice * this.tradeInfo.initRate).toFixed(2);
          this.floorPrice = (data.lowestPrice * this.tradeInfo.initRate).toFixed(2);
          let roseNum = 0;
          if (data.lastPrice > 0) {
            roseNum = Number((((data.lastPrice - data.openPrice) / data.openPrice) * 100));
          }
          this.upsAndDowns = roseNum.toFixed(2);
        } else {
          this.sellPrice = 0.00;
          this.realTimePrice = null;
          this.upsAndDowns = 0.00;
          this.highestPrice = null;
          this.floorPrice = null;
        }

      },
      goSetPayPassword() {
        this.$router.push({name: "addTradePwd"});
      },
      getMaxAmount() {
        if (this.isFluctuationPrice && this.entrustForm.spread != null && this.entrustForm.orderVolume != null) {
          this.entrustForm.limitMax = ((Number.parseFloat(this.realTimePrice) + Number.parseFloat(this.entrustForm.spread)) * Number.parseFloat(this.entrustForm.orderVolume)).toFixed(2);
        }
        if (!this.isFluctuationPrice && this.entrustForm.orderVolume != null) {
          this.entrustForm.limitMax = (Number.parseFloat(this.entrustForm.initOrderPrice)  * Number.parseFloat(this.entrustForm.orderVolume)).toFixed(2);
        }
      },
      goTransfer() {
        this.$router.push({name: "otcaccount"});
      },
      getFixQuantity(num) {
        return (Number.parseFloat(num)).toFixed(8);
      },
      showTradingInstruction(value) {
        this.isShowInstructions = value;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";
</style>
