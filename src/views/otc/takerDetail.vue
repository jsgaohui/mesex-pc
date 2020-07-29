<template>

  <div class="bd">
    <div class="order-tr box box-y-center rel" v-for="record in myTakerList.records">
      <!-- <div class="appeal-btn">我要申诉</div>
      <div class="appeal-btn on">查看申诉</div> -->
      <div class="order-td wtd01">
        <!--买卖方向（1买入;2卖出） record.direction === 1  record.direction === 2-->
        <div class="top-txt" v-if="isMyBuy(record.userId,record.direction)"><i class="iconfont icon-buy"></i>{{$t('otc.buy')}}<span v-show="record.appealFlag===1||record.appealFlag===2||record.appealFlag===3" class="appeal">{{$t('otc.appeal')}}</span></div>
        <div class="top-txt" v-else><i class="iconfont icon-sell"></i>{{$t('otc.sell')}}<span v-show="record.appealFlag===1||record.appealFlag===2||record.appealFlag===3" class="appeal">{{$t('otc.appeal')}}</span></div>
        <div class="info-con">
          <label>{{$t('otc.orderNumber')}}：</label>{{record.takerOrderId}}
        </div>
        <div class="info-con">
          <label>{{$t('otc.unitPrice')}}：</label>{{record.orderPrice + ' ' + record.currencySymbol}}
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
          <p v-show="record.orderStatus === 1 || record.orderStatus === 3">{{$t('otc.remainder')}}：<span>{{myTakerList.remainingTimes[record.takerOrderId]}}</span>
          </p>
        </div>
        <div class="info-con">
          <label>{{$t('otc.setupTime')}}：</label><span>{{record.createTime}}</span>
        </div>
        <div class="info-con">
          <label>{{$t('otc.amount')}}：</label>{{record.amount + ' ' + record.currencySymbol}}
        </div>
      </div>
      <!--1.申请;2.已取消;3.买方付款确认;4.卖方收款确认;5.已成交;6.申诉处理中;-->
      <!--1.申请-->
      <div class="order-td" v-if="record.orderStatus === 1">
        <div v-show="isMyBuy(record.userId,record.direction)">
          <div v-show="isTimeOut(myTakerList.remainingTimes[record.takerOrderId])">
            <i class="iconfont icon-timedout"></i>{{$t('otc.orderHasTimedOut')}}
          </div>
          <div @click="goToAppeal(record)" v-show="isTimeOut(myTakerList.remainingTimes[record.takerOrderId])&&(!record.appealFlag||record.appealFlag===0)">
            <div class="appeal-btn">{{$t('otc.goToAppeal')}}</div>
          </div>
           <div @click="goViewAppealDetail(record.takerOrderId)" v-show="isTimeOut(myTakerList.remainingTimes[record.takerOrderId])&&record.appealFlag&&record.appealFlag!==0">
             <div class="appeal-btn on">{{$t('otc.appealDetail')}}</div>
          </div>
          <div v-show="!isTimeOut(myTakerList.remainingTimes[record.takerOrderId])">
            <div @click="cancelBuy(record)"><i class="iconfont icon-closev"></i>{{$t('otc.cancel')}}</div>
            <div @click="showConfirmPayment(record,true)"><i class="iconfont icon-paid"></i>{{$t('otc.iHavePaid')}}</div>
            <div @click="showPayType(record)"><i class="iconfont icon-viewpayment"></i>{{$t('otc.viewPaymentMethod')}}</div>
          </div>
        </div>
        <div v-show="!isMyBuy(record.userId,record.direction)">
          <div><i class="iconfont icon-waiting"></i>{{$t('otc.waitingForBuyersPayment')}}</div>
          <div @click="goToAppeal(record)" v-show="isTimeOut(myTakerList.remainingTimes[record.takerOrderId])&&(!record.appealFlag||record.appealFlag===0)">
            <div class="appeal-btn">{{$t('otc.goToAppeal')}}</div>
          </div>
           <div @click="goViewAppealDetail(record.takerOrderId)" v-show="isTimeOut(myTakerList.remainingTimes[record.takerOrderId])&&record.appealFlag&&record.appealFlag!==0">
            <div class="appeal-btn on">{{$t('otc.appealDetail')}}</div>
          </div>
        </div>
      </div>
      <!--2.已取消-->
      <div class="order-td" v-if="record.orderStatus === 2">
        <div><i class="iconfont icon-closev"></i>{{$t('otc.orderHasBeenCancelled')}}</div>
         <div @click="goToAppeal(record)" v-show="!record.appealFlag||record.appealFlag===0">
           <div class="appeal-btn">{{$t('otc.goToAppeal')}}</div>
        </div>
        <div @click="goViewAppealDetail(record.takerOrderId)" v-show="record.appealFlag&&record.appealFlag!==0">
            <div class="appeal-btn on">{{$t('otc.appealDetail')}}</div>
        </div>
      </div>
      <!--3.买方付款确认-->
      <div class="order-td" v-if="record.orderStatus === 3">
        <div @click="goCustomerService()" v-show="isTimeOut(myTakerList.remainingTimes[record.takerOrderId])">
          <i class="iconfont icon-timedout"></i>{{$t('otc.orderHasTimedOut2')}}
        </div>
        <div @click="goToAppeal(record)" v-show="isTimeOut(myTakerList.remainingTimes[record.takerOrderId])&&(!record.appealFlag||record.appealFlag===0)">
          <div class="appeal-btn">{{$t('otc.goToAppeal')}}</div>
        </div>
        <div @click="goViewAppealDetail(record.takerOrderId)" v-show="isTimeOut(myTakerList.remainingTimes[record.takerOrderId])&&record.appealFlag&&record.appealFlag!==0">
          <div class="appeal-btn on">{{$t('otc.appealDetail')}}</div>
        </div>
        <div v-show="!isTimeOut(myTakerList.remainingTimes[record.takerOrderId])">
          <div v-show="isMyBuy(record.userId,record.direction)">
            <i class="iconfont icon-waiting"></i>
            {{$t('otc.theOtherPartyConfirmsThatThereIsStillLeft')}}
            {{getCharacterTime(myTakerList.remainingTimes[record.takerOrderId])}}
          </div>
          <div @click="showConfirmRemittance(record)"
               v-show="!isMyBuy(record.userId,record.direction)">
            <i class="iconfont icon-remittance"></i>{{$t('otc.confirmRemittance')}}
          </div>
          <div v-show="!isMyBuy(record.userId,record.direction)">
            <i class="iconfont icon-waiting"></i>
            {{$t('otc.remainingTime') + getCharacterTime(myTakerList.remainingTimes[record.takerOrderId])}}
          </div>
        </div>
      </div>
      <!--4.卖方收款确认-->
      <div class="order-td" v-if="record.orderStatus === 4">
        <div><i class="iconfont icon-closev"></i>{{$t('otc.beingProcessedInTheBackground')}}</div>
      </div>
      <!--5.已成交-->
      <div class="order-td" v-if="record.orderStatus === 5">
        <div><i class="iconfont icon-success"></i>{{$t('otc.theOrderHasBeenSuccessfullyCompleted')}}</div>
         <div @click="goToAppeal(record)" v-show="!record.appealFlag||record.appealFlag===0">
           <div class="appeal-btn">{{$t('otc.goToAppeal')}}</div>
        </div>
        <div @click="goViewAppealDetail(record.takerOrderId)" v-show="record.appealFlag&&record.appealFlag!==0">
          <div class="appeal-btn on">{{$t('otc.appealDetail')}}</div>
        </div>
      </div>
      <!--6.申诉处理中-->
      <div class="order-td" v-if="record.orderStatus === 6">
        <div><i class="iconfont icon-closev"></i>{{$t('otc.appealProcessing')}}
        </div>
      </div>
    </div>
    <span class="el-table__empty-text" v-show="!myTakerList.records || myTakerList.records.length === 0">
          {{ $t('common.nodata') }}
    </span>
    <div class="pagination">
      <el-pagination
        v-show="myTakerList.total !== 0"
        layout="prev, pager, next"
        :current-page.sync="fbTakerQuery.page"
        :page-size.sync="fbTakerQuery.limit"
        :total="myTakerList.total"
        @current-change="myTakeList()">
      </el-pagination>
    </div>
    <!--取消订单 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowCancelBuy"  v-if="takerRecordData">
      <div class="dialog" style="width:362px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.confirmCancel')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowCancelBuy=false">×</span></div>
          </div>
        </div>
        <div class="dia_content">
          <div class="p-con">
            <p>{{$t('otc.doNotCancelTheTransaction')}}</p>
            <p class="p02">{{$t('otc.restrictTradingFunction',{hour:myTakerList.cancelHour,num:myTakerList.cancelNum})}}
              <i class="iconfont icon-sym-i"></i>
            </p>
          </div>
          <div class="check-box">
            <el-checkbox v-model="isAgreeCancelBuy">
              {{$t('otc.noPayment')}}
            </el-checkbox>
          </div>
        </div>
        <div class="dia_submit flex-box">
          <el-button @click="clickCancelBuy()"
                     type="button" class="el-button btn btn_submit btn-primary el-button--default el-button--medium">
            {{$t('otc.confirm')}}
          </el-button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--取消订单 End-->

    <!--确认收款 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowConfirmRemittance"  v-if="takerRecordData">
      <div class="dialog" style="width:362px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.confirmRemittance')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowConfirmRemittance=false">×</span></div>
          </div>
        </div>
        <div class="dia_content" style="padding-top:20px;">
          <div class="user-info" style="padding-bottom:30px;">
            <div class="flex-space"><label>{{$t('otc.nameOfTheOtherParty')}}:</label><span>{{takerRecordData.buyerRealName}}</span></div>
            <div class="flex-space"><label>{{$t('otc.oddNumber')}}:</label><span>{{takerRecordData.takerOrderId}}</span></div>
            <div class="flex-space"><label>{{$t('otc.transactionPair')}}:</label><span>{{takerRecordData.dcCode +'/' + takerRecordData.currencySymbol}}</span></div>
            <div class="flex-space"><label>{{$t('otc.totalMoney')}}:</label><span>{{takerRecordData.amount  + ' '+ takerRecordData.currencySymbol}}</span></div>
            <div class="flex-space"><label>{{$t('otc.paymentReferenceMark')}}:</label><span>{{takerRecordData.relatedCode}}</span></div>
          </div>
          <div class="tips-pay flex-x-start">
            <div class="txt">{{$t('otc.buyerPaymentMethod')}}:</div>
            <div class="pay-con box box-x-start">
              <el-tooltip :content="item.paymentTypeName"  effect="light" :key="item.key" v-for="item in takerRecordData.payTypeList">
                <div v-if="item.paymentTypeId===takerRecordData.paymentTypeId" :class="'pay-icon'+' '+item.cssName+'-bg'"><i :class="'iconfont'+' '+'icon-'+item.cssName"></i></div>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="dia_submit flex-box">
          <el-button  type="button"
                     @click="clickConfirmRemittance()"
                     class="el-button btn btn_submit btn-primary el-button--default el-button--medium">{{$t('otc.confirm')}}
          </el-button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--确认收款 End-->

    <!--查看付款方式 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowPayType&&!isTimeOut(myTakerList.remainingTimes[takerRecordData.takerOrderId])"  v-if="takerRecordData">
      <div class="dialog" style="width:750px;">
        <div class="dia_tit flex-space" style="margin-bottom:0px;">
          <b>{{$t('otc.viewPaymentMethod')}}</b>
            <div class="flex-x-end">
              <p style="display:inline-block;font-size:14px;color:#ccc;padding-top:3px;margin-right:2px;" v-show="takerRecordData.orderStatus === 1 || takerRecordData.orderStatus === 3">{{$t('otc.remainder')}}：<em>{{myTakerList.remainingTimes[takerRecordData.takerOrderId]}}</em></p>
              <span class="close" id="dia_close" @click="isShowPayType=false,selectPayType=null">×</span>
            </div>
        </div>
        <div class="dia_content" style="padding:0px;">
          <div class="pay-block flex-space">
            <div class="left flex-x-start"><label>{{$t('otc.paymentAmount')}}</label><span><b>{{parseFloat(takerRecordData.amount).toFixed(2) + ' '+ takerRecordData.currencySymbol}}</b></span></div>
            <div class="right">
              <div class="flex-x-start"><label>{{$t('otc.sellerName')}}</label>
                <!-- <span>{{takerRecordData.sellerRealName}}</span> -->
                <span>{{sellerAccountName?sellerAccountName:takerRecordData.payTypeList[0].name}}</span>
              </div>
            </div>

          </div>
          <div class="pay-line"></div>
          <div class="pay-block pay-info">
            <p class="flex-x-start"><i class="iconfont icon-sym-i"></i>
              {{$t('otc.paymentReferenceCode') + takerRecordData.relatedCode}}</p>
          </div>
          <div class="pay-line"></div>
          <div @click="selectPayTypeClick(item)" v-for="item in takerRecordData.payTypeList">
          <div :id="item.cssName" class="pay-block pay-select flex-x-start">
            <div class="left flex-x-start w01" >
              <el-tooltip  :content="item.paymentTypeName" effect="light">
                <div :class="'pay-icon'+' '+item.cssName+'-bg'"><i :class="'iconfont'+' '+'icon-'+item.cssName"></i></div>
              </el-tooltip>
              <span v-if="item.paymentTypeId===1||item.paymentTypeId===11">
                {{item.bankName}} {{item.subBank}}
              </span>
              <span v-if="item.paymentTypeId!==1&&item.paymentTypeId!==11">
                {{item.paymentTypeName}}
              </span>
            </div>
            <div v-if="item.paymentTypeId!==5&&item.paymentTypeId!==6" class="center w02">{{item.account}}</div>
            <div v-if="item.paymentTypeId===5||item.paymentTypeId===6" class="center w02">{{item.swiftInfo}}</div>
            <div class="right w03" v-if="item.paymentTypeId!==11&&item.qrCode">
              <a  @click="showQrCodeClick(item.qrCode,takerRecordData.takerOrderId)" v-if="item.paymentTypeId===2||item.paymentTypeId===3||item.paymentTypeId===8||item.paymentTypeId===12">
                {{$t('assets.qrCode')}}
              </a>

            </div>
            <div v-if="item.paymentTypeId===11" class="right" style="width:30%;text-align: left;"><span>{{$t('payment.ifscCode')}}:<br/>{{item.ifscCode}}</span></div>
          </div>
            <div class="pay-line"></div>
          </div>
          <div class="pay-bom" style="">
            <p>{{$t('otc.remark')}}{{$t('otc.doNotNote')}}</p>
          </div>
          <div class="pay-btn">
            <!-- <div @click="showConfirmPayment(record)"><i class="iconfont icon-paid"></i>{{$t('otc.iHavePaid')}}</div> -->
            <!-- <a @click="clickConfirmPayment()">{{$t('otc.iHavePaid')}}</a> -->
            <a @click="showConfirmPayment(takerRecordData,false)">{{$t('otc.iHavePaid')}}</a>
          </div>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--查看付款方式 End-->
    <!--确认付款 Begin-->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="isShowConfirmPayment" v-if="takerRecordData">
      <div class="dialog" style="width:362px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.confirmPayment')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowConfirmPayment=false">×</span></div>
          </div>
        </div>
        <div class="dia_content" style="padding-top:20px;">
          <div class="user-info" style="padding-bottom:30px;">
            <div class="flex-space"><label>{{$t('otc.nameOfTheOtherParty')}}:</label>
              <!-- <span>{{takerRecordData.sellerRealName}}</span> -->
              <span>{{sellerAccountName?sellerAccountName:takerRecordData.payTypeList[0].name}}</span>
            </div>
            <div class="flex-space"><label>{{$t('otc.oddNumber')}}:</label><span>{{takerRecordData.takerOrderId}}</span></div>
            <div class="flex-space"><label>{{$t('otc.transactionPair')}}:</label><span>{{takerRecordData.dcCode +'/' + takerRecordData.currencySymbol}}</span></div>
            <div class="flex-space"><label>{{$t('otc.totalMoney')}}:</label><span>{{takerRecordData.amount  + ' '+ takerRecordData.currencySymbol}}</span></div>
          </div>
          <p class="p01">
            <em>{{$t('otc.importantHint')}}</em>
            {{$t('otc.supportedPayment')}}
          </p>
          <div class="tips-pay flex-x-start">
            <div class="txt">{{$t('otc.paymentMethod')}}:</div>
            <div class="pay-con box box-x-center">
              <div v-for="item in takerRecordData.payTypeList" :class="'pay-icon'+' '+item.cssName+'-bg'" :key="item.id">
                <input :id="item.paymentTypeId" name="payRadio" @click="selectPayType=item.paymentTypeId,selectPayName=item.paymentTypeName,sellerAccountName=item.name;" type="radio" class="small online-icon">
                <label :for="item.paymentTypeId"><i :class="'iconfont'+' '+'icon-'+item.cssName"></i></label>
              </div>
            </div>
          </div>
        </div>
        <div class="dia_submit flex-box">
          <el-button type="button"
                     @click="clickConfirmPayment()"
                     class="el-button btn btn_submit btn-primary el-button--default el-button--medium">
            {{$t('otc.confirm')}}
          </el-button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--确认付款 End-->
    <!-- 展示收款二维码 -->
    <div class="dialog_wrap otc-tips" style="display: block;" v-show="showQrcodediv&&!isTimeOut(myTakerList.remainingTimes[qrCodeTakerOrderId])">
      <div class="dialog" style="width:400px;">
        <div class="dia_tit">
          <div><b><i class="iconfont icon-payment"></i></b>
            <div class="float-r"><span class="close" id="dia_close" @click="showQrcodediv=false">×</span></div>
          </div>
          <p data="dia_title" class="dia_tit_more"></p>
        </div>
      <div class="dia_content payment-tips" style="text-align:center;padding:20px 0px;">
         <img :src="qrCodeUrl" width="200" height="auto">
      </div>
    </div>
      <div class="dialog_extra"></div>
  </div>

  <!--我要申诉 Begin-->
    <div class="dialog_wrap otc-tips appeal-upload" style="display: block;" v-show="isShowGoToAppeal">
      <div class="dialog" style="width:600px;">
        <div class="dia_tit">
          <div><b>{{$t('otc.appealInformation')}}</b>
            <div class="float-r"><span class="close" id="dia_close" @click="isShowGoToAppeal=false">×</span></div>
          </div>
        </div>
        <div class="dia_content" style="max-height:400px;padding-top:20px;">
          <el-form autoComplete="on" ref="appealFormRef" :label-position="left" :model="appealForm" :rules="appealRules">
            <!-- 买入 -->
            <el-form-item prop="appealType" :label="$t('otc.selectAppealReason')" v-if="appealRecord&&isMyBuy(appealRecord.userId,appealRecord.direction)">
              <el-select v-model="appealForm.appealType"  name="appealType" :placeholder="$t('otc.selectAppealReason')" style="width:100%;">
                <el-option id="appeal_1" :label="$t('otc.buyAppealReasonOne')" value="1"></el-option>
                <el-option id="appeal_2" :label="$t('otc.buyAppealReasonTwo')" value="2"></el-option>
                <el-option id="appeal_3" :label="$t('otc.buyAppealReasonThree')" value="3"></el-option>
                <el-option :label="$t('otc.appealOther')" value="0"></el-option>
              </el-select>
            </el-form-item>
             <!-- 卖出 -->
            <el-form-item prop="appealType" :label="$t('otc.selectAppealReason')" v-if="appealRecord&&!isMyBuy(appealRecord.userId,appealRecord.direction)">
              <el-select v-model="appealForm.appealType" name="appealType" :placeholder="$t('otc.selectAppealReason')" style="width:100%;">
                <el-option id="appeal_4" :label="$t('otc.sellAppealReasonOne')" value="4"></el-option>
                <el-option id="appeal_5" :label="$t('otc.sellAppealReasonTwo')" value="5"></el-option>
                <el-option :label="$t('otc.appealOther')" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="appealTopic" :label="$t('otc.appealOtherReason')" v-if="appealForm.appealType==='0'">
              <el-input v-model="appealForm.appealTopic" name="appealTopic" v-bind:maxlength="128"></el-input>
            </el-form-item>
            <div class="group">
              <p class="p01">
               <em>{{$t('otc.appealUploadImg')}}</em>
              </p>
              <el-upload
                action="/app/upload/imageFtp"
                list-type="picture-card"
                name="appealUserAttach"
                accept="image/*"
                limit=6
                v-model="appealForm.appealUserAttach"
                :headers="headers"
                :on-success="uploadSucc"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <p class="p01">
               <em>{{$t('otc.appealNote')}}</em>{{$t('otc.appealNoteOne')}}
               {{$t('otc.appealNoteTwo')}}
              </p>
            </div>
            <el-form-item prop="appealUserDesc" :label="$t('otc.textDocument')">
              <el-input type="textarea" v-model="appealForm.appealUserDesc" v-bind:maxlength="512"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dia_submit flex-box">
          <el-button type="button"
                     @click="goToAppealRequest(appealRecord)" :disabled="buttonStatus" class="el-button btn btn_submit btn-primary el-button--default el-button--medium">
            {{$t('otc.confirm')}}
          </el-button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
    <!--我要申诉 End-->
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapGetters} from "vuex";

  import {
    confirmPayment,
    confirmRemittance,
    myPayType,
    cancelTakerOrder,
    myTakeList,
    goToAppealRequest,
    getAppealDetailRequest
  } from "../../api/otc";
  import {fbOrders,onAction,removeListenRuner} from '@/utils/quotation'

  export default {
    name: "takerDetail",
    computed: {
      ...mapGetters(['user', 'token']),
      headers() {
        return {
          'UUID': this.token
        }
      }
    },
    created() {
      this.fbTakerQuery.orderStatus = this.orderStatus;
      this.updateNowTime();
      if (this.isAutoData){
        this.myTakeList();
      removeListenRuner('reloadSymbolKline')
      removeListenRuner('reloadOrders')
      removeListenRuner('fbOrders')
      removeListenRuner('reloadGearQuotation')
      removeListenRuner('reloadQuotation')
      fbOrders()
      let $this=this
      onAction('fbOrders',(rsp)=> {  //法币实时信息推送
        let message=rsp.list
        if (message.orderStatus === 1) {
          $this.myTakerList.records.unshift(message);
        } else {
          for (let i = 0; i < $this.myTakerList.records.length; i++) {
            let records = $this.myTakerList.records[i]
            // var orderId = JSON.parse(records.takerOrderId);
            if (records.takerOrderId === message.takerOrderId) {
              if (message.orderStatus === 3) {
                $this.myTakeList();
              } else {
                $this.$set($this.myTakerList.records[i], 'orderStatus', message.orderStatus)
                $this.$set($this.myTakerList.records[i], 'orderTime', message.orderTime)
              }

            }
          }
        }
      })
      }
    },
    beforeDestroy() {
      if (this.nowDateTimer != null) {
        clearInterval(this.nowDateTimer);
        this.nowDateTimer = null;
      }
    },
    props: {
      isAutoData: {
        type: Boolean,
        default: true
      },
      //订单状态
      orderStatus: {
        type: Array[Number],
        default: null
      },
      fbProxyTakerQuery: {
        type: {},
        default: null
      },
    },
    data() {
      const validAppealType= (rule, value, callback) => {
        if(!this.appealForm.appealType){
          callback(new Error( this.$i18n.t('otc.selectAppealReason')))
        }else{
          callback()
        }
      }
      const validAppealTopic= (rule, value, callback) => {
        if(this.appealForm.appealType==='0'){
          if (!this.appealForm.appealTopic) {
            callback(new Error( this.$i18n.t('otc.requireOtherReason')))
          }else {
            callback()
          }
        }else{
          callback()
        }
      }
      const validAppealUserDesc= (rule, value, callback) => {
        if(!this.appealForm.appealUserDesc){
          callback(new Error( this.$i18n.t('otc.requireTextDocument')))
        }else{
          callback()
        }
      }
      return{
        // 1.申请;2.已取消;3.买方付款确认;4.卖方收款确认;5.已成交;6.申诉处理中;-
        taterStatus: {
          1: this.$i18n.t('otc.pendingPayment'),
          2: this.$i18n.t('otc.cancelled'),
          3: this.$i18n.t('otc.paid'),
          4: this.$i18n.t('otc.paidFor'),
          5: this.$i18n.t('otc.dealDone'),
          6: this.$i18n.t('otc.appealOne'),
        },
        /*委托单查询*/
        fbTakerQuery:{
          /*数字币种*/
          dcCode: null,
          /*买卖方向*/
          direction: null,
          /*订单状态*/
          orderStatus: null,
          /*开始时间*/
          startTime: null,
          /*结束时间*/
          endTime: null,
          /*每页查询几条数据*/
          limit: 10,
          /*当前页数*/
          page: 1
        },
        //我的委托单列表数据
        myTakerList:{
          records:[],
          total:0,
          remainingTimes:{},
          cancelNum:3,
          cancelHour:24,
        },
        //现在的时间计时器
        nowDateTimer:null,
        //购买选中的挂牌单数据
        payTypeData:[],
        //弹窗数据
        takerRecordData: null,
        //我已取消购买弹框的takerId
        cancelBuyTakerId: null,
        //同意取消协议
        isAgreeCancelBuy: false,
        //是否显示取消购买弹框
        isShowCancelBuy: false,
        //选择的付款方式
        selectPayType: null,
        //选择的付款方式名字
        selectPayName: null,
        //我已付款弹框的takerId
        confirmPaymentTakerId: null,
        //是否显示我已付款弹框
        isShowConfirmPayment: false,
        //需要确认的付款方式
        hadSelectPayType: null,
        //确认收款弹框的takerId
        confirmRemittanceTakerId:null,
        //是否显示确认收款弹框
        isShowConfirmRemittance:false,
        //是否显示支付方式弹框
        isShowPayType: false,
        showQrcodediv: false,//展示收款二维码
        qrCodeUrl: false,//二维码图片链接
        qrCodeTakerOrderId:0,//当前订单号,用于剩余时间的计算,控制二维码页面关闭
        sellerAccountName:null,//选择的收款账号的姓名(卖家可能用了别人的收款方式)
        appealRules: {
          appealType: [{validator:validAppealType}],
          appealTopic: [{validator:validAppealTopic}],
          appealUserDesc:[{validator:validAppealUserDesc}]
        },
        isShowGoToAppeal:false,//我要申诉弹框
        buttonStatus:false,//提交申诉按钮是否置灰
        appealRecord:null,//我要申诉弹框数据
        appealForm:{
          appealType:null,//申诉原因类型
          appealTopic:null,//申诉原因
          appealUserAttach:'',//申诉图片链接,多张图片以逗号","隔开
          appealUserDesc:null,//申诉描述文字资料
        },
        dialogImageUrl: '',//上传图片组件变量
        dialogVisible: false,//上传图片组件变量
        appealImgList:[],//上传图片集合
      }
    },
    methods: {
      //获取我的委托单列表数据
      myTakeList() {
        if (this.fbProxyTakerQuery != null) {
          this.fbProxyTakerQuery.page = this.fbTakerQuery.page;
          this.fbProxyTakerQuery.limit = this.fbTakerQuery.limit;
          if (this.fbProxyTakerQuery.orderStatus === '') {
            this.fbProxyTakerQuery.orderStatus = null;
          }
        }
        myTakeList(this.fbProxyTakerQuery != null ? this.fbProxyTakerQuery : this.fbTakerQuery).then(response => {
          if (response.code === 200) {
            let data = response.data.myTakeList;
            data.records.forEach(item => {
              if (item.orderVolume.toString().includes("e") || item.orderVolume.toString().includes("E")) {
                item.orderVolume = Number.parseFloat(item.orderVolume).toFixed(8);
              }
              if (item.orderPrice.toString().includes("e") || item.orderPrice.toString().includes("E")) {
                item.orderPrice = Number.parseFloat(item.orderPrice).toFixed(2);
              }
              if (item.amount.toString().includes("e") || item.amount.toString().includes("E")) {
                item.amount = Number.parseFloat(item.amount).toFixed(2);
              }
            });
            // if (data.total !== this.myTakerList.total) {
            //   this.fbTakerQuery.page = 1;
            // }
            this.myTakerList.records = data.records;
            this.myTakerList.total = data.total;
            // this.myTakerList.serviceTime = response.data.serviceTime;
            // this.myTakerList.payTime = response.data.payTime;
            // this.myTakerList.releaseTime = response.data.releaseTime;
            this.myTakerList.cancelNum = response.data.cancelNum;
            this.myTakerList.cancelHour = response.data.cancelHour;

            // let serviceTime = response.data.serviceTime;
            // let nowDate = new Date();
            // let nowTime = nowDate.getTime();
            // let intervals = serviceTime - nowTime;
            // // console.log('getTheRemainingTime nowDate  ' + nowDate + '  nowTime ' + nowTime + '  intervals ' + intervals);
            // //误差超过10秒的话，使用服务器时间（时间差）
            // if (Math.abs(intervals) > 10000) {
            //   this.myTakerList.intervalsTime = intervals;
            // }
            this.updateMyRemainingTimes();
          }
        })
      },
      //取消购买弹框
      cancelBuy(record) {
        this.takerRecordData = record;
        this.isAgreeCancelBuy = false;
        this.cancelBuyTakerId = record.takerOrderId;
        this.isShowCancelBuy = true;
      },
      clickCancelBuy(){
        let $this = this;
        if (!$this.isAgreeCancelBuy) {
          $this.$message({
            type: 'error',
            message: this.$i18n.t('otc.noPaymentToTheOtherParty')
          });
          return
        }
        $this.$message({
            type: 'info',
            message:this.$i18n.t('otc.pleaseWait')
          });
          $this.isShowCancelBuy = false;
          if ($this.token) {
            cancelTakerOrder(this.cancelBuyTakerId).then(response => {
              if (response.code === 200) {
                $this.$message({
                  type: 'success',
                  message: this.$i18n.t('otc.theSystemIsProcessingYourOrder', {num: $this.cancelBuyTakerId})
                });
              }else {
                $this.$message({
                  type: 'error',
                  message:this.$i18n.t('otc.operationFailed')
                });
              }
              $this.myTakeList();
            })
          } else {
            $this.$message({
              type: 'error',
              message:this.$i18n.t('otc.loginInvalid')
            });
          }
      },
      //我已付款弹框
      showConfirmPayment(record,result) {
        let $this = this;
        this.takerRecordData = record;
        if(result){//区分是哪个点击弹出此框的
          this.selectPayType = null;
          this.selectPayName = null;
        }
        this.sellerAccountName=record.payTypeList[0].name;//选择的收款账号的姓名(卖家可能用了别人的收款方式) 默认取第一个
        this.confirmPaymentTakerId = record.takerOrderId;
        this.isShowConfirmPayment = true;
        var payRadios=document.getElementsByName("payRadio");
        for(var i=0;i<payRadios.length;i++){//消除单选框的默认选中状态
          if(payRadios[i].id===$this.selectPayType+""){
            payRadios[i].checked = true;
          }else{
            payRadios[i].checked = false;
          }
     }
      },
      //我要申诉弹框
      goToAppeal(record){
        let $this = this;
        this.isShowGoToAppeal = true;
        this.buttonStatus = false;
        this.appealRecord = record;       
        $this.appealForm = {
          appealType:null,//申诉原因类型
          appealTopic:null,//申诉原因
          appealUserAttach:'',//申诉图片链接,多张图片以逗号","隔开
          appealUserDesc:null,//申诉描述文字资料
        };
        this.deleteLoadImg();
      },
       //查看申诉资料
      goViewAppealDetail(relateOrderId){
       this.$router.push({name:'viewAppealDetail',query:{takerId:relateOrderId}});
      },
      uploadSucc(response, file, fileList){
        let $this = this;
        if(response.code===200){
          // var fileNames=response.fileNames;
          // this.appealForm.appealUserAttach = '';
          // for(var i=0;i<fileList.length;i++){
          //   this.appealForm.appealUserAttach+=fileList[0].response.fileNames[0]+",";
          // }
         $this.appealImgList = fileList;
        }else{//上传失败
          if(document.querySelector(".el-upload-list--picture-card").children.length>0){
            document.querySelector(".el-upload-list--picture-card").lastChild.remove();
          }
          if(response.msg==='ExceedeFileSizeLimit'){//超出上传大小限制
            $this.$message({type: 'error',message:this.$i18n.t('userinfo.uploadsize')});
          }else{
            $this.$message({type: 'error',message:this.$i18n.t('otc.operationFailed')});
          }         
        }
      },
      deleteLoadImg(){
        this.appealImgList = [];//清空临时
        //清掉上传组件里的图片
        var liArr = document.querySelectorAll(".is-success");       
        for(var i=0;i<liArr.length;i++){ //当ul下还存在子节点时 循环继续
          if(document.querySelector(".el-icon-delete")){
            document.querySelector(".el-icon-delete").click();//模拟触发点击图片删除按钮
          }           
          //ul.removeChild(ul.firstChild);
        } 
      },
      handleRemove(file, fileList) {
        this.appealImgList = fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      goToAppealRequest(appealRecord){
        let $this = this;       
        $this.appealForm.relateOrderId = appealRecord.takerOrderId;
        if($this.appealForm.appealType!=='0'&&document.getElementById("appeal_"+$this.appealForm.appealType)){
           $this.appealForm.appealTopic = document.getElementById("appeal_"+$this.appealForm.appealType).firstChild.innerHTML;
        }
        $this.$refs.appealFormRef.validate(isValid => {
          if(!isValid) return
          for(var i=0;i<$this.appealImgList.length;i++){
            if($this.appealImgList[i].response.code===200){
              $this.appealForm.appealUserAttach+=$this.appealImgList[i].response.fileNames[0]+",";
            }         
          }
          $this.buttonStatus = true;
          goToAppealRequest($this.appealForm).then((response)=>{
            if(response.code===200){
              $this.buttonStatus = false;
              $this.isShowGoToAppeal = false;
              $this.deleteLoadImg();
              $this.$message({
                message:$this.$i18n.t('otc.submitAppealSuccess'),
                type: 'success',
                center: true,
              });//提示提交成功
            }
            $this.myTakeList();
          });

        });
      },
      //确认收款弹框
      showConfirmRemittance(record) {
        this.takerRecordData = record;
        this.hadSelectPayType = null;
        this.selectPayName = null;
        this.confirmRemittanceTakerId = record.takerOrderId;
        this.isShowConfirmRemittance = true;
      },
      //查看付款方式弹框
      showPayType(record) {
        if(document.querySelector(".selectTag")){
         var selectTag = document.querySelector(".selectTag");
         selectTag.className= selectTag.className.replace(/ active selectTag/," "); //删除选中高亮样式
        }
        this.takerRecordData = record;
        this.isShowPayType = true;
        this.selectPayType = null;
        this.confirmPaymentTakerId = record.takerOrderId;
        this.sellerAccountName=record.payTypeList[0].name;//选择的收款账号的姓名(卖家可能用了别人的收款方式) 默认取第一个
      },
      //选择付款方式
      selectPayTypeClick(item){
        if(document.querySelector(".selectTag")){
         var selectTag = document.querySelector(".selectTag");
         selectTag.className= selectTag.className.replace(/ active selectTag/," "); //删除选中高亮样式
        }
        var oldClass = document.getElementById(item.cssName).className;
        document.getElementById(item.cssName).className = oldClass + ' active selectTag';
        this.selectPayType = item.paymentTypeId;
        this.selectPayName = item.paymentTypeName;//支付方式名,传后台发送通知给用户
        this.sellerAccountName = item.name;//当前收款账户的姓名

      },
      //展示收款二维码
      showQrCodeClick(qrCodeUrl,thisTakerOrderId){
        this.qrCodeTakerOrderId = thisTakerOrderId;
        this.showQrcodediv = true;
        this.qrCodeUrl = qrCodeUrl;
      },
      //确认付款
      clickConfirmPayment() {
        let $this = this;
        if ($this.selectPayType == null) {
          $this.$message({
            type: 'error',
            message: this.$i18n.t('otc.selectYourPaymentMode')
          });
          return
        }
        $this.$message({
          type: 'info',
          message:this.$i18n.t('otc.pleaseWait')
        });
        $this.isShowConfirmPayment = false;
        if ($this.token) {
          confirmPayment($this.confirmPaymentTakerId,$this.selectPayType,$this.selectPayName).then(response => {
            if (response.code === 200) {
        $this.isShowPayType = false;
              $this.$message({
                type: 'success',
                message: this.$i18n.t('otc.theSystemIsProcessingYourOrder', {num: $this.confirmRemittanceTakerId})
              });
            }else {
              $this.$message({
                type: 'error',
                message:this.$i18n.t('otc.operationFailed')
              });
            }
            $this.myTakeList();
          })
        } else {
          $this.$message({
            type: 'error',
            message: this.$i18n.t('otc.loginInvalid')
          });
        }
      },
      //确认收款
      clickConfirmRemittance() {
        let $this = this;
        $this.$message({
          type: 'info',
          message:this.$i18n.t('otc.pleaseWait')
        });
        $this.isShowConfirmRemittance = false;
        if ($this.token) {
          confirmRemittance(this.confirmRemittanceTakerId).then(response => {
            if (response.code === 200) {
              $this.$message({
                type: 'success',
                message: this.$i18n.t('otc.theSystemIsProcessingYourOrder', {num: $this.cancelBuyTakerId})
              });
            }else {
              $this.$message({
                type: 'error',
                message:this.$i18n.t('otc.operationFailed')
              });
            }
            $this.myTakeList();
          })
        } else {
          $this.$message({
            type: 'error',
            message: this.$i18n.t('otc.loginInvalid')
          });
        }
      },
      //更新现在的时间
      updateNowTime() {
        this.nowDateTimer = setInterval(() => {
          this.updateMyRemainingTimes();
        }, 1000);
      },
      //更新我的剩余时间
      updateMyRemainingTimes() {
        for (let i = 0; i < this.myTakerList.records.length; i++) {
          let record = this.myTakerList.records[i];
          Vue.set(this.myTakerList.remainingTimes, record.takerOrderId, this.getTheRemainingTime(record.remainSeconds, record.takerOrderId));
          record.remainSeconds--;
        }
      },
      //获取剩余时间（分秒）
      getTheRemainingTime(remainTime,takerOrderId) {
        // let nowDate = new Date();
        // if (this.myTakerList.intervalsTime !== 0) {
        //   let nowTime = nowDate.getTime();
        //   // nowDate = nowDate.setTime(nowTime + this.myTakerList.intervalsTime);
        //   nowTime = nowTime + this.myTakerList.intervalsTime
        //   nowDate = new Date(nowTime);
        // }
        // let time = nowDate - new Date(timeString);
        // time = Math.floor(time / 1000);
        // time = lockTime - time;
        let minute = Math.floor(remainTime / 60);
        if (minute >= 0) {//需要在限定的时间内的才算
          minute = this.prefixInteger(minute, 2);
          let second = this.prefixInteger(remainTime % 60, 2);
          return minute + ':' + second;
        }
        //如果超时，需要关闭相对应的操作框
        if (this.takerRecordData && (this.isShowCancelBuy || this.isShowConfirmPayment || this.isShowConfirmRemittance)) {
          if (this.takerRecordData.takerOrderId === takerOrderId) {
            if (this.isShowCancelBuy) {
              this.isShowCancelBuy = false;
            } else if (this.isShowConfirmPayment) {
              this.isShowConfirmPayment = false;
            } else if (this.isShowConfirmRemittance) {
              this.isShowConfirmRemittance = false;
            }
          }
        }
        return this.$i18n.t('otc.timedOut')
      },
      // //获取剩余时间（分秒）
      // getTheRemainingTime(timeString, lockTime,takerOrderId) {
      //   let nowDate = new Date();
      //   if (this.myTakerList.intervalsTime !== 0) {
      //     let nowTime = nowDate.getTime();
      //    // nowDate = nowDate.setTime(nowTime + this.myTakerList.intervalsTime);
      //     nowTime = nowTime + this.myTakerList.intervalsTime
      //     nowDate = new Date(nowTime);
      //   }
      //   let time = nowDate - new Date(timeString);
      //   time = Math.floor(time / 1000);
      //   time = lockTime - time;
      //   let minute = Math.floor(time / 60);
      //   if (minute >= 0) {//需要在限定的时间内的才算
      //     minute = this.prefixInteger(minute, 2);
      //     let second = this.prefixInteger(time % 60, 2);
      //     return minute + ':' + second;
      //   }
      //   //如果超时，需要关闭相对应的操作框
      //   if (this.takerRecordData && (this.isShowCancelBuy || this.isShowConfirmPayment || this.isShowConfirmRemittance)) {
      //     if (this.takerRecordData.takerOrderId === takerOrderId) {
      //       if (this.isShowCancelBuy) {
      //         this.isShowCancelBuy = false;
      //       } else if (this.isShowConfirmPayment) {
      //         this.isShowConfirmPayment = false;
      //       } else if (this.isShowConfirmRemittance) {
      //         this.isShowConfirmRemittance = false;
      //       }
      //     }
      //   }
      //   return this.$i18n.t('otc.timedOut')
      // },
      prefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
      },
      //是否超时
      isTimeOut(time) {
        return time === '00:00' ||  time === this.$i18n.t('otc.timedOut');
      },
      //转为为文字时间
      getCharacterTime(time) {
        let string = time.split(':');
        return string[0] + ' ' + this.$i18n.t('otc.point') + string[1] + ' ' + this.$i18n.t('otc.second');
      },
      //websocket 连接
      isMyBuy(userId, direction) {
        if (this.user) {
          // console.log("userId " + userId,this.user);
          // 买卖方向（1买入;2卖出）
          if (direction === 1) {
            if (userId === this.user.id) {
              return true;
            }
          } else {//direction === 2
            if (userId !== this.user.id) {
              return true;
            }
          }
        }
        return false;
      },
      goCustomerService() {
        this.$router.push({name: "contactus"});
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/otc.scss";
</style>
