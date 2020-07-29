<template>
  <div class="doc_head">
    <h1 class="head_logo"><a href="https://www.masex.io"><img src="@/assets/logo.png" alt="UDAX"></a></h1>

    <ul class="head_nav" id="head_nav">

      <li :class="isSelect('index')?'cur':''"><router-link to="index">{{$t('common.firstPage')}}</router-link></li>
      <!--<li :class="isSelect('otcTrade')?'cur':''"><router-link to="otctrade">{{$t('common.otcTrade')}}</router-link></li>-->
      <li class="head-user"><router-link to="about"><span class="title" growing-ignore="true">About Us</span><i
        class="el-icon-arrow-down"></i></router-link>
        <ul class="head-user-list">
          <li><router-link to="services">About MASEx</router-link></li>
          <li><router-link to="upcoming">Upcoming Events</router-link></li>
          <li><router-link to="pastevents">Past Events</router-link></li>
          <li><router-link to="video">MASEx Videos</router-link></li>
          <li><router-link to="news">{{$t('common.aboutMasex')}}</router-link></li>
        </ul>
      </li>
      <li class="head-user"><span class="title" growing-ignore="true">About STO</span><i
        class="el-icon-arrow-down"></i>
        <ul class="head-user-list">
          <li><router-link to="aboutsto">About STO</router-link></li>
          <li><router-link to="notice">News</router-link></li>
        </ul>
      </li>
      <li :class="isSelect('trader')?'cur':''"><router-link to="trader">{{$t('common.cointrade')}}</router-link></li>
      <li class="head-user"><router-link to="help"><span class="title" growing-ignore="true">Support</span></router-link>
<!--        <i class="el-icon-arrow-down"></i>-->
<!--        <ul class="head-user-list">-->
<!--          <li><a href="#">FAQ</a></li>-->
<!--          <li><a href="#">Submit A Request</a></li>-->
<!--          <li><a href="#">API File</a></li>-->
<!--          <li class="head-user-list-g"><a href="#">Terms & Policies<i-->
<!--            class="el-icon-arrow-right"></i></a>-->
<!--          <ul>-->
<!--            <li><a href="#">Fees</a></li>-->
<!--            <li><a href="#">Notices</a></li>-->
<!--            <li><a href="#">Terms of Service</a></li>-->
<!--            <li><a href="#">Privacy Policy</a></li>-->
<!--          </ul>-->
<!--          </li>-->
<!--          <li class="head-user-list-g g02"><a href="#">STO Listing<i-->
<!--            class="el-icon-arrow-right"></i></a>-->
<!--            <ul>-->
<!--              <li><a href="#">Listing Application</a></li>-->
<!--              <li><a href="#">Listing Requirements</a></li>-->
<!--            </ul>-->
<!--          </li>-->
<!--        </ul>-->
      </li>
      <!--<li :class="isSelect('fundTrade')?'cur':''"><router-link to="fundtrade">{{$t('common.fundtrade')}}</router-link></li>-->
      <!--<li :class="isSelect('trader')?'cur':''"><router-link to="notice">{{$t('common.news')}}</router-link></li>-->
      <!--<li :class="isSelect('help')?'cur':''"><router-link to="help">{{$t('common.userhelp')}}</router-link></li>-->
      <!--<li :class="isSelect('contactUs')?'cur':''"><router-link to="contactus">{{$t('common.contactus')}}</router-link></li>-->
      <li class="head-padding"></li>
      <li class="down-menu">
        <el-dropdown>
  <span class="el-dropdown-link">
    Mobile App
  </span>
          <el-dropdown-menu slot="dropdown" class="down-menu-list">
            <div><p><img src="@/assets/images/2wm-ios.png"><br>IOS Download</p></div>
            <div><p><img src="@/assets/images/2wm.png"><br>Android Download</p></div>
          </el-dropdown-menu>

        </el-dropdown>
      </li>

      <template v-if="token">
      <li :class="isSelect('accountSlide')?'cur finance_slide':'finance_slide'">
        <!--<i class="hb_icon_balance"></i><router-link to="tradeaccount">{{$t('common.assets')}}</router-link>-->
        <!--<i class="hb_icon_caret_down"></i>-->
           <a href="#"><i class="hb_icon_balance"></i>{{$t('common.assets')}}<i class="hb_icon_caret_down"></i></a>
        <ul class="balance_in">
          <!--<li><router-link to="otcaccount"><i class="el-icon-otctrade"></i>{{$t('fund.fbAccount')}}</router-link></li>-->
          <li><router-link to="tradeaccount"><i class="el-icon-cointrade"></i>{{$t('fund.bbAccount')}}</router-link></li>
          <!--<li><router-link to="fundaccount"><i class="el-icon-copytrade"></i>{{$t('fund.fundAccount')}}</router-link></li>-->
          <!--<li><router-link to="tradeaccount"><i class="hb_icon_deposit"></i>{{$t('common.rechargedraw')}}</router-link></li>-->
          <!--<li><router-link to="finanrec"><i class="hb_icon_margin"></i>{{$t('common.financialRecords')}}</router-link></li>-->
          <!--<li><router-link to="fundaccount"><i class="hb_icon_security"></i>基金跟單賬戶</router-link></li>-->
        </ul>
      </li>
      <li class="split"></li>
      <li :class="isSelect('orderSlide')?'cur finance_slide':'finance_slide'">
        <a href="#"><i class="hb_icon_orders"></i>{{$t('common.order')}}<i class="hb_icon_caret_down"></i></a>
        <ul  class="head-user-list">
          <!--<li>  <router-link to="otctakerlist"><i class="el-icon-otctrade"></i>{{$t('common.fbOrder')}}</router-link></li>-->
          <li>  <router-link to="tradeorder"><i class="el-icon-cointrade"></i>{{$t('common.coinorder')}}</router-link></li>
          <!--<li><router-link to="fundorder"><i class="el-icon-copytrade"></i>{{$t('common.fundorder')}}</router-link></li>-->
          <li><router-link to="finanrec"><i class="hb_icon_deposit"></i>{{$t('common.rechargedraw')}}</router-link></li>
        </ul>
      </li>
      <li class="split"></li>
        <li :class="isSelect('userInfo')?'cur head-user':'head-user'"> <a href="#"><i class="hb_icon_user"></i><span class="title">{{substrCard}}</span><i class="hb_icon_caret_down"></i></a>
        <ul class="head-user-list">
          <!--<div class="user-vip">-->
            <!--<div class="vip-info"> <img src="public/fonts/icon_user_vip.svg" alt=""> VIP享手续费折扣特权 </div>-->
            <!--<div class="vip-desc"> </div>-->
            <!--<div class="link-group clear_fix"> <a class="link-pass-vip single" href="#">立即开通</a> </div>-->
          <!--</div>-->
          <li><router-link to="userlevel"><i class="el-icon-v"></i>{{$t('common.userLevel')}}</router-link></li>
          <li><router-link to="userinfo"><i class="hb_icon_security"></i>{{$t('common.security')}}</router-link></li>
          <li><router-link to="userauth"><i class="hb_icon_auth"></i>{{$t('common.identityauth')}}</router-link></li>
          <!--<li><router-link to="paymentMethod"><i class="el-icon-payment"></i>{{$t('payment.paymentMethod')}}</router-link></li>-->
          <li><router-link to="invite"><i class="el-icon-invite"></i>{{$t('common.inviteuser')}}</router-link></li>
          <li><a href="javascript:void(0);" @click="logout" class="btn_logout"><i class="hb_icon_logout"></i>{{$t('common.logout')}}</a> </li>
        </ul>
      </li>
      <li class="split"></li>
      </template>
      <template v-else>
      <li :class="isSelect('login')?'cur login_hide':'login_hide'" class="login_hide"><router-link to="login">{{$t('login.logIn')}}</router-link></li>
      <li class="split"></li>
      <li :class="isSelect('register')?'cur login_hide':'login_hide'" class="login_hide"><router-link to="register">{{$t('register.reg')}}</router-link></li>
      <li class="split"></li>
      </template>
      <!--<li class="mobile_show_item theme_btn">-->
        <!--<button class="change_theme"><i class="hb_icon_day"></i> </button>-->
      <!--</li>-->
      <li class="mobile_show_item lang_btn">
        <dl class="select_lang">
          <lang-select class="set-language"></lang-select>
        </dl>
      </li>
    </ul>
  </div>
</template>
<script>
  import LangSelect from '@/components/LangSelect'
  import {mapGetters} from 'vuex';
  import {strString} from "@/utils/stringUtil";
  export default {
    components: { LangSelect},
    name: 'topHeader',
    created() {
      this.getSelectName(this.$route.name);
    },
    watch: {
      '$route'(to, from) {
        this.getSelectName(to.name);
      },
    },
    computed:{
      ...mapGetters(['token','user']),
      substrCard:function () {
        if(this.user.username){
          return strString(this.user.username);
        }
      }
    },
    data() {
      return {
        selectName:'',
        routerConfig: {
          index: ['index'],
          otcTrade: ['otctrade', 'normalEntrust', 'businessEntrust'],
          trader: ['trader'],
          fundTrade: ['fundtrade', 'funddetail'],
          help: ['help'],
          contactUs: ['contactus'],
          accountSlide: ['otcaccount', 'otcaccountlog', 'fundaccount', 'otcaccountlog', 'tradeaccount', 'withdraw','fundaccountlog'],
          orderSlide: ['myTakerList', 'fundorder', 'tradeorder', 'finanrec'],
          userInfo: ['userlevel', 'userinfo', 'userauth', 'paymentMethod', 'invite', 'editphone', 'addTradePwd', 'editpwd', 'editemail'],
          login: ['login', 'forgetpwd'],
          register: ['register'],
          // others: ['intro', 'fees', 'agreement', 'legal', 'privacy', 'notice', 'noticedetail', 'authredirect'],
        },
      }
    },
    methods:{
      logout(){
        const  $this=this;
        this.$store.dispatch("LogOut",this.token).then(()=>{
          $this.$router.push({path: 'login'});
        })
      },
      getSelectName(routeName){
       let isFind = false;
        for (let routerKey in this.routerConfig) {
          if (this.routerConfig[routerKey].includes(routeName, 0)) {
            this.selectName = routerKey;
            isFind = true;
            break;
          }
        }
        if (!isFind){
          this.selectName = '';
        }
      },
      isSelect(value) {
        return (value === this.selectName);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
li.down-menu{
  cursor: pointer;
}
     .el-dropdown-menu.down-menu-list{
       width:360px;
       height:200px;
       padding:20px;
       display:flex;
       justify-content: space-between;
       align-items: center;
     }
.el-dropdown-menu.down-menu-list p{
  text-align: center;
  color:#fff;
}
.head_logo{
  background:#fff;
  padding:2px 0;
  border-radius: 3px;
}
ul li{
  margin-left:0;
  float:initial;
}
</style>
