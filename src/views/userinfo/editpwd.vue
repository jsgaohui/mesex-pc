<template>
  <div class="page_uc user-main">
    <div class="crumbs"><router-link to="userinfo">{{$t('common.security')}}</router-link><i>&gt;</i>{{$t('userinfo.editpwd')}}</div>
    <div class="mod auth_con">
      <div class="mod_hd info"><h3 class="mod_title">{{$t('userinfo.editpwd')}} <span class="mod_sub_title"><i class="hb_icon_info"></i> {{$t('userinfo.editTip')}}</span>
      </h3></div>
      <div class="mod_bd">
        <el-form autoComplete="on" :model="editpwdForm" :rules="editpwdRules" ref="editpwdForm" label-position="left" class="form_set" >
          <div class="group">
            <el-form-item prop="oldPassword" :label="$t('userinfo.oldpwd')">
              <el-input type="password" v-model="editpwdForm.oldPassword" name="oldPassword"
                        v-bind:maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="group">
            <el-form-item prop="password" :label="$t('userinfo.newpwd')">
              <el-input type="password" v-model="editpwdForm.password" name="password" v-bind:maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="group">
            <el-form-item prop="comfirmPassword" :label="$t('userinfo.comfirepwd')">
              <el-input type="password" v-model="editpwdForm.comfirmPassword" name="comfirmPassword"
                        v-bind:maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="submit">
            <el-button @click="editpwd" name="editpwd" :disabled="issubmit">{{$t('common.submit')}}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {editpwd} from '@/api/user'
  import {removeToken,removeUserInfo} from "../../utils/auth";
  import {mapGetters} from 'vuex';

  export default {
    name: "editPwd",
    computed:{
      ...mapGetters(['token'])
    },
    data() {
      const validateOldPassword = (rule, value, callback) => {
        if (value.length < 8 || value.length > 20) {
          callback(new Error(this.$i18n.t('valid.passwordTip')))
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
        if (value!==this.editpwdForm.password) {
          callback(new Error( this.$i18n.t('valid.comfirmpassword')))
        } else {
          callback()
        }
      }
      return {
        editpwdForm: {
          oldPassword: '',
          password:'',
          comfirmPassword:''
        },
        editpwdRules:{
          oldPassword: [{required: true, validator: validateOldPassword}],
          password: [{required: true, validator: validatePassword}],
          comfirmPassword: [{required: true,validator:validateConfirm}]
        },
        issubmit:false  //是否已提交表单
      }
    },
    methods:{
      editpwd(){
        let $this=this;
        this.$refs.editpwdForm.validate(valid => {
          if(valid){
            $this.issubmit=true
            editpwd($this.editpwdForm).then(response => {
              if(response.code===200){
                $this.$message({
                  message:$this.$i18n.t('userinfo.editSucc'),
                  type: 'success',
                  center: true,
                  onClose: function () {
                    $this.$store.dispatch("LogOut",$this.token).then(()=>{
                      $this.$router.push({path: 'login'});
                    })
                  }
                });
              }
              $this.issubmit=false;
            })
          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
