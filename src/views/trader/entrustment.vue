<template>
  <div>
    <!--委托历史 -->
      <!---登录后-当前委托-->
      <div v-if="token" class="mod open_orders"  :class="parentClass" id="open_orders_scroll" style="display: block">
        <div class="mod_hd l_transac_title"><span class="mod_show_btn">
              <button @click="isActive=!isActive"><i></i></button>
              <span>{{$t('order.current')}}</span></span>
          <ul class="l_tab_transac">
            <!--<li><a href="javascript:;">买入</a></li>-->
            <!--<li><a href="javascript:;">卖出</a></li>-->
            <li  class="z_active"><a href="javascript:;">{{$t('common.all')}}</a></li>
          </ul>
        </div>
        <CollapseTransition ref="CollapseTransition">
          <div class="mod_bd transac_body l_show_box" v-show="isActive">
            <div class="transac_body_main">
              <div class="transac_table_box" style="display:block">
                <el-table v-loading.body="listLoading" :empty-text="$t('common.nodata')"
                          :data="curOrderList"
                          style="width: 100%">
                  <el-table-column
                    prop="clientOrderTime"
                    :label="$t('order.time')"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="symbol"
                    :label="$t('order.tradeSymbol')"
                    width="100">
                  </el-table-column>
                  <el-table-column :label="$t('order.direction')"  width="100">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.direction===1" :class="tradeInfo.color_buy">{{$t('common.buy')}}</el-tag>
                      <el-tag :class="tradeInfo.color_sell" v-else>{{$t('common.sell')}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="orderPrice"
                    :label="$t('order.price')+'('+tradeInfo.basicSymbol+')'">
                  </el-table-column>
                  <el-table-column
                    prop="orderVolume"
                    :label="$t('order.volume')+'('+tradeInfo.tradeSymbol+')'">
                  </el-table-column>
                  <el-table-column
                    :label="$t('order.entrustVolume')+'('+tradeInfo.basicSymbol+')'">
                    <template slot-scope="scope">
                      <span>{{ Number.parseFloat(scope.row.orderVolume*scope.row.orderPrice).toFixed($parent.tradePriceDigit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="matchVolume"
                    :label="$t('order.traded')+'('+tradeInfo.tradeSymbol+')'">
                  </el-table-column>
                  <el-table-column
                    :label="$t('order.noTrade')">
                    <template slot-scope="scope">

                      <span>{{ Number.parseFloat(scope.row.orderVolume-scope.row.matchVolume).toFixed($parent.tradePriceDigit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('common.operation')">
                    <template slot-scope="scope">
                      <el-button @click="handleCancel(scope.row)" type="text" size="small">{{$t('common.cancel')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!--<div v-show="!listLoading">-->
                <!--<div class="pagination">-->
                <!--<el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"-->
                <!--:page-size="listQuery.limit" layout="prev, pager, next" :total="total"></el-pagination>-->
                <!--</div>-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </CollapseTransition>
      </div>
      <!---登录后-当前委托END-->
      <!---登录后-委托历史-->

      <div v-if="token" class="mod order_history" :class="hisParentClass" id="order_history_scroll" style="display:block">
        <div class="mod_hd l_transac_title"><span class="mod_show_btn">
              <button @click="hisActive=!hisActive"><i></i></button>
              <span>{{$t('order.entrustHistory')}}</span><em>({{$t('order.latelyWeek')}})</em></span>
          <ul class="l_tab_transac">
            <!--<li data-type="buy"><a href="javascript:;">买入</a></li>-->
            <!--<li data-type="sell"><a href="javascript:;">卖出</a></li>-->
            <li class="z_active" data-type="all"><a href="javascript:;">{{$t('common.all')}}</a></li>
          </ul>
        </div>
        <CollapseTransition ref="CollapseTransition">
          <div class="mod_bd transac_body l_show_box" v-show="hisActive">
            <div class="transac_body_main">
              <div class="transac_table_box" id="order_history" style="display: block;">
                <el-table v-loading.body="listLoading"
                          :empty-text="$t('common.nodata')"
                          :data="hisOrderList"
                          style="width: 100%">
                  <el-table-column
                    prop="clientOrderTime"
                    :label="$t('order.time')"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="symbol"
                    :label="$t('order.tradeSymbol')"
                    width="100">
                  </el-table-column>
                  <el-table-column :label="$t('order.direction')"  width="100">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.direction===1" :class="tradeInfo.color_buy">{{$t('common.buy')}}</el-tag>
                      <el-tag v-else :class="tradeInfo.color_sell">{{$t('common.sell')}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('order.price')+'('+tradeInfo.basicSymbol+')'">
                    <template slot-scope="scope">
                      <span>{{ Number.parseFloat(scope.row.orderPrice).toFixed($parent.tradePriceDigit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('order.volume')+'('+tradeInfo.tradeSymbol+')'">
                    <template slot-scope="scope">
                      <span>{{ Number.parseFloat(scope.row.orderVolume).toFixed($parent.tradePriceDigit) }}</span>
                    </template>
                  </el-table-column>
                 <!-- <el-table-column
                    :label="$t('order.entrustVolume')">
                    <template slot-scope="scope">
                      <span>{{ Number.parseFloat(scope.row.orderVolume*scope.row.orderPrice).toFixed(tradeInfo.maxShowUnit) }}</span>
                    </template>
                  </el-table-column>-->
                  <el-table-column
                    :label="$t('order.traded')+'('+tradeInfo.tradeSymbol+')'">
                    <template slot-scope="scope">
                      <span>{{ Number.parseFloat(scope.row.matchVolume).toFixed($parent.tradePriceDigit) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('order.status')">
                    <template slot-scope="scope">
                      <span v-if="scope.row.orderStatus===5">{{$t('order.partTradedCancel')}}</span>
                      <span v-if="scope.row.orderStatus===6">{{$t('order.allTrade')}}</span>
                      <span v-if="scope.row.orderStatus===7">{{$t('order.rescinded')}}</span>
                    </template>
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--label="操作">-->
                  <!--<template slot-scope="scope">-->
                  <!--<el-button @click="handleCancel(scope.row)" type="text" size="small">撤销</el-button>-->
                  <!--</template>-->
                  <!--</el-table-column>-->
                </el-table>
                <div v-show="showPage && histotal > 0">
                  <div class="pagination">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="hislistQuery.page"
                                   :page-size="hislistQuery.limit" layout="prev, pager, next"
                                   :total="histotal"></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapseTransition>
      </div>
</div>
  <!---登录后-委托历史END-->
</template>
<script>
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  import CollapseTransition from "../../components/animate-contract";
  import Entrustment from "./entrustment"
  import {hisRecords, curRecords} from "../../api/trader";
  import {orderCancel} from "../../api/trader";
  import {escape2Html,formatDate} from "../../utils/stringUtil";
  import sockjs from '../../components/commonjs/sockjs.min'
  import stomp from '../../components/commonjs/stomp.min'
  export default {
    computed: {
      ...mapGetters(['tradeInfo','token','user']),
      parentClass(){
        return this.isActive?"":" hide";
      },
      hisParentClass(){
        return this.hisActive?"":" hide";
      }
    },
    components:{CollapseTransition,Entrustment},
    name: "entrustment",
    data(){
      return {
        isActive:true,
        hisActive:true,
        showPage: true,
        listLoading:true,
        orderStatus: [],
        curOrderList: [],//当前委托
        hisOrderList: [],//历史委托
        listQuery: {//当前委托
          page: 1,
          limit: 10,
          symbol: ''
        },total: null,
        hislistQuery: {//历史委托
          page: 1,
          limit: 10,
          symbol: '',
          day:7
        },
        syncbalance:false,
        histotal: null
      }
    },
    methods:{
      addCurOrderList(orderInfo){
        var clientTime=new Date(orderInfo.clientOrderTime?orderInfo.clientOrderTime:orderInfo.createTime);
        orderInfo.clientOrderTime=formatDate(clientTime,'yyyy-MM-dd hh:mm:ss');
        orderInfo.matchVolume  = orderInfo.matchVolume ? orderInfo.matchVolume:0;
        if (orderInfo.orderStatus === 2 ) { //委托通知
          //未成交
         // console.log(orderInfo.orderStatus+":"+orderInfo.orderId);
          for (let i = 0; i < this.curOrderList.length; i++) {
            var obj = this.curOrderList[i];
            //如果有重复数据,不保存
            if (obj.orderId === orderInfo.orderId) {
              return;
            }
          }
          //添加数据
          this.curOrderList.unshift(orderInfo);
        } else if (orderInfo.orderStatus === 4) {
          //console.log(4+":"+orderInfo.orderId);
          //部分成交
          let info = [orderInfo.orderId,orderInfo.orderStatus];
          let data =  this.orderStatus;
          for (let i = 0; i < this.orderStatus.length; i++) {
            //如果数据状态已经是5,6,7状态,那么直接返回
            if(data[i][0] == info[0] && data[i][1] > info[1]){
              return;
            }
          }

          //部分成交
          var flag=true;
          for (let i = 0; i < this.curOrderList.length; i++) {
            var obj = this.curOrderList[i];
            //如果返回的数据订单ID和数组的数据订单Id有匹配的
            if (obj.orderId === orderInfo.orderId) {
              flag=false;
              obj.matchVolume = orderInfo.matchVolume;//修改成交数量,更新原来的数据
              Vue.set(this.curOrderList[i], 'matchVolume', orderInfo.matchVolume);
              break;
            }
          }
          //数组数据不存在,添加到数组的头部
          if(flag){
            this.curOrderList.unshift(orderInfo);
          }
        } else if (orderInfo.orderStatus === 7) {
          if(this.addToOrderStatus(orderInfo)){
            return;
          };
          //已撤销
          for (let i = 0; i < this.curOrderList.length; i++) {
            var obj = this.curOrderList[i];
            if (obj.orderId === orderInfo.orderId) {
               //移除数组
              orderInfo.clientOrderTime = obj.clientOrderTime;
              orderInfo.orderPrice = obj.orderPrice;
              orderInfo.direction = obj.direction;
              this.curOrderList.splice(i, 1);
              //加入历史
              this.hisOrderList.unshift(orderInfo);
              break;
            }
          }
        } else if (orderInfo.orderStatus === 5 || orderInfo.orderStatus === 6) {
          //部分成交部分撤单  全部成交
          if(this.addToOrderStatus(orderInfo)){
            return;
          };

          for (let i = 0; i < this.curOrderList.length; i++) {
            var obj = this.curOrderList[i];
            if (obj.orderId === orderInfo.orderId) {
              //移除委托队列
              //this.curOrderList.splice(i, 1);
              orderInfo.clientOrderTime = obj.clientOrderTime;
              orderInfo.orderPrice = obj.orderPrice;
              orderInfo.direction = obj.direction;
              //加入历史数据
              this.hisOrderList.unshift(orderInfo);
              this.curOrderList.splice(i, 1);

              break;
            }
          }
        }else if(orderInfo.orderStatus===1001){
          //余额不足
          for (let i = 0; i < this.curOrderList.length; i++) {
            var obj = this.curOrderList[i];
            if (obj.orderId === orderInfo.orderId) {
              //移除数据
              this.curOrderList.splice(i, 1);
              this.$message({
                message: this.$i18n.t(order.errorMsg),
                type: 'error',
                center: true
              })
            }
          }
        }
      },
      addToOrderStatus(orderInfo){
        let info = [orderInfo.orderId,orderInfo.orderStatus];
        let data =  this.orderStatus;
        for (let i = 0; i < this.orderStatus.length; i++) {
          //是否数据重复
          //&& data[i][1] == info[1]
          if(data[i][0] == info[0] ){
             return true;
          }
        }
        this.orderStatus.push(info);
        return false;
      },
      setSyncbalance(flag){
        this.syncbalance = flag;
      },
      getSyncbalance(){
        return this.syncbalance;
      },
      readCurOrders() {
        let $this = this;
        const symbol = this.$parent.getCurrentSymbol();
        this.curOrderList = [];
        //委托未成交的记录
        curRecords(symbol).then((response) => {
          this.listLoading = false;
          if (response.code === 200) {
            var data = response.data;
            $this.curOrderList = data.curList;
          }
        })
      },
      readOrders() {
        let $this = this;
        this.hislistQuery.symbol = this.$parent.getCurrentSymbol();
        this.hisOrderList = [];
        this.showPage=false;
        //委托历史记录
        hisRecords(this.hislistQuery).then((response) => {
          if (response.code === 200) {
            const data = response.data;
            if (data) {
              this.showPage=true;
              $this.histotal = data.hisPage.total;
              $this.hisOrderList = data.hisPage.records;
            }
          }
        })
      },

      handleCancel(row) {
        let $this = this;
        orderCancel(row.id).then((response) => {
          if (response.code === 200) {
            $this.$message({
              message: $this.$i18n.t('common.entrustCancel'),
              type: 'success',
              center: true
            })
          }
        })
      },
      handleCurrentChange(val) {
        this.hislistQuery.symbol = this.$parent.getCurrentSymbol();
        this.hislistQuery.page = val;
        this.readOrders();
      }
    }
  }
</script>
