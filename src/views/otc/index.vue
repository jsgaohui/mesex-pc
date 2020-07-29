<template>

  <div>
    <div class="otc-path"><h3> </h3></div>
    <div class="otc-main bg-color border-blue">
      <!--顶部搜索筛选工具栏 Begin-->
      <div class="all-select box box-space-bettwen">

        <div class="top box box-x-center box-x-left">
          <!--<div class="title" style="width:260px;">{{$t('otc.purchasedCurrency')}}</div>-->
          <div class="sell-tab box box-space-bettwen">
            <div @click="changeMakerDirection(2)" :class="!isBuyMaker?'active':''">{{$t('otc.buyCoin')}}</div>
            <div @click="changeMakerDirection(1)" :class="isBuyMaker?'active':''">{{$t('otc.sellCoin')}}</div>
          <!--<el-select @change="getMakerList" v-model="fbMakerQuery.direction"-->
                     <!--:placeholder="$t('otc.orderType')">-->
            <!--<el-option-->
              <!--v-for="item in options.directionType"-->
              <!--:key="item.key"-->
              <!--:label="item.name"-->
              <!--:value="item.key">-->
            <!--</el-option>-->
          <!--</el-select>-->
          </div>
          <a v-show="isMerchant" ref="" @click.prevent="goBusinessEntrust()">{{$t('otc.releaseCommission')}}</a>

        </div>
        <!--发布委托-->
        <!--筛选数据 Begin-->
        <div class="select-con box box-x-right">
          <!--<el-select @change="changeCountry" v-model="fbMakerQuery.countryCode" clearable-->
                     <!--:placeholder="$t('otc.allCountries')">-->
            <!--<el-option-->
              <!--v-for="item in options.countryList"-->
              <!--:key="item.countryCode"-->
              <!--:label="item.code"-->
              <!--:value="item.countryCode">-->
              <!--<span style="float: left;width: 150px;">{{ item.code }}</span>-->
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>-->
            <!--</el-option>-->
          <!--</el-select>-->
          <el-select v-model="fbMakerQuery.currencySymbol" clearable :placeholder="$t('otc.allCoin')">
            <el-option
              v-for="item in options.currencyList"
              :key="item.currencySymbol"
              :value="item.currencySymbol">
              <span style="float: left;width: 70px;">{{ item.currencySymbol }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.currencyName }}</span>
            </el-option>
          </el-select>
          <el-select  v-model="fbMakerQuery.payMethod" clearable :placeholder="$t('otc.allPaymentType')">
            <el-option
              v-for="item in options.payType"
              :key="item.paymentTypeId"
              :label="item.paymentTypeName"
              :value="item.paymentTypeId">
            </el-option>
          </el-select>
          <div class="input-money">
            <el-input
              type="number"
              v-model="fbMakerQuery.amount"
              :placeholder="$t('otc.editAmount')"
              clearable>
            </el-input></div>
          <span class="reset" @click="getMakerList()">{{$t('otc.search')}}</span>
        </div>
        <!--筛选数据 End-->
        <!--<router-link to="/otcbusinessentrust" type="primary" plain tag="a"></router-link>-->
      </div>
      <!--顶部搜索筛选工具栏 End-->

      <!--各个币种的挂牌单数据列表 Begin-->
      <div class="list-con">
        <div class="body">
        <el-tabs v-model="fbMakerQuery.dcCode" class="flex-stretch" type="border-card" tab-position="left" @tab-click="switchCoin()">
          <el-tab-pane v-for="item in coinList" :key="item.dcCode" :label="item.dcCode" :name="item.dcCode">
            <el-table
              :empty-text="$t('common.nodata')"
              :data="makerList.rows"
              style="width: 100%"
               class="list-table">
              <el-table-column
                prop="nickName"

                :label="$t('otc.merchant')">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ scope.row.nickName}} <i
                    :class="getVipClass(scope.row.userLevel)"><b>{{scope.row.userLevel}}</b></i></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="availableVolume"
                :label="$t('otc.quantity')"
                >
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ scope.row.availableVolume + ' ' +  item.dcCode}} </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('otc.quota')">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ scope.row.limitMin +'-' + scope.row.limitMax + ' ' +  scope.row.currencySymbol}} </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="currOrderPrice"
                :label="$t('otc.unitPrice')">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ scope.row.currOrderPrice+ ' ' +  scope.row.currencySymbol}} </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="paymentMethod"
                :label="$t('otc.paymentMethod')">
                <template  slot-scope="scope" >
                  <div class="pay-con box box-x-start">
                    <el-tooltip :content="item.paymentTypeName" effect="light" :key="item.key" v-for="item in scope.row.payTypeList">
                      <div :class="'pay-icon'+' '+item.cssName+'-bg'"><i :class="'iconfont'+' '+'icon-'+item.cssName"></i></div>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('otc.operating')">
                <template slot-scope="scope">
                  <el-button
                    class="otc-btn"
                    size="mini"
                    @click="buyOrSell(scope.row)">{{isBuyMaker? $t('otc.sellCoin'): $t('otc.buyCoin')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                v-show="makerList.total !== 0"
                layout="prev, pager, next"
                :current-page.sync="fbMakerQuery.page"
                :page-size.sync="fbMakerQuery.limit"
                :total="makerList.total"
                @current-change="getMakerList()">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
        </div></div>
      <!--各个币种的挂牌单数据列表 End-->
    </div>
    <!--列表END-->

    <!--委托数据列表 Begin-->
    <div class="otc-orderlist bg-color border-blue" v-if="this.token" >
      <el-tabs v-model="selectTakerTab" @tab-click="handleClickTakerTab" type="card">
        <!--未完成订单 Begin-->
        <el-tab-pane :label="$t('otc.incompleteOrders')" name="myUnfinishedTaker">
          <taker-detail ref="myUnfinishedTaker" :order-status="[1,3,4]" :is-need-push="true"/>
        </el-tab-pane>
        <!--未完成订单 End-->

        <!--已完成订单 Begin-->
        <el-tab-pane :label="$t('otc.orderCompleted')" name="orderCompletedTaker">
          <taker-detail ref="orderCompletedTaker" :order-status="[5]" :is-auto-data="false"/>
        </el-tab-pane>
        <!--已完成订单 End-->

        <!--取消订单 Begin-->
        <el-tab-pane :label="$t('otc.cancelledOrder')" name="cancelOrderTaker">
          <taker-detail ref="cancelOrderTaker" :order-status="[2]" :is-auto-data="false"/>
        </el-tab-pane>
        <!--取消订单 End-->

        <!--我发布的 Begin-->
        <el-tab-pane :label="$t('otc.iPosted')" name="myMaker">
          <marker-detail-list ref="iPostedMaker" />
        </el-tab-pane>
        <!--我发布的 End-->

        <!--更多 Begin-->
        <el-tab-pane :label="$t('otc.more')" @click.prevent="goMyTakerList()" name="myMoreTaker">
        </el-tab-pane>
        <!--更多 End-->

      </el-tabs>
      <div>
      </div>
    </div>
    <!--委托数据列表 End-->

    <!--购买框 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowBuy" v-if="this.markerData">
      <div class="dialog">
        <div class="dia_tit">
          <div><b>{{isBuyMaker? $t('otc.sellCoin'): $t('otc.buyCoin')}}</b><div class="float-r"><em class="time">{{this.buyTimes + ' s'}}</em><span class="close" id="dia_close" @click="isShowBuy=false">×</span></div></div>
        </div>
        <div class="dia_content">
          <div class="otc-buy-con">
            <div class="otc-txt flex-space"> <label>{{isBuyMaker? $t('otc.purchaseVolume2'): $t('otc.purchaseVolume')}}</label><span>{{$t('otc.price') +'(' + markerData.currencySymbol +'): '+ markerData.currOrderPrice.toFixedV(2)}}</span></div>
            <div class="price flex-space" style="margin-bottom:10px;">
              <el-input-number @change="changeVolume" v-model.sync.number="takerReqData.tradeVolume" :precision="8" :step="stepVolume" :max="maxVolume" :min="minVolume"></el-input-number>
            </div>
            <div v-show="isBuyMaker" class="flex-space" style="padding-bottom:9px"><span> {{$t('otc.quantityAvailable')+ getQuantityAvailable()+ ' '+fbMakerQuery.dcCode }}</span>
              <a style="padding-left: 10px;" @click="goTransfer()">
                {{$t('otc.transferToMore')}}</a>
            </div>
            <div class="otc-txt flex-space"><label>{{$t('otc.amount')}}</label><span>{{ markerData.limitMin +'--' + markerData.limitMax + ' ' +  markerData.currencySymbol}}</span></div>
            <div class="price flex-space" style="margin-bottom:10px;">
              <el-input-number @change="changeAmount" v-model.sync.number="takerReqData.tradeAmount" :precision="2" :step="100" :max="maxPriceAmount" :min="minAmount"></el-input-number>
            </div>
            <div class="otc-txt flex-space"><label>{{$t('otc.transactionPassword')}}</label><div class='text-right'> <router-link to='addTradePwd' >{{ this.user.isExitTradePwd === 0?$t('fund.no_pay_password'):$t('login.forgetpwd')}}</router-link></div></div>
            <div class="pwd flex-space">
              <span><i class="el-icon-pwd"></i></span>
              <!--<em>{{$t('otc.validityPeriod')}}: 2 hours</em>-->
              <el-input type="password" v-model="takerReqData.payPassword" maxlength="6" clearable :disabled="this.user.isExitTradePwd === 0" style="position:relative"></el-input>

            </div>
            <div class="tips-pay flex-x-start">
              <div class="txt">{{$t('otc.paymentMethod')}}:</div>
              <!-- <div class="pay-con box box-x-center">
                <el-checkbox v-for="item in markerData.payTypeList" :key="item.paymentTypeName">
                  <div :class="'pay-icon'+' '+item.cssName+'-bg'"><i :class="'iconfont'+' '+'icon-'+item.cssName"></i></div>
                </el-checkbox>
              </div> -->
              <div class="pay-con box box-x-center">
                <el-tooltip :content="item.paymentTypeName" effect="light" :key="item.key" v-for="item in markerData.payTypeList">
                  <div :class="'pay-icon'+' '+item.cssName+'-bg'"><i :class="'iconfont'+' '+'icon-'+item.cssName"></i></div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="dia_submit flex-box" style="padding-bottom:10px;">
          <el-button class="btn btn_submit btn-primary"  @click="buyOrder()"> {{$t('otc.confirm')}}</el-button>
        </div>
        <div class="bom-info flex-x-left">
          <el-checkbox v-model="isAgreeBuy">{{$t('otc.agreedToTheTransaction')}}</el-checkbox>
          <a @click.prevent="showTradingInstruction(true)"> {{$t('otc.legalCurrencyTradingInstructions')}}</a>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--购买框 End-->
    <!--实名验证提醒 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowRealNameVerification">
      <div class="dialog" style="width:524px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.prompt')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowRealNameVerification=false">×</span></div>
          </div>
        </div>
        <div class="dia_content tips-removal">
          <div class="text">{{$t('otc.doRealNameVerification')}}</div>
          <div class="icon-btn"><i class="iconfont icon-close" @click="isShowRealNameVerification=false"></i><i class="iconfont icon-done" @click="goUserAuth()"></i></div>
        </div>

      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--实名验证提醒 End-->

    <!--手机绑定提醒 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowPhoneVerification">
      <div class="dialog" style="width:524px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.prompt')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowPhoneVerification=false">×</span></div>
          </div>
        </div>
        <div class="dia_content tips-removal">
          <div class="text">{{isShowPhoneBind? isBuyMaker?$t('otc.doBindPhone3'):$t('otc.doBindPhone'):
            isBuyMaker?$t('otc.doBindPhoneVerification3'):$t('otc.doBindPhoneVerification')}}
          </div>
          <div class="icon-btn"><i class="iconfont icon-close" @click="isShowPhoneVerification=false"></i><i class="iconfont icon-done" @click="goPhoneValid()"></i></div>
        </div>

      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--手机绑定提醒 End-->

    <!--添加支付方式提醒 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowAddPayType">
      <div class="dialog" style="width:524px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.prompt')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowAddPayType=false">×</span></div>
          </div>
        </div>
        <div class="dia_content tips-removal">
          <div class="text">{{$t('otc.doAddPayType')}}</div>
          <div class="icon-btn"><i class="iconfont icon-close" @click="isShowAddPayType=false"></i><i class="iconfont icon-done" @click="goAddPayType()"></i></div>
        </div>

      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--添加支付方式提醒 End-->

    <!--交易须知 Begin-->
    <trading-instructions :is-show-instructions.sync="isShowInstructions" :set-show-instructions="showTradingInstruction"/>
    <!--交易须知 End-->
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    buyOrder,
    getFbCoinList,
    getFilterData,
    makerList,
    myPayType,
    getFbUserInfo,
  } from "../../api/otc";
  import {mapGetters} from "vuex";
  import TakerDetail from "./takerDetail";
  import MarkerDetailList from "./markerDetailList";
  import TradingInstructions from "./tradingInstructions";

  // toFixed兼容方法
  Number.prototype.toFixedV = function (n) {
    if (n > 20 || n < 0) {
      throw new RangeError('toFixedV() digits argument must be between 0 and 20');
    }

    const number = this;
    if (!isNaN(number)) {
      if (number.toString().includes("E") || number.toString().includes("e")) {
        return number.toFixed(n);
      }
    }
    if (isNaN(number) || number >= Math.pow(10, 21)) {
      return number.toString();
    }
    if (typeof (n) === 'undefined' || n === 0) {
      return (Math.round(number)).toString();
    }

    let result = number.toString();
    const arr = result.split('.');

    // 整数的情况
    if (arr.length < 2) {
      result += '.';
      for (let i = 0; i < n; i += 1) {
        result += '0';
      }
      return result;
    }

    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length === n) {
      return result;
    }
    if (decimal.length < n) {
      for (let i = 0; i < n - decimal.length; i += 1) {
        result += '0';
      }
      return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);

    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last) >= 5) {
      const x = Math.pow(10, n);
      result = (Math.round((parseFloat(result) * x)) + 1) / x;
      // result = result.toFixedV(n);
    }

    return result;
  };


  //实时币种数据
  export default {
    name: "otc",
    components: {TradingInstructions, MarkerDetailList, TakerDetail},
    computed: {
      ...mapGetters([ 'token','user']),
      //购买总额
      // showAmount: {
      //   // 单价*数量
      //   get: function () {
      //     if (this.takerReqData.tradeVolume && this.takerReqData.tradeVolume !== 0) {
      //       return (this.markerData.currOrderPrice * this.takerReqData.tradeVolume).toFixed(2)
      //     } else {
      //       return 0
      //     }
      //   },
      //   // 反向设置购买数量
      //   set: function (newValue,oldValue) {
      //     this.takerReqData.tradeVolume = (newValue / this.markerData.currOrderPrice).toFixed(8)
      //   }
      // },
      //设置币数量的步长
      stepVolume() {
        //如果购买数量为0，则步长设置为最小购买数量
        if (!this.takerReqData.tradeVolume || this.takerReqData.tradeVolume === 0) {
          //重要！！！ 因为toFixed会进行4舍5入，所以需要加上0.00000001来保证总额不低于最低总额
          return Number.parseFloat(0.00000001) + Number.parseFloat((this.markerData.limitMin / this.markerData.currOrderPrice).toFixedV(8));
        } else {
          return Number.parseFloat(0.1);
        }
      },
      // 购买限额的最大数量
      maxVolume() {
        //如果是出售
        let available = this.markerData.availableVolume;
        if (this.isBuyMaker && this.getQuantityAvailable() <= available) {
          available = this.getQuantityAvailable();
        }
        if (available * this.markerData.currOrderPrice > this.markerData.limitMax) {
          return (this.markerData.limitMax / this.markerData.currOrderPrice).toFixedV(8);
        } else {
          //如果订单数量已经低于最低限额，则不限制，在购买时拦截
          if (this.isBuyMaker && available * this.markerData.currOrderPrice < this.markerData.limitMin) {
            return this.markerData.availableVolume;
          }
          return available;
        }
      },
      // 购买限额的最少数量
      minVolume(){
        if (!this.takerReqData.tradeVolume || this.takerReqData.tradeVolume === 0) {
          return 0;
        }
        //如果是出售
        let available = this.markerData.availableVolume;
        if (this.isBuyMaker && this.getQuantityAvailable() <= available) {
          available = this.getQuantityAvailable();
        }
        if (available * this.markerData.currOrderPrice >= this.markerData.limitMin) {
          return (this.markerData.limitMin / this.markerData.currOrderPrice).toFixedV(8);
        } else {
          return 0;
        }
      },
      // 购买限额的最少数量
      minAmount() {
        if (!this.takerReqData.tradeAmount || this.takerReqData.tradeAmount === 0) {
          return 0;
        }
        //如果订单可用数量总额已经低于最低限额，则为0
        if (this.isBuyMaker && this.getQuantityAvailable() * this.markerData.currOrderPrice < this.markerData.limitMin) {
          return 0;
        }
        return this.markerData.limitMin;
      },
      //购买总价的最大限额
      maxPriceAmount() {
        //如果是出售
        let available = this.markerData.availableVolume;
        if (this.isBuyMaker && this.getQuantityAvailable() <= available) {
          if (this.getQuantityAvailable() * this.markerData.currOrderPrice < this.markerData.limitMin) {
            //如果订单数量已经低于最低限额，则不限制，在购买时拦截
          } else {
            available = this.getQuantityAvailable();
          }
        }
        if (available * this.markerData.currOrderPrice < this.markerData.limitMax) {
          let amount = (available * this.markerData.currOrderPrice).toFixedV(2);
          if (amount / this.markerData.currOrderPrice > this.maxVolume) {
            amount = amount - 0.01
          }
          return amount;
        }
        return this.markerData.limitMax;
      },
      isBuyMaker() {
        return this.fbMakerQuery.direction === 1;
      }
    },
    created() {
      //获取币种列表
      this.getFbCoinList();
      //获取筛选数据
      this.getFilterData();

      if (this.user){
        this.isMerchant = this.user.isMerchant;
      }

      //获取是否实名验证
      if (this.token) {
        this.getFbUserInfo();
      }
    },
    // watch:{
    //   "takerReqData.tradeAmount"(to,from){
    //     console.log("to "+ to, " from " + from);
    //   },
    //   "takerReqData.tradeVolume"(to, from) {
    //
    //   },
    // },
    data() {
      let locale = Cookies.get('language');
      return {
        //筛选数据
        options:{
          //支付方式
          payType:[],
          //法币列表
          currencyList:[],
          //国家列表
          // countryList:[],
          payTypeMap: {},
          payTypeClass: {
            1: ['iconfont icon-card', 'pay-icon card-bg'],
            2: ['iconfont icon-wechat', 'pay-icon wechat-bg'],
            3: ['iconfont icon-alipay', 'pay-icon alipay-bg'],
          },
          directionType: [
            {key: 1, name: this.$i18n.t('otc.sellCoin')},
            {key: 2, name: this.$i18n.t('otc.buyCoin')}],
        },
        /*挂牌单查询*/
        fbMakerQuery: {
          /*币种*/
          dcCode: '',
          /*法币币种*/
          currencySymbol: '',
          /*国家*/
          countryCode: '',
          /*支付方式*/
          payMethod: '',
          /*买卖方向 默认 买*/
          direction: 2,
          /*挂牌单状态*/
          orderStatus: null,
          /*金额*/
          amount: '',
          /*每页查询几条数据*/
          limit: 10,
          /*当前页数*/
          page: 1,
        },
        //挂牌单行情
        makerList:{
          rows:[],
          total:0,
        },
        //用于购买数据展示的
        takerReqTemp:{
          calVolume: 0,
          calAmount: 0,
        },
        //申请购买委托的数据
        takerReqData: {
          //挂牌单Id
          makerId: null,
          //单价
          tradePrice: null,
          //数量
          tradeVolume: 0,
          //总额
          tradeAmount: 0,
          //交易密码
          payPassword: '',
        },
        // 交易币种列表
        coinList: [],
        //buy计时器
        buyTimer:null,
        //buy倒计时
        buyTimes:null,
        //是否同意购买协议
        isAgreeBuy:true,
        // 是否显示购买框
        isShowBuy: false,
        //购买选中的卖家数据
        markerData: null,
        //选中的taker标签
        selectTakerTab: 'myUnfinishedTaker',
        //实名验证
        validStatus: null,
        //弹框时间
        lockTime:15,
        //是否商家
        isMerchant: false,
        //是否有支付方式
        hadPayMethod:false,
        //我的法币资产
        asset:null,
        //是否显示实名验证
        isShowRealNameVerification:false,
        //是否显示手机绑定
        isShowPhoneBind:false,
        //是否显示手机验证
        isShowPhoneVerification:false,
        //是否显示提醒添加支付方式
        isShowAddPayType:false,
        //是否显示法律协议
        isShowInstructions:false,
        // takerColumn:[
        //   {label:'单号',name:'1',prop:'takerOrderId'},
        //   {label:'类型',name:'2',prop:'direction'},
        //   {label:'价格',name:'3',prop:'orderPrice'},
        //   {label:'币种',name:'4',prop:'dcCode'},
        //   {label:'数量',name:'5',prop:'orderVolume'},
        //   {label:'金额',name:'6',prop:''},
        //   {label:'状态',name:'7',prop:'orderStatus'},
        //   {label:'对方姓名',name:'8',prop:''},
        //   {label:'建立时间',name:'9',prop:'createTime'},
        //   {label:'操作',name:'10',prop:'operating'},
        // ],
      };
    },
    methods: {
      //更改买卖方向
      changeMakerDirection(direction) {
        if (direction !== this.fbMakerQuery.direction) {
          this.fbMakerQuery.direction = direction;
          this.getMakerList();
        }
      },
      //获取筛选数据
      getFilterData() {
        getFilterData().then(response => {
          if (response.code === 200) {
            let data = response.data;
            // this.options.countryList = data.countryList;
            this.options.currencyList = data.currencyList;
            this.options.payType = data.payType;
            //将筛选数据解析到map中
            if (data.payType && data.payType.length !== 0) {
              for (let i = 0; i < data.payType.length; i++) {
                this.options.payTypeMap[data.payType[i].payTypeId] = data.payType[i].payTypeName;
              }
            }
          }
        })
      },
      //获取我的支付方式
      myPayType() {
        myPayType().then(response => {
          if (response.code === 200) {

          }
        })
      },
      //获取币种列表
      getFbCoinList() {
        getFbCoinList().then(response => {
          if (response.code === 200) {
            let data = response.data;
            this.coinList = data.fbTradeCoinList;
            //默认第一个货币
            this.fbMakerQuery.dcCode = this.coinList[0].dcCode;
            //获取挂牌单市场数据
            this.getMakerList();
          }
        });
      },
      //切换挂牌单选中的币种
      switchCoin(){
        //清空当前挂牌单数据
        this.makerList.rows = [];
        this.makerList.total = 0;
        this.fbMakerQuery.page = 1;
        //获取新的挂牌单数据
        this.getMakerList();
      },
      //获取挂牌单市场数据
      getMakerList(){
        this.makerList.rows = null;
        let dcCodeTemp = this.fbMakerQuery.dcCode;
        let directionTemp = this.fbMakerQuery.direction;
        makerList(this.fbMakerQuery).then(response => {
          if (response.code === 200) {
            //如果异步返回时，币种或购买方向数据已经发生改变，则不使用
            if (dcCodeTemp !== this.fbMakerQuery.dcCode || directionTemp !== this.fbMakerQuery.direction) {
              return;
            }
            response.rows.forEach(item => {
              if (item.availableVolume.toString().includes("e") || item.availableVolume.toString().includes("E")) {
                item.availableVolume = Number.parseFloat(item.availableVolume).toFixed(8);
              }
              if (item.currOrderPrice.toString().includes("e") || item.currOrderPrice.toString().includes("E")) {
                item.currOrderPrice = Number.parseFloat(item.currOrderPrice).toFixed(2);
              }
              if (item.limitMin.toString().includes("e") || item.limitMin.toString().includes("E")) {
                item.limitMin = Number.parseFloat(item.limitMin).toFixed(2);
              }
              if (item.limitMax.toString().includes("e") || item.limitMax.toString().includes("E")) {
                item.limitMax = Number.parseFloat(item.limitMax).toFixed(2);
              }
            });
            this.makerList.rows = response.rows;
            this.makerList.total = response.total;
          }
        });
      },
      // resolvePayType(payTypeData) {
      //   let payTypes = [];
      //   if (payTypeData && this.options.payType && this.options.payType.length !== 0) {
      //     for (let i = 0; i < payTypeData.length; i++) {
      //       payTypes[i] = {
      //         key: payTypeData[i],
      //         name: this.options.payTypeMap[payTypeData[i]],
      //         class: this.options.payTypeMap[payTypeData[i]][0],
      //         bgClass: this.options.payTypeMap[payTypeData[i]][1]
      //       }
      //     }
      //   }
      //   return payTypes;
      // },
      //点击购买，弹出购买框
      buyOrSell(markerData) {
        if (!this.token) {
          //Todo 跳至登录界面回来？？？
          this.$router.push({path: "login"});
          return;
        }
        //是否需要重新获取实名验证结果
        if (this.reGetFbUserInfo()) {
          return;
        }else {
          this.getFbUserInfo();
        }
        //没有实名验证
        if (!this.validStatus) {
          this.showValidTip();
          return;
        }
        //没有绑定手机号
        if (this.user.mobile === null || this.user.mobile === '') {
          this.showPhoneTip(true);
          return;
        }
        //没有开启手机验证
        if (this.user.openPhoneValid !== 1) {
          this.showPhoneTip(false);
          return;
        }
        if (this.isBuyMaker && !this.hadPayMethod) {
          this.showAddPayType();
          return;
        }
        this.markerData= markerData;
        this.takerReqData.payPassword = '';
        this.takerReqData.tradeVolume = 0;
        this.takerReqData.tradeAmount = 0;
        this.takerReqData.makerId = markerData.makerOrderId;
        this.takerReqData.tradePrice = markerData.currOrderPrice;
        this.isShowBuy = true;
        this.startBuyTimer();
        // this.$prompt('请输入购买数量', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   inputValidator: (value) => {
        //     if (!value || value < 0) {
        //       return '数量不正确'
        //     }
        //     if (markerData.availableVolume < value) {
        //       return '超出购买数量'
        //     }
        //     if ((markerData.currOrderPrice * value) < markerData.limitMin) {
        //       return '低于最低购买量'
        //     }
        //     if ((markerData.currOrderPrice * value) > markerData.limitMax) {
        //       return '超出最大购买量'
        //     }
        //     return true;
        //   },
        //   inputErrorMessage: '数量不正确'
        // }).then(({ value }) => {
        //   this.$message({
        //     type: 'success',
        //     message: '正在申请购买数量为: ' + value + '的' + markerData.dcCode
        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消购买'
        //   });
        // });
      },
      startBuyTimer(times = this.lockTime) {
        if (this.buyTimer != null && this.buyTimes > 0) {
          clearInterval(this.buyTimer);
        }
        this.buyTimes = times;
        this.buyTimer = setInterval(() => {
          this.buyTimes--;
          if (this.buyTimes <= 0) {
            clearInterval(this.buyTimer);
            this.buyTimer = null;
            this.isShowBuy = false;
          }
        }, 1000);
      },
      changeVolume(value) {
        if (value !== this.takerReqTemp.calAmount) {
          this.takerReqTemp.calAmount = (this.markerData.currOrderPrice * value).toFixedV(2);
          this.takerReqData.tradeAmount = this.takerReqTemp.calAmount;
        }
      },
      changeAmount(value) {
        if (value !== this.takerReqTemp.calVolume) {
          // if (this.markerData.availableVolume * this.markerData.currOrderPrice < value) {
          //   value = (this.markerData.availableVolume * this.markerData.currOrderPrice).toFixedV(2);
          //   if (value / this.markerData.currOrderPrice < this.maxVolume) {
          //     value = value + 0.01
          //   }
          //   this.takerReqData.tradeAmount = value;
          // }
          this.takerReqTemp.calVolume = (value / this.markerData.currOrderPrice).toFixedV(8);
          //如果购买总额，等于最大购买时，进一步判断，把最大购买量的币给用户
          if (value === this.maxPriceAmount){
            //判断差额是否在单价内，允许0.01误差
            if ((value / this.maxVolume) >= (this.markerData.currOrderPrice - 0.01) && (value / this.maxVolume) <= (this.markerData.currOrderPrice + 0.01)){
              this.takerReqTemp.calVolume = this.maxVolume;
            }
          }
          this.takerReqData.tradeVolume = this.takerReqTemp.calVolume;
        }
      },
      //确定购买订单
      buyOrder() {
        if (this.takerReqData.tradeVolume === undefined || isNaN(this.takerReqData.tradeVolume) ||
          this.takerReqData.tradeAmount === undefined || isNaN(this.takerReqData.tradeAmount)) {
          this.$message({
            type: 'error',
            message: this.$i18n.t('otc.tradeVolumeNotEmpty')
          });
          return
        }
        if (this.isBuyMaker && this.takerReqData.tradeVolume > this.getQuantityAvailable()) {
          this.$message({
            message: this.$i18n.t('otc.insufficientQuantityAvailable'),
            type: 'error',
            center: true
          });
          return
        }
        if (this.takerReqData.tradeAmount < this.markerData.limitMin) {
          this.$message({
            type: 'error',
            message: this.$i18n.t('otc.tradeRightVolume')
          });
          return
        }
        if (this.takerReqData.tradeAmount > this.markerData.limitMax) {
          this.$message({
            type: 'error',
            message: this.$i18n.t('otc.tradeRightVolume')
          });
          return
        }

        if (!this.isAgreeBuy) {
          this.$message({
            type: 'error',
            message: this.$i18n.t('otc.consentToTrade')
          });
          return
        }

        if (!this.isAgreeBuy) {
          this.$message({
            type: 'error',
            message: this.$i18n.t('otc.consentToTrade')
          });
          return
        }
        if (this.takerReqData.payPassword.length < 6) {
          this.$message({
            message: this.$i18n.t('fund.paypassword'),
            type: 'error',
            center: true
          });
          return
        }
        let $this = this;
        // let tempDcCode = $this.fbMakerQuery.dcCode;
        // let tempTradeVolume = $this.takerReqData.tradeVolume;
        buyOrder($this.takerReqData).then(response => {
          if (response.code === 200) {
            $this.getFbUserInfo();
            // $this.asset[tempDcCode] = Number.parseFloat($this.asset[tempDcCode]).toFixed(8) - tempTradeVolume;
            if (this.selectTakerTab !== 'myUnfinishedTaker') {
              this.selectTakerTab = 'myUnfinishedTaker';
            }
            let record = response.data;
            $this.$message({
              type: 'success',
              message: this.$i18n.t('otc.successfulAcceptance')
            });
            $this.getMakerList();
            $this.$refs.myUnfinishedTaker.myTakeList();
            $this.isShowBuy = false;
            if (this.isBuyMaker) {
              //todo 是否加其他提示
            }else {
              $this.$refs.myUnfinishedTaker.showPayType(record);
            }

            // location.reload(); // 为了重新实例化vue-router对象 避免bug
            // this.$alert('委托成功', '请付款', {
            //   confirmButtonText: '确定',
            //   callback: action => {
            //     this.isShowBuy = false;
            //   }
            // });
          }
        })
      },
      handleClickTakerTab(tab, event) {
        if (tab.label === this.$i18n.t('otc.more')) {
          this.goMyTakerList();
        } else if (tab.label === this.$i18n.t('otc.incompleteOrders')) {
          this.$refs.myUnfinishedTaker.myTakeList();
        } else if(tab.label === this.$i18n.t('otc.orderCompleted')){
          this.$refs.orderCompletedTaker.myTakeList();
        } else if (tab.label === this.$i18n.t('otc.cancelledOrder')) {
          this.$refs.cancelOrderTaker.myTakeList();
        }  else if (tab.label === this.$i18n.t('otc.iPosted')) {
          this.$refs.iPostedMaker.myMakerList();
        }
      },
      //查看我的订单
      goMyTakerList() {
        this.$router.push({name: "myTakerList"});
      },
      //获取用户信息
      getFbUserInfo() {
        getFbUserInfo().then((response) => {
          if (response.code === 200) {
            this.validStatus = (response.data.validStatus === 2);
            this.lockTime = response.data.lockTime;
            this.isMerchant = response.data.isMerchant;
            this.hadPayMethod = response.data.hadPayMethod;
            this.asset = response.data.asset;
          }
        })
      },
      //是否需要重新获取用户信息
      reGetFbUserInfo() {
        if (this.validStatus == null || this.isMerchant == null) {
          this.$message({
            type: 'warning',
            message:this.$i18n.t('otc.ettingInformation')
          });
          this.getFbUserInfo();
          return true;
        }
        return false;
      },
      goBusinessEntrust() {
        let $this = this;
        if (!$this.token) {
          //Todo 跳至登录界面回来？？？
          $this.$router.push({path: "login"});
          return;
        }
        if ($this.reGetFbUserInfo()) {
          return;
        }
        if ($this.validStatus) {
            $this.judgeMerchant();
        } else {
          $this.showValidTip();
        }
      },
      //判断是否是商家
      judgeMerchant(){
        if (this.isMerchant) {
          this.$router.push({name: "businessEntrust"});
        } else {
          this.$message({
            type: 'warning',
            message:this.$i18n.t('otc.becomeABusiness')
          });
        }
      },
      //提示实名验证
      showValidTip() {
        this.isShowRealNameVerification = true;
      },
      //去实名验证
      goUserAuth() {
        this.isShowRealNameVerification = false;
        this.$router.push({name: "userauth"});
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
      getVipClass(level) {
        return 'v' + level + ' ' + 'el-icon-v'
      },
      // changeCountry(countryCode) {
      //   for (let i = 0; i < this.options.countryList.length; i++) {
      //     let item = this.options.countryList[i];
      //     if (item.countryCode === countryCode) {
      //       if (item.currency){
      //         this.fbMakerQuery.currencySymbol = item.currency;
      //       }
      //       break;
      //     }
      //   }
      // },
      getQuantityAvailable() {
        if (this.asset == null) {
          return 0;
        }
        let count = this.asset[this.fbMakerQuery.dcCode];
        if (count != null) {
          return Number.parseFloat(count).toFixed(8);
        }
        return 0;
      },
      //转账
      goTransfer() {
        this.$router.push({name: "otcaccount"});
      },
      //提示添加支付方式
      showAddPayType() {
        this.isShowAddPayType = true;
      },
      //添加支付方式
      goAddPayType() {
        this.isShowPhoneVerification = false;
        this.$router.push({name: "paymentMethod"});
      },
      showTradingInstruction(value) {
        this.isShowInstructions = value;
      },
      // clickShowValidTip() {
      //   let $this = this;
      //   $this.$confirm('您需要实名验证，才能发布委托, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     $this.$router.push({name: "userauth"});
      //   }).catch(() => {
      //     $this.$message({
      //       type: 'info',
      //       message: '已取消操作'
      //     });
      //   });
      // },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";

</style>
