<template>
  <div>
  <div class="page_uc user-main">
    <div class="crumbs"><router-link to="userinfo">{{$t('common.security')}}</router-link><i>&gt;</i>{{user.isExitTradePwd===0?$t('userinfo.addTradePwd'):$t('userinfo.modifyTradePwd')}}</div>
    <div class="mod auth_con">
      <div class="mod_hd info"><h3 class="mod_title">{{user.isExitTradePwd===0?$t('userinfo.addTradePwd'):$t('userinfo.modifyTradePwd')}}<span class="mod_sub_title"><i class="hb_icon_info"></i> {{user.isExitTradePwd===0?"":$t('userinfo.editTradePwdTip')}}</span>
      </h3></div>
      <div class="mod_bd">
        <el-form autoComplete="on" :model="editTradepwdForm" :rules="editpwdRules" ref="editTradepwdForm" label-position="left" class="form_set" >
          <div class="group">
            <el-form-item prop="password" :label="$t('userinfo.newTradePwd')">
              <el-input type="password" v-model="editTradepwdForm.password" name="password" v-bind:maxlength="6" :placeholder="$t('common.tradepwdTip')"></el-input>
            </el-form-item>
          </div>
          <div class="group">
            <el-form-item prop="comfirmPassword" :label="$t('userinfo.comfirepwd')">
              <el-input type="password" v-model="editTradepwdForm.comfirmPassword" name="comfirmPassword"
                        v-bind:maxlength="6"></el-input>
            </el-form-item>
          </div>
          <div class="submit">
            <el-button @click="editTradepwd" name="editTradepwd" :disabled="issubmit">{{$t('common.submit')}}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>

  <el-form autoComplete="on" :model="editTradepwdForm" :rules="VerificationCodeRules" ref="VerificationCodeForm" class="form_set"
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
            <el-form-item prop="mobileCode" :label="user.mobile?substrCard:''">
              <div class="group">
                <send-sms-code   :phone="user.mobile"  :send-msg-type="14"  :send-type="'1'" v-model="editTradepwdForm.mobileCode"></send-sms-code>
              </div>
            </el-form-item>
        </div>
        <!--邮箱验证-->
        <div class="group reg_mail_show" v-show="showDialogEmail">
          <el-form-item prop="emailCode" :label="$t('common.emailCode')">
            <div class="group">
              <send-sms-code   :phone="user.email"  :send-msg-type="14"  :send-type="'2'" v-model="editTradepwdForm.emailCode"></send-sms-code>
            </div>
          </el-form-item>
        </div>

        </div>
        <div class="dia_submit"><span class="error_notice"></span>
          <el-button @click="editTradePwdRequest" :disabled="buttonStatus">{{$t('register.sendSms')}}</el-button>
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
  import {editTradePwdRequest} from '@/api/user'
  import {removeToken,removeUserInfo} from "../../utils/auth";
  import {mapGetters} from 'vuex';
  import {saveUserInfo} from "../../utils/auth";
  import SendSmsCode from "../common/sendSmsCode";
  import {strString} from "@/utils/stringUtil";

  export default {
    components: {SendSmsCode},
    name: "editPwd",
    computed: {
      ...mapGetters(['user', 'token']),
      substrCard: function () {
        if (this.user.mobile) {
          return strString(this.user.mobile);
        }
      }
    },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length!==6) {
              callback(new Error( this.$i18n.t('userinfo.tradePwdTip')))
            }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
              callback(new Error( this.$i18n.t('userinfo.tradePwdTip')))
            } else {
              callback()
        }
      }

      const validateConfirm = (rule, value, callback) => {
        if (value!==this.editTradepwdForm.password) {
          callback(new Error( this.$i18n.t('valid.comfirmpassword')))
        } else {
          callback()
        }
      }
      const validMobileCode= (rule, value, callback) => {
          if(this.user.openPhoneValid===1){
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
          if(this.user.openEmailValid===1){
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
        editTradepwdForm: {
          password:'',
          comfirmPassword:'',
          mobileCode:'',
          emailCode:''
        },
        editpwdRules:{
          password: [{required: true, validator: validatePassword}],
          comfirmPassword: [{required: true,validator:validateConfirm}]
        },
        VerificationCodeRules: {
          mobileCode: [{validator:validMobileCode}],
          emailCode: [{validator:validEmailCode}]
        },
        mobile:null,
        email:null,
        showDialog:false,
        showDialogMobile:false,
        showDialogEmail:false,
        buttonStatus:false,
        issubmit:false  //是否已提交表单
      }
    },
    methods:{
      editTradepwd(){
        let $this=this;
        this.$refs.editTradepwdForm.validate(valid => {
          if (!valid) return
          this.showDialog = true;
          if(this.user.openPhoneValid===1){
            this.showDialogMobile = true;
          }
          if(this.user.openEmailValid===1){
            this.showDialogEmail = true;
          }
        });
      },
      editTradePwdRequest(){
         let $this = this;
         this.$refs.VerificationCodeForm.validate(isValid => {
         if (isValid) {
            $this.issubmit=true
            var param = {password:this.editTradepwdForm.password,mobileCode:this.editTradepwdForm.mobileCode,
            emailCode:this.editTradepwdForm.emailCode};
            this.buttonStatus = true;
            editTradePwdRequest(param).then((response)=>{
              this.buttonStatus = false;
              if(response.code===200){
                this.showDialog=false;
                  $this.$message({
                    message: $this.user.isExitTradePwd===0?$this.$i18n.t('userinfo.addTradePwdSuccess'):$this.$i18n.t('userinfo.modifyTradePwdSuccess'),
                    type: 'success',
                    center: true,
                    onClose: function () {
                      var user=$this.user;
                      user.isExitTradePwd=1;
                      saveUserInfo(user);
                      $this.$router.push({path: 'userinfo'})
                    }
                  })
                }
            });

          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/user.scss";
</style>
