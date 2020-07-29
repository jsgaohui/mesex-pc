<template>
  <div class="page_finance flex-space-t">
    <!--左侧导航-->
    <div class="left-nav">
      <!--<h2><span>Assets><i>&gt;</i></span><span>Deposit & withdraw</span></h2>-->
      <!--<ul>-->
      <!--<li class="active"><a href="">币币账户</a></li>-->
      <!--&lt;!&ndash;<li><a href="">法币账户</a></li>&ndash;&gt;-->
      <!--<li><a href="">跟单账户</a></li>-->
      <h2>{{$t('common.assets')}}</h2>
      <ul>
        <!--<li><router-link to="otcaccount">{{$t('fund.fbAccount')}}</router-link></li>-->
        <li class="active"><a >{{$t('fund.bbAccount')}}</a></li>
        <!--<li><router-link to="fundaccount">{{$t('fund.fundAccount')}}</router-link></li>-->
      </ul>
    </div>
    <!--左侧导航END-->
    <!--右侧内容-->
    <div class="right-con"><section>
      <div class="crumbs_top">

        <div class="right">{{$t('assets.accounTotal')}}： <span id="my_balance_total" class="font_arial">{{totalAmount.toFixed(2)}}</span>
          <span class="upper">{{sellteMarket}}</span><span
            class="ticker-transform font_arial"> ≈ {{formatAmount(convertTotalAmount)}} {{currencyRate}}</span>

          <input @click="showAvailable" :checked="ischecked" id="changeListState" class="small"
                 action="changeListState" type="checkbox">
          <label style="margin-left:5px;" for="changeListState">{{$t('assets.hiddenZero')}}</label>

          <label class="filter-control nofocus">
            <input class="filter-input uppercase" @keyup="searchSymbol" v-model="searchKey" type="text" maxlength="6">
            <button class="btn-clear-input" @click="searchSymbol"><i class="hb_icon_clear"></i></button>
            <i class="hb_icon_search"></i></label>
          <span class="head-group"><router-link to="finanrec">{{$t('assets.financialRecords')}}</router-link>
                                     <router-link to="withdraw">{{$t('assets.withdrawaddressManagement')}}</router-link></span>
        </div>
      </div>

      <section class="container-content">
        <!--交易账户-->
        <div class="table-container content-item" style="display: block">

          <div class="body">
            <table class="table finance-table align_right">
              <thead>
              <tr>
                <th width="15%" class="text-left">{{$t('assets.coin')}}</th>
                <th width="30%">{{$t('assets.available')}}</th>
                <th  width="35%">{{$t('assets.frozen')}}</th>
                <th  width="20%">{{$t('common.operation')}}</th>
              </tr>
              </thead>
              <tbody class="table-top-list">
              <tr v-for="item in findmarketList" :id="item.dcCode">
                <td class="uppercase text-left">{{item.dcCode}}</td>
                <td>{{item.availableAmount}} ≈{{formatAmount(Number.parseFloat((symbolLastPrices[item.dcCode + "/" + sellteMarket]?symbolLastPrices[item.dcCode + "/" + sellteMarket]:0 )*item.availableAmount*exchangeRate)) }}{{currencyRate}}</td>
                <td>{{item.freezeAmount}}≈{{formatAmount(Number.parseFloat((symbolLastPrices[item.dcCode + "/" + sellteMarket]?symbolLastPrices[item.dcCode + "/" + sellteMarket]:0 )*item.freezeAmount*exchangeRate)) }}{{currencyRate}}</td>
                <td>
                  <button  v-if="item.canRecharge===0" class="btn btn-small primary" @click="rechargeCoin(item.dcCode)">
                    {{$t('assets.recharge')}}
                  </button>
                  <button class="btn btn-small primary" v-else disabled="true">
                    {{$t('assets.recharge')}}
                  </button>
                  <button v-if="item.canWithdraw===0" class="btn btn-small primary"  @click="extractCoin(item.dcCode)">
                    {{$t('assets.withdraw')}}
                  </button>
                  <button class="btn btn-small primary" v-else disabled="true">
                    {{$t('assets.withdraw')}}
                  </button>
                  <!--<dl class="to-exchange">
                    <dt><a href="javascript:void(0);">交易</a></dt>
                  </dl>-->
                </td>
              </tr>
              <!--<extract v-if="extractBtn!==''"  v-bind:extract-info="extractInfo" v-show="extractShow"></extract>
              <recharge v-if="rechargeBtn!==''"   v-bind:recharge-info="rechargeInfo" v-show="rechargeShow"></recharge>-->
              </tbody>
            </table>
            <div class="four-line"></div>
            <table class="table finance-table align_right">
              <!--<thead>-->
              <!--<tr>-->
              <!--<th width="15%" class="text-left">{{$t('assets.coin')}}</th>-->
              <!--<th width="30%">{{$t('assets.available')}}</th>-->
              <!--<th  width="35%">{{$t('assets.frozen')}}</th>-->
              <!--<th  width="20%">{{$t('common.operation')}}</th>-->
              <!--</tr>-->
              <!--</thead>-->
              <tbody class="table-top-list">
              <tr v-for="item in findSymbolList" :id="item.dcCode">
                <td width="15%" class="uppercase text-left">{{item.dcCode}}</td>
                <td width="30%">{{item.availableAmount}} ≈{{formatAmount(Number.parseFloat((symbolLastPrices[item.dcCode + "/" + sellteMarket]?symbolLastPrices[item.dcCode + "/" + sellteMarket]:0 )*item.availableAmount*exchangeRate)) }}{{currencyRate}}</td>
                <td width="35%">{{item.freezeAmount}}≈{{formatAmount(Number.parseFloat((symbolLastPrices[item.dcCode + "/" + sellteMarket]?symbolLastPrices[item.dcCode + "/" + sellteMarket]:0 )*item.freezeAmount*exchangeRate)) }}{{currencyRate}}</td>
                <td  width="20%">
                  <button class="btn btn-small primary" v-if="item.canRecharge===0" @click="rechargeCoin(item.dcCode)">
                    {{$t('assets.recharge')}}
                  </button>
                  <button class="btn btn-small primary" v-else disabled="true">
                    {{$t('assets.recharge')}}
                  </button>
                  <button class="btn btn-small primary" v-if="item.canWithdraw===0" @click="extractCoin(item.dcCode)">
                    {{$t('assets.withdraw')}}
                  </button>
                  <button class="btn btn-small primary" v-else disabled="true">
                    {{$t('assets.withdraw')}}
                  </button>
                  <!--<dl class="to-exchange">
                    <dt><a href="javascript:void(0);">交易</a></dt>
                  </dl>-->
                </td>
              </tr>
              <!--<extract v-if="extractBtn!==''"  v-bind:extract-info="extractInfo" v-show="extractShow"></extract>
              <recharge v-if="rechargeBtn!==''"   v-bind:recharge-info="rechargeInfo" v-show="rechargeShow"></recharge>-->
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </section></div>


    <tr v-show="rechargeShow" class="finance_item" id="rechargeId">
      <td colspan="4" class="align_left">
        <div class="table-inner action-box open" style="padding-top:10px;"><i class="angle" style="right:130px;"></i>
          <div class="link-name" v-if="clickSymbol==='USDT'">
            <p class="describe">{{$t('trade.chainname')}}</p>
            <div>
              <span v-for="item in usdtArray" :class="item===protocolType?'on':''"
                  @click="rechargeCoin(clickSymbol,item)">{{item}}<i v-if="item===protocolType"
                                                                     class="el-icon-linkname"></i></span>
            </div>
          </div>
          <p class="describe">{{$t('assets.rechargeAddress')}}</p>
          <div class="action-inner flex-x-start" style="height:initial;padding:10px 0px;">

            <div class="title flex-x-start" style=" align-items:flex-start;flex-direction:column;padding-left:0">
              <div class="flex-x-start">
              <span class="copy">{{rechargeInfo.userAddress}}</span>
              <a href="javascript:;" class="link-copy copyBtn"
                 @click="handleCopy(rechargeInfo.userAddress,$event)">{{$t('assets.copy')}}</a>
              <!-- <a  class="link-qrcode" href="javascript:;" action="showQRcode" stop="1">{{$t('assets.qrCode')}} -->
              <!--<a  class="link-qrcode" href="javascript:;" >{{$t('assets.qrCode')}}-->
              <div class="show-qrcode" id="showQRcode"></div>
              </div>
              <div style="padding-top:20px;line-height:34px;" v-if="rechargeInfo.tag">
                <div>{{$t('assets.tag')}} <span style="color:#ff0000">({{$t('assets.important')}}) </span>
                <span style="margin-left:20px;">{{rechargeInfo.tag}}</span>  <a href="javascript:;" class="link-copy copyBtn"
                                                @click="handleCopy(rechargeInfo.tag,$event)">{{$t('assets.copy')}}</a></div>
              </div>
            </div>
            <p class="subtitle" style="margin-left:40px;">{{$t('assets.see')}}
              <router-link to="finanrec">{{$t('assets.rechargeRecords')}}</router-link>
              {{$t('assets.trackStatus')}}
            </p>
          </div>
          <div class="action-content">
            <div class="action-body">
              <p v-html="rechargeInfo.remark"></p>
            </div>
          </div>
        </div>
      </td>
    </tr>

    <tr v-show="extractShow" class="finance_item" id="extractId">
      <td colspan="4" class="align_left">
        <div class="table-inner action-box"><i class="angle" style="right:80px;"></i>
          <div class="loading" style="display: none;"><!--<img src="@/assets/fonts/loading.svg">--></div>
<!--          <div class="risk-tips">-->
<!--            <i class="el-icon-info"></i>-->
<!--            <p>风险提示<br>您的风险提示一旦完成，</p>-->
<!--          </div>-->
          <div class="link-name" v-if="clickSymbol==='USDT'">
            <p class="describe">{{$t('trade.chainname')}}</p>
            <div>
              <span v-for="item in usdtArray" :class="item===protocolType?'on':''"
                  @click="extractCoin(clickSymbol,item)">{{item}}<i v-if="item===protocolType"
                                                                     class="el-icon-linkname"></i></span>
            </div>
          </div>
          <div class="withdraw-inner">

            <p class="describe">{{$t('assets.withdrawAddress')}}</p>
            <div style="border-top:1px solid #384172;padding-top:20px;">
              <div class="form-group">
                <label>{{$t('assets.withdrawAddress')}}：</label>
                <div class="control-input-group">
                  <input class="form-control control-address" type="text" :readonly="isReadOnly" v-model="extractInfo.userAddress"
                         v-focus="isFocus" maxlength="50" @click="getAddressByDcCode(clickSymbol)" @keyup.delete="backSpaceClick" @blur="showAddressBlur">
                  <span class="input-group-addon addon-tag uppercase">{{clickRemark}}</span>
                </div>

              </div>
              <ul v-show="showAddressList"  v-if="withdrawAddressList.length" class="address-list">
                <li v-for="item in withdrawAddressList" @click="selectOneItem(item.withdrawAdd,item.remark)" @mouseover="isBlur=false" @mouseout="isBlur=true;isFocus=false">{{item.withdrawAdd}}<span>{{item.remark}}</span></li>
              </ul>
            </div>
            <!--v-if="clickSymbol==='XRP'"-->
<div class="form-group" style="height:95px;line-height:30px;" v-if="clickSymbol==='XRP'">
  <label style="padding-top:45px;">{{$t('assets.tag')}}：</label>
  <div class="control-input-group">
    <div class="flex-space" style="font-size:12px;"><span style="color:#ff0000">（{{$t('assets.mustread')}}）</span>
      <span>{{$t('assets.what')}}<el-popover
        placement="top"
        width="200"
        trigger="hover"
        :content="$t('assets.desp')">
                      <i class="el-icon-info"  slot="reference"></i>
                    </el-popover></span></div>
    <input class="form-control control-address" type="text" v-model="extractInfo.tag" maxlength="10">

  </div>
</div>
            <div class="form-group flex-box">
              <div class="left">
                <label>{{$t('assets.available')}}(<span>{{clickSymbol}}</span>)：</label>
                <div class="input-group"><input disabled="disabled" maxlength="20" type="text" class="form-control form-out-amount" :value="extractInfo.availableAmount">
                  <span class="uppercase">{{$t('assets.quota')}}：{{extractInfo.withdrawQuota}}</span>
                </div>
              </div>
              <div class="right">
                <label> {{$t('assets.volume')}}(<span>{{clickSymbol}}</span>)：</label>
                <div class="control-input-group">
                  <input type="text"   v-model="extractInfo.tradeAmount"  class="form-control control-address"  @input="changeCharge"  @keydown="keydownCode(8,$event)" maxlength="20">
                  <div class="math_price"><em> ≈{{formatAmount(Number.parseFloat((symbolLastPrices[clickSymbol + "/" + sellteMarket]?symbolLastPrices[clickSymbol + "/" + sellteMarket]:0)*extractInfo.tradeAmount*exchangeRate))}} {{currencyRate}}</em></div></div>
              </div>
            </div>


            <div class="form-group flex-box">
              <div class="left">
                <label>{{$t('assets.charge')}}(<span>{{clickSymbol}}</span>)：</label>
                <div class="input-group">
                  <input disabled="disabled" maxlength="20" type="text" :value="chargeAmount"
                         class="form-control form-out-amount">

                </div>
              </div>
              <div class="right">
                <label>{{$t('assets.arrivalVolume')}}(<span>{{clickSymbol}}</span>)：</label>
                <div class="input-group">
                  <input disabled="disabled" maxlength="20" type="text" class="form-control form-out-amount" :value="arrival">

                </div>
              </div>
            </div>

            <div class="action-foot">
              <button id="withdrawSubmit" class="btn btn-primary" @click="withdrawSubmit">{{$t('assets.withdraw')}}</button>
            </div>

          </div>

          <div class="action-content pt10">
            <div class="action-body">
              <p v-html="extractInfo.remarks"></p>
            </div>

          </div>
          <!--<div class="action-body"><p>-->
          <!--<p>温馨提示</p>-->

          <!--<p>• 最小提币数量为：100 CCASH。</p>-->
          <!--<p>• 为保障资金安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</p>-->
          <!--<p>• 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>-->
          <!--</div>-->
        </div>
      </td>
    </tr>

    <el-form autoComplete="on" :model="extractInfo" :rules="VerificationCodeRules" ref="VerificationCodeForm" class="form_set"
             label-position="left">
      <!--弹出窗口开始-->
      <div class="dialog_wrap" style="display: block;" v-show="showDialog">
        <div class="dialog">
          <div class="dia_tit">
            <div><b>{{$t('common.smsCode')}}</b><span class="close" @click="showDialog=false;buttonStatus=false;">×</span></div>
            <p data="dia_title" class="dia_tit_more"></p>
          </div>
          <div class="dia_content">
            <!--手机验证-->
            <div class="group reg_phone_show" v-show="showDialogMobile">
              <el-form-item prop="mobileCode" :label="user.mobile?substrCard:''">
                <div class="group">
                  <send-sms-code   :phone="mobile"  :send-msg-type="12"  :send-type="'1'" v-model="extractInfo.mobileCode"></send-sms-code>
                </div>
              </el-form-item>
            </div>
            <!--邮箱验证-->
            <div class="group reg_mail_show" v-show="showDialogEmail">
              <el-form-item prop="emailCode" :label="$t('common.emailCode')">
                <div class="group">
                  <send-sms-code   :phone="email"  :send-msg-type="12"  :send-type="'2'" v-model="extractInfo.emailCode"></send-sms-code>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="dia_submit"><span class="error_notice"></span>
            <el-button @click="withdrawSubmitRequest" :disabled="buttonStatus">{{$t('register.sendSms')}}</el-button>

            <!--<button class="btn btn_submit btn-primary" pro_name="btn_submit" @click="addAddressRequest"> </button>-->
          </div>
        </div>
        <div class="dialog_extra"></div>
      </div>
      <!--弹出窗口结束-->
    </el-form>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import {symbolCapital, bindAddress, withdrawals, withdrawReq, checkAddress,calBalance,getAddressByDcCode} from "../../api/account";
  import clip from '../../utils/clipboard'
  import {escape2Html,scientificToNumber,strString,checkCode} from "../../utils/stringUtil";
  import SendSmsCode from "../common/sendSmsCode";
  import QRCode from 'qrcodejs2';
  import {reloadRate,onAction,removeListenRuner} from '@/utils/quotation'

  export default {
    components: {SendSmsCode},
    name: "index",
    // components:{extract,recharge},
    data() {
      const validMobileCode= (rule, value, callback) => {
        if(this.isValidPhone===1){
          if (value.length!==6) {
            callback(new Error( this.$i18n.t('valid.msgcode')))
          }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
            callback(new Error( this.$i18n.t('valid.msgcode')))
          } else {
            callback()
          }
        }else{
          callback()
        }
      }
      const validEmailCode= (rule, value, callback) => {
        if(this.isValidEmail===1){
          if (value.length!==6) {
            callback(new Error( this.$i18n.t('valid.msgcode')))
          }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
            callback(new Error( this.$i18n.t('valid.msgcode')))
          } else {
            callback()
          }
        }else{
          callback()
        }
      }
      return {
        searchKey: '',
        sellteMarket: '',////基准结算市场
        loadingFlag: false,//加载条
        rechargeShow: false,
        extractShow: false,
        protocolType: 'ERC20',
        rechargeInfo: {
          userAddress: '',
          tag:'',
          remarks: ''
        },
        extractInfo: {
          remarks: '',
          availableAmount: 0,//可用金额
          limitWithdraw: 0, //最小提币量限额
          withdrawQuota:0,//限制提币金额
          userAddress: '',//提现地址
          tradeAmount: 0, //提现金额
          chargeAmount: 0, //提现手续费金额
          arrivalAmoumt: 0,//到账金额,
          chargeType:1,//按固定金额 ,2按比列
          chargeScale:0,//按比例时所收取的比例
          symbol: '',
          mobileCode: '',
          emailCode: '',
          tag: '',
          protocolType:''
        },
        lastPrices: {},
        symbolLastPrices:{},
        accountList: [],//交易币集合
        marketAccountList:[],//市场币集合
        findSymbolList: [], //交易币检索集合
        findmarketList:[],//市场币检索集合
        extract: 'extract',
        ischecked: false,
        // basicSymbol:'USDT',
        // tradeSymbol:'BTC',
        totalAmount: 0,//总资金
        exchangeRate: 1, //实时汇率
        interval:0,//定时器id
        clickSymbol: '',//点击的代币,
        currencyRate:'',//货币代码
        withdrawAddressList:[],
        clickRemark: null,
        isReadOnly:false,//是否只读
        isBlur:true,//是否触发光标离开事件
        isFocus:false,//是否触发获取焦点事件
        showAddressList:false,
        mobile:null,
        email:null,
        isValidPhone:null,//是否已开启手机验证
        isValidEmail:null,//是否已开启邮箱验证
        showDialog:false,
        showDialogMobile:false,
        showDialogEmail:false,
        buttonStatus:false,
        VerificationCodeRules: {
          mobileCode: [{required: true,trigger: 'click',validator:validMobileCode}],
          emailCode: [{required: true,trigger: 'click',validator:validEmailCode}]
        },
        usdtArray: ['ERC20', 'OMNI']
      }
    },
    computed: {
      ...mapGetters(['user']),
      substrCard:function () {
        if(this.user.mobile){
          return strString(this.user.mobile);
        }
      },
      arrival() {
        if(this.extractInfo.tradeAmount){
          return this.extractInfo.arrivalAmoumt = this.extractInfo.tradeAmount - this.extractInfo.chargeAmount;
        }
        return 0;
      },
      convertTotalAmount() {
        return (this.totalAmount * this.exchangeRate).toFixed(2);
      },
      chargeAmount(){
        return scientificToNumber(this.extractInfo.chargeAmount);
      },
    },
    created() {
      this.getList();
      removeListenRuner('reloadQuotation')
      removeListenRuner('reloadSymbolKline')
      removeListenRuner('reloadOrders')
      removeListenRuner('fbOrders')
      removeListenRuner('reloadGearQuotation')
      reloadRate()
      let $this=this
      onAction('reloadRate',(rsp)=> {  //实时行情
        let rateList=rsp.list
        for(let i=0;i<rateList.length;i++){
          if(rateList[i].currencyName==='USD'+$this.currencyRate){
            let rateMap = rateList[i].rateMap;//包含usdt,goldt对currencyRate的汇率
            $this.exchangeRate=rateMap[$this.sellteMarket];//基准市场汇率;如果当前是人民币,基准市场是goldt,这个就是goldt/人民币的汇率
          }
        }
      })
      this.interval=window.setInterval(()=>{ this.calBalance()}, 10000)
    }, methods: {
      keydownCode(len,e){
        checkCode(len,e)
      },
      getList() {
        let $this = this;
        symbolCapital().then((response) => {
          if (response.code === 200) {
            var data = response.data;
            $this.lastPrices = data.lastPrices;
            $this.accountList = data.accountList;
            $this.marketAccountList = data.marketAccountList;
            $this.currencyRate=data.currencyRate;
            $this.findSymbolList = $this.accountList.slice(0);
            $this.findmarketList=$this.marketAccountList.slice(0);
            $this.sellteMarket = data.sellteMarket;
            var cachePrices = data.lastPrices;
            var rateList=data.rateList;
            //验证码信息
            $this.mobile=data.mobile;
            $this.email=data.email;
            $this.isValidPhone=data.isValidPhone;
            $this.isValidEmail=data.isValidEmail;
            if(rateList){
              for(let i=0;i<rateList.length;i++){
                if(rateList[i].currencyName==='USD'+$this.currencyRate){
                  let rateMap = rateList[i].rateMap;//包含usdt,goldt对currencyRate的汇率
                  $this.exchangeRate=rateMap[$this.sellteMarket];//基准市场汇率;如果当前是人民币,基准市场是goldt,这个就是goldt/人民币的汇率
                  //$this.exchangeRate=rateList[i].currencyRate;
                }
              }
            }
            // for(let i = 0 ;i < cachePrices){
            //
            // }



            $this.totalAmount = 0;
            var mergeAccountList=[];
            mergeAccountList.push.apply(mergeAccountList,data.accountList);
            mergeAccountList.push.apply(mergeAccountList,data.marketAccountList);
            for (let i = 0; i < mergeAccountList.length; i++) {
              var symbolData = mergeAccountList[i];
              var curPrice = cachePrices[symbolData.dcCode + "/" + data.sellteMarket];
              var lastPrice=0;
              if(!curPrice){
                curPrice=cachePrices[data.sellteMarket + "/" + symbolData.dcCode];
                if(curPrice){
                  lastPrice=1/curPrice.lastPrice;
                }
              }else{
                lastPrice=curPrice.lastPrice;
              }
              if(  symbolData.dcCode  === data.sellteMarket){
                $this.symbolLastPrices[symbolData.dcCode + "/" + data.sellteMarket] = 1.0;
              }else{
                $this.symbolLastPrices[symbolData.dcCode + "/" + data.sellteMarket] = lastPrice;
              }
              if (cachePrices) {
                if (lastPrice!==0) {
                  $this.totalAmount += symbolData.totolAmount * lastPrice;
                }
                if(symbolData.dcCode===$this.sellteMarket){
                  $this.totalAmount += symbolData.totolAmount;
                }
              }
            }
          }
        });
      },
      searchSymbol() {
        this.rechargeShow = false;
        this.extractShow = false;
        if (this.searchKey) {
          var oldList = this.accountList;
          this.findSymbolList = [];
          for (let i = 0; i < oldList.length; i++) {
            if (oldList[i].dcCode.toUpperCase().indexOf(this.searchKey.toUpperCase()) === 0) {
              this.findSymbolList.push(oldList[i]);
            }
          }
          var oldMarketList = this.marketAccountList;
          this.findmarketList = [];
          for (let i = 0; i < oldMarketList.length; i++) {
            if (oldMarketList[i].dcCode.toUpperCase().indexOf(this.searchKey.toUpperCase()) === 0) {
              this.findmarketList.push(oldMarketList[i]);
            }
          }
        } else {
          if (this.findSymbolList.length !== this.accountList.length) {
            this.findSymbolList = this.accountList.slice(0);
          }
          if(this.findmarketList.length!==this.marketAccountList.length){
            this.findmarketList=this.marketAccountList.slice(0);
          }
        }
      },
      calBalance() { //获取余额计算
        let $this = this;
        calBalance().then((response) => {
          if (response.code === 200) {
            var data = response.data;
            $this.lastPrices = data.lastPrices;
            var cachePrices = data.lastPrices
            var availableList = data.availableList;
            if (availableList) { //计算净资产
              $this.totalAmount = 0;
              for (let i = 0; i < availableList.length; i++) {
                var account = availableList[i];
                var itemKey = account.dcCode;
                var itemValue = account.availableAmount;
                if (cachePrices) {
                  var curPrice = cachePrices[itemKey + "/" + $this.sellteMarket]
                  if (curPrice) {
                    $this.totalAmount += account.totolAmount * curPrice.lastPrice;
                  }
                }
                if(itemKey===$this.sellteMarket){
                  $this.totalAmount += account.totolAmount;
                }
              }
            }
          }
        })
      },
      showAvailable() {
        this.rechargeShow = false;
        this.extractShow = false;
        this.ischecked = !this.ischecked;
        if (this.ischecked) {
          this.changeListState = 'changeListState';
          for (let i = 0; i < this.findSymbolList.length;) {
            if (this.findSymbolList[i].totolAmount === 0) {
              this.findSymbolList.splice(i, 1);
              i = 0;
            } else {
              i++;
            }
          }
        } else {
          this.changeListState = '';
          this.findSymbolList = this.accountList.slice(0);
        }
      },
      rechargeCoin(symbol, publicChain) {
        let $this = this;
        this.rechargeInfo = {};
        this.extractShow = false;
        if (publicChain) {
          this.protocolType = publicChain
          this.clickSymbol=publicChain
        }
        if (!this.rechargeShow || this.clickSymbol !== symbol) {
          bindAddress(symbol, this.protocolType).then((result) => {
            if (result.code === 200) {
              if (result.data) {
                let userAddress=result.data.userAddress
                if(result.data.tag){
                  userAddress=result.data.userAddress+"_"+result.data.tag
                }
                checkAddress(symbol, userAddress, $this.protocolType).then((response) => {
                  if (response.code === 200) {
                    if (response.data.exists === 1) {
                      $this.rechargeInfo = result.data;
                      $this.rechargeInfo.remark = escape2Html(result.data.remark);
                      //生成二维码
                      $this.showQRcode( $this.rechargeInfo.userAddress);

                      // var qrcode = new QRCode(document.querySelector("#showQRcode"), {
                      //   width : 100,
                      //   height : 100,
                      //   // useSVG: true
                      // });
                      // qrcode.makeCode($this.rechargeInfo.userAddress);
                      // document.querySelector("#" + symbol).after(document.querySelector("#rechargeId"));
                      this.insertAfter(document.getElementById(symbol), document.getElementById("rechargeId"))

                    }
                  }
                  if (this.clickSymbol === symbol) {
                    this.rechargeShow = !this.rechargeShow;
                  } else {
                    this.rechargeShow = true;
                  }
                  this.clickSymbol = symbol;
                })
              }
            } else {
              this.rechargeShow = false;
            }
          })
        }else{
          this.rechargeShow=false;
        }
      },
      insertAfter(target_element, insert_element) {
        var parent = target_element.parentNode;
        //最后一个子节点 lastElementChild兼容其他浏览器 lastChild  兼容ie678;
        var last_element = parent.lastElementChild || parent.lastChild;
        //兄弟节点同样也是有兼容性
        var target_sibling = target_element.nextElementSibling || target_element.nextSibling;

        if (last_element == target_element) {//先判断目标节点是不是父级的最后一个节点，如果是的话，直接给父级加子节点就好
          parent.appendChild(insert_element)
        } else {//不是最好后一个节点  那么插入到目标元素的下一个兄弟节点之前（就相当于目标元素的insertafter）
          parent.insertBefore(insert_element,target_sibling);
        }
      },
      extractCoin(symbol,publicChain) {
        let $this = this;
        this.extractInfo = {};
        this.rechargeShow = false;
        this.clickRemark = '';//清空提币备注
        this.withdrawAddressList = [];//清空地址列表
        this.isReadOnly = false;//可录入
        if (publicChain) {
          this.protocolType = publicChain
          this.clickSymbol=publicChain
        }
        if (!this.extractShow || this.clickSymbol !== symbol) {
          withdrawReq(symbol, this.protocolType).then((result) => {
            if (result.code === 200) {
              var data = result.data;
              if (data) {
                $this.extractInfo = data;
                if(data.chargeType===2){ //按比列收取时
                  $this.extractInfo.chargeScale=data.chargeAmount; //赋值比例
                  $this.extractInfo.chargeAmount=0; //设置当前 手续费为0
                }
                if (data.remarks) {
                  $this.extractInfo.remarks = escape2Html(data.remarks);
                }
                // document.querySelector("#" + symbol).after(document.querySelector("#extractId"));
                this.insertAfter(document.getElementById(symbol), document.getElementById("extractId"))
              }
              if (this.clickSymbol === symbol) {
                this.extractShow = !this.extractShow;
              } else {
                this.extractShow = true;
              }
              this.clickSymbol = symbol;
            } else {
              this.extractShow = false;
            }
          })
        }else {
          this.extractShow = false;
        }
      },
      withdrawSubmit() {
        let $this = this;
        this.extractInfo.symbol = this.clickSymbol;
        if (!this.extractInfo.userAddress) {
          $this.$message({
            message: $this.$i18n.t('assets.addressnotNull'),
            type: 'error',
            center: true
          })
          return;
        } else if (this.extractInfo.tradeAmount <= 0) {
          $this.$message({
            message: $this.$i18n.t('assets.volumeError'),
            type: 'error',
            center: true
          })
          return;
        } else if (this.extractInfo.tradeAmount > this.extractInfo.availableAmount) {
          $this.$message({
            message:  $this.$i18n.t('assets.gtavailable'),
            type: 'error',
            center: true
          })
          return;
        }else if((this.extractInfo.tradeAmount-this.extractInfo.chargeAmount)<=0){
          $this.$message({
            message:  $this.$i18n.t('assets.chargenotenough'),
            type: 'error',
            center: true
          })
          return;
        }else if(this.extractInfo.tradeAmount<this.extractInfo.limitWithdraw){
          $this.$message({
            message:  $this.$i18n.t('assets.coinmin'),
            type: 'error',
            center: true
          })
          return;
        }else if(this.extractInfo.tradeAmount>this.extractInfo.withdrawQuota){
          $this.$message({
            message:  $this.$i18n.t('assets.coinmax'),
            type: 'error',
            center: true
          })
          return;
        }
        this.showDialog = true;
        if(this.isValidPhone===1){
          this.showDialogMobile = true;
        }
        if(this.isValidEmail===1){
          this.showDialogEmail = true;
        }
      },
      withdrawSubmitRequest(){//验证码通过后发送请求
        let $this = this;
        this.buttonStatus = true;
        this.extractInfo.protocolType=this.protocolType
        withdrawals($this.extractInfo).then((result) => {
          if (result.code === 200) {
            this.showDialog = false;
            $this.$message({
              message:$this.$i18n.t('assets.resend'),
              type: 'success',
              duration: 5000,
              center: true,
              onClose: function () {
                $this.buttonStatus=false;
                $this.$router.push({name: 'finanrec', params: {activeName: 'withdraw'}});
              }
            })
          }else{
            this.buttonStatus=false;
          }
        })
      },
      changeCharge(){
        if(this.extractInfo.chargeType===2){
          this.extractInfo.chargeAmount=Number.parseFloat(this.extractInfo.tradeAmount*this.extractInfo.chargeScale).toFixed(8);
        }
      },
      handleCopy(text, event) {
        clip(text, event)
      },
      showQRcode(text){
        var qrCodeElement = document.querySelector("#showQRcode");
        // 先删除之前的
        if(qrCodeElement.getElementsByTagName('img').length>0){
          qrCodeElement.removeChild(qrCodeElement.children[1]);
          qrCodeElement.removeChild(qrCodeElement.children[0]);
        }
        var qrCodeElement = document.querySelector("#showQRcode");
        if(qrCodeElement.getElementsByTagName('img').length==0){
          var qrcode = new QRCode(qrCodeElement, {
            width : 100,
            height :100,
            correctLevel : QRCode.CorrectLevel.L
            //useSVG: true
          });
          // let qrcode = new window.QRCode(qrCodeElement, {
          //   width: 120,
          //   height: 120,
          // })
          qrcode.makeCode(text);
        }
      },
      // websocket 连接
      getAddressByDcCode(dcCode){
        let $this = this;
        $this.showAddressList = true;
        if (!$this.withdrawAddressList.length) {//为空时才向后台请求
          getAddressByDcCode($this.clickSymbol,dcCode==='USDT'?this.protocolType:'').then((response) => {
            if (response.code === 200) {
              $this.withdrawAddressList = response.data.resultList;
            }
            ;
          });
        }
      },
      selectOneItem(withdrawAdd,remark){
        this.extractInfo.userAddress=withdrawAdd;//选中回显
        this.clickRemark=remark;
        this.showAddressList=false;
        this.isReadOnly = true;
      },
      backSpaceClick(){
        let $this = this;
        if($this.isReadOnly){//页面不可录才清空
          $this.extractInfo.userAddress='';
          $this.clickRemark='';
          $this.isReadOnly = false;
          $this.isFocus=true;
          //按backspace时,禁止IE或360浏览器的回退功能
          history.pushState(null, null, document.URL);
          window.addEventListener('popstate', function() {
            history.pushState(null, null, document.URL);
          });
        }
      },
      showAddressBlur(){
        this.isFocus=false
        if(this.isBlur&&!this.isFocus){this.showAddressList=false}
      },
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(this.interval);
      next();
    },
    directives: {//自定义focus指令,解决IE回退删除不可录兼容性问题
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.blur();
            el.focus();
            el.isReadOnly=false;
          }
        }
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/user.scss";

  .link-name {
    border-top: 1px solid #eee;
    padding: 10px 0;
    padding-top: 20px;

    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      span {
        background: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        margin-right: 20px;
        width: 100px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        position: relative;

        i {
          position: absolute;
          right: -1px;
          bottom: -1px;
          font-size: 20px;
          display: none;
        }
      }

      span.on {
        border: 1px solid #790000;
        color: #790000;

        i {
          display: block;
        }
      }

    }
  }
  .table-container .body table.table td i{
    margin-right:0;
  }
</style>
