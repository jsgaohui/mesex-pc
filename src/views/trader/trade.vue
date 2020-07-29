<template>

    <div class="trade_panel trade_panel_login">
      <div class="mod mod_trade">
        <!--<div class="mod_hd clear_fix">-->
        <div class="fees_rule">
          <p><router-link to="fees">{{$t('common.rate')}}</router-link></p>
        </div>
        <el-tabs v-model="tradeActive">
          <el-tab-pane :label="$t('trade.limitTrade')" name="0">
            <el-form autoComplete="on" :model="limitTradeForm" :rules="limitTradeRules" ref="limitTradeForm"
                     label-position="left">
              <div class="panel">
                <div class="hd hd_login flex-space" v-if="token"><div><span>{{$t('assets.available')}}</span> <b
                  class="buy_available">{{limitBasicBalance}}</b>
                  <em class="uppercase">{{tradeInfo.basicSymbol}}</em></div>
                  <router-link class="deposit_btn" to="tradeaccount">{{$t('assets.recharge')}}</router-link>
                </div>
                <div class="hd hd_logout" v-else>
                  <router-link to="login" class="logout">{{$t('login.logIn')}}</router-link>
                  {{$t('common.or')}}
                  <router-link to="register" class="logout">{{$t('register.reg')}}</router-link>
                  {{$t('trade.startTrade')}}
                </div>
                <div class="bd">
                  <div>
                    <div class="input_text">
                      <el-form-item prop="buyPrice" :label="$t('trade.buyPrice')">
                        <!--<el-input name="buyPrice"  v-model="limitTradeForm.buyPrice" @input="buyVolumnChange" @keydown="checkCode">-->
                        <!--</el-input>-->
                        <input name="buyPrice" class="el-input__inner" v-model="limitTradeForm.buyPrice"  @input="buyVolumnChange" @keydown="keydownCode(tradePriceDigit,$event)" />
                        <span class="upper unit">{{tradeInfo.basicSymbol}}</span>
                      </el-form-item>
                      <strong class="msg"></strong>
                      <p class="math_price"><em>≈ {{formatAmount(Number.parseFloat(limitTradeForm.buyPrice*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</em></p>
                    </div>
                    <div class="input_text input_text_amount">
                      <el-form-item prop="buyVolumn" :label="$t('trade.buyVolume')">
                        <!--<el-input name="buyVolumn" v-model="limitTradeForm.buyVolumn" @input="buyVolumnChange">-->
                        <!--</el-input>-->
                        <input name="buyVolumn" class="el-input__inner" v-model="limitTradeForm.buyVolumn"  @input="buyVolumnChange" @keydown="keydownCode(minTradeDigit,$event)" />
                        <span class="unit u"><em class="uppercase">{{tradeInfo.tradeSymbol}}</em></span>
                      </el-form-item>
                      <strong class="msg"></strong></div>
                      <p class="math_price"><em> {{$t('fee.trade')}} ≈ {{ limitBuyAmount > 0 ? format(limitBuyAmount * tradeInfo.tradeRate,8) : 0}} {{tradeInfo.basicSymbol}}</em></p>
                    <div class="input_range buy_color logout_limit_buy">
                      <div class="range">
                        <el-slider
                          v-model="sliderlimitBuy" :max="basicBalance" :disabled="sliderLimitBuyMax===0" :step="step"
                          @change="changeLimitBuy">
                        </el-slider>
                      </div>
                    </div>
                    <div class="amount_range uppercase"><span class="min"><span class="min_num">0</span><em> {{tradeInfo.tradeSymbol}}</em></span>
                      <span class="max"><span
                        class="max_num">{{basicBalance}}</span><em> {{tradeInfo.tradeSymbol}}</em></span>
                    </div>
                    <div class="total">
                      <p>{{$t('trade.tradeVolume')}} <span>{{format(limitBuyAmount,tradePriceDigit)}} {{tradeInfo.basicSymbol}}</span><em>≈{{formatAmount(Number.parseFloat(limitBuyAmount*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</em></p>
                      <p class="transform_total"></p>
                    </div>
                    <div class="submit">
                      <el-button v-if="token" name="limitBuybtn" :class="'btn_buy ' +color_buy_bg+ ' login_button'"
                                 type="button" @click="showConfirmDialog(1)">
                        {{$t('trade.buyIn')}} {{tradeInfo.tradeSymbol}}
                      </el-button>
                      <el-button v-else name="limitBuybtn" :disabled="true"
                                 class="btn_buy color_buy_bg logout_button">
                        {{$t('trade.buyIn')}} {{tradeInfo.tradeSymbol}}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel sell_panel">
                <div class="hd hd_login flex-space" v-if="token"><div><span>{{$t('assets.available')}}</span> <b class="sell_available">{{this.availableObj[this.tradeInfo.tradeSymbol]}}</b>
                  <em class="uppercase">{{tradeInfo.tradeSymbol}}</em></div> <router-link class="deposit_btn" to="tradeaccount">{{$t('assets.recharge')}}</router-link>
                </div>
                <div class="hd hd_logout" v-else>
                </div>
                <div class="bd">
                  <div>
                    <div class="input_text">
                      <el-form-item prop="sellPrice" :label="$t('trade.sellPrice')">
                        <!--<el-input name="sellPrice" v-model="limitTradeForm.sellPrice" @input="sellVolumnChange">-->
                        <!--</el-input>-->
                        <input name="sellPrice" class="el-input__inner" v-model="limitTradeForm.sellPrice"  @input="sellVolumnChange" @keydown="keydownCode(tradePriceDigit,$event)" />
                        <span class="upper unit">{{tradeInfo.basicSymbol}}</span>
                      </el-form-item>
                      <strong class="msg"></strong>
                      <p class="math_price"><em>≈ {{formatAmount(Number.parseFloat(limitTradeForm.sellPrice*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</em></p>
                    </div>
                    <div class="input_text input_text_amount">
                      <el-form-item prop="sellVolumn" :label="$t('trade.sellVolume')">
                        <!--<el-input name="sellVolumn" v-model="limitTradeForm.sellVolumn" @input="sellVolumnChange">
                        </el-input>-->
                        <input name="sellVolumn" class="el-input__inner" v-model="limitTradeForm.sellVolumn"  @input="sellVolumnChange" @keydown="keydownCode(minTradeDigit,$event)" />
                        <span class="unit u"><em class="uppercase">{{tradeInfo.tradeSymbol}}</em></span>
                      </el-form-item>
                      <strong class="msg"></strong></div>
                    <p class="math_price"><em> {{$t('fee.trade')}} ≈ {{ limitSellAmount > 0 ? format(limitSellAmount * tradeInfo.tradeRate,8) : 0}} {{tradeInfo.basicSymbol}}</em>
                    <div class="input_range logout_limit_sell sell_color">
                      <div class="range" tabindex="0">
                        <el-slider
                          v-model="sliderlimitSell" :max="limitTradeBalance" :disabled="sliderLimitSellMax===0" :step="step"
                          @change="changeLimitSell" >
                        </el-slider>
                      </div>
                    </div>
                    <div class="amount_range uppercase"><span class="min"><span
                      class="min_num">0</span><em> {{tradeInfo.tradeSymbol}}</em></span> <span class="max"><span
                      class="max_num">{{limitTradeBalance}}</span><em> {{tradeInfo.tradeSymbol}}</em></span>
                    </div>
                    <div class="total">
                      <p>{{$t('trade.tradeVolume')}} <span>{{format(limitSellAmount,tradePriceDigit)}} {{tradeInfo.basicSymbol}}</span><em>≈{{formatAmount(Number.parseFloat(limitSellAmount*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</em></p>
                      <p class="transform_total"></p>
                    </div>
                    <div class="submit">
                      <el-button v-if="token" name="limitSellbtn" :class="'btn_buy ' +color_sell_bg+ ' login_button'"
                                 @click="showConfirmDialog(2)">
                        {{$t('trade.sellIn')}} {{tradeInfo.tradeSymbol}}
                      </el-button>
                      <el-button v-else name="limitSellbtn" :disabled="true"
                                 class="btn_buy color_sell_bg logout_button">
                        {{$t('trade.sellIn')}} {{tradeInfo.tradeSymbol}}
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
          <!--<el-tab-pane :label="$t('trade.limitTrade')" name="limitTrade1">-->
            <!--<el-form autoComplete="on" :model="limitTradeForm" :rules="limitTradeRules" ref="limitTradeForm"-->
                     <!--label-position="left">-->
              <!--<div class="panel">-->
                <!--<div class="hd hd_login flex-space" v-if="token"><div><span>{{$t('assets.available')}}</span> <b-->
                  <!--class="buy_available">{{limitBasicBalance.toFixed(tradeInfo.maxShowUnit)}}</b>-->
                  <!--<em class="uppercase">{{tradeInfo.basicSymbol}}</em></div>-->
                  <!--<router-link class="deposit_btn" to="tradeaccount">{{$t('assets.recharge')}}</router-link>-->
                <!--</div>-->
                <!--<div class="hd hd_logout" v-else>-->
                  <!--<router-link to="login" class="logout">{{$t('login.logIn')}}</router-link>-->
                  <!--{{$t('common.or')}}-->
                  <!--<router-link to="register" class="logout">{{$t('register.reg')}}</router-link>-->
                  <!--{{$t('trade.startTrade')}}-->
                <!--</div>-->
                <!--<div class="bd">-->
                  <!--<div>-->
                    <!--<div class="input_text">-->
                      <!--<el-form-item prop="buyPrice" :label="$t('trade.buyPrice')">-->
                        <!--&lt;!&ndash;<el-input name="buyPrice"  v-model="limitTradeForm.buyPrice" @input="buyVolumnChange" @keydown="checkCode">&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
                        <!--<input name="buyPrice" class="el-input__inner" v-model="limitTradeForm.buyPrice"  @input="buyVolumnChange" @keydown="keydownCode(tradePriceDigit,$event)" />-->
                        <!--<span class="upper unit">{{tradeInfo.basicSymbol}}</span>-->
                      <!--</el-form-item>-->
                      <!--<strong class="msg"></strong>-->
                      <!--<p class="math_price"><em>≈ {{formatAmount(Number.parseFloat(limitTradeForm.buyPrice*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</em></p>-->
                    <!--</div>-->
                    <!--<div class="input_text input_text_amount">-->
                      <!--<el-form-item prop="buyVolumn" :label="$t('trade.buyVolume')">-->
                        <!--&lt;!&ndash;<el-input name="buyVolumn" v-model="limitTradeForm.buyVolumn" @input="buyVolumnChange">&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
                        <!--<input name="buyVolumn" class="el-input__inner" v-model="limitTradeForm.buyVolumn"  @input="buyVolumnChange" @keydown="keydownCode(minTradeDigit,$event)" />-->
                        <!--<span class="unit u"><em class="uppercase">{{tradeInfo.tradeSymbol}}</em></span>-->
                      <!--</el-form-item>-->
                      <!--<strong class="msg"></strong></div>-->
                    <!--<div class="input_range buy_color logout_limit_buy">-->
                      <!--<div class="range">-->
                        <!--<el-slider-->
                          <!--v-model="sliderlimitBuy" :max="basicBalance" :disabled="sliderLimitBuyMax===0" :step="0.0001"-->
                          <!--@change="changeLimitBuy">-->
                        <!--</el-slider>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="amount_range uppercase"><span class="min"><span class="min_num">0</span><em> {{tradeInfo.tradeSymbol}}</em></span>-->
                      <!--<span class="max"><span-->
                        <!--class="max_num">{{basicBalance}}</span><em> {{tradeInfo.tradeSymbol}}</em></span>-->
                    <!--</div>-->
                    <!--<div class="total">-->
                      <!--<p>{{$t('trade.tradeVolume')}} <span>{{limitBuyAmount}} {{tradeInfo.basicSymbol}}</span><em>≈{{formatAmount(Number.parseFloat(limitBuyAmount*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</em></p>-->
                      <!--<p class="transform_total"></p>-->
                    <!--</div>-->
                    <!--<div class="submit">-->
                      <!--<el-button v-if="token" name="limitBuybtn" :class="'btn_buy ' +color_buy_bg+ ' login_button'"-->
                                 <!--type="button" @click="subLimitBuy">-->
                        <!--{{$t('trade.buyIn')}} {{tradeInfo.tradeSymbol}}-->
                      <!--</el-button>-->
                      <!--<el-button v-else name="limitBuybtn" :disabled="true"-->
                                 <!--class="btn_buy color_buy_bg logout_button">-->
                        <!--{{$t('trade.buyIn')}} {{tradeInfo.tradeSymbol}}-->
                      <!--</el-button>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="panel sell_panel">-->
                <!--<div class="hd hd_login flex-space" v-if="token"><div><span>{{$t('assets.available')}}</span> <b class="sell_available">{{limitTradeBalance.toFixed(tradeInfo.maxShowUnit)}}</b>-->
                  <!--<em class="uppercase">{{tradeInfo.tradeSymbol}}</em></div> <router-link class="deposit_btn" to="tradeaccount">{{$t('assets.recharge')}}</router-link>-->
                <!--</div>-->
                <!--<div class="hd hd_logout" v-else>-->
                <!--</div>-->
                <!--<div class="bd">-->
                  <!--<div>-->
                    <!--<div class="input_text">-->
                      <!--<el-form-item prop="sellPrice" :label="$t('trade.sellPrice')">-->
                        <!--&lt;!&ndash;<el-input name="sellPrice" v-model="limitTradeForm.sellPrice" @input="sellVolumnChange">&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
                        <!--<input name="sellPrice" class="el-input__inner" v-model="limitTradeForm.sellPrice"  @input="sellVolumnChange" @keydown="keydownCode(tradePriceDigit,$event)" />-->
                        <!--<span class="upper unit">{{tradeInfo.basicSymbol}}</span>-->
                      <!--</el-form-item>-->
                      <!--<strong class="msg"></strong>-->
                      <!--<p class="math_price"><em>≈ {{formatAmount(Number.parseFloat(limitTradeForm.sellPrice*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</em></p>-->
                    <!--</div>-->
                    <!--<div class="input_text input_text_amount">-->
                      <!--<el-form-item prop="sellVolumn" :label="$t('trade.sellVolume')">-->
                        <!--&lt;!&ndash;<el-input name="sellVolumn" v-model="limitTradeForm.sellVolumn" @input="sellVolumnChange">-->
                        <!--</el-input>&ndash;&gt;-->
                        <!--<input name="sellVolumn" class="el-input__inner" v-model="limitTradeForm.sellVolumn"  @input="sellVolumnChange" @keydown="keydownCode(minTradeDigit,$event)" />-->
                        <!--<span class="unit u"><em class="uppercase">{{tradeInfo.tradeSymbol}}</em></span>-->
                      <!--</el-form-item>-->
                      <!--<strong class="msg"></strong></div>-->
                    <!--<div class="input_range logout_limit_sell sell_color">-->
                      <!--<div class="range" tabindex="0">-->
                        <!--<el-slider-->
                          <!--v-model="sliderlimitSell" :max="limitTradeBalance" :disabled="sliderLimitSellMax===0" :step="0.0001"-->
                          <!--@change="changeLimitSell">-->
                        <!--</el-slider>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="amount_range uppercase"><span class="min"><span-->
                      <!--class="min_num">0</span><em> {{tradeInfo.tradeSymbol}}</em></span> <span class="max"><span-->
                      <!--class="max_num">{{limitTradeBalance}}</span><em> {{tradeInfo.tradeSymbol}}</em></span>-->
                    <!--</div>-->
                    <!--<div class="total">-->
                      <!--<p>{{$t('trade.tradeVolume')}} <span>{{limitSellAmount}} {{tradeInfo.basicSymbol}}</span><em>≈{{formatAmount(Number.parseFloat(limitSellAmount*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</em></p>-->
                      <!--<p class="transform_total"></p>-->
                    <!--</div>-->
                    <!--<div class="submit">-->
                      <!--<el-button v-if="token" name="limitSellbtn" :class="'btn_buy ' +color_sell_bg+ ' login_button'"-->
                                 <!--@click="subLimitSell">-->
                        <!--{{$t('trade.sellIn')}} {{tradeInfo.tradeSymbol}}-->
                      <!--</el-button>-->
                      <!--<el-button v-else name="limitSellbtn" :disabled="true"-->
                                 <!--class="btn_buy color_sell_bg logout_button">-->
                        <!--{{$t('trade.sellIn')}} {{tradeInfo.tradeSymbol}}-->
                      <!--</el-button>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-form>-->
          <!--</el-tab-pane>-->
        </el-tabs>
        <!--</div>-->
      </div>
      <!--确认购买-->
      <!--确认收款 Begin-->
      <div class="dialog_wrap" style="display: block;" v-show="confirmDiv">
        <div class="dialog" style="width: 480px;">
          <div class="dia_tit">
            <div><b>{{this.direction === 1 ? $t('trade.buyIn') : $t('trade.sellIn')}} {{tradeInfo.tradeSymbol}}</b>
              <div class="float-r"><span class="close" id="dia_close" @click="confirmDiv=false">×</span></div>
            </div>
            <p data="dia_title" class="dia_tit_more"></p>
          </div>
          <div class="dia_content coin-tips">
            <div>
              <label>{{this.direction === 1 ? $t('trade.buyPrice') : $t('trade.sellPrice')}}</label>
              <div class="flex-x-start">
              <p v-if="this.direction === 1">{{limitTradeForm.buyPrice}} {{tradeInfo.basicSymbol}}</p>
              <p v-else>{{limitTradeForm.sellPrice}}  {{tradeInfo.basicSymbol}}</p>
              <span v-if="this.direction === 1">≈{{formatAmount(Number.parseFloat(limitTradeForm.buyPrice*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</span>
              <span v-else>≈{{formatAmount(Number.parseFloat(limitTradeForm.sellPrice*(tradeInfo.exchangeRate?tradeInfo.exchangeRate:0)))}} {{tradeInfo.currencyRate}}</span>
              </div>
            </div>
            <div>
              <label>{{this.direction === 1 ? $t('trade.buyVolume') : $t('trade.sellVolume')}}</label>
              <p v-if="this.direction === 1">{{limitTradeForm.buyVolumn}} {{tradeInfo.tradeSymbol}}</p>
              <p v-else>{{limitTradeForm.sellVolumn}}  {{tradeInfo.tradeSymbol}}</p>
            </div>
            <div>
            <label>{{$t('trade.tradeVolume')}}</label>
            <p v-if="this.direction === 1">{{limitBuyAmount}} {{tradeInfo.basicSymbol}}</p>
              <p v-else>{{limitSellAmount}} {{tradeInfo.basicSymbol}}</p>
            </div>

            <div>
              <label>{{$t('fee.trade')}}</label>
              <p v-if="this.direction === 1">{{ limitBuyAmount > 0 ? format(limitBuyAmount * tradeInfo.tradeRate,8) : 0}} {{tradeInfo.basicSymbol}}</p>
              <p v-else>{{ limitSellAmount > 0 ? format(limitSellAmount * tradeInfo.tradeRate,8) : 0}} {{tradeInfo.basicSymbol}}</p>
            </div>
            <div v-if="!this.pwdValid">
              <label>{{$t('common.tradePassword')}}</label>
                <input v-model="limitTradeForm.payPassword" type="password" maxlength="6" class="el-input__inner"  :disabled="this.user.isExitTradePwd === 0?true:false" />
               <div style="float:right;" ><router-link to="addTradePwd" >{{  this.user.isExitTradePwd === 0?$t('fund.no_pay_password'):$t('login.forgetpwd')}}</router-link></div>
            </div>
          </div>
          <div class="dia_submit flex-box">
            <button type="button" class="el-button btn btn_submit btn-primary el-button--default el-button--medium" style="background:#979fb5;" @click="confirmDiv=false"><span> {{$t('otc.cancel')}}</span></button>
            <button type="button" class="el-button btn btn_submit btn-primary el-button--default el-button--medium" @click="confirm"><span>{{$t('fund.confirm')}}</span></button></div>
        </div>
        <div class="dialog_extra"></div>
      </div>
      <!--确认收款 End-->
    </div>

</template>
<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import {tradeCoin} from '../../api/trader'
import {pwdTtl} from '../../api/common'
import Trade from './trade.vue' // 交易模块
import Cookies from 'js-cookie'
import {checkCode, formatStr, floor} from '../../utils/stringUtil' // 只允许输入数字
export default {
  components: {Trade},
  computed: {
    ...mapGetters(['tradeInfo', 'token', 'user']),
    // 买入的最大额度
    basicBalance () {
      // 如果买入币的余额大于0
      if (this.limitBasicBalance > 0) {
        // 如果买入价格余额大于0
        if (this.limitTradeForm.buyPrice > 0) {
          return floor(this.limitBasicBalance / this.getTradeRate / this.limitTradeForm.buyPrice, this.tradeInfo.minTradeDigit)
        } else {
          var lastPriceObj = this.tradeInfo.quetaObj[this.$parent.getCurrentSymbol()]
          if (lastPriceObj) {
            if (lastPriceObj.lastPrice > 0) {
              return floor(this.limitBasicBalance / this.getTradeRate / lastPriceObj.lastPrice, this.tradeInfo.minTradeDigit)
            }
            return 0
          }
        }
      }
      return Number.parseFloat(this.limitBasicBalance / this.getTradeRate)
    },
    // 币币交易费率
    getTradeRate () {
      let rate = Number.parseFloat(this.tradeInfo.tradeRate)
      let result = 1.0
      if (Number.parseFloat(rate) > 0) {
        result = Number.parseFloat(1 + rate) // 计算扣除手续费之后的比例手续费
      } else {
        result = 1
      }
      return result
    },
    getSymbolInfo () {
      var symbolInfo = this.tradeInfo.quetaObj[this.$parent.getCurrentSymbol()]
      if (symbolInfo) {
        return symbolInfo
      }
      return false
    }
  },
  watch: {
    'limitTradeBalance' (to, from) {
      if (Number.parseFloat(to) > 0 && this.minTradeDigit > 0) {
        this.limitTradeBalance = floor(to, this.minTradeDigit)
      }
    }
  },
  name: 'Trade',
  data () {
    const validLimitBuyPrice = (rule, value, callback) => {
      if (!value || value <= 0) {
        callback(new Error(this.$i18n.t('trade.buyRightPrice')))
      } else {
        callback()
      }
    }
    const validLimitSellPrice = (rule, value, callback) => {
      if (!value || value <= 0) {
        callback(new Error(this.$i18n.t('trade.sellRightPrice')))
      } else {
        callback()
      }
    }

    const validLimitBuyVolumn = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$i18n.t('trade.buyRightVolume')))
      } else if (isNaN(value) || value <= 0) {
        callback(new Error(this.$i18n.t('trade.buyRightVolume')))
      } else if (value < this.minTradeUnit) {
        callback(new Error(this.$i18n.t('trade.buyMustGt') + this.minTradeUnit))
      } else {
        callback()
      }
    }
    const validLimitSellVolumn = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$i18n.t('trade.sellRightVolume')))
      } else if (isNaN(value) || value <= 0) {
        callback(new Error(this.$i18n.t('trade.sellRightVolume')))
      } else if (value < this.minTradeUnit) {
        callback(new Error(this.$i18n.t('trade.sellMustGt') + this.minTradeUnit))
      } else {
        callback()
      }
    }
    const validMarketBuyVolumn = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$i18n.t('trade.buyRightVolume')))
      } else if (isNaN(value) || value <= 0) {
        callback(new Error(this.$i18n.t('trade.buyRightVolume')))
      } else if (value > this.limitBasicBalance) {
        callback(new Error(this.$i18n.t('trade.buyMustLt')))
      } else {
        callback()
      }
    }

    const validMarketSellVolumn = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$i18n.t('trade.sellRightVolume')))
      } else if (isNaN(value) || value <= 0) {
        callback(new Error(this.$i18n.t('trade.sellRightVolume')))
      } else {
        callback()
      }
    }
    let locale = Cookies.get('language')
    return {
      step: 0.0001,
      pwdValid: true, // 是否需要支付密码
      confirmDiv: false,
      tradeActive: '0', // 0 限价  1 市价
      direction: 0, // 0 买入   1卖出
      minTradeDigit: 0, // 交易量最大允许输入小数位
      tradePriceDigit: 0, // 交易价格最大允许输入小数位
      minTradeUnit: 0, // 最小交易额
      availableObj: {}, // 余额列表
      sliderlimitBuy: 0,
      sliderlimitSell: 0,
      sliderMarketBuy: 0,
      sliderMarketSell: 0,
      limitBasicBalance: 0, // 限价基准币余额
      limitTradeBalance: 0, // 限价交易币余额
      sliderLimitBuyMax: 0, // slider buy 最大值
      sliderLimitSellMax: 0, // slider sell 最大值
      sliderMarketSellMax: 0,
      sliderMarketBuyMax: 0,
      // marketBasicBalance: 0,
      // marketTradeBalance: 0,
      limitBuyAmount: 0, // 买入兑换基准交易额
      limitSellAmount: 0, // 卖出兑换基准交易额
      color_buy_bg: locale ? locale === 'ko' ? 'kr-color_buy_bg' : 'color_buy_bg' : 'color_buy_bg',
      color_sell_bg: locale ? locale === 'ko' ? 'kr-color_sell_bg' : 'color_sell_bg' : 'color_sell_bg',
      limitTradeForm: {
        buyPrice: 0,
        sellPrice: 0,
        buyVolumn: 0,
        sellVolumn: 0,
        direction: '',
        tradeType: '1',
        tradeSymbol: '',
        basicSymbol: '',
        payPassword: ''
      },
      limitTradeRules: {
        buyPrice: [{required: true, trigger: 'click', validator: validLimitBuyPrice}],
        sellPrice: [{required: true, trigger: 'click', validator: validLimitSellPrice}],
        buyVolumn: [{required: true, trigger: 'click', validator: validLimitBuyVolumn}],
        sellVolumn: [{required: true, trigger: 'click', validator: validLimitSellVolumn}]
      },
      marketTradeForm: {
        buyVolumn: 0,
        sellVolumn: 0,
        direction: '',
        tradeType: '2',
        tradeSymbol: '',
        basicSymbol: ''
      },
      marketTradeRules: {
        buyVolumn: [{required: true, trigger: 'click', validator: validMarketBuyVolumn}],
        sellVolumn: [{required: true, trigger: 'click', validator: validMarketSellVolumn}]
      }
    }
  },
  methods: {
    // 初始化交易参数
    setTradeParam (data) {
      this.step = 1 / Math.pow(10, data.minTradeDigit)
      this.minTradeUnit = data.minTradeUnit // 最小交易单位
      this.minTradeDigit = data.minTradeDigit// 交易量最大允许输入小数位
      this.tradePriceDigit = data.tradePriceDigit// 交易价格最大允许输入小数位
      if (this.availableObj[this.tradeInfo.tradeSymbol]) { // 交易币余额
        this.limitTradeBalance = this.availableObj[this.tradeInfo.tradeSymbol]
      } else {
        this.limitTradeBalance = 0
      }

      if (this.availableObj[this.tradeInfo.basicSymbol]) { // 基础币余额
        this.limitBasicBalance = this.availableObj[this.tradeInfo.basicSymbol]
      } else {
        this.limitBasicBalance = 0
      }

      if (this.limitBasicBalance > 0) { // 滑动金额的触发
        this.sliderLimitBuyMax = this.basicBalance
        this.sliderMarketBuyMax = this.limitBasicBalance
      } else {
        this.sliderLimitBuyMax = 0
        this.sliderMarketBuyMax = 0
      }
      if (this.limitTradeBalance > 0) {
        this.sliderLimitSellMax = this.limitTradeBalance
        this.sliderMarketSellMax = this.limitTradeBalance
      } else {
        this.sliderLimitSellMax = 0
        this.sliderMarketSellMax = 0
      }
    },
    // 归零控件参数
    initTradeParam () {
      this.limitTradeForm.buyPrice = 0
      this.limitTradeForm.sellPrice = 0
      this.limitTradeForm.buyVolumn = 0
      this.limitTradeForm.sellVolumn = 0
      this.marketTradeForm.buyVolumn = 0
      this.marketTradeForm.sellVolumn = 0
      this.limitBuyAmount = 0
      this.limitSellAmount = 0
      this.initSlideBar()
    },
    initSlideBar () {
      this.sliderlimitBuy = 0
      this.sliderlimitSell = 0
      this.sliderMarketBuy = 0
      this.sliderMarketSell = 0
    },
    keydownCode (len, e) {
      checkCode(len, e)
    },
    // 显示确认交易的提示窗
    showConfirmDialog (direction) {
      this.direction = direction
      if (direction === 1) {
        this.validBuy()
      } else {
        this.validSell()
      }
    },
    validBuy () {
      let buyscale = this.$parent.tradeInfo.buysellScale.buyScale
      if (this.getSymbolInfo.lastPrice !== 0 && this.limitTradeForm.buyPrice > (this.getSymbolInfo.lastPrice * buyscale)) {
        this.$message({
          message: formatStr(Number.parseFloat(buyscale * 100).toFixed(0), this.$i18n.t('trade.buyscale')),
          type: 'error',
          center: true
        })
        return
      }
      let $this = this
      this.$refs.limitTradeForm.validateField('buyPrice', function (result) {
        if (result === '') {
          $this.$refs.limitTradeForm.validateField('buyVolumn', function (result) {
            if ($this.limitBasicBalance / $this.getTradeRate < $this.limitBuyAmount) {
              $this.$message({
                message: $this.$i18n.t('common.tradeGtBalance'),
                type: 'error',
                center: true
              })
              return false
            }
            if (result === '') {
              $this.confirmDiv = true
              $this.getPwdTtl()
            }
          })
        }
      })
    },
    validSell () {
      let sellScale = this.$parent.tradeInfo.buysellScale.sellScale
      if (this.getSymbolInfo.lastPrice !== 0 && this.limitTradeForm.sellPrice < (this.getSymbolInfo.lastPrice * sellScale)) {
        this.$message({
          message: formatStr(Number.parseFloat(sellScale * 100).toFixed(0), this.$i18n.t('trade.sellscale')),
          type: 'error',
          center: true
        })
        return
      }
      let $this = this
      this.$refs.limitTradeForm.validateField('sellPrice', function (result) {
        if (result === '') {
          $this.$refs.limitTradeForm.validateField('sellVolumn', function (result) {
            if ($this.limitTradeBalance < $this.limitTradeForm.sellVolumn) {
              $this.$message({
                message: $this.$i18n.t('common.tradeGtBalance'),
                type: 'error',
                center: true
              })
              return false
            }
            if (result === '') {
              $this.confirmDiv = true
              $this.getPwdTtl()
            }
          })
        }
      })
    },
    getPwdTtl () {
      pwdTtl().then((response) => {
        if (response.code === 200) {
          let ttl = response.data
          this.pwdValid = ttl > 0
        }
      })
    },
    // 確認交易
    confirm () {
      this.limitTradeForm.tradeSymbol = this.tradeInfo.tradeSymbol
      this.limitTradeForm.basicSymbol = this.tradeInfo.basicSymbol
      this.limitTradeForm.direction = this.direction // 买入
      this.dealTradeCoin()
    },
    // 提交买入卖出请求
    dealTradeCoin () {
      let $this = this
      tradeCoin(this.limitTradeForm).then((response) => {
        if (response.code === 200) {
          $this.initSlideBar()
          $this.$store.dispatch('PwdValidSuccess')
          $this.$message({
            message: $this.$i18n.t('trade.limitSub'),
            type: 'success',
            center: true,
            onClose: function () {
              $this.$refs.limitTradeForm.clearValidate()
            }
          })
          $this.$parent.addCurOrderList(response.data)
        }
      }).then(() => {
        $this.confirmDiv = false // 隐藏弹窗
        $this.limitTradeForm.payPassword = '' // 清空密码
      })
    },
    subMarketBuy () {
      let $this = this
      this.$refs.marketTradeForm.clearValidate()
      this.$refs.marketTradeForm.validateField('buyVolumn', function (result) {
        if (result === '') {
          $this.marketTradeForm.tradeSymbol = $this.tradeInfo.tradeSymbol
          $this.marketTradeForm.basicSymbol = $this.tradeInfo.basicSymbol
          $this.marketTradeForm.direction = 1 // 买入
          tradeCoin($this.marketTradeForm).then((response) => {
            if (response.code === 200) {
              $this.$message({
                message: $this.$i18n.t('trade.marketSub'),
                type: 'success',
                center: true
              })
            }
          })
        }
      })
    },
    subMarketSell () {
      let $this = this
      this.$refs.marketTradeForm.clearValidate()
      this.$refs.marketTradeForm.validateField('sellVolumn', function (result) {
        if (result === '') {
          $this.marketTradeForm.tradeSymbol = $this.tradeInfo.tradeSymbol
          $this.marketTradeForm.basicSymbol = $this.tradeInfo.basicSymbol
          $this.marketTradeForm.direction = 2 // 卖出
          tradeCoin($this.marketTradeForm).then((response) => {
            if (response.code === 200) {
              $this.$message({
                message: $this.$i18n.t('trade.marketSub'),
                type: 'success',
                center: true
              })
            }
          })
        }
      })
    },
    // 买入量input keyup事件
    buyVolumnChange () {
      // 买入量不能大于扣除手续费之后的最大买入量
      this.limitTradeForm.buyVolumn = Number.parseFloat(this.limitTradeForm.buyVolumn) > this.basicBalance ? this.basicBalance : this.limitTradeForm.buyVolumn
      if (Number.parseFloat(this.limitTradeForm.buyVolumn) > 0 && Number.parseFloat(this.limitTradeForm.buyPrice) > 0) {
        this.limitBuyAmount = floor(this.limitTradeForm.buyVolumn * this.limitTradeForm.buyPrice, this.tradePriceDigit)
      } else {
        this.limitBuyAmount = 0
      }
      if (Number.parseFloat(this.limitTradeForm.buyVolumn) > 0) {
        // 设置sliderbar的位置
        this.sliderlimitBuy = Number.parseFloat(this.limitTradeForm.buyVolumn)
      } else {
        this.sliderlimitBuy = 0
      }
    },
    // 卖出量input keyup事件
    sellVolumnChange () {
      this.limitTradeForm.sellVolumn = Number.parseFloat(this.limitTradeForm.sellVolumn) > Number.parseFloat(this.limitTradeBalance) ? this.limitTradeBalance : this.limitTradeForm.sellVolumn
      if (Number.parseFloat(this.limitTradeForm.sellVolumn) > 0 && Number.parseFloat(this.limitTradeForm.sellPrice) > 0) {
        this.limitSellAmount = floor(this.limitTradeForm.sellVolumn * this.limitTradeForm.sellPrice, this.tradePriceDigit)
      } else {
        this.limitSellAmount = 0
      }
      if (Number.parseFloat(this.limitTradeForm.sellVolumn) > 0) {
        this.sliderlimitSell = floor(this.limitTradeForm.sellVolumn, this.tradeInfo.maxShowUnit)
      } else {
        this.sliderlimitSell = 0
      }
    },
    changeLimitBuy (changeValue) {
      if (this.basicBalance > 0) {
        this.limitTradeForm.buyVolumn = changeValue
        if (this.tradeInfo.quetaObj[this.$parent.getCurrentSymbol()]) {
          this.limitBuyAmount = Number.parseFloat(this.limitTradeForm.buyVolumn * this.limitTradeForm.buyPrice).toFixed(this.tradePriceDigit)
        }
      }
    },
    changeLimitSell (changeValue) {
      if (this.limitTradeBalance > 0) {
        this.limitTradeForm.sellVolumn = changeValue
        if (this.tradeInfo.quetaObj[this.$parent.getCurrentSymbol()]) {
          this.limitSellAmount = Number.parseFloat(this.limitTradeForm.sellVolumn * this.limitTradeForm.sellPrice).toFixed(this.tradePriceDigit)
        }
      }
    },
    changeMarketBuy (changeValue) {
      if (this.limitBasicBalance > 0) {
        this.marketTradeForm.buyVolumn = changeValue
      }
    },
    changeMarketSell (changeValue) {
      if (this.limitTradeBalance > 0) {
        this.marketTradeForm.sellVolumn = changeValue
      }
    },
    /**
     *  同步可用资产
     * @param availableList  可用资产列表
     * @param ifFromTrade   是否从交易过来   true:交易成功的标示
     */
    syncAvailableAssert (availableList, ifFromTrade){
      if (availableList) { // 计算净资产
        for (let i = 0; i < availableList.length; i++) {
          var account = availableList[i]
          var itemKey = account.dcCode
          var itemValue = account.availableAmount
          if (account.dcCode === this.tradeInfo.basicSymbol) {
            this.limitBasicBalance = itemValue
          } else if (account.dcCode === this.tradeInfo.tradeSymbol) {
            this.limitTradeBalance = itemValue
          }
          Vue.set(this.availableObj, itemKey, itemValue)
        }
        this.sliderLimitBuyMax = this.basicBalance
        this.sliderLimitSellMax = Number.parseFloat(this.limitTradeBalance).toFixed(this.tradeInfo.maxShowUnit)
        if (ifFromTrade) {
          this.$parent.setSyncbalance(false)
          this.sliderlimitBuy = 0
          this.sliderlimitSell = 0
          this.sliderMarketBuy = 0
          this.sliderMarketSell = 0
        }
      }
    },
    // 更新买卖价格
    updatePrice (sell, buy) {
      // 设置买入价格
      if (this.limitTradeForm.buyPrice === 0) {
        if (sell.length > 0) {
          // this.limitTradeForm.buyPrice = sellArray[sellArray.length - 1].buyPrice;
          this.limitTradeForm.buyPrice = sell[0].buyPrice;
        }
      }
      // 设置卖出价格
      if (this.limitTradeForm.sellPrice === 0) {
        if (buy.length > 0) {
          this.limitTradeForm.sellPrice = buy[0].buyPrice;
        }
      }
    },
    setBuySellPrice (type, price) {
     // if (type === 0) {
        this.limitTradeForm.sellPrice = price
     // } else {
        this.limitTradeForm.buyPrice = price
     // }
    }
  }
}
</script>
