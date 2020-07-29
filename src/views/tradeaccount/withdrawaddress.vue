<template>
<div>
  <div class="page_withdraw_address user-main">
    <div class="crumbs"><span><router-link to="tradeaccount">{{$t('fund.bbAccount')}}</router-link><i>&gt;</i>
    <span>{{$t('assets.withdrawaddressManagement')}}</span></span></div>
    <section class="table-container normal action-container">


          <el-form autoComplete="on" :model="AddWithdrawAddressForm" :rules="AddWithdrawAddressRules" ref="AddWithdrawAddressForm" label-position="left"
                 class="form_set">
            <div class="form-container">
            <div class="form-table">
          <div class="form-group form-cell cell-selector">
            <el-form-item prop="dcCode" :label="$t('assets.coin')">
              <el-select  no-data-text="$t('common.loading')" v-model="AddWithdrawAddressForm.dcCode" name="dcCode" filterable placeholder="" class="input_text size_full" style="width: 120px;">
                <el-option v-for="(item,index) in symbolList" :key="index"  :value="item">
                <span style="float: left;width: 80px;">{{item}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
           <div class="form-group form-cell cell-selector" v-if="AddWithdrawAddressForm.dcCode==='USDT'">
                <el-form-item prop="dcCode" :label="$t('trade.chainname')">
                  <el-select  no-data-text="$t('common.loading')" v-model="protocolType" name="dcCode" filterable placeholder="" class="input_text size_full">
                    <el-option v-for="(item,index) in usdtArray" :key="index"  :value="item">
                      <span style="float: left;width: 80px;">{{item}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
           </div>
          <div class="form-group form-cell cell-address">
            <el-form-item prop="address" :label="$t('assets.withdrawAddress')">
              <div class="input-group">
                <el-input type="text" v-model="AddWithdrawAddressForm.address" name="address" v-bind:maxlength="64"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="form-group form-cell cell-note">
            <el-form-item prop="remark" :label="$t('common.remark')">
              <div class="input-group">
                <el-input type="text" v-model="AddWithdrawAddressForm.remark" name="remark"></el-input>
              </div>
            </el-form-item>
          </div>

         </div>
              <div class="right-group">
                <button type="button" class="btn btn-primary" action="add_address" @click="addAddress">{{$t('common.add')}}</button>
              </div>
      </div>
        </el-form>


    </section>
    <section class="table-container normal content">
      <div class="head">{{$t('assets.addressList')}}</div>
      <div class="" style="min-height: 200px">
        <table class="table">
          <thead>
          <tr>
            <th width="140"><dl class="filter-box" action="switch_selector">
              <span class="filter-title">{{$t('assets.coin')}}</span></dl>
            </th>
            <th width="488">{{$t('assets.withdrawAddress')}}</th>
            <th>{{$t('common.remark')}}</th>
            <th>{{$t('common.operation')}}</th>
          </tr>
          </thead>
          <tbody id="withdraw_address_list">
          <tr v-for="item in addressList"  :id="item.dcCode">
            <td><span class="uppercase">{{item.dcCode}}</span></td>
            <td class="flex-x-start"><i class="hb_icon_qr icon-qrcode" @mouseover="QRCode(item.id,item.withdrawAdd)">
              <div class="show-qrcode">
                <div class="qr_code">
                  <svg :id="item.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31">
                  </svg>
                </div>
              </div>
            </i>{{item.withdrawAdd}}</td>
            <td>{{item.remark}}</td>
            <td><button type="button" class="btn btn-small primary""  @click="delAddress(item.id)">{{$t('common.delete')}}</button></td>
          </tr>
          </tbody>
        </table>
        <div v-show="!listLoading">
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="addressListQuery.page"
                           :page-size="addressListQuery.limit" layout="prev, pager, next" :total="addressTotal"></el-pagination>
          </div>
        </div>
      </div>
    </section>
  </div>

 <el-form autoComplete="on" :model="AddWithdrawAddressForm" :rules="VerificationCodeRules" ref="VerificationCodeForm" class="form_set"
             label-position="left">
  <!--弹出窗口开始-->
  <div class="dialog_wrap" style="display: block;" v-show="showDialog">
    <div class="dialog">
      <div class="dia_tit">
        <div><b>{{$t('common.smsCode')}}</b><span class="close" @click="showDialog=false;buttonStatus=false;">×</span></div>
        <p data="dia_title" class="dia_tit_more"></p>
      </div>
      <div class="dia_content">
        <!--手机验证-->
        <div class="group reg_phone_show" v-show="showDialogMobile">
          <label for="mobileCode" class="el-form-item__label">{{user.mobile?substrCard:''}}</label>
            <el-form-item prop="mobileCode"  >
              <div class="group">
                <send-sms-code   :phone="mobile"  :send-msg-type="11"  :send-type="'1'" v-model="AddWithdrawAddressForm.mobileCode"></send-sms-code>
              </div>
            </el-form-item>
        </div>
        <!--邮箱验证-->
        <div class="group reg_mail_show" v-show="showDialogEmail">
          <label for="emailCode" class="el-form-item__label">{{$t('common.emailCode')}}</label>
          <el-form-item prop="emailCode" >
            <div class="group">
              <send-sms-code   :phone="email"  :send-msg-type="11"  :send-type="'2'" v-model="AddWithdrawAddressForm.emailCode"></send-sms-code>
            </div>
          </el-form-item>
        </div>
      </div>
      <div class="dia_submit"><span class="error_notice"></span>
        <el-button @click="addAddressRequest" :disabled="buttonStatus">{{$t('register.sendSms')}}</el-button>

        <!--<button class="btn btn_submit btn-primary" pro_name="btn_submit" @click="addAddressRequest"> </button>-->
      </div>
      </div>
    <div class="dialog_extra"></div>
    </div>
<!--弹出窗口结束-->
 </el-form>
</div>
</template>

<script>
 import {mapGetters} from 'vuex';
 import {getAddressList,addAddressRequest,delAddressRequest} from "../../api/account";
 import SendSmsCode from "../common/sendSmsCode";
 import {strString} from "@/utils/stringUtil";
 import QRCode from 'qrcodejs2';
    export default {
      components: {SendSmsCode},
      name: "withdrawaddress",
      data(){
        const valididDcCode = (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$i18n.t('assets.entryDcCode')))
          } else {
            callback()
          }
        }
        const valididWithdrawaddress = (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$i18n.t('assets.entryWithdrawaddress')))
          } else {
            callback()
          }
        }
        const valididRemark = (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$i18n.t('assets.entryAddressRemark')))
          } else {
            callback()
          }
        }
        const validMobileCode= (rule, value, callback) => {
          if(this.isValidPhone===1){
            if (value.length!==6) {
              callback(new Error( this.$i18n.t('valid.msgcode')))
            }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
              callback(new Error( this.$i18n.t('valid.msgcode')))
            } else {
              callback()
            }
          }else{
            callback()
          }
        }
        const validEmailCode= (rule, value, callback) => {
          if(this.isValidEmail===1){
            if (value.length!==6) {
              callback(new Error( this.$i18n.t('valid.msgcode')))
            }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
              callback(new Error( this.$i18n.t('valid.msgcode')))
            } else {
              callback()
            }
          }else{
            callback()
          }
        }
        return {
        addressListQuery: {
          page: 1,
          limit: 10,
        },
        AddWithdrawAddressForm:{
          dcCode:'',
          address:'',
          remark:'',
          mobileCode:'',
          emailCode:''
        },
        VerificationCodeRules: {
          mobileCode: [{validator:validMobileCode}],
          emailCode: [{validator:validEmailCode}]
        },
        AddWithdrawAddressRules: {
          dcCode: [{required: true,trigger: 'blur', validator: valididDcCode}],
          address: [{required: true,trigger: 'blur', validator: valididWithdrawaddress}],
          remark: [{required: true,trigger: 'blur', validator: valididRemark}]
        },
        sendSmsForm:{
          verifyCode:'',
          sendType:'',
          sendMobile:'',
        },
        addressTotal: 0,
        mobile:null,
        email:null,
        isValidPhone:null,//是否已开启手机验证
        isValidEmail:null,//是否已开启邮箱验证
        showDialog:false,
        showDialogMobile:false,
        showDialogEmail:false,
        buttonStatus:false,
        symbolList: [],
        addressList: [],
        listLoading: true,
        symbolSelect: 'GOLDT',
        usdtArray: ['OMNI', 'ERC20'],
        protocolType: 'OMNI',
       }
      },
      created() {
        this.getAddressList();
      },
      computed: {
      ...mapGetters(['user','token']),
        substrCard:function () {
          if(this.user.mobile){
            return strString(this.user.mobile);
          }
        }
    },
    methods: {
      getAddressList() {
        let $this = this;
      getAddressList(this.addressListQuery).then((response) => {
          if (response.code === 200) {
            var data = response.data
            $this.symbolList = data.symbolList
            $this.AddWithdrawAddressForm.dcCode=$this.symbolList[0]
            $this.mobile=data.mobile
            $this.email=data.email
            $this.isValidPhone=data.isValidPhone
            $this.isValidEmail=data.isValidEmail
            if(data.pageResult.records!==null){
              $this.addressList = data.pageResult.records
              $this.addressTotal = data.pageResult.total
            }
            if($this.addressTotal>10){
              $this.listLoading = false
            }else{
              $this.listLoading = true
            }
          }
        });
        },
      handleCurrentChange(val){
        let $this = this
        setTimeout(function () {
          $this.addressListQuery.page = val;
          $this.getAddressList();//调方法局部刷新
        }, 1000);
      },
      addAddress(){
        // this.AddWithdrawAddressForm.mobileCode=null;
        // this.AddWithdrawAddressForm.emailCode=null;
        this.$refs.AddWithdrawAddressForm.validate(valid => {
          if (!valid) return
          this.showDialog = true;
          if(this.isValidPhone===1){
            this.showDialogMobile = true;
          }
          if(this.isValidEmail===1){
            this.showDialogEmail = true;
          }
        })
       },
      addAddressRequest(){
      this.$refs.VerificationCodeForm.validate(isValid => {
         if (isValid) {
            var param = {dcCode:this.AddWithdrawAddressForm.dcCode,address:this.AddWithdrawAddressForm.address,remark:this.AddWithdrawAddressForm.remark,
            mobileCode:this.AddWithdrawAddressForm.mobileCode,
            emailCode:this.AddWithdrawAddressForm.emailCode,protocolType:this.protocolType};
            this.buttonStatus = true;
            addAddressRequest(param).then((response)=>{
              this.buttonStatus = false;
              if(response.code===200){
                this.$message({
                message:this.$i18n.t('common.addSuccess'),
                type: 'success',
                center: true,
                });//提示新增成功
                this.showDialog=false;
                this.AddWithdrawAddressForm.address=null;
                this.AddWithdrawAddressForm.remark=null;
                this.AddWithdrawAddressForm.mobileCode=null;
                this.AddWithdrawAddressForm.emailCode=null;
                this.getAddressList();//调方法局部刷新
              }
            });

          }
        })
      },
      delAddress(id){
      let $this = this;
        delAddressRequest(id).then((response) => {
          if(response.code===200){
              this.$message({
              message:this.$i18n.t('common.deleteSuccess'),
              type: 'success',
              center: true,
            });//提示删除成功
            this.AddWithdrawAddressForm.address=''
            this.AddWithdrawAddressForm.remark=''
            this.getAddressList();//调方法局部刷新
          }
        });
      },
      QRCode(id,text){
        var qrcode = new QRCode(document.getElementById(id), {
        width : 100,
        height : 100,
        useSVG: true
        });
        qrcode.makeCode(text);
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/user.scss";
</style>
