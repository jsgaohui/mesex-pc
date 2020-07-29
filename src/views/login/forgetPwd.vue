<template>
  <div class="reset-main">
    <!--忘记密码-->
    <el-steps :active="active" finish-status="success" style="width: 1000px">
      <el-step  :title="$t('forget.username')" :number="1"></el-step>
      <el-step :title="$t('forget.security')" :number="2"></el-step>
      <el-step :title="$t('forget.resetpwd')" :number="3"></el-step>
    </el-steps>
    <div class="col_form">
      <!--第一步-->
      <el-form autoComplete="on" :model="forgetForm" :rules="forgetRules" ref="forgetForm" label-position="left">
        <div class="page_set" v-show="firstpage">
          <h3 class="page_title">{{$t('forget.resetloginpwd')}}</h3>
          <div class="page_tab"></div>
          <div class="group">
            <div class="content">
              <el-form-item prop="username" :label="$t('login.username')">
                <el-input type="text" v-model="forgetForm.username"  name="username"></el-input>
              </el-form-item>
            </div>
          </div>
          <!--<div class="group">-->
          <!--<el-form-item prop="veriCode" label="图形验证码">-->
          <!--<div class="content input_img_code"> <span class="input_box">-->
          <!--<el-input name="veriCode" v-model="forgetForm.veriCode"-->
          <!--autoComplete="on" placeholder="veriCode"/>-->
          <!--</span> <img :src="imgUrl" class="img_code" @click="changeVerify"></div>-->
          <!--</el-form-item>-->
          <!--</div>-->
          <div class="submit">
            <el-form-item prop="stepbtnone">
              <el-button @click="validAccountStep1" name="stepbtn1" >{{$t('common.submit')}}</el-button>
              <p class="align_center">{{$t('forget.notwithdraw')}}</p>
            </el-form-item>
          </div>
        </div>
        <!--第一步 END-->
        <!--第二步-->
        <div class="page_set" v-show="twopage">
          <h3 class="page_title">{{$t('forget.security')}}</h3>
          <div class="page_tab"></div>
          <input type="hidden" name="account_name">
          <div class="group">
            <el-form-item prop="showusername" :label="$t('login.username')">
              <el-input type="text" v-model="forgetForm.showusername" name="showusername" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="group" v-show="showDialogMobile">
            <el-form-item prop="mobileCode" :label="$t('common.phoneCode')">
                <send-sms-code :phone="mobile" :send-msg-type="8" :send-type="'1'"
                               v-model="forgetForm.mobileCode"></send-sms-code>
            </el-form-item>
          </div>

          <div class="group" v-show="showDialogEmail">
            <el-form-item prop="emailCode" :label="$t('common.emailCode')">
              <send-sms-code :phone="email" :send-msg-type="8" :send-type="'2'"
                             v-model="forgetForm.emailCode"></send-sms-code>
            </el-form-item>
          </div>

          <div class="submit">
            <el-button @click="validAccountStep2" name="stepbtn2">{{$t('common.submit')}}</el-button>
            <p class="align_center">{{$t('forget.notwithdraw')}}</p>
          </div>
        </div>
        <!--第二步 END-->
        <!--第三步-->
        <div class="page_set" v-show="threepage">
          <h3 class="page_title">{{$t('forget.resetloginpwd')}}</h3>
          <div class="page_tab"></div>
          <div class="group">
            <el-form-item prop="password" :label="$t('login.password')">
              <el-input type="password" v-model="forgetForm.password" name="password" v-bind:maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="group">
            <el-form-item prop="comfirmPassword" :label="$t('forget.comfirmPassword')">
              <el-input type="password" v-model="forgetForm.comfirmPassword" name="comfirmPassword" v-bind:maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="submit">
            <el-button @click="validAccountStep3" name="stepbtn3" >{{$t('common.submit')}}</el-button>
            <p class="align_center">{{$t('forget.notwithdraw')}}</p>
          </div>
        </div>
        <!--第三步 END-->
      </el-form>
    </div>

    <!--忘记密码 end-->
  </div>
</template>

<script>
  import SendSmsCode from "../common/sendSmsCode";
  import ElStep from "element-ui/packages/steps/src/step";
  import {strString} from '@/utils/stringUtil'
  import {checkSmsCode, changePwd} from "../../api/user";

  export default {
    components: {ElStep, SendSmsCode},
    name: "forgetPwd",
    data() {
      let $this = this;
      const validateUsername = (rule, value, callback) => {
        if (value.length < 8 || value.length > 30) {
          callback(new Error(this.$i18n.t('valid.username')))
        } else {
          this.$store.dispatch('chkAccount', {account: value}).then(res => {
            if (res.data.exists === 0) {
              callback(new Error(this.$i18n.t('valid.notexistuser')))
            } else {
              if (res.data.openPhoneValid === 1) {
                this.showDialogMobile = true;
                this.mobile = res.data.mobile;
              }
              if (res.data.openEmailValid === 1) {
                this.showDialogEmail = true;
                this.email = res.data.email;
              }
              callback()
            }
          })
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!this.regPass(value)) {
          callback(new Error(this.$i18n.t('valid.passwordTip')))
        } else {
          callback()
        }
      }
      const validateConfirm = (rule, value, callback) => {
        if (!this.regPass(value)) {
          callback(new Error(this.$i18n.t('valid.validpassword')))
        } else if (value !== this.forgetForm.password) {
          callback(new Error(this.$i18n.t('valid.comfirmpassword')))
        } else {
          callback()
        }
      }
      const validCode = (rule, value, callback) => {
        if (value.length !== 6) {
          callback(new Error(this.$i18n.t('valid.msgcode')))
        } else if (!/^[0-9]*[1-9][0-9]*$/g.test(value)) {
          callback(new Error(this.$i18n.t('valid.msgcode')))
        } else {
          callback()
        }
      }
      const validMobileCode= (rule, value, callback) => {
        if (value.length!==6) {
          callback(new Error( this.$i18n.t('valid.msgcode')))
        }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
          callback(new Error( this.$i18n.t('valid.msgcode')))
        } else {
          callback()
        }
      }
      const validEmailCode= (rule, value, callback) => {
        if (value.length!==6) {
          callback(new Error( this.$i18n.t('valid.msgcode')))
        }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
          callback(new Error( this.$i18n.t('valid.msgcode')))
        } else {
          callback()
        }
      }
      return {
        active: 0,
        firstpage: true,
        twopage: false,
        threepage: false,
        isSend: false,
        timeoutSecond: 60,
        timerCount: 0,
        timer: null,
        imgUrl: '/verify/',
        // btxLable: this.$i18n.t('common.sendSmsCode'),
        forgetForm: {
          username: '',
          password: '',
          comfirmPassword: '',
          showusername: '',
          veriCode: '',
          mobileCode: '',
          emailCode: ''
        },
        forgetRules: {
          username: [{required: true, trigger: 'click', validator: validateUsername}],
          password: [{required: true, trigger: 'click', validator: validatePassword}],
          comfirmPassword: [{required: true, trigger: 'click', validator: validateConfirm}],
          mobileCode:[{required: true, trigger: 'click', validator: validMobileCode}],
          emailCode:[{required: true, trigger: 'click', validator: validEmailCode}]
        },
        mobile: '',
        email: '',
        showDialogMobile: false,//是否显示弹出手机验证
        showDialogEmail: false,//是否显示弹出邮箱验证
        sendType: '1'
      }
    }, methods: {

      validAccountStep1() {
        let $this = this;
        this.$refs.forgetForm.validateField('username', function (result) {
          if (result === "") {
            $this.active++;
            $this.firstpage = false;
            $this.twopage = true;
            $this.forgetForm.showusername = strString($this.forgetForm.username);
            var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (regEmail.test($this.forgetForm.username)) {
              $this.sendType = "2";
            }
          }
        })
      },
      validAccountStep2() {
        let $this = this;
        let validprop ='';
        if (this.showDialogMobile&&!this.showDialogEmail) {
          validprop='mobileCode';
        }else if(!this.showDialogMobile&&this.showDialogEmail){
          validprop='emailCode';
        }else{
          validprop='mobileCode,emailCode';
        }
        if(validprop.indexOf(',')===-1){
          this.$refs.forgetForm.validateField(validprop, function (result) {
            if (result === "") {
              checkSmsCode($this.forgetForm.username,$this.forgetForm.mobileCode, $this.forgetForm.emailCode).then((res) => {
                if (res.code === 200) {
                  $this.active++;
                  $this.twopage = false;
                  $this.threepage = true;
                }
              });
            }
          })
        }else{
          this.$refs.forgetForm.validateField('mobileCode', function (result) {
            if (result === "") {
              $this.$refs.forgetForm.validateField('emailCode', function (rs) {
                if (rs === "") {
                  checkSmsCode($this.forgetForm.username, $this.forgetForm.mobileCode, $this.forgetForm.emailCode).then((res) => {
                    if (res.code === 200) {
                      $this.active++;
                      $this.twopage = false;
                      $this.threepage = true;
                    }
                  });
                }
              })
            }
          })
        }
      },
      validAccountStep3() {
        let $this = this;
        this.$refs.forgetForm.validateField('comfirmPassword', function (result) {
          if (result === "") {
            $this.$refs.forgetForm.clearValidate();
            changePwd($this.forgetForm.username, $this.forgetForm.password).then(response => {
              $this.active = 3;
              $this.$message({
                message: $this.$i18n.t('forget.success'),
                type: 'success',
                center: true,
                onClose: function () {
                  $this.$router.push({path: 'login'});
                }
              });
            })
          }
        })
      }
      // ,
      // sendSmsCode() {
      //   if (this.forgetForm.username.length<8||this.forgetForm.username.length>30) {
      //     this.$refs.forgetForm.validateField('username');
      //   } else {
      //     this.$refs.forgetForm.clearValidate();
      //     let $this=this;
      //     this.$store.dispatch("sendSms",{mobile:this.forgetForm.username,sendType:"1",sendMsgType:'8'}).then(() => {
      //       $this.$message({
      //               message:this.$i18n.t('common.sendSmsCodeOk'),
      //               type: 'success',
      //               center:true
      //             });
      //           this.isSend = true;
      //           this.timerCount=this.timeoutSecond;
      //           this.timer = setInterval(() => {
      //             if (this.timerCount > 0 && this.timerCount <= this.timeoutSecond) {
      //               this.timerCount--;
      //               this.btxText();
      //             } else {
      //               this.isSend = false;
      //               document.querySelector("#sendCode").innerText=this.registerForm.regType===1?this.$i18n.t('common.sendSmsCode'):this.$i18n.t('common.sendEmailCode');
      //               // this.btxLable=this.$i18n.t('common.sendSmsCode');
      //               clearInterval(this.timer);
      //               this.timer = null;
      //             }
      //           }, 1000)
      //     })
      //   }
      // }
      ,btxText() {
        this.btxLable=this.timerCount+this.$i18n.t('common.tryAgain');
      },
      changeVerify(){
        this.imgUrl="/verify/?d="+Math.random();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  // @import "src/styles/login.scss";
</style>
