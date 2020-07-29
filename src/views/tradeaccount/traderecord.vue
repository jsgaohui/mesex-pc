<template>
  <div class="finanrec_body user-main">
    <div class="crumbs">
      <router-link to="tradeaccount">{{$t('fund.bbAccount')}}</router-link>
      <i>&gt;</i><span>{{$t('assets.financialRecords')}}</span></div>
    <section class="finanrec_body_main finanrec_body_box">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane :label="$t('assets.rechargeRecords')" name="recharge">
            <el-table  :empty-text="$t('common.nodata')" :data="rechargeList" style="width: 100%">
              <el-table-column
                prop="createTime"
                :label="$t('order.subtime')"
                width="180">
              </el-table-column>
              <el-table-column
                prop="symbol"
                :label="$t('assets.coin')"
                width="80">
              </el-table-column>
              <el-table-column
                width="80"
                prop="rechargeAmount"
                :label="$t('assets.volume')">
              </el-table-column>
              <el-table-column
                width="400"
                prop="userAddress"
                :label="$t('order.rechareAdd')">
              </el-table-column>
              <el-table-column
                prop="enable"
                :label="$t('order.status')">
                <template slot-scope="scope">
                  <el-tag size="medium" v-if="scope.row.enable===1">{{$t('order.rechargesucc')}}</el-tag>
                  <el-tag size="medium" v-else>{{$t('order.rechargefail')}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
            <div v-show="!listLoading">
              <div class="pagination">
                <el-pagination @current-change="handleRechargeChange" :current-page.sync="rechargeListQuery.page"
                               :page-size="rechargeListQuery.limit" layout="prev, pager, next"
                               :total="rechargeTotal"></el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('order.withdarawRecords')" name="withdraw">
            <el-table  :empty-text="$t('common.nodata')" :data="withdrawList" style="width: 100%">
              <el-table-column
                prop="createTime"
                :label="$t('order.time')"
                width="180">
              </el-table-column>
              <el-table-column
                prop="symbol"
                :label="$t('assets.coin')"
                width="60">
              </el-table-column>
              <el-table-column
                prop="tradeAmount"
                :label="$t('assets.volume')" width="100">
              </el-table-column>
              <el-table-column
                width="80"
                prop="chargeAmount"
                :label="$t('assets.charge')">
              </el-table-column>
              <el-table-column
                width="180"
                prop="updateTime"
                :label="$t('order.exectime')">
              </el-table-column>
              <el-table-column
                prop="transactionId"

                :label="$t('order.transactionId')">
              </el-table-column>
              <el-table-column
                prop="userAddress"

                :label="$t('order.withdrawAdd')">

              </el-table-column>
              <el-table-column

                :label="$t('order.status')">
                <template slot-scope="scope">
                  <el-tag size="medium" v-if="scope.row.enable===0">{{$t('order.auding')}}</el-tag>
                  <el-tag size="medium" v-else-if="scope.row.enable===1">{{$t('order.audited')}}</el-tag>
                  <el-tag size="medium" v-else-if="scope.row.enable===2">{{$t('order.execing')}}</el-tag>
                  <el-tag size="medium" v-else-if="scope.row.enable===3">{{$t('order.withdrawing')}}</el-tag>
                  <el-tag size="medium" v-else-if="scope.row.enable===4">{{$t('order.withdrawfail')}}</el-tag>
                  <el-tag size="medium" v-else-if="scope.row.enable===5">{{$t('order.withdrawsucc')}}</el-tag>
                  <el-tag size="medium" v-else-if="scope.row.enable===6">{{$t('order.failfreeze')}}</el-tag>
                  <el-tag size="medium" v-else-if="scope.row.enable===7">{{$t('order.withsubmit')}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
            <div v-show="!listLoading">
              <div class="pagination">
                <el-pagination @current-change="handleWithdrawChange" :current-page.sync="withdrawListQuery.page"
                               :page-size="withdrawListQuery.limit" layout="prev, pager, next"
                               :total="withdrawTotal"></el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!--<div class="finanrec_search"><span class="m_select">-->
        <!--<div class="dropdown J_dropdown">-->
        <!--<button>全部<span></span></button>-->
        <!--<ul class="J_menu" id="list_symbols_select" style="display: none;">-->
        <!--<li><a class="active" href="javascript:;" data-value="">全部</a></li>-->
        <!--<li><a href="javascript:;" data-value="HT">HT</a></li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--</span></div>-->
    </section>
  </div>
</template>

<script>
  import {queryRecords, withdrawRecords} from "../../api/account";

  export default {
    name: "traderecord",
    data() {
      return {
        activeName: 'recharge',
        withdrawListQuery: {
          page: 1,
          limit: 10,
        },
        withdrawTotal: 0,
        rechargeListQuery: {
          page: 1,
          limit: 10,
        },
        rechargeTotal: 0,
        recordList: [],
        rechargeList: [],
        withdrawList: []
      }
    },
    created() {
      if (this.$route.params.activeName) {
        this.activeName = this.$route.params.activeName;
        if (this.activeName === 'recharge') {
          this.getRecordList();
        } else {
          this.withdrawRecords();
        }
      }else{
        this.getRecordList();
      }
    }, methods: {
      getRecordList() {
        this.listLoading = true;
        let $this = this;
        queryRecords(this.rechargeListQuery).then((response) => {
          if (response.code === 200) {
            var data = response.data;
            if(data.pageResult.records!==null){
              $this.rechargeList = data.pageResult.records;
              $this.rechargeTotal = data.pageResult.total;
            }
          }
          this.listLoading = false;
        });
      },
      withdrawRecords() {
        let $this = this;
        this.listLoading = true;
        withdrawRecords(this.withdrawListQuery).then((response) => {
          if (response.code === 200) {
            var data = response.data;
            if(data.pageResult.records!==null){
              $this.withdrawList = data.pageResult.records;
              $this.withdrawTotal = data.pageResult.total;
            }
          }
          this.listLoading = false;
        });
      },
      handleRechargeChange(val){
        this.rechargeListQuery.page = val;
        this.getRecordList();
      },
      handleWithdrawChange(val){
        this.withdrawListQuery.page = val;
        this.withdrawRecords();
      },
      tabClick(tab, event) {
        this.activeName = tab.name;
        if (this.activeName === 'recharge') {
          this.getRecordList();
        } else {
          this.withdrawRecords();
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/user.scss";
</style>
