<template>
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
            <li  class="active">  <router-link to='otcaccount'>{{$t('fund.fbAccount')}}</router-link></li>
            <li><router-link to="tradeaccount">{{$t('fund.bbAccount')}}</router-link></li>
            <!--<li >  <router-link to="fundaccount">{{$t('fund.fundAccount')}}</router-link></li>-->
          </ul>
        </div>
        <!--左侧导航END-->
        <!--右侧内容-->
        <!--右侧内容-->
        <div class="right-con otc-select">
          <div class="search-con flex-space">
            <div class="back-txt"><router-link to="otcaccount"  >{{$t('fund.back')}}</router-link></div>
            <div>
              <el-select  clearable :placeholder="$t('otc.allCoin')" v-model="query.dcCode">
                <el-option
                  v-for="item in options.fbTradeCoinList"
                  :key="item.dcCode"
                  :label="item.dcCode"
                  :value="item.dcCode">
                </el-option>
                <!--<el-option-->
                  <!--v-for="item in options.currencyList"-->
                  <!--:key="item.currencySymbol"-->
                  <!--:label="item.currencyName"-->
                  <!--:value="item.currencySymbol">-->
                <!--</el-option>-->
              </el-select>
              <el-select clearable :placeholder="$t('otc.orderType')" v-model="query.changeType" style="margin-right:10px;">
                <el-option
                  v-for="(value,key) in options.type"
                  :key="key"
                  :label="value"
                  :value="key">
                </el-option>
              </el-select>
              <el-date-picker
                v-model="query.beginDate"
                class="time"
                type="date"
                :picker-options="pickerBeginDateBefore"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :placeholder="$t('otc.selectStartDate')">
              </el-date-picker>
              <span class="date-line"></span>
              <el-date-picker
                v-model="query.endDate"
                class="time"
                value-format="yyyy-MM-dd"
                type="date"
                :picker-options="pickerBeginDateAfter"
                format="yyyy-MM-dd"
                :placeholder="$t('otc.selectEndDate')">
              </el-date-picker>
              <a><i class="hb_icon_search" @click="getMyAssetLog()"></i></a>
            </div>
          </div>
          <div class="body">
            <el-table :data="assetLogList.rows"
                      style="width: 100%"
                      class="list-table">

              <el-table-column
                :label="assertColumn[0].label"
                :key="assertColumn[0].name"
                :prop="assertColumn[0].prop">
              </el-table-column>

              <el-table-column
                :label="assertColumn[1].label"
                :key="assertColumn[1].name"
                :prop="assertColumn[1].prop">
                <template slot-scope="scope">
                  {{options.type[scope.row.changeType]}}
                </template>
              </el-table-column>

              <el-table-column
                :label="assertColumn[2].label"
                :key="assertColumn[2].name"
                :prop="assertColumn[2].prop">
                <template slot-scope="scope">
                  {{scope.row.changeAmount}}  {{scope.row.dcCode}}
                </template>
              </el-table-column>

              <el-table-column
                :label="assertColumn[3].label"
                :key="assertColumn[3].name"
                :prop="assertColumn[3].prop">
              </el-table-column>

            </el-table>

            <el-pagination
              v-show="assetLogList.total !== 0"
              layout="prev, pager, next"
              :current-page.sync="query.page"
              :page-size.sync="query.limit"
              :total="assetLogList.total"
              @current-change="getMyAssetLog()">
            </el-pagination>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
  import {
    getMyAssetLog,getAssetFilterData
  } from "../../api/otc";
  export default {
    name: "otcAccountLog",
    created() {
      this.getAssetFilterData();
      this.getMyAssetLog();
    },
    data() {
      return {
        //挂牌单行情
        assetLogList:{
          rows:[],
          total:0,
        },
        //筛选数据
        options: {
          //法币列表
          fbTradeCoinList: [],
          //1.法币交易买入;2.法币交易卖出;3.交易手续费;4.法币转币币;5.币币转法币
          type: {
            1: this.$i18n.t('otc.frenchCurrencyTradingBuy'),
            2: this.$i18n.t('otc.legalCurrencyTrading'),
            3: this.$i18n.t('otc.transactionFees'),
            4: this.$i18n.t('otc.legalCurrencyTransferCoin'),
            5: this.$i18n.t('otc.coinToCurrency')
          },
        },
        query: {
          //每页查询几条数据
          limit: 10,
          //当前页数
          page: 1,
          //币种
          dcCode: '',
          //类型
          changeType: '',
          //开始时间
          beginDate: '',
          //结束时间
          endDate: '',
        },
        assertColumn: [
          {label: this.$i18n.t('otc.currency'), name: '1', prop: 'dcCode'},
          {label: this.$i18n.t('otc.type'), name: '2', prop: 'changeType'},
          {label: this.$i18n.t('otc.quantity'), name: '3', prop: 'changeAmount'},
          {label: this.$i18n.t('otc.time'), name: '3', prop: 'createTime'},
        ],
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let endDateDateVal = this.query.endDate;
            if (endDateDateVal) {
              return time.getTime() > new Date(endDateDateVal).getTime() ||  time.getTime() > Date.now()/* - 1000 * 60 * 60 * 24*/;
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.query.beginDate;
            if (beginDateVal) {
              return time.getTime() < (new Date(beginDateVal).getTime() - 1000 * 60 * 60 * 24) || time.getTime() > Date.now();
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
      }
    },
    methods: {
      //获取筛选数据
      getAssetFilterData() {
        getAssetFilterData().then(response => {
          if (response.code === 200) {
            let data = response.data;
            this.options.fbTradeCoinList = data.fbTradeCoinList;
          }
        })
      },
      getMyAssetLog() {
        getMyAssetLog(this.query).then(response => {
          if (response.code === 200) {
            this.assetLogList.rows = response.rows;
            this.assetLogList.total = response.total;
          }
        })
      },
      displayState(state) {
        for (let typeKey in this.options.type) {
          if (typeKey.key === state) {
            return typeKey.name;
          }
        }
        return '';
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";
  @import "src/styles/nc.scss";
</style>
