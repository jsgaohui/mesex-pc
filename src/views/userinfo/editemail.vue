<template>
  <div class="page_uc user-main">
    <div class="crumbs"><router-link to="userinfo">{{$t('common.security')}}</router-link><i>&gt;</i>{{$t('common.bindnotchange')}}</div>
    <div class="mod auth_con">
      <div class="mod_hd info"><h3 class="mod_title">{{$t('common.bindemail')}}</h3><span class="mod_sub_title"><i class="hb_icon_info"></i> {{$t('common.bindnotchange')}}</span>
      </div>
      <div class="mod_bd">
        <el-form autoComplete="on" :model="editEmailForm" :rules="editEmailRules" ref="editEmailForm" label-position="left" class="form_set" >
          <div class="group">
            <el-form-item prop="phone" :label="$t('common.email')">
              <el-input name="phone" v-model="editEmailForm.phone" style=".input_phone .wrap_select">
              </el-input>
            </el-form-item>
          </div>
          <el-button class="btn btn_submit btn-primary" @click="chkAccount"> {{$t('register.sendSms')}}</el-button>
          <!--<div class="group">-->
            <!--<send-sms-code  valid-field="phone" :smslable="$t('common.emailCode')" :phone="editEmailForm.phone" :send-msg-type="5"  :send-type="2"  v-model="editEmailForm.smsCode"></send-sms-code>-->
          <!--</div>-->
          <!--<div class="submit">-->
            <!--<el-button @click="editEmail">{{$t('userinfo.bind')}}</el-button>-->
          <!--</div>-->
        </el-form>
      </div>
    </div>
    <el-form autoComplete="on" :model="editEmailForm"  ref="editEmailForm" class="form_set"
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
            <div class="group reg_phone_show" >
              <el-form-item prop="mobileCode" :label="$t('common.phoneCode')">
                <div class="group">
                  <send-sms-code   :phone="user.mobile"  :send-msg-type="5"  :send-type="'1'"  v-model="editEmailForm.mobileCode"></send-sms-code>
                </div>
              </el-form-item>
            </div>
            <!--邮箱验证-->
            <div class="group reg_mail_show" >
              <el-form-item prop="emailCode" :label="$t('common.emailCode')">
                <div class="group">
                  <send-sms-code   :phone="editEmailForm.phone"  :send-msg-type="5"  :send-type="'2'"  v-model="editEmailForm.emailCode"></send-sms-code>
                </div>
              </el-form-item>
            </div>

          </div>
          <div class="dia_submit"><span class="error_notice"></span>
            <el-button @click="editEmail" >{{$t('userinfo.bind')}}</el-button>
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
  import SendSmsCode from "../common/sendSmsCode";
  import {bindEmail} from "../../api/user";
  import {saveUserInfo} from "../../utils/auth";
  import {mapGetters} from 'vuex';

  export default {
    components: {SendSmsCode},
        name: "editemail",
      data(){
        const validateEmail = (rule, value, callback) => {
          var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if (value==="") {
            callback(new Error(this.$i18n.t('valid.emailnotnull')))
            return;
          }else if(!regEmail.test(value)){
            callback(new Error(this.$i18n.t('valid.notemail')))
            return;
          }else {
            callback()
          }
        }

        const validCode = (rule, value, callback) => {
          if (value.length!==6) {
            callback(new Error( this.$i18n.t('valid.msgcode')))
          }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
            callback(new Error( this.$i18n.t('valid.msgcode')))
          } else {
            callback()
          }
        }
        return {
          showDialog: false,
          editEmailForm: {
            phone: '',
            mobileCode: '',
            emailCode: ''
          },
          editEmailRules: {
            phone: [{required: true,trigger: 'click' ,validator:validateEmail}],
            emailCode: [{required: true,trigger: 'click', validator:validCode}],
            mobileCode: [{required: true,trigger: 'click', validator:validCode}]
          }
        }
      },
      computed: {
        ...mapGetters(['user']),
      },
      methods:{
        chkAccount () {
          let $this = this
          this.$store.dispatch('chkAccount', {account: this.editEmailForm.phone}).then(res => {
            if (res.data.exists === 1) {
              this.$message({
                type: 'error',
                message: this.$i18n.t('valid.existuser')
              })
            } else {
              $this.showDialog = true
            }
          })
        },
        editEmail(){
          let $this=this;
          this.$refs.editEmailForm.validate(valid => {
            if(valid){
              bindEmail($this.editEmailForm).then(response => {
                if(response.code===200){
                  $this.$message({
                    message: $this.$i18n.t('userinfo.bindemailsucc'),
                    type: 'success',
                    center: true,
                    onClose: function () {
                      var user=$this.user;
                      user.email=$this.editEmailForm.phone;
                      user.openEmailValid = 1
                      saveUserInfo(user);
                      $this.$router.push({path: 'userinfo'})
                    }
                  })
                }
              })
            }
          });
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
