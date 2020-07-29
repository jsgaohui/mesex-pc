<template>
  <div>
    <div class="otc-path"><h3>{{$t('common.appealOrder')}}</h3></div>
    <div class="otc-orderlist bg-color border-blue" style="margin-top:20px;">
      <!--TAB切换工具栏 Begin-->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane  :label="$t('otc.toBeProcessed')" name="toBeProcessed"  >
          </el-tab-pane>
          <el-tab-pane :label="$t('otc.doProcessing')"   name="doProcessing">
          </el-tab-pane>
          <el-tab-pane :label="$t('otc.haveProcessed')"  name="haveProcessed">
          </el-tab-pane>
        </el-tabs>
      <!--TAB切换工具栏 End-->
      <div class="el-tabs__content">
      <div class="bd appeal-list">
        <span class="el-table__empty-text" v-show="!myAppealOrderList||myAppealOrderList.length===0">
          {{ $t('common.nodata') }}
    </span>
      <div class="order-tr box box-y-center rel" v-for="record in myAppealOrderList">
        <div class="top-icon"><span v-show="record.status===1||record.status===2||record.status===3">{{$t('otc.appeal')}}</span></div>
        <div class="order-td wtd01">
        <!--买卖方向（1买入;2卖出） record.direction === 1  record.direction === 2-->
        <div class="top-txt" v-if="isMyBuy(record.appealUserId,record.appealDirection)"><i class="iconfont icon-buy"></i>{{$t('otc.buy')}}</div>
        <div class="top-txt" v-else><i class="iconfont icon-sell"></i>{{$t('otc.sell')}}</div>
        <div class="info-con">
          <label>{{$t('otc.orderNumber')}}：</label>{{record.relateOrderId}}
        </div>
        <div class="info-con">
          <label>{{$t('otc.unitPrice')}}：</label>{{record.orderPrice + ' ' + record.dcCode}}
        </div>
      </div>
      <div class="order-td wtd02">
        <div class="top-txt">{{record.sellerRealName + ' (+' + record.sellerLocationCode +' ' + record.sellerMobile+')'}}
          <img src="@/assets/images/otc/arrow.png"/>
        </div>
        <div class="info-con">
          <label>{{$t('otc.status')}}：</label><span class="color-buy">{{taterStatus[record.orderStatus]}}</span>
        </div>
        <div class="info-con">
          <label>{{$t('otc.quantity')}}：</label>{{record.orderVolume +' '+ record.dcCode}}
        </div>
      </div>
      <div class="order-td wtd02">
        <div class="top-txt">{{record.buyerRealName}}
          <p v-show="record.orderStatus === 1 || record.orderStatus === 3">{{$t('otc.remainder')}}：<span>{{$t('otc.timedOut')}}</span>
          </p>
        </div>
        <div class="info-con">
          <label>{{$t('otc.setupTime')}}：</label><span>{{record.createTime}}</span>
        </div>
        <div class="info-con">
          <label>{{$t('otc.amount')}}：</label>{{record.amount + ' ' + record.dcCode}}
        </div>
      </div>
      <!--申诉待处理(1.申诉方举证;2.对手方举证;)申诉处理中(3.管理员处理中;) 申诉已处理(4.申诉成功; 5.申诉失败;6.撤销申诉;)-->
      <!--申诉待处理-->
      <div class="order-td" v-if="record.status === 1||record.status === 2">
          <div>
            <i class="iconfont icon-timedout"></i>{{$t('otc.toBeAppealOne')}}
          </div>
          <div @click="goViewAppealDetail(record.relateOrderId)">
            <div class="appeal-btn"> {{$t('otc.appealDetail')}}</div>
          </div>
      </div>
      <!--申诉处理中-->
      <div class="order-td" v-if="record.status === 3">
        <div><i class="iconfont icon-closev"></i>{{$t('otc.toBeAppealTwo')}}</div>
        <div @click="goViewAppealDetail(record.relateOrderId)">
          <div class="appeal-btn"> {{$t('otc.appealDetail')}}</div>
        </div>
      </div>
      <!--申诉成功-->
      <div class="order-td" v-if="record.status === 4">
        <div><i class="iconfont icon-finish"></i>{{$t('otc.toBeAppealThree')}}</div>
        <div @click="goViewAppealDetail(record.relateOrderId)">
          <div class="appeal-btn"> {{$t('otc.appealDetail')}}</div>
        </div>
      </div>
      <!--5.申诉失败-->
      <div class="order-td" v-if="record.status === 5">
        <div><i class="iconfont icon-success"></i>{{$t('otc.toBeAppealFour')}}</div>
        <div @click="goViewAppealDetail(record.relateOrderId)">
          <div class="appeal-btn"> {{$t('otc.appealDetail')}}</div>
        </div>
      </div>
      <!--6.申诉已撤销-->
      <div class="order-td" v-if="record.status === 6">
        <div><i class="iconfont icon-closev"></i>{{$t('otc.toBeAppealFive')}}
        <div @click="goViewAppealDetail(record.relateOrderId)">
          <div class="appeal-btn"> {{$t('otc.appealDetail')}}</div>
        </div>
        </div>
      </div>
      </div>
        <div class="pagination">
          <el-pagination
            v-show="myAppealOrderList"
            layout="prev, pager, next"
            :current-page.sync="appealQuery.page"
            :page-size.sync="appealQuery.limit"
            :total="total"
            @current-change="getMyAppealOrderList()">
          </el-pagination>
        </div>
    </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {myAppealOrderList} from "../../api/otc";
  import {mapGetters} from "vuex";
  export default {
    name: "appealOrder",
    computed: {
      ...mapGetters(['user', 'token']),
      headers() {
        return {
          'UUID': this.token
        }
      }
    },
    created() {
      this.appealQuery.status = [1,2];
      this.getMyAppealOrderList();
    },
    data() {
      return {
        activeName:'toBeProcessed',
        // 1.申请;2.已取消;3.买方付款确认;4.卖方收款确认;5.已成交;6.申诉处理中;-
        taterStatus: {
          1: this.$i18n.t('otc.pendingPayment'),
          2: this.$i18n.t('otc.cancelled'),
          3: this.$i18n.t('otc.paid'),
          4: this.$i18n.t('otc.paidFor'),
          5: this.$i18n.t('otc.dealDone'),
          6: this.$i18n.t('otc.appeal'),
        },
        myAppealOrderList:[],
        appealQuery:{//待处理的单
          /*订单状态*/
          status: [],
          limit: 10,
          /*当前页数*/
          page: 1
        },
        total:0,//总数
      }
    },
    methods: {
      isMyBuy(userId, direction) { // userId为发起申诉方 direction为申诉方的买卖方向
        if (this.id) {
          // console.log("userId " + userId,this.user);
          // 买卖方向（1买入;2卖出）
          if (direction === 1) {
            if (this.id === userId) {
              return true;
            } else {
              return false;
            }
          } else { // direction === 2
            if (this.id === userId) {
              return false;
            } else {
              return true;
            }
          }
        }
        return false;
      },
      handleClick: function (tab, event) {
        let $this=this;
        let target = event.target.getAttribute('id') //获取到当前元素的id
        if(target == "tab-toBeProcessed"){
          $this.appealQuery.page = 1;
          $this.appealQuery.status = [1,2];
        }else if (target == "tab-doProcessing"){
          $this.appealQuery.page = 1;
          $this.appealQuery.status = [3];
        }else if (target == "tab-haveProcessed"){
          $this.appealQuery.page = 1;
          $this.appealQuery.status = [4,5,6];
        }
        myAppealOrderList($this.appealQuery).then((response)=>{
          if(response.code===200){
            $this.myAppealOrderList=response.rows;
            $this.total = response.total;
          }
        })
      },
      //获取我的委托单列表数据
      getMyAppealOrderList() {
        let $this = this;
        myAppealOrderList($this.appealQuery).then((response)=>{
          if(response.code===200){            
            $this.myAppealOrderList=response.rows;
            $this.total = response.total;
          }
        })
      },
      //查看申诉资料
      goViewAppealDetail(relateOrderId){
       this.$router.push({name:'viewAppealDetail',query:{takerId:relateOrderId}});
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";

</style>
