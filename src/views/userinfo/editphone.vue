<template>
  <div class="page_uc user-main">
    <div class="crumbs"><router-link to="userinfo">{{$t('common.security')}}</router-link><i>&gt;</i>{{$t('userinfo.changeMobile')}}</div>
    <div class="mod auth_con">
      <div class="mod_hd info"><h3 class="mod_title">{{$t('userinfo.changeMobile')}}</h3><span class="mod_sub_title"><i class="hb_icon_info"></i> {{$t('userinfo.changeTip')}}</span>
      </div>
      <div class="mod_bd">
        <el-form autoComplete="on" :model="editphoneForm" :rules="editphoneRules" ref="editphoneForm" label-position="left" class="form_set" >
          <div class="group">
            <el-form-item prop="phone" :label="$t('userinfo.newPhone')">
              <el-input name="phone" v-model="editphoneForm.phone" style=".input_phone .wrap_select" type="number">
                <el-select v-model="editphoneForm.countryCode" name="countryCode" slot="prepend"  placeholder="">
                  <el-option v-for="(item,index)  in countryList" :key="index"  :value="item.countryCode">
                    <span style="float: left;width: 150px;">{{ item.code }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryCode }}</span>
                  </el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </div>
          <el-button class="btn btn_submit btn-primary" @click="chkAccount"> {{$t('register.sendSms')}}</el-button>
          <!--<div class="group">-->
            <!--<send-sms-code  valid-field="phone" :phone="editphoneForm.phone" :countryCode="editphoneForm.countryCode"  send-msg-type="5"  send-type="1" v-model="editphoneForm.smsCode"></send-sms-code>-->
          <!--</div>-->
          <!--<input type="hidden" name="phone_token">-->
          <!--<div class="submit">-->
            <!--<el-button @click="editPhone">{{$t('userinfo.bind')}}</el-button>-->
          <!--</div>-->
        </el-form>
      </div>
    </div>
    <el-form autoComplete="on" :model="editphoneForm"  ref="editphoneForm" class="form_set"
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
              <el-form-item prop="mobileCode" :label="editphoneForm.phone">
                <div class="group">
                  <send-sms-code   :phone="editphoneForm.phone"  :send-msg-type="5"  :send-type="'1'" :countryCode="editphoneForm.countryCode"  v-model="editphoneForm.mobileCode"></send-sms-code>
                </div>
              </el-form-item>
            </div>
            <!--邮箱验证-->
            <div class="group reg_mail_show" v-show="user.openEmailValid === 1">
              <el-form-item prop="emailCode" :label="user.email?substrEmail:$t('common.emailCode')">
                <div class="group">
                  <send-sms-code   :phone="user.email"  :send-msg-type="5"  :send-type="'2'" :countryCode="editphoneForm.countryCode" v-model="editphoneForm.emailCode"></send-sms-code>
                </div>
              </el-form-item>
            </div>

          </div>
          <div class="dia_submit"><span class="error_notice"></span>
            <el-button @click="editPhone" >{{$t('userinfo.bind')}}</el-button>
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
import SendSmsCode from '../common/sendSmsCode'
import {bindPhone, getcountrys} from '../../api/user'
import {saveUserInfo} from '../../utils/auth'
import {mapGetters} from 'vuex'
import {strString} from '@/utils/stringUtil'
export default {
  components: {SendSmsCode},
  name: 'editPhone',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6 || value.length > 30) {
        callback(new Error(this.$i18n.t('valid.username')))
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
    return {
      showDialog: false,
      countryList: [],
      editphoneForm: {
        phone: '',
        countryCode: '',
        mobileCode: '',
        emailCode: ''
      },
      editphoneRules: {
        phone: [{required: true, trigger: 'click', validator: validateUsername}],
        mobileCode: [{required: true, trigger: 'click', validator: validCode}],
        emailCode: [{required: true, trigger: 'click', validator: validCode}]
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    substrEmail: function () {
      if (this.user.email) {
        return strString(this.user.email);
      }
    }
  },
  created() {
    this.getCountry()
  },
  methods: {
    getCountry () {
      let $this = this
      getcountrys().then((response) => {
        if (response.code === 200) {
          var dataList = response.data.countryList
          if (dataList) {
            $this.countryList = dataList
            this.editphoneForm.countryCode = $this.user.countryCode
          }
        }
      })
    },
    chkAccount () {
      let $this = this
      this.$store.dispatch('chkAccount', {account: this.editphoneForm.phone}).then(res => {
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
    editPhone () {
      let $this = this
      this.$refs.editphoneForm.validate(valid => {
        if (!valid) return
        bindPhone($this.editphoneForm).then(response => {
          if (response.code === 200) {
            $this.$message({
              message: $this.$i18n.t('userinfo.changeSucc'),
              type: 'success',
              center: true,
              onClose: function () {
                var user = $this.user
                user.mobile = $this.editphoneForm.phone
                user.openPhoneValid = 1
                saveUserInfo(user)
                $this.$router.push({path: 'userinfo'})
              }
            })
          }
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
