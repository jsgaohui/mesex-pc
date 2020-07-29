<template>
  <div>
    <!--资产-->
    <div class='asset-content'>
      <div class='asset-box flex-space-t'>
        <!--左侧导航-->
        <div class='left-nav'>
          <h2>{{$t('common.assets')}}</h2>
          <ul>
            <li><router-link to='otcaccount'>{{$t('fund.fbAccount')}}</router-link></li>
            <li><router-link to='tradeaccount'>{{$t('fund.bbAccount')}}</router-link></li>
            <li class='active'><a >{{$t('fund.fundAccount')}}</a></li>
          </ul>
        </div>
        <!--左侧导航END-->
        <!--右侧内容-->
        <div class='right-con'>
          <div class='top-con flex-space'>
            <div class="right" style="margin-left:20px">
            {{$t('assets.accounTotal')}}：{{Number.parseFloat(totalAmount).toFixed(2)}}&nbsp;{{sellteMarket}}<span
            class="ticker-transform font_arial"> ≈ {{formatAmount(convertTotalAmount)}} {{currencyRate}}</span>
            </div>
            <!--<div>-->
              <!--<label>{{$t('fund.assert')}}： </label>-->
              <!--<span v-if='worthList'>-->
                 <!--<span v-for='item in this.worthList'>-->
                     <!--{{item}}-->
                 <!--</span>-->
              <!--</span>-->
              <!--<span v-else>&#45&#45</span>-->
              <!--&lt!&ndash<span v-else>&#45&#45</span>&ndash&gt-->
              <!--<label>{{$t('fund.profitLoss')}}：</label>-->
              <!--<span v-if='profitMap'>-->
                <!--<span  v-for='(k,v) in this.profitMap' >-->
                     <!--<b> <b v-if='k >0'>+</b>{{k}}</b>&nbsp{{v}}-->
                   <!--</span>-->
                 <!--</span>-->
              <!--<span v-else>&#45&#45</span>-->
             <!--</div>-->


            <router-link to='fundaccountlog'> {{$t('fund.fundlog')}}</router-link>
          </div>
          <section>
            <div class='body'>
              <table width='100%'>
                <thead>
                <tr>
                  <th width='15%' class='text-left'>{{$t('fund.dcCode')}}</th>
                  <th width='20%' class='text-right'> {{$t('fund.enable')}}</th>
                  <th width='20%'> {{$t('fund.assert')}}</th>
                  <th width='20%'> {{$t('fund.profitLoss')}}</th>
                  <th width='25%'> {{$t('fund.operate')}}</th>

                </tr>
                </thead>
                <tbody class='table-top-list'>
                <tr  v-for='(item, index) in list'>
                  <td class='uppercase'>{{item.dcCode}}</td>
                  <td>{{item.availableAmount}}&nbsp;≈&nbsp;{{formatAmount(Number.parseFloat((symbolLastPrices[item.dcCode + "/" + sellteMarket]?symbolLastPrices[item.dcCode + "/" + sellteMarket]:0)*item.availableAmount*exchangeRate))}}&nbsp;{{currencyRate}}</td>
                  <td>
                    {{item.assertValue}}&nbsp;≈&nbsp;{{formatAmount(Number.parseFloat((symbolLastPrices[item.dcCode + "/" + sellteMarket]?symbolLastPrices[item.dcCode + "/" + sellteMarket]:0)*item.assertValue*exchangeRate))}}&nbsp;{{currencyRate}}
                  </td>
                  <td >
                   <!--{{Number.parseFloat(item.profit) > 0 ? '+':''}} {{Number.parseFloat(item.profit) === 0 ? '&#45;&#45;':item.profit}}-->
                    {{Number.parseFloat(item.profit) > 0 ? '+':''}} {{item.profit}} &nbsp;≈&nbsp;{{formatAmount(Number.parseFloat((symbolLastPrices[item.dcCode + "/" + sellteMarket]?symbolLastPrices[item.dcCode + "/" + sellteMarket]:0)*item.profit*exchangeRate))}}&nbsp;{{currencyRate}}
                  </td>
                  <td>
                    <button class='btn' @click='digitalCoinDeal(item,6)'>
                      {{$t('fund.turn_in')}}
                    </button>
                    <button class='btn'  @click='digitalCoinDeal(item,5)'>
                      {{$t('fund.turn_out')}}
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <!--右侧内容END-->

        <!--确认购买-->

          <div class='dialog_wrap' style='display: block' v-show='showdiv'>
            <div class='dialog'>
              <div class='dia_tit'>
                <div><b style='font-size:19px'>{{this.dcForm.tradeType==6?$t('fund.inVolumeTip'):$t('fund.outVolumeTip')}}</b><span class='close' id='dia_close' @click='showdiv=false'>×</span></div>
                <p data='dia_title' class='dia_tit_more'></p>
              </div>
              <div class='dia_content'>
                <div class='fund-buy-tips'>
                  <label>{{this.dcForm.tradeType==6?$t('fund.inVolume'):$t('fund.outVolume')}}<span>  {{this.dcForm.tradeType===6?$t('fund.enableInVolume'):$t('fund.enableOutVolume')}}&nbsp{{this.availableAmount}}&nbsp{{this.dcForm.dcCode}}</span></label>
                  <div class='price flex-space'>
                    <b @click='minus()'>一</b><span><input type='text' v-model='dcForm.amount'  @keydown='oninput(8,$event)' maxlength='15'>
                    <!--<em>0.1{{dcForm.dcCode}}{{$t('fund.qi')}}</em>-->
                  </span><b @click='plus()'>+</b>
                  </div>
                  <label>{{$t('fund.payPassword')}}</label>
                  <div class='pwd flex-space'><span><i class='el-icon-pwd'></i></span><input type='password' v-model='dcForm.payPassword' maxlength='6' :disabled='this.user.isExitTradePwd === 0?true:false'></div>
                  <div class='text-right'> <router-link to='addTradePwd' >{{ this.user.isExitTradePwd === 0?$t('fund.no_pay_password'):$t('login.forgetpwd')}}</router-link></div>


                </div>
              </div>
              <div class='dia_submit flex-box'>
                <button class='btn btn_submit btn-primary' pro_name='btn_submit' @click='dealFundaccount()' :disabled='this.user.isExitTradePwd === 0?true:false'>  {{$t('fund.confirm')}}</button>
              </div>
            </div>
            <div class='dialog_extra'></div>
          </div>

        <!--确认购买END-->


      </div>
    </div>
    <!--资产END-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {fundassert, fundAccountTrade} from '../../api/fund'
import {checkCode} from '../../utils/stringUtil'// 只允许输入数字
import {reloadRate,onAction,removeListenRuner} from '@/utils/quotation'
export default {
  computed: {
    ...mapGetters(['user']),
    convertTotalAmount () {
      return this.formatAmount(Number.parseFloat(this.totalAmount) * Number.parseFloat(this.exchangeRate))
    }
  },
  name: 'fundaccount',
  data () {
    return {
      showdiv: false,
      totalAmount: 0,
      list: null,
      worthList: [], // 净值列表
      profitMap: null, // 浮动阴亏map
      availableAmount: 0, // 可用数量
      symbolLastPrices:{}, // 交易对的最新价格
      listLoading: true,
      exchangeRate:1,
      currencyRate: '', // 显示的结算单位 cny usd krw()
      sellteMarket: '', // 基准结算市场
      dcForm: {
        amount: 0,
        dcCode: 0,
        tradeType: 0, // 1是币币转基金  2是基金转币币
        payPassword: ''
      }
    }
  },
  created () {
    var id = this.$route.query.id
    this.getFundDetail(id)
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
  },
  methods: {
    oninput (length, e) {
      checkCode(length, e)
    },
    validOrderVolume () {
      if (this.dcForm.amount <= 0 ) {
        this.$message({
          message: this.$i18n.t('fund.amount_tip'),
          type: 'error',
          center: true
        })
        return false
      }
      if (Number.parseFloat(this.dcForm.amount) > Number.parseFloat(this.availableAmount)) {
        this.$message({
          message: this.$i18n.t('fund.balance_not_enough'),
          type: 'error',
          center: true
        })
        return false
      }
      return true
    },
    validPayPassword () {
      if (this.dcForm.payPassword.length < 6) {
        this.$message({
          message: this.$i18n.t('fund.paypassword'),
          type: 'error',
          center: true
        })
        return false
      }
      return true
    },
    plus () {
      this.dcForm.amount++
    },
    minus () {
      if (this.dcForm.amount - 1 >= 0 ) {
        this.dcForm.amount--
      }
    },
    digitalCoinDeal (item, type) {
      this.dcForm.dcCode = item.dcCode
      this.showdiv = true
      this.dcForm.tradeType = type
      this.dcForm.payPassword = ''
      if (type === 5) {
        this.availableAmount = item.availableAmount
      } else if (type === 6) {
        this.availableAmount = item.bbAvailableAmount
      }
    },
    // 账户转入转出
    dealFundaccount () {
      let $this = this
      if (!this.validOrderVolume()) {
        return
      }
      if (!this.validPayPassword()) {
        return
      }
      fundAccountTrade($this.dcForm).then((response) => {
        if (response.code === 200) {
          this.$message({
            message: this.$i18n.t('fund.op_success'),
            type: 'success',
            onClose: function () {
              // location.reload()
            }
          })
        }
        var id = $this.$route.query.id
        setTimeout(function () {
          $this.getFundDetail(id)
        }, 100)
        // $this.getFundDetail(id)
        $this.showdiv = false
      })
    },
    getFundDetail (id) {
      let $this = this
      fundassert().then((response) => {
        if (response.code === 200) {
          let data = response.data
          $this.list = data.assert
          // $this.profitMap = response.data.profitMap
          // $this.worthList = response.data.worthList
          $this.listLoading = false
          $this.lastPrices = data.lastPrices
          $this.currencyRate = data.currencyRate // 当前结算的法币
          $this.sellteMarket = data.sellteMarket // 基准市场
          var cachePrices = data.lastPrices // 所有交易对的最新比值
          var rateList = data.rateList // 基准市场对应法币的汇率
          // 初始化 基准市场和法币的比值
          if (rateList) {
            for (let i = 0; i < rateList.length; i++) {
              if (rateList[i].currencyName === 'USD' + $this.currencyRate) {
                let rateMap = rateList[i].rateMap // 包含usdt,goldt对currencyRate的汇率
                $this.exchangeRate = rateMap[$this.sellteMarket] // 基准市场汇率如果当前是人民币,基准市场是goldt,这个就是goldt/人民币的汇率
                break
              }
            }
          }
          // 遍历跟单资产列表,初始化交易对的价格
          $this.totalAmount = 0;
          for (let i = 0; i < $this.list.length; i++) {
            var symbolData = $this.list[i] // 代币信息  例如 BTC ETH对应的可用数量之类的
            var curPrice = cachePrices[symbolData.dcCode + '/' + $this.sellteMarket] // 代币/基准市场的比值  例如BTC/GOLDT
            var lastPrice = 0
            // 如果交易对对应的比值不存在,取反
            if (!curPrice) {
              curPrice = cachePrices[data.sellteMarket + '/' + symbolData.dcCode]
              if (curPrice) {
                lastPrice = 1 / curPrice.lastPrice
              }
            } else {
              lastPrice = curPrice.lastPrice
            }
            // 如果当前代币=基准市场  比值为1
            if (symbolData.dcCode === data.sellteMarket) {
              $this.symbolLastPrices[symbolData.dcCode + '/' + data.sellteMarket] = 1.0
            } else {
              // 存储交易对的最新价格
              $this.symbolLastPrices[symbolData.dcCode + '/' + data.sellteMarket] = lastPrice
            }
            // 获取基准市场币的总量,如果是goldt  就是换算之后goldt的总量
            if (cachePrices) {
              // 获取基准市场币的总量,如果是goldt  就是换算之后goldt的总量
              if (lastPrice !== 0) {
                $this.totalAmount += Number.parseFloat(symbolData.totolAmount) * Number.parseFloat(lastPrice)
              }
              if (symbolData.dcCode === $this.sellteMarket) {
                $this.totalAmount += Number.parseFloat(symbolData.totolAmount)
              }
            }
          }
        }
      })
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss'>
  @import 'src/styles/nc.scss'
</style>
