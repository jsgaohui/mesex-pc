<template>
  <div>
    <!-- <el-form-item prop="smsCode" :label="sendType==='1'?$t('common.smsCode'):$t('common.emailCode')"> -->
    <el-form-item prop="smsCode">
      <el-input name="smsCode" v-model="currentValue" :maxlength="6">
        <el-button @click="showSmsDialog" slot="append" :disabled="isSend" id="sendCode" v-html="showLable" ></el-button>
      </el-input>
    </el-form-item>
    <div class="dialog_wrap" v-show="showdiv">
      <div class="dialog">
        <div class="dia_tit">
          <div><b>{{$t('register.captchacode')}}</b><span class="close" @click="showdiv=false">×</span></div>
          <p data="dia_title" class="dia_tit_more"></p>
        </div>
        <div class="dia_content">
          <div class="group">
            <label class="label">{{$t('register.inputVerify')}} <span style="color: #F57723">({{$t('register.validTip')}})</span></label>
            <div class="content input_img_code">
            <span class="input_box">
            <input type="text" name="verifyCode" v-model="verifyCode" maxlength="4" class="input_text size_full">
            </span>
              <img :src="imgUrl" class="img_code" @click="changeVerify">
            </div>
          </div>
        </div>
        <div class="dia_submit">
          <el-button class="btn btn_submit btn-primary" @click="sendSmsCode"> {{$t('register.sendSms')}}</el-button>
        </div>
      </div>
      <div class="dialog_extra"></div>
    </div>
  </div>
</template>

<script>
  import {strString} from "../../utils/stringUtil";
  export default {
    name: "sendSmsCode",
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer);
      next();
    },
    data() {
      return {
        isSend: false,
        timeoutSecond: 60,
        timerCount: 0,
        timer: null,
        btxLable:this.sendType==='1'?this.$i18n.t('common.sendSmsCode'):this.$i18n.t('common.sendEmailCode'),
        imgUrl: '',
        verifyCode: '', //图形验证码
        showdiv: false
      }
    },
    computed: {
      currentValue: {
        // 动态计算currentValue的值
        get: function () {
          return this.value; // 将props中的value赋值给currentValue
        },
        set: function (val) {
          this.$emit('input', val); // 通过$emit触发父组件
        }
      },      substrCard:function () {
        if(this.phone){
          return strString(this.phone);
        }
      },
      substrEmail(){
        if(this.phone){
          return strString(this.phone);
        }
      },
      showLable(){
        if(this.timerCount>0){

          return this.btxLable;
        }else{
          return this.btxLable=this.sendType==='1'?this.$i18n.t('common.sendSmsCode'):this.$i18n.t('common.sendEmailCode')
        }
      }
    },
    props: {
      codeLength: 0,
      phone: '',
      countryCode: '',
      validField: '',
      sendType: '',
      sendMsgType: ''
    },
    methods: {
      btxText() {
        if(this.timerCount>0){
          this.btxLable = this.timerCount + this.$i18n.t('common.tryAgain');
        }else{
         this.btxLable=this.sendType==='1'?this.$i18n.t('common.sendSmsCode'):this.$i18n.t('common.sendEmailCode')
        }
      },
      changeVerify() {
        this.imgUrl = "/verify/?d=" + Math.random();
      },
      showSmsDialog() {
        // var flag = true;
        // this.verifyCode = null;
        // if(this.validField){
        //   this.elForm.validateField(this.validField, function (valid) {
        //     if (valid) {
        //       flag = false;
        //     }
        //   })
        // }
        // if (flag) {
        //   this.changeVerify();
        //   this.showdiv = true;
        // }
        this.sendSmsCode()
      },
      sendSmsCode() {
        let $this = this;
        // if (!this.verifyCode||this.verifyCode.length !== 4) {
        //   this.$message({
        //     message: this.$i18n.t('valid.valicode'),
        //     type: 'error',
        //     center: true
        //   });
        // } else {
          $this.elForm.clearValidate();
          $this.$store.dispatch('sendSms', {
            mobile: $this.phone,
            countryCode: $this.countryCode,
            sendType: $this.sendType,
            sendMsgType: $this.sendMsgType,
            verifyCode: $this.verifyCode
          }).then((result) => {
            if (result.code === 200) {
              $this.showdiv=false;
              $this.isSend = true;
              $this.timerCount = $this.timeoutSecond;
              $this.timer = setInterval(() => {
                if ($this.timerCount > 0 && $this.timerCount <= $this.timeoutSecond) {
                  $this.timerCount--;
                  $this.btxText();
                } else {
                  $this.isSend = false;
                  document.querySelector("#sendCode").innerText = $this.sendType === '1' ? $this.$i18n.t('common.sendSmsCode') : $this.$i18n.t('common.sendEmailCode');
                  clearInterval($this.timer);
                  $this.timer = null;
                }
              }, 1000)
              $this.$message({
                message: $this.sendType === '1'?$this.$i18n.t('common.sendSmsCodeOk'):$this.$i18n.t('common.sendEmailCodeOk'),
                type: 'success',
                center: true
              });//提示发送,注意查收
            }
            // else{
            //   this.changeVerify();
            // }
          });
        // }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/global.scss";
</style>
