<template>
  <div class="page_login">
    <div class="login-main">
    <!--注册-->
    <div class="col_form form_reg_phone">
      <h1 class="page_title"><p><!--<a :class="'tab_phone '+phoneCur" @click="tabClick('byphone')">{{$t('common.byphone')}}</a>--> <a  :class="'tab_mail '+emailCur" @click="tabClick('byemail')">{{$t('common.byemail')}}</a></p></h1>
      <el-form autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" class="form_set"
               label-position="left">
        <!--国籍-->
        <!--<div class="group">-->
          <!--<el-form-item prop="countryName" :label="$t('common.country')">-->
            <!--<el-select  no-data-text="$t('common.loading')" v-model="registerForm.countryName" name="countryName" filterable placeholder="" class="input_select size_full " @change="countryChange">-->
              <!--<el-option v-for="(item,index) in countryList" :key="index"  :value="item.code">-->
                <!--<span style="float: left;width: 70px;">{{ item.code }}</span>-->
                <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</div>-->
        <!--国籍 end-->
        <!--手机号码（手机注册）-->
        <div class="group reg_phone_show" v-if="registerForm.regType===1">
          <el-form-item prop="username" :label="$t('common.phone')">
            <el-input name="username" v-model="registerForm.username">
              <el-select no-data-text="$t('common.loading')" filterable v-model="registerForm.countryCode" name="countryCode" slot="prepend"  placeholder="">
                <el-option v-for="(item,index)  in countryList" :key="index"
                           :value="item.countryCode">
                  <span style="float: left;width: 200px;">{{ item.code }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryCode }}</span>
                </el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </div>
        <div class="group reg_phone_show" v-else>
          <el-form-item prop="username" :label="$t('register.email')">
            <el-input name="username" v-model="registerForm.username"></el-input>
          </el-form-item>
        </div>

        <!--手机号码（手机注册） END-->
        <!--短信验证码（手机注册）-->
        <div class="group reg_phone_show">
          <el-form-item prop="smsCode" :label="registerForm.regType===1?$t('common.smsCode'):$t('common.emailCode')">
            <el-input v-model="registerForm.smsCode" v-bind:maxlength="6" name="smsCode">
              <el-button @click="showSmsDialog('1')" slot="append" :disabled="isSend"  id="sendCode"  v-if="registerForm.regType===1">{{ timerCount ? timerCount + $i18n.t('common.tryAgain') : $t('common.sendSmsCode')}}</el-button>
              <el-button @click="showSmsDialog('2')" slot="append" :disabled="isSend"  id="sendCode"  v-else>{{ timerCount ? timerCount + $i18n.t('common.tryAgain') : $t('common.sendEmailCode')}}</el-button>
            </el-input>
          </el-form-item>
        </div>

        <div class="group">
          <el-form-item prop="password" :label="$t('login.password')">
            <!--<el-input type="password" v-model="registerForm.password" name="password" v-bind:maxlength="20"></el-input>-->
            <Password callBackName="Run" v-on:Run="setPassword"></Password>
          </el-form-item>
        </div>
        <!--登录密码 END-->
        <!--确认密码-->
        <div class="group">
          <el-form-item prop="comfirmPassword" :label="$t('common.comfirmPassword')">
            <!--<el-input type="password" v-model="registerForm.comfirmPassword" name="comfirmPassword" v-bind:maxlength="20"></el-input>-->
            <Password callBackName="Run" v-on:Run="setConfirmPassword"></Password>
          </el-form-item>
        </div>
        <div class="group">
          <el-form-item prop="visitCode" :label="$t('register.visitCode')">
            <el-input v-model="registerForm.visitCode" :disabled="codeEnable" name="visitCode" v-bind:maxlength="6"></el-input>
          </el-form-item>
        </div>
        <!--确认密码 END-->
        <label class="clause">
          <span class="checkbox">
              <input type="checkbox" checked="true" name="notam" v-model="registerForm.notam">
              <b></b> </span>{{$t('common.notam')}}
        </label>
        <label class="clause">
          <span class="checkbox">
              <input type="checkbox" checked="true" name="protocol" v-model="registerForm.protocol">
              <b></b> </span>{{$t('register.readyAgree')}}<router-link to="legal">《{{$t('register.userAgreement')}}》</router-link>
          <span class="float_right">{{$t('common.havaaccount')}}&nbsp;<router-link to="login">{{$t('login.logIn')}}</router-link></span>
        </label>
        <div class="submit">
          <el-button @click="doReg" :disabled="registerButton">{{$t('register.reg')}}</el-button>

        </div>
      </el-form>
      <!--<div class="page_tab"><span data-reg-tab="phone" class="tab_phone">{{$t('register.byPhone')}}</span></div>-->
    </div>


    </div>
    <!--注册 end-->
    <div class="dialog_wrap" v-show="showdiv">
      <div class="dialog">
        <div class="dia_tit">
          <div><b>{{$t('register.verify')}}</b><span class="close" @click="showdiv=false" >×</span></div>
          <p data="dia_title" class="dia_tit_more"></p>
        </div>
        <div class="dia_content">
          <div class="group" style="display: block">
            <label class="label" style="word-wrap:break-word;">{{$t('register.inputVerify')}} <span style="color: #F57723">({{$t('register.validTip')}})</span></label>
            <div class="content input_img_code">
            <span class="input_box">
            <input type="text" name="captcha_code"
                   @keyup="validVerifyCode()"
                   v-model="registerForm.verifyCode" maxlength="4"  placeholder="" class="input_text size_full">
            </span>
              <img :src="imgUrl" class="img_code" @click="changeVerify">
            </div>
          </div>
        </div>
        <div class="dia_submit"><span class="error_notice"></span>
          <button class="btn btn_submit btn-primary" @click="sendSmsCode"> {{$t('register.sendSms')}}</button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
  </div>

</template>

<script>
  // import {getcountrys} from "../../api/user";

  import Password from "../common/password";
  export default {
    components: {Password},
    name: "register",
    beforeRouteLeave (to, from, next) {
      clearInterval(this.timer);
      next();
    },
    data() {

      const validateUsername = (rule, value, callback) => {
        if(this.registerForm.regType===1){
          if (value.length < 8 || value.length > 50) {
            callback(new Error(this.$i18n.t('valid.username')))
            return;
          }
        }else if(this.registerForm.regType===2){
          var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if (value==="") {
            callback(new Error(this.$i18n.t('valid.emailnotnull')))
            return;
          }else if(!regEmail.test(value)){
            callback(new Error(this.$i18n.t('valid.notemail')))
            return;
          }
        }
        callback();
        // this.$store.dispatch('chkAccount', {account:value}).then(res => {
        //   if(res.data.exists===1){
        //     callback(new Error(this.$i18n.t('valid.existuser')))
        //   }else{
        //     callback()
        //   }
        // });
      }
      const validateVeriCode = (rule, value, callback) => {
        if (value.length !==4) {
          callback(new Error(this.$i18n.t('valid.valicode')))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
         if (!this.regPass(value)) {
          callback(new Error(this.$i18n.t('valid.password')))
        } else {
          callback()
        }
      }

      const validateConfirm = (rule, value, callback) => {
        if (value!==this.registerForm.password) {
          callback(new Error( this.$i18n.t('register.pwdComfirmErr')))
        } else {
          callback()
        }
      }

      const validCode= (rule, value, callback) => {
        if (value.length!==6) {
          callback(new Error( this.$i18n.t('valid.msgcode')))
        }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
          callback(new Error( this.$i18n.t('valid.msgcode')))
        } else {
          callback()
        }
      }

      const validCountry = (rule, value, callback) => {
        if (value==="") {
          callback(new Error( this.$i18n.t('register.countryErr')))
        } else {
          callback()
        }
      }

      const validCountryCode = (rule, value, callback) => {
        if (value==="") {
          callback(new Error( this.$i18n.t('register.countryCodeErr')))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          username: '',
          countryName: '',
          smsCode: '',
          countryCode: '',
          password: '',
          comfirmPassword: '',
          visitCode:'',
          regType:2,//默认为手机注册 2为邮箱注册
          protocol:false,
          notam:false,
          verifyCode:''
        },
        registerRules: {
          countryName: [{required: true,validator:validCountry}],
          // countryCode: [{required: true,validator:validCountryCode}],
          smsCode: [{required: true,validator:validCode}],
          username: [{required: true,trigger: 'blur',validator:validateUsername}],
          password: [{required: true, trigger: 'blur',validator: validatePassword}],
          comfirmPassword: [{required: true,trigger: 'blur',validator:validateConfirm}]
          // verifyCode: [{required: true,trigger: 'blur',validator:validateVeriCode}]
        },
        countryList: [],
        isSend: false,
        timeoutSecond:60,
        timerCount: 0,
        timer: null,
        activeName:'byemail',
        phoneCur:'',
        emailCur:'cur',
        showdiv:false,
        imgUrl: '',
        sendType:'',
        loading:true,
        registerButton:false,
        codeEnable:false//是否允许输入邀请码
      }
    },
    created(){
      // this.getCountry();
      if(this.$route.query.visitCode){
        this.registerForm.visitCode=this.$route.query.visitCode;
        this.codeEnable=true;
      }
    },
    methods: {
      setPassword(data){
        this.registerForm.password = data
      },
      setConfirmPassword(data){
        this.registerForm.comfirmPassword = data
      },
      // getCountry(){
      //   let $this=this;
      //   getcountrys().then((response)=>{
      //     if(response.code===200){
      //       var dataList=response.data.countryList;
      //       if(dataList){
      //         $this.countryList=dataList;
      //         this.registerForm.countryName=dataList[0].code;
      //         this.registerForm.countryCode=dataList[0].countryCode;
      //       }
      //     }
      //   });
      // },
      countryChange(){ //切换国家时设置对应的国际编码
        for(let i=0;i<this.countryList.length;i++){
          if(this.countryList[i].code==this.registerForm.countryName){
            this.registerForm.countryCode=this.countryList[i].countryCode;
            break;
          }
        }
      },
      // btxText() {
      //   document.querySelector("#sendCode").innerText=this.timerCount+this.$i18n.t('common.tryAgain');
      //   // this.btxLable=this.timerCount+this.$i18n.t('common.tryAgain');
      // },
      showSmsDialog(sendType){
        // var flag=true;
        this.sendType = sendType;
        // this.$refs.registerForm.validateField('username',valid => {
        //   if(valid){
        //     flag=false;
        //   }
        // })
        // if(flag){
        //   this.changeVerify();
        //   this.showdiv = true;
        // }
        this.sendSmsCode()
      },
      changeVerify(){
        this.imgUrl="/verify/?d="+Math.random();
      },
      validVerifyCode(){
        if(this.registerForm.verifyCode.length==4){
          this.isSend=false;
        }else{
          this.isSend=true;
        }

      },
      sendSmsCode() {
        var flag=true;
        this.$refs.registerForm.validateField('username',valid => {
          if(valid){
            flag=false;
          }
        })
        if(flag){
          this.$refs.registerForm.clearValidate();
          this.$store.dispatch('sendSms', {countryCode:this.registerForm.countryCode,mobile:this.registerForm.username,
            sendType:this.sendType,sendMsgType:'1',verifyCode:this.registerForm.verifyCode}).then((result) => {
            if (result.code === 200) {
              this.timerCount = this.timeoutSecond;
              this.isSend = true;//禁用按钮,开始倒计时
              this.timer = setInterval(() => {
                if (this.timerCount > 0 && this.timerCount <= this.timeoutSecond) {
                  this.timerCount--;
                } else {
                  this.isSend = false;
                  // document.querySelector("#sendCode").innerText=this.registerForm.regType===1?this.$i18n.t('common.sendSmsCode'):this.$i18n.t('common.sendEmailCode');
                  // this.btxLable = this.$i18n.t('common.sendSmsCode');
                  this.timerCount = 0
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
              this.$message({
                message:this.registerForm.regType===1?this.$i18n.t('common.sendSmsCodeOk'):this.$i18n.t('common.sendEmailCodeOk'),
                type: 'success',
                center: true,
              });//提示发送,注意查收
              this.showdiv = false;
              // } else if (result.code === '405') {
              //   alert(result.msg, 'error');
              // }
              // }).catch(() => {
              //   this.loading = false
            }else{
             this.changeVerify();
            }
          })
        }
      },
      doReg() {
        let $this=this;
        this.$refs.registerForm.validate(isValid => {
          if (isValid) {
            if(!$this.registerForm.notam){
              $this.$message({
                message:$this.$i18n.t('common.amcheck'),
                type: 'error',
                center: true
              });
              return false;
            }
            if(!$this.registerForm.protocol){
              $this.$message({
                message:$this.$i18n.t('register.protocol'),
                type: 'error',
                center: true
              });
              return false;
            }
            $this.codeEnable=false;
            $this.registerButton=true;//禁应注册按钮
            $this.$store.dispatch('register', $this.registerForm).then((result) => {
              $this.registerButton=false;
              if (result.code === 200) {
                $this.$message({
                  message:$this.$i18n.t('register.success'),
                  type: 'success',
                  center: true,
                  onClose: function () {
                    $this.$router.push({path: 'login'})
                  }
                });
              }
            })
          }
        })
      },
      tabClick(tab) {
        var countryName=this.registerForm.countryName;
        var countryCode=this.registerForm.countryCode;
        this.$refs.registerForm.resetFields();
        this.registerForm.countryName=countryName;
        this.registerForm.countryCode=countryCode;
        this.isSend = false;
        if (tab === 'byphone') {
          this.registerForm.regType=1;
          this.phoneCur='cur'
          this.emailCur='';
        } else {
          this.registerForm.regType=2;
          this.phoneCur=''
          this.emailCur='cur'
        }
        this.timerCount = 0
        // document.querySelector("#sendCodeButton").innerText=this.$i18n.t('register.sendSms');
        // document.querySelector("#sendCode").innerText=this.registerForm.regType===1?this.$i18n.t('common.sendSmsCode'):this.$i18n.t('common.sendEmailCode');
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
