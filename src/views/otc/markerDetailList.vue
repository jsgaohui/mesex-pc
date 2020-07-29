<template>
  <div class="bd">
    <!--我发布的-->
    <div class="order-tr box box-y-center" v-for="record in makerList.rows" >
      <div class="order-td wtd01">
        <div class="top-txt" v-if="record.direction === 1"><i class="iconfont icon-buy"></i>{{$t('otc.buy')}}</div>
        <div class="top-txt" v-if="record.direction === 2"><i class="iconfont icon-sell"></i>{{$t('otc.sell')}}</div>
        <div class="info-con"><label>{{$t('otc.orderNumber')}}:</label>{{record.makerOrderId}}</div>
        <!--挂牌单状态(1.正常; 2.冻结; 3.待撤单(商家主动撤销处理中); 4.已撤)-->
        <div class="info-con"><label>{{$t('otc.status')}}:</label>{{ makerStatus[record.orderStatus]}}</div>
      </div>
      <div class="order-td wtd01">
        <div class="top-txt"><label> {{$t('otc.releaseTime')}}：</label>{{ record.createTime}}</div>
        <div class="info-con"><label>{{$t('otc.unitPrice')}}：</label><span class="color-sell">{{ formatMoney(record.currOrderPrice) + ' ' + record.currencySymbol}}</span></div>
        <div class="info-con"><label>{{$t('otc.theTransactionAmount')}}：</label>{{ formatMoney(record.tradeAmount) + ' ' + record.currencySymbol}}   </div>
      </div>
      <div class="order-td wtd01">
        <div class="top-txt" style="font-size:14px;">
          <div class="info-con"></div> <label style="color:#878fa5">{{$t('otc.totalQuantity')}} :</label><span>&nbsp;{{record.orderVolume + ' ' + record.dcCode}}</span></div>
        <div class="info-con"><label>{{$t('otc.theRemainingAmount')}}：</label><span>{{record.availableVolume + ' ' + record.dcCode}}</span></div>
        <div class="info-con"><label>{{$t('otc.numberOfFreezes')}}：</label>{{record.freezeVolume + ' ' + record.dcCode}}</div>
      </div>
      <div class="order-td wtd01">
        <div class="top-txt">
        </div>
        <div class="info-con"><label>{{$t('otc.minimumSingleLimit')}}：</label>{{record.limitMin +' ' + record.currencySymbol}}</div>
        <div class="info-con"><label>{{$t('otc.maximumSingleLimit')}}：</label>{{record.limitMax +' ' + record.currencySymbol}} </div>
      </div>
      <div class="order-td" v-show="record.orderStatus === 1">
        <div @click="showCancel(record.makerOrderId)"><i class="iconfont icon-obtained"></i>{{$t('otc.obtained')}}</div>
      </div>
    </div>
    <span class="el-table__empty-text" v-show="!makerList.rows || makerList.rows.length === 0">
          {{ $t('common.nodata') }}
    </span>
    <div class="pagination">
      <el-pagination
        v-show="makerList.total !== 0"
        layout="prev, pager, next"
        :current-page.sync="fbMakerQuery.page"
        :page-size.sync="fbMakerQuery.limit"
        :total="makerList.total"
        @current-change="myMakerList()">
      </el-pagination>
    </div>
    <!--我发布的END-->

    <!--下架发布确认弹窗 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowCancelSell">
      <div class="dialog" style="width:524px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.whetherToConfirmTheRemoval')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowCancelSell=false">×</span></div>
          </div>
        </div>
        <div class="dia_content tips-removal">
          <div class="text">{{$t('otc.determinedToBeRemoved')}}</div>
          <div class="icon-btn"><i class="iconfont icon-close" @click="isShowCancelSell=false"></i><i @click="doCancel()" class="iconfont icon-done"></i></div>
        </div>

      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--下架发布确认弹窗 End-->
  </div>
</template>

<script>
  import {
    myMakerList,cancelMakerOrder
  } from "../../api/otc";
  import {mapGetters} from "vuex";
  export default {
    name: "markerDetailList",
    computed: {
      ...mapGetters(['token', 'user']),
    },
    created() {
      this.myMakerList();
    },
    data() {
      return {
        // 挂牌单状态(1.正常; 2.冻结; 3.待撤单(商家主动撤销处理中); 4.已撤)-
        makerStatus: {
          1: this.$i18n.t('otc.itHasBeenAddedTo'),
          2: this.$i18n.t('otc.backgroundBilling'),
          3: this.$i18n.t('otc.backgroundProcessingInTheRack'),
          4: this.$i18n.t('otc.hasBeenRemoved'),
        },
        //是否显示取消购买弹框
        isShowCancelSell: false,
        //需要取消上架的id
        cancelMakerId:null,
        //挂牌单行情
        makerList:{
          rows:[],
          total:0,
        },
        /*挂牌单查询*/
        fbMakerQuery: {
          /*币种*/
          dcCode: '',
          /*法币币种*/
          currencySymbol: '',
          /*国家*/
          countryCode: '',
          /*支付方式*/
          payMethod: '',
          /*买卖方向*/
          direction: null,
          /*挂牌单状态*/
          orderStatus: null,
          /*金额*/
          amount: '',
          /*每页查询几条数据*/
          limit: 10,
          /*当前页数*/
          page: 1,
        },
      }
    },
    methods: {
      showCancel(cancelMakerId) {
        this.cancelMakerId = cancelMakerId;
        this.isShowCancelSell = true;
      },
      doCancel() {
        let $this = this;
        $this.$message({
          type: 'success',
          message:this.$i18n.t('otc.pleaseWait')
        });
        $this.isShowCancelSell = false;
        if ($this.token) {
          cancelMakerOrder(this.cancelMakerId).then(response => {
            if (response.code === 200) {
              $this.$message({
                type: 'success',
                message: this.$i18n.t('otc.theSystemIsProcessingYourOrder', {num: $this.cancelMakerId})
              });
            }else {
              $this.$message({
                type: 'error',
                message:this.$i18n.t('otc.operationFailed')
              });
            }
            $this.myMakerList();
          })
        } else {
          $this.$message({
            type: 'error',
            message:this.$i18n.t('otc.loginInvalid')
          });
        }
      },
      myMakerList() {
        myMakerList(this.fbMakerQuery).then(response => {
          if (response.code === 200) {
            response.rows.forEach(item => {
              if (item.orderVolume.toString().includes("e") || item.orderVolume.toString().includes("E")) {
                item.orderVolume = Number.parseFloat(item.orderVolume).toFixed(8);
              }
              if (item.freezeVolume.toString().includes("e") || item.freezeVolume.toString().includes("E")) {
                item.freezeVolume = Number.parseFloat(item.freezeVolume).toFixed(8);
              }
              if (item.availableVolume.toString().includes("e") || item.availableVolume.toString().includes("E")) {
                item.availableVolume = Number.parseFloat(item.availableVolume).toFixed(8);
              }
              if (item.currOrderPrice.toString().includes("e") || item.currOrderPrice.toString().includes("E")) {
                item.currOrderPrice = Number.parseFloat(item.currOrderPrice).toFixed(2);
              }
              if (item.limitMin.toString().includes("e") || item.limitMin.toString().includes("E")) {
                item.limitMin = Number.parseFloat(item.limitMin).toFixed(2);
              }
              if (item.limitMax.toString().includes("e") || item.limitMax.toString().includes("E")) {
                item.limitMax = Number.parseFloat(item.limitMax).toFixed(2);
              }
            });
            this.makerList.rows = response.rows;
            this.makerList.total = response.total;
          }
        })
      },
      formatMoney(money){
        return money.toFixed(2);
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";
</style>
