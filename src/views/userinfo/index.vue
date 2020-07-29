<template>
  <div>
  <div class="page_uc user-main">
    <div class="crumbs"><span>{{$t('common.security')}}</span></div>
    <div class="main_area">
      <!--基本信息-->
      <div class="mod">
        <div class="mod_hd">{{$t('userinfo.basic')}}</div>
        <div class="mod_bd">
          <div class="user_info">
            <div class="group">
              <div class="label">{{$t('login.logIn')}}：</div>
              <div class="content"><span class="info">{{user.username}}</span></div>
            </div>
            <div class="group">
              <div class="label">UID：</div>
              <div class="content"><span class="info"> {{user.uid}} </span></div>
            </div>
            <div class="group">
              <div class="label">{{$t('common.password')}}：</div>
              <div class="content"><span class="info"> <span>********</span> </span> <span class="operation"> <router-link
                to="editpwd">{{$t('common.edit')}}</router-link> </span></div>
            </div>
            <div class="group">
              <div class="label">{{$t('common.tradePassword')}}：</div>
              <div class="content"><span class="info"> <span>{{user.isExitTradePwd===1?'********':$t('common.noSetData')}}</span></span><span class="operation">
                <router-link  to="addTradePwd">{{user.isExitTradePwd===0?$t('common.add'):$t('common.reset')}}</router-link>
                </span></div>
            </div>

            <div class="group">
              <div class="label">{{$t('common.phone')}}：</div>
              <div class="content"><span class="info"> <span>{{user.mobile?substrCard:''}}</span> </span> <span class="operation"> <router-link
                to="editphone">{{user.mobile?$t('common.edit'):$t('common.bind')}}</router-link><a  v-show="!(openEmailValid === 0 &&  openPhoneValid > 0)" v-if="user.mobile" href="javascript:;" @click="openOrclosePhone()">{{openPhoneValid===0?$t('common.openvalid'):$t('common.closevalid')}}</a> </span></div>
            </div>

            <div class="group">
              <div class="label">{{$t('common.email')}}：</div>
              <div class="content"><span class="info"> <span>{{user.email?substrEmail:""}}</span> </span> <span class="operation"> <router-link v-if="!user.email"
                to="editemail">{{$t('common.bind')}}</router-link> <a  v-show="!(openPhoneValid === 0 &&  openEmailValid > 0)"   v-if="user.email" href="javascript:;" @click="openOrcloseEmail()">{{openEmailValid===0?$t('common.openvalid'):$t('common.closevalid')}}</a> </span></div>
            </div>

          </div>
        </div>
      </div>
      <div class="mod m_t_20">
        <div class="mod_hd">
          {{$t('userinfo.history')}}
        </div>
        <div class="mod_bd">
          <el-table v-loading.body="listLoading" :empty-text="$t('common.nodata')"
            :data="list"
            style="width: 100%">
            <el-table-column
              prop="createTime"
              :label="$t('order.time')"
              width="180">
            </el-table-column>
            <el-table-column
              prop="loginType"
              :label="$t('userinfo.logintype')"
              width="180">
            </el-table-column>
            <el-table-column
              prop="loginIp"
              :label="$t('userinfo.loginIp')">
            </el-table-column>
            <el-table-column
              :label="$t('userinfo.loginStatus')">
              <template slot-scope="scope">
                <span v-if="scope.row.loginStatus===0">{{$t('userinfo.loginSucc')}}</span>
                <span v-else>{{$t('userinfo.loginFail')}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="!listLoading">
            <div class="pagination">
              <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                             :page-size="listQuery.limit" layout="prev, pager, next" :total="total"></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>





    <el-form autoComplete="on" :model="changeValidForm" :rules="rules" ref="changeValidForm" class="form_set"
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
        <div class="group reg_phone_show">
          <div class="el-form-item is-required el-form-item--medium">
                <el-form-item prop="mobileCode" :label="user.mobile?substrCard:''">
                  <!--<div class="el-input el-input&#45;&#45;medium el-input-group el-input-group&#45;&#45;append">-->
                    <!--<el-input v-model="changeValidForm.mobileCode" v-bind:maxlength="6" name="mobileCode">-->
                    <!--</el-input>-->
                    <!--<div class="el-input-group__append">-->
                      <!--<button type="button" @click="openCodeDialog('1')" class="el-button el-button&#45;&#45;default el-button&#45;&#45;medium">&lt;!&ndash;&ndash;&gt;-->
                      <!--<span>{{$t('common.sendSmsCode')}}</span></button>-->
                    <!--</div>-->
                  <!--</div>-->
                  <div class="group">
                    <send-sms-code   :phone="user.mobile"  :send-msg-type="10"  :send-type="'1'" v-model="changeValidForm.mobileCode"></send-sms-code>
                  </div>
                </el-form-item>
          </div>
        </div>
        <!--邮箱验证-->
        <div class="group reg_mail_show">
          <div class="el-form-item is-required el-form-item--medium">
            <el-form-item prop="emailCode" :label="$t('common.emailCode')">
              <!--<div class="el-input el-input&#45;&#45;medium el-input-group el-input-group&#45;&#45;append">-->
                <!--<el-input v-model="changeValidForm.emailCode" v-bind:maxlength="6" name="emailCode">-->
                <!--</el-input>-->
                <!--<div class="el-input-group__append">-->
                  <!--<button type="button" @click="openCodeDialog('2')" class="el-button el-button&#45;&#45;default el-button&#45;&#45;medium">&lt;!&ndash;&ndash;&gt;-->
                    <!--<span>{{$t('common.sendEmailCode')}}</span></button>-->
                <!--</div>-->
              <!--</div>-->
              <div class="group">
               <send-sms-code   :phone="user.email"  :send-msg-type="10"  :send-type="'2'" v-model="changeValidForm.emailCode"></send-sms-code>
            </div>
            </el-form-item>
          </div>
        </div>

      </div>
      <div class="dia_submit"><span class="error_notice"></span>
        <el-button @click="changeValid" :disabled="buttonStatus">确定</el-button>

        <!--<button class="btn btn_submit btn-primary" pro_name="btn_submit" @click="changeValid"> </button>-->
      </div>
    </div>
    <div class="dialog_extra"></div>
  </div>
<!--弹出窗口结束-->



    <!--验证码-->
    </el-form>

    <!--验证码-->
    <!--<div class="dialog_wrap" v-show="codeShow">-->
      <!--<div class="dialog">-->
        <!--<div class="dia_tit">-->
          <!--<div><b>{{$t('register.captchacode')}}</b><span class="close" @click="codeShow=false;isSend=false;" >×</span></div>-->
          <!--<p data="dia_title" class="dia_tit_more"></p>-->
        <!--</div>-->
        <!--<div class="dia_content">-->
          <!--<div class="group" style="display: block">-->
            <!--<label class="label" style="word-wrap:break-word;">{{$t('register.inputVerify')}} <span style="color: #F57723">({{$t('register.validTip')}})</span></label>-->
            <!--<div class="content input_img_code">-->
            <!--<span class="input_box">-->
            <!--<input type="text" name="captcha_code"  @keyup="validVerifyCode()"-->
                   <!--v-model="sendSmsForm.verifyCode" maxlength="4"  placeholder="" class="input_text size_full">-->
            <!--</span>-->
              <!--<img :src="imgUrl" class="img_code" @click="changeVerify">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="dia_submit"><span class="error_notice"></span>-->
          <!--<button class="btn btn_submit btn-primary" :disabled="isSend" @click="sendSmsCode()" > {{$t('register.sendSms')}}</button>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="dialog_extra"></div>-->
    <!--</div>-->

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {getUserLoginLogs,setValid,queryNeedValid} from '@/api/user';
  import {strString} from "@/utils/stringUtil";
  import {saveUserInfo} from "../../utils/auth";
  import SendSmsCode from "../common/sendSmsCode";

  export default {
    components: {SendSmsCode},
    name: "userInfoIndex",
    data() {
      const validCode= (rule, value, callback) => {
        if (value.length!==6) {
          callback(new Error( this.$i18n.t('valid.msgcode')))
        }else if(!/^[0-9]*[1-9][0-9]*$/g.test(value)){
          callback(new Error( this.$i18n.t('valid.msgcode')))
        } else {
          callback()
        }
      }
      return {
        buttonStatus:false,
        isSend:true,
        imgUrl: '',
        list: null,
        total: null,
        codeShow:false,
        showDialog:false,
        sendSmsForm:{
          verifyCode:'',
          sendType:'',
          mobile:'',
        },
        changeValidForm:{
          verifyCode:'',
          mobileCode:'',
          emailCode:'',
          sendType:'',
          validType:'1'

        },
        rules: {
          // countryCode: [{required: true,validator:validCountryCode}],
          mobileCode: [{required: true,validator:validCode}],
          emailCode: [{required: true,validator:validCode}]
        },
        listLoading: true,
        openPhoneValid:0,//是否已开启手机验证
        openEmailValid:0, //是否开启邮箱验证
        listQuery: {
          page: 1,
          limit: 10,
          name: ''
        }
      }
    },
    created(){
      this.needValid();
      this.getList();
    },
    computed: {
      ...mapGetters(['user','token']),
      substrCard:function () {
        if(this.user.mobile){
          return strString(this.user.mobile);
        }
      },
      substrEmail(){
        if(this.user.email){
          return strString(this.user.email);
        }
      }
    },
    methods: {
      validVerifyCode(){
        if(this.sendSmsForm.verifyCode.length==4){
          this.isSend=false;
        }else{
          this.isSend=true;
        }

      },
      changeVerify(){
        this.imgUrl="/verify/?d="+Math.random();
      },
      getList() {
        this.listLoading = true;
        getUserLoginLogs(this.listQuery)
          .then(response => {
            this.list = response.data.result.records;
            this.total = response.data.result.total;
            this.listLoading = false;
          })
      },
      needValid(){
        let $this=this;
        queryNeedValid().then((response)=>{
          if(response.openPhoneValid){
            $this.openPhoneValid=response.openPhoneValid;
          }
          if(response.openEmailValid){
            $this.openEmailValid=response.openEmailValid;
          }
        })
      },
      changeValid(){
      let $this = this;
      this.$refs.changeValidForm.validate(isValid => {
         if (isValid) {
            var param = {sendType:this.changeValidForm.sendType,validType:'0',mobileCode:this.changeValidForm.mobileCode,
            emailCode:this.changeValidForm.emailCode};
            this.buttonStatus = true;
            setValid(param).then((response)=>{
              this.buttonStatus = false;
              if(response.code===200){
                var user=$this.user;
                if($this.changeValidForm.sendType==='1'){//关闭手机验证
                  user.openPhoneValid=0;//将关闭手机验证标识更新至store
                }else if($this.changeValidForm.sendType==='2'){
                  user.openEmailValid=0;//将关闭邮箱验证标识更新至store
                }
                saveUserInfo(user);
                location.reload();
              }
            });

          }
        })

      },
      //发送短信邮箱验证码
      sendSmsCode() {
        this.isSend = true;
        if(this.sendSmsForm.sendType==='1'){
          this.sendSmsForm.mobile = this.changeValidForm.mobileCode;
        }else{
          this.sendSmsForm.mobile = this.changeValidForm.emailCode;
        }
        let param = {mobile:this.sendSmsForm.sendType==='1'?this.user.mobile:this.user.email,
          sendType:this.sendSmsForm.sendType,sendMsgType:'10',verifyCode:this.sendSmsForm.verifyCode};

        this.$store.dispatch('sendSms', param).then((result) => {
          this.isSend = true;
          this.sendSmsForm.verifyCode='';
          if (result.code === 200) {
            this.codeShow = false;//关闭弹窗
            this.$message({
              message:this.sendSmsForm.sendType===1?this.$i18n.t('common.sendSmsCodeOk'):this.$i18n.t('common.sendEmailCodeOk'),
              type: 'success',
              center: true,
            });//提示发送,注意查收
          }
        })

      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      openOrclosePhone(){
        let $this = this;
        this.changeValidForm.sendType='1';
          if(this.openPhoneValid===0){
            //开启验证
            var param = {sendType:this.changeValidForm.sendType,validType:'1'};
            setValid(param).then((response)=>{
              if(response.code===200){
                var user=$this.user;
                user.openPhoneValid=1;//将开启手机标识更新至store
                saveUserInfo(user);
                location.reload()
              }
            });
          }else{
            this.openDialog();
            //关闭验证
          }
      },
      //打开验证窗口
      openDialog(){
          this.showDialog = true;
      },
      //打开验证码窗口
      openCodeDialog(type){
        this.sendSmsForm.sendType=type;
        // this.codeShow = true;
        // this.changeVerify();
        this.sendSmsCode()
      },
      openOrcloseEmail(){
        let $this = this;
        this.changeValidForm.sendType='2';
        if(this.openEmailValid===0){
          //开启验证
          var param = {sendType:this.changeValidForm.sendType,validType:'1'};
          setValid(param).then((response)=>{
            if(response.code===200){
              var user=$this.user;
              user.openEmailValid=1;//将开启邮件标识更新至store
              saveUserInfo(user);
              location.reload()
            }
          });
        }
        else{
          this.openDialog();
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/user.scss";
</style>
