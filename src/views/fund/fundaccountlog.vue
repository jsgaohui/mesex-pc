<template>
  <div>
    <!--资产-->
    <div class="asset-content">
      <div class="asset-box flex-space-t">
        <!--左侧导航-->
        <div class="left-nav">
          <h2>{{$t('common.assets')}}</h2>
          <ul>
            <li>
              <router-link to='otcaccount'>{{$t('fund.fbAccount')}}</router-link>
            </li>
            <li>
              <router-link to="tradeaccount">{{$t('fund.bbAccount')}}</router-link>
            </li>
            <!--<li><a href="">{{$t('fund.fbAccount')}}</a></li>-->
            <li class="active">
              <router-link to="fundaccount">{{$t('fund.fundAccount')}}</router-link>
            </li>
          </ul>
        </div>
        <!--左侧导航END-->
        <!--右侧内容-->
        <div class="right-con bill-con">

          <div class="search-con flex-space">
            <div class="back-txt">
              <router-link to="fundaccount">{{$t('fund.back')}}</router-link>
            </div>
            <div>
              {{$t('fund.time')}}：

              <el-date-picker
                v-model="listQuery.beginDate"
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
                v-model="listQuery.endDate"
                type="date"
                :picker-options="pickerBeginDateAfter"
                format="yyyy-MM-dd"
                :placeholder="$t('otc.selectEndDate')">
              </el-date-picker>

              <a><i class="hb_icon_search" @click="userfundLoglist()"></i></a>
            </div>
          </div>
          <section>
            <div class="body">
              <el-table :empty-text="$t('common.nodata')" :data="list" style="width: 100%" class="table">
                <el-table-column
                  prop="dcCode"
                  :label="$t('fund.dcCode')"
                  width="180">
                </el-table-column>
                <el-table-column
                  :label="$t('fund.fundName')"

                  prop="remark"
                align="right">
                </el-table-column>
                <el-table-column
                  :label="$t('fund.amount')"

                  align="right">
                  <template slot-scope="scope">
                    {{ Number.parseFloat(scope.row.changeAmount).toFixed(8)}}&nbsp;{{scope.row.dcCode}}
                  </template>
                </el-table-column>

                <el-table-column
                  :label="$t('fund.direction')"
                  width="150"
                  align="right">
                  <template slot-scope="scope">
                    <span v-if="scope.row.changeType==1">{{$t('fund.out')}}</span>
                    <span v-else-if="scope.row.changeType==2">{{$t('fund.in')}}</span>
                    <span v-else-if="scope.row.changeType==3">{{$t('fund.out')}}</span>
                    <span v-else-if="scope.row.changeType==4">{{$t('fund.in')}}</span>
                    <span v-else-if="scope.row.changeType==5">{{$t('fund.turn_out')}}</span>
                    <span v-else-if="scope.row.changeType==6">{{$t('fund.turn_in')}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('fund.time')"
                  width="210"
                  prop="updateTime"
                  align="right">
                </el-table-column>
                <el-table-column
                  :label="$t('fund.remark')"
                  align="center"

                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.changeType==1">{{$t('fund.freeze')}}</span>
                    <span v-else-if="scope.row.changeType==2">{{$t('fund.unfreeze')}}</span>
                    <span v-else-if="scope.row.changeType==3">{{$t('fund.chrge')}}</span>
                    <span v-else-if="scope.row.changeType==4">{{$t('fund.income')}}</span>
                    <span v-else-if="scope.row.changeType==5">{{$t('fund.turn_out_remark')}}</span>
                    <span v-else-if="scope.row.changeType==6">{{$t('fund.turn_in_remark')}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-show="!listLoading">
              <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                               :page-size="listQuery.limit" layout="prev, pager, next" :total="total"></el-pagination>
              </div>
            </div>
          </section>
        </div>
        <!--右侧内容END-->
      </div>
    </div>
    <!--资产END-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {userfundLoglist} from '../../api/fund'

  export default {
    name: 'fundaccountlog',
    data () {
      const validOrderVolume = (rule, value, callback) => {
        if (!value || value < 0) {
          callback(new Error(this.$i18n.t('trade.buyRightVolume')))
        } else {
          callback()
        }
      }

      return {
        list: null,
        listLoading: true,
        total: 0,
        list: null,
        listQuery: {
          page: 1,
          limit: 10,
          beginDate: '',
          endDate: '',
        },
        pickerBeginDateBefore: {
          disabledDate: (time) => {
            let endDateDateVal = this.listQuery.endDate
            if (endDateDateVal) {
              return time.getTime() > new Date(endDateDateVal).getTime() || time.getTime() > Date.now()/* - 1000 * 60 * 60 * 24*/
            } else {
              return time.getTime() > Date.now()
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.listQuery.beginDate
            if (beginDateVal) {
              return time.getTime() < (new Date(beginDateVal).getTime() - 1000 * 60 * 60 * 24) || time.getTime() > Date.now()
            } else {
              return time.getTime() > Date.now()
            }
          }
        },
      }
    },
    created () {
      this.userfundLoglist()
    },
    methods: {
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.userfundLoglist()
      },
      userfundLoglist () {
        let $this = this
        userfundLoglist(this.listQuery).then((response) => {
          if (response.code === 200) {
            $this.list = response.rows
            $this.total = response.total
            $this.listLoading = false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/nc.scss";
</style>
