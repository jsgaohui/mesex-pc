<template>
  <div>
    <div class="otc-path"><h3>{{$t('common.fbOrder')}}</h3></div>
    <div class="otc-orderlist bg-color border-blue" style="margin-top:20px;">
      <!--顶部搜索筛选工具栏 Begin-->
      <div class="all-select box box-space-bettwen">



          <!--筛选数据 Begin-->
          <div class="select-con box box-y-center">
            <el-select v-model="fbTakerQuery.dcCode" clearable :placeholder="$t('otc.allCoin')">
              <el-option
                v-for="item in options.fbTradeCoinList"
                :key="item.dcCode"
                :label="item.dcCode"
                :value="item.dcCode">
              </el-option>
            </el-select>
            <el-select v-model="fbTakerQuery.direction" clearable :placeholder="$t('otc.orderType')">
              <el-option
                v-for="item in options.directionType"
                :key="item.key"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
            <el-select v-model="fbTakerQuery.orderStatus" clearable  :placeholder="$t('otc.orderStatus')">
              <el-option
                v-for="item in options.type"
                :key="item.key"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
            <el-date-picker
              v-model="fbTakerQuery.beginDate"
              class="time"
              type="date"
              :picker-options="pickerBeginDateBefore"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :placeholder="$t('otc.selectStartDate')">
            </el-date-picker>
            <span class="date-line"></span>
            <el-date-picker
              class="time"
              value-format="yyyy-MM-dd"
              v-model="fbTakerQuery.endDate"
              type="date"
              :picker-options="pickerBeginDateAfter"
              format="yyyy-MM-dd"
              :placeholder="$t('otc.selectEndDate')">
            </el-date-picker>

          </div>
          <!--筛选数据 End-->

        <!--发布委托-->
        <a class="reset" @click="$refs.myTaker.myTakeList()">{{$t('otc.search')}}</a>

      </div>
      <!--顶部搜索筛选工具栏 End-->
      <div class="el-tabs__content">
        <taker-detail ref="myTaker" :fb-proxy-taker-query.sync="fbTakerQuery"/>
      </div>

    </div>
  </div>
</template>

<script>
  import TakerDetail from "./takerDetail";
  import {
    getAssetFilterData
  } from "../../api/otc";
  export default {
    name: "myTakerList",
    components: {TakerDetail},
    created() {
      this.getAssetFilterData();
    },
    data() {
      return {
        //筛选数据
        options:{
          //支付方式
          fbTradeCoinList:[],
          //1.申请;2.已取消;3.买方付款确认;4.卖方收款确认;5.已成交;6.申诉处理中;
          type: [
            {key: [1], name: this.$i18n.t('otc.pendingPayment')},
            {key: [2], name: this.$i18n.t('otc.cancelled')},
            {key: [3], name: this.$i18n.t('otc.paid')},
            {key: [4], name: this.$i18n.t('otc.paidFor')},
            {key: [5], name: this.$i18n.t('otc.dealDone')},
          /*  {key: [5], name: this.$i18n.t('otc.appeal')}*/],
          //法币列表
          directionType:[
            {key: 1, name: this.$i18n.t('otc.buy')},
            {key: 2, name: this.$i18n.t('otc.sell')}],
          //国家列表
          countryList:[],
          payTypeMap: {},
          payTypeClass: {
            1: ['iconfont icon-card', 'pay-icon card-bg'],
            2: ['iconfont icon-wechat', 'pay-icon wechat-bg'],
            3: ['iconfont icon-alipay', 'pay-icon alipay-bg'],
          }
        },
        /*委托单查询*/
        fbTakerQuery:{
          /*数字币种*/
          dcCode: null,
          /*买卖方向*/
          direction: null,
          /*订单状态*/
          orderStatus: null,
          /*订单类型*/
          orderType: null,
          /*开始时间*/
          beginDate: null,
          /*结束时间*/
          endDate: null,
          /*每页查询几条数据*/
          limit: 10,
          /*当前页数*/
          page: 1
        },
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let endDateDateVal = this.fbTakerQuery.endDate;
            if (endDateDateVal) {
              return time.getTime() > new Date(endDateDateVal).getTime() ||  time.getTime() > Date.now()/* - 1000 * 60 * 60 * 24*/;
            }else {
              return time.getTime() > Date.now();
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.fbTakerQuery.beginDate;
            if (beginDateVal) {
              return time.getTime() < (new Date(beginDateVal).getTime() - 1000 * 60 * 60 * 24) || time.getTime() > Date.now()
            }else {
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
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";

</style>
