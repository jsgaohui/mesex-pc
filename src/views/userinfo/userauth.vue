<template>
  <div class="page_uc user-main">
    <div class="crumbs"><span>{{$t('userinfo.userauth')}}</span></div>
    <div class="mod auth_con">
      <div class="mod_bd" style="display:none">
      </div>
      <div class="mod_bd loading" style="display: none;"><!--<img src="@/assets/fonts/loading.svg" alt="">--></div>
    </div>
    <div class="mod auth_con">
      <div class="mod_bd" v-show="step1">
        <!--身份证认证-->
        <el-form autoComplete="on" :model="userAuthForm" :rules="userAuthRules" ref="userAuthForm" label-position="left"
                 class="form_set">
          <div class="group">
            <el-form-item prop="countryName" :label="$t('common.country')">
              <el-select v-model="userAuthForm.countryName" name="countryId" placeholder=""
                         class="input_text size_full">
                <el-option v-for="(item,index) in countryList"  :key="index"
                           :value="item.code">
                  <span style="float: left;width: 70px;">{{ item.code }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="group">
            <el-form-item prop="idCard" :label="$t('userinfo.idcard')">
              <el-input type="text" v-model="userAuthForm.idCard" name="idCard" v-bind:maxlength="30"></el-input>
            </el-form-item>
          </div>
          <div class="group">
            <el-form-item prop="firstName" :label="$t('userinfo.firstname')">
              <el-input type="text" v-model="userAuthForm.firstName" name="firstName" v-bind:maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="group">
            <el-form-item prop="realName" :label="$t('userinfo.name')">
              <el-input type="text" v-model="userAuthForm.realName" name="realName" v-bind:maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="group">
            <el-form-item prop="idCardImgZm" :label="$t('userinfo.cardphoto')">
              <el-upload
                list-type="picture"
                name="idCardImgZm"
                accept="image/*"
                v-model="userAuthForm.idCardImgZm"
                :headers="headers"
                class="upload-demo"
                drag
                action="/app/upload/imageFtp"
                :on-success="uploadSucc"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">{{$t('userinfo.uploadinfo')}} <em>{{$t('userinfo.draggable')}}</em></div>
                <div class="el-upload__tip" slot="tip">{{$t('userinfo.uploadsize')}}</div>
              </el-upload>
            </el-form-item>
          </div>
          <div class="submit">
            <el-button @click="authUser" name="authUser" class="btn btn_submit size_full">{{$t('common.auth')}}</el-button>
          </div>
        </el-form>
        <!--护照认证 end-->
      </div>
      <!--身份审核中-->
      <div class="mod_bd auth_info" v-show="step2">
        <h3 class="state"><img src="@/assets/fonts/img_authing.svg"> {{$t('userinfo.authing')}}</h3>
        <div class="info_wrap">
          <p><span>{{$t('common.country')}}</span>{{userAuthForm.countryName}}</p>
          <p><span>{{$t('userinfo.cardinfo')}}</span>{{substrCard}}</p>
          <p><span>{{$t('userinfo.fullname')}}</span>{{userAuthForm.firstName+" "+userAuthForm.realName}}</p>
        </div>
      </div>
      <!--身份审核中END-->
      <!--身份审核成功-->
      <div class="mod_bd auth_info" v-show="step3">
        <h3 class="state"><img src="@/assets/fonts/img_auth_success.svg"> {{$t('userinfo.authed')}}</h3>
        <div class="info_wrap">
          <p><span>{{$t('common.country')}}</span>{{userAuthForm.countryName}}</p>
          <p><span>{{$t('userinfo.cardinfo')}}</span>{{substrCard}}</p>
          <p><span>{{$t('userinfo.fullname')}}</span>{{userAuthForm.firstName+" "+userAuthForm.realName}}</p>
        </div>
      </div>
      <!--身份审核成功 END-->
    </div>
  </div>
</template>

<script>
  import {strString} from "../../utils/stringUtil";
  import {authUserInfo, authStatus,getcountrys} from "../../api/user";
  import {mapGetters} from 'vuex';
  import {saveUserInfo} from "../../utils/auth";

  export default {
    name: "userauth",
    data() {
      const validCountry = (rule, value, callback) => {
        if (value === "") {
          callback(new Error(this.$i18n.t('register.countryErr')))
        } else {
          callback()
        }
      }

      const valididCard = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$i18n.t('userinfo.entrycard')))
        } else {
          callback()
        }
      }
      const validfirstName = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$i18n.t('userinfo.entryname')))
        } else {
          callback()
        }
      }
      const validrealName = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$i18n.t('userinfo.entryfirstname')))
        } else {
          callback()
        }
      }

      const valididCardImgZm = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$i18n.t('userinfo.mustupload')))
        } else {
          callback()
        }
      }
      return {
        userAuthForm: {
          countryName: '',
          idCard: '',
          firstName: '',
          realName: '',
          idCardImgZm: ''
        },
        userAuthRules: {
          countryName: [{required: true, validator: validCountry}],
          idCard: [{required: true,trigger: 'click', validator: valididCard}],
          firstName: [{required: true,trigger: 'click', validator: validfirstName}],
          realName: [{required: true, trigger: 'click',validator: validrealName}],
          idCardImgZm:[{required: true,trigger: 'click',validator:valididCardImgZm}]
        },
        countryList: [],
        validStatus: 0,
        step1: true,
        step2: false,
        step3: false
      }
    },
    created() {
      this.authStatus();
      this.getCountry();
    },
    computed: {
      ...mapGetters(['user', 'token']),
      substrCard: function () {
        if (this.validStatus > 0) {
          if (this.user.idCard) {
            return strString(this.user.idCard);
          }
        } else {
          if (this.userAuthForm.idCard) {
            return strString(this.userAuthForm.idCard);
          }
        }
      },
      headers() {
        return {
          'UUID': this.token
        }
      }
    }, methods: {
      getCountry(){
        let $this=this;
        getcountrys().then((response)=>{
          if(response.code===200){
            var dataList=response.data.countryList;
            if(dataList){
              $this.countryList=dataList;
            }
          }
        });
      },
      authStatus() {
        let $this = this;
        authStatus().then((response) => {
          if (response.code === 200) {
            var validStatus = response.data.validStatus;
            $this.userAuthForm.countryName=$this.user.countryName;
            $this.userAuthForm.firstName=$this.user.firstName;
            $this.userAuthForm.realName=$this.user.realName;
            if (validStatus === 1) {
              $this.step1 = false;
              $this.step2 = true;
              $this.step3 = false;
              $this.validStatus = 1;
            } else if (validStatus === 2) {
              $this.step1 = false;
              $this.step2 = false;
              $this.step3 = true;
              $this.validStatus = 2;
            }
          }
        })
      },
      authUser() {
        let $this = this;
        // this.$refs.userAuthForm.validate(valid => {
        //   if (valid) {
            authUserInfo($this.userAuthForm).then(response => {
              if (response.code === 200) {
                $this.step1 = false;
                $this.step2 = true;
                var user=$this.user;
                user.firstName=$this.userAuthForm.firstName;
                user.realName=$this.userAuthForm.realName;
                user.idCard=$this.userAuthForm.idCard;
                saveUserInfo(user);//将值更新至store
              }
            })
        //   }
        // })
      },
      uploadSucc(response, file, fileList){
        if(response.code===200){
          var fileNames=response.fileNames;
          for(var i=0;i<fileNames.length;i++){
            this.userAuthForm.idCardImgZm+=fileNames[i]+",";
          }
        }else{//上传失败         
          if(document.querySelector(".el-upload-list").children.length>0){
            document.querySelector(".el-upload-list").lastChild.remove();
          }         
          if(response.msg==='ExceedeFileSizeLimit'){//超出上传大小限制
            this.$message({type: 'error',message:this.$i18n.t('common.uploadSizeMax')});
          }else{
            this.$message({type: 'error',message:this.$i18n.t('otc.operationFailed')});
          } 
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/user.scss";
</style>
