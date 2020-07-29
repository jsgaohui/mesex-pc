<template>
  <div class="page_login">
    <div class="login-main">
      <div class="col_form">
        <div class="login-info">
          <p><i class="el-icon-stop"></i><strong>{{$t('common.notam')}}</strong></p >
          <p><i class="el-icon-warning"></i><strong>{{$t('common.checkurl')}} https://www.masex.io</strong></p>
          <span><i class="el-icon-sinfo"></i>https://www.masex.io</span>
        </div>
        <h1 class="page_title">{{$t('login.logIn')}}</h1>
        <el-form  autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                  label-position="left">
          <div class="group mail_group">
            <el-form-item prop="username" :label="$t('login.username')">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="$t('login.phoneoremail')"/>
            </el-form-item>
          </div>

          <div class="group">
            <el-form-item prop="password" :label="$t('login.password')">
              <div class="rel">
                <Password callBackName="Run" v-on:Run="setPassword"></Password>
                <!--<template v-if="showPwd">-->
                <!--<el-input name="password" v-model="loginForm.password"-->
                <!--autoComplete="on" type="text"/>-->
                <!--<span class="eye"><i class="hb_icon_visible-off"></i></span>-->
                <!--</template>-->
                <!--<template v-else>-->
                <!--<el-input name="password" v-model="loginForm.password"-->
                <!--autoComplete="on" type="password" />-->
                <!--</template>-->
                <!--<span class="eye" @click="showPwd=!showPwd"><i :class="{'hb_icon_visible':!showPwd,'hb_icon_visible-off':showPwd}"></i></span>-->
              </div>
            </el-form-item>
          </div>

          <div class="group">
            <el-form-item prop="veriCode" :label="$t('common.vericode')">
              <div class="content input_img_code"> <span class="input_box">
            <el-input name="veriCode" v-model="loginForm.veriCode"
                      autoComplete="on" />
            </span> <img :src="imgUrl" class="img_code" @click="changeVerify"></div>
            </el-form-item>
          </div>
          <div class="clause"> <span>{{$t('login.notudaxuser')}}&nbsp;<router-link to="register">{{$t('common.register')}}</router-link></span>  <span class="float_right"><router-link to="forgetpwd">{{$t('login.forgetpwd')}}</router-link> </span></div>
          <div class="submit">
            <el-button type="primary" :disabled="loading"  style="margin-bottom:10px;"
                       @click.native.prevent="handleLogin">{{$t('login.logIn')}}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Password from "../common/password";
  export default {
    components: {Password},
    name: "login",
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length < 8 || value.length > 30) {
          callback(new Error(this.$i18n.t('valid.username')))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 8 || value.length > 20) {
          callback(new Error(this.$i18n.t('valid.passwordTip')))
        } else {
          callback()
        }
      }

      const validateVeriCode = (rule, value, callback) => {
        if (value.length !==4) {
          callback(new Error(this.$i18n.t('valid.valicode')))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: '',
          veriCode:''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur',validator:validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}],
          veriCode: [{required: true, trigger: 'blur', validator: validateVeriCode}]
        },
        loading: false,
        showDialog: false,
        imgUrl:''
      }
    },
    computed:{
      ...mapGetters(['token']),
    },
    created() {
      if(this.token){
        this.$router.push({name: 'userinfo'});
      }
      this.changeVerify();
    },
    methods: {
      setPassword(data){
        this.loginForm.password = data
      },
      handleLogin() {
        let $this=this;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            $this.loading = true
            $this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
              $this.loading = false
              if(res.code===200){
                $this.$router.push({name: 'trader'})
              }else{
                $this.changeVerify();
              }
            }).catch((e) => {
              $this.changeVerify();
              $this.loading = false
            })
          } else {
            this.changeVerify();
            return false
          }
        })
      },
      changeVerify(){
        this.imgUrl="/verify/?d="+Math.random();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
