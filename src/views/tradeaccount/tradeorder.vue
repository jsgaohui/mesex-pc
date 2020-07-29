<template>
  <div class="transac_body user-main">
    <div class="transac_body_main transac_body_box">
      <!--<ul>-->
      <!--<li class="cur" @click="setCurrent('cur')">当前委托</li>-->
      <!--<li >委托历史</li>-->
      <!--<li>成交明细</li>-->
      <!--</ul>-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane  :label="$t('order.current')" :name="curTab"  >
          <el-table  :empty-text="$t('common.nodata')" :data="commisionList" style="width: 100%">
            <el-table-column
              prop="clientOrderTime"
              :label="$t('order.time')"
              width="160">
            </el-table-column>
            <el-table-column
              prop="symbol"
              :label="$t('order.tradeSymbol')"
              width="120">
            </el-table-column>
            <el-table-column :label="$t('order.direction')"  width="80">
              <template slot-scope="scope">
                <el-tag class="color-buy" v-if="scope.row.direction===1">{{$t('common.buy')}}</el-tag>
                <el-tag class="color-sell" v-else>{{$t('common.sell')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderPrice" width="150"
              :label="$t('order.price')" >
            </el-table-column>
            <el-table-column
              prop="orderVolume" width="150"
              :label="$t('order.volume')">
            </el-table-column>
            <!--<el-table-column-->
            <!--:label="$t('order.entrustVolume')">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ Number.parseFloat(scope.row.orderVolume*scope.row.orderPrice).toFixed(8) }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column width="150"
                             prop="matchVolume"
                             :label="$t('order.traded')">
            </el-table-column>
            <el-table-column width="180"
                             :label="$t('order.noTrade')">
              <template slot-scope="scope">
                <span >{{ Number.parseFloat(scope.row.orderVolume-scope.row.matchVolume).toFixed(8) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operation')">
              <template slot-scope="scope">
                <el-button @click="handleCancel(scope.row)" type="text" size="small">{{$t('common.cancel')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<div v-show="!listLoading" id="pagination_login_log">-->
          <!--<div class="pagination">-->
          <!--<el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"-->
          <!--:page-size="listQuery.limit" layout="prev, pager, next" :total="total"></el-pagination>-->
          <!--</div>-->
          <!--</div>-->
        </el-tab-pane>
        <el-tab-pane :label="$t('order.entrustHistory')" :name="hisTab">
          <el-table v-loading.body="listLoading" :empty-text="$t('common.nodata')" :data="commisionHisList" style="width: 100%">
            <el-table-column
              prop="clientOrderTime"
              :label="$t('order.time')"
              width="180">
            </el-table-column>
            <el-table-column
              prop="symbol"
              :label="$t('order.tradeSymbol')"
            >
            </el-table-column>
            <el-table-column :label="$t('order.direction')"  width="100">
              <template slot-scope="scope">
                <el-tag class="color-buy" v-if="scope.row.direction===1">{{$t('common.buy')}}</el-tag>
                <el-tag class="color-sell" v-else>{{$t('common.sell')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderPrice"
              :label="$t('order.price')">
            </el-table-column>
            <el-table-column
              prop="orderVolume"
              :label="$t('order.volume')">
            </el-table-column>
            <el-table-column
              prop="orderVolume"
              :label="$t('order.entrustVolume')">
              <!--<template slot-scope="scope">-->
              <!--<span style="margin-left: 10px">{{ scope.row.orderVolume*scope.row.orderPrice }}</span>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column
              :label="$t('order.tradeVolume') ">
              <template slot-scope="scope">
                <span>{{ Number.parseFloat(scope.row.orderVolume*scope.row.orderPrice).toFixed(8) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('order.tradeAverage') " >
              <template slot-scope="scope">
                <span >{{ scope.row.matchAmount>0?Number.parseFloat(scope.row.matchAmount/scope.row.matchVolume).toFixed(8):0 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="matchVolume"
              :label="$t('order.traded')">
            </el-table-column>
            <el-table-column
              :label="$t('order.status')" >
              <template slot-scope="scope">
                <span v-if="scope.row.orderStatus===3">{{$t('order.noTrade')}}</span>
                <span v-if="scope.row.orderStatus===4">{{$t('order.partTraded')}}</span>
                <span v-if="scope.row.orderStatus===5">{{$t('order.partTradedCancel')}}</span>
                <span v-if="scope.row.orderStatus===6">{{$t('order.allTrade')}}</span>
                <span v-if="scope.row.orderStatus===7">{{$t('order.rescinded')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operation')">
              <template slot-scope="scope">
                <el-button v-if="scope.row.orderStatus===3||scope.row.orderStatus===4" @click="handleCancel(scope.row)" type="text" size="small">{{$t('common.cancel')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="!listLoading&&hisTotal!==0">
            <div class="pagination">
              <el-pagination  :current-page.sync="hisListQuery.page"
                              :page-size="hisListQuery.limit" layout="prev, pager, next" :total="hisTotal"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('order.tradeDetail')" :name="detailTab">
          <el-table v-loading.body="listLoading" :empty-text="$t('common.nodata')" :data="tradeList" style="width: 100%">
            <el-table-column
              prop="tradeTime"
              :label="$t('order.time')"
            >
            </el-table-column>
            <el-table-column
              prop="symbol"
              :label="$t('order.tradeSymbol')"
            >
            </el-table-column>
            <el-table-column :label="$t('order.direction')"  >
              <template slot-scope="scope">
                <el-tag class="color-buy" v-if="scope.row.direction===1">{{$t('common.buy')}}</el-tag>
                <el-tag class="color-sell" v-else>{{$t('common.sell')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="tradePrice"
              :label="$t('order.price')">
            </el-table-column>
            <el-table-column
              prop="tradeVolume"
              :label="$t('order.volume')">
            </el-table-column>
            <el-table-column
              :label="$t('order.tradeVolume')">
              <template slot-scope="scope">
                <span>{{ Number.parseFloat(scope.row.tradeVolume*scope.row.tradePrice).toFixed(8) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('assets.charge')">
              <template slot-scope="scope">
                <span>{{ Number.parseFloat(scope.row.tradeCharge).toFixed(8) }}({{scope.row.chargeDcCode}})</span>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="!listLoading&&tradeTotal!==0">
            <div class="pagination">
              <el-pagination  :current-page.sync="tradeListQuery.page"
                              :page-size="tradeListQuery.limit" layout="prev, pager, next" :total="tradeTotal"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--div class="transac_search"><span class="m_search">
        <input type="text" id="symbols" placeholder="币种">
        </span>/ <span class="m_select">
        <select id="list_symbols_select">
          <option value="USDT">USDT</option>
        </select>
        <i></i> </span><a href="javascript:;" id="search_symbols" class="btn btn-primary">搜索</a></div>-->
      <!--成交明细END-->
    </div>
  </div>
</template>
<script>
  import {tradeRecords,tradePageRecords} from "../../api/account";
  import {hisRecords,orderCancel,curRecords} from "../../api/trader";

  export default {
    name: "tradeorder",
    data() {
      return {
        curTab : "current",
        hisTab : "history",
        detailTab : "detail",
        commisionList: [],
        commisionHisList: [],
        tradeList:[],
        tradeTotal:0,
        hisTotal:0,
        activeName:'current',
        listLoading:true,
        tradeListQuery: {
          page: 1,
          limit: 10,
        },
        hisListQuery: {
          page: 1,
          limit: 10,
        }
      }
    },
    watch:{
      "hisListQuery.page"(to,from){
        this.handleHisChange(to)
      },
      "tradeListQuery.page"(to,from){
        this.handleTradeChange(to)
      }
    },
    created() {
      this.getList();
    }, methods: {
      handleClick: function (tab, event) {
        let $this=this;
        let target = event.target.getAttribute('id') //获取到当前元素的id
        if(target == "tab-"+this.hisTab){
          hisRecords(this.hisListQuery).then((response)=>{
            if(response.code===200){
              const  data=response.data;
              $this.commisionHisList=data.hisPage.records;
              $this.hisTotal=data.hisPage.total;
            }
            this.listLoading = false;
          })
        }else if (target == "tab-"+this.detailTab){
          tradeRecords(this.tradeListQuery).then((response)=>{
            if(response.code===200){
              const  data=response.data;
              $this.tradeList=data.tradeResult.records;
              $this.tradeTotal=data.tradeResult.total;
            }
            this.listLoading = false;
          })
        }
      },
      getList(){
        let $this=this;
        this.listLoading = true;
        curRecords().then((response)=>{
          if(response.code===200){
            const  data=response.data;
            $this.commisionList=data.curList;
          }
          this.listLoading = false;
        })
      },
      handleTradeChange(val) {
        this.tradeListQuery.page = val;
        this.listLoading=true;
        let $this=this;
        tradePageRecords(this.tradeListQuery).then((response)=>{
          if(response.code===200) {
            $this.tradeList = response.data.result.records;
            $this.tradeTotal = response.data.result.total;
          }
          $this.listLoading = false;
        })
      },
      handleHisChange(val) {
        this.hisListQuery.page = val;
        this.listLoading=true;
        let $this=this;
        hisRecords(this.hisListQuery).then((response)=>{
          if(response.code===200) {
            $this.commisionHisList = response.data.hisPage.records;
            $this.hisTotal = response.data.hisPage.total;
          }
          $this.listLoading = false;
        })
      },
      handleCancel(row) {
        let $this=this;
        orderCancel(row.id).then((response)=>{
          if(response.code===200){
            $this.$message({
              message:$this.$i18n.t('common.cancelorder'),
              type:'success',
              center: true,
              onClose:function () {
                location.reload();
              }
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/user.scss";
</style>
