import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
 // { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/index',name:'index',component: _import('index/index'), meta: { title: 'index', icon: 'index'} },//首页
  { path: '/intro',name:'intro',component: _import('index/intro'), meta: { title: 'intro', icon: 'intro'} },//数字货币介绍
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [{
      path: 'login', component: _import('login/index'),name: 'login',meta: { title: 'login', icon: 'login' }
    },
    { path: '/register',name:'register',component: _import('register/index'), meta: { title: 'register', icon: 'register'} },//注册
    { path: '/forgetpwd',name:'forgetpwd',component: _import('login/forgetPwd'), meta: { title: 'forgetpwd', icon: 'forgetpwd'} },//忘记密码
    { path: '/userinfo',name:'userinfo',component: _import('userinfo/index'), meta: { title: 'userinfo', icon: 'userinfo'} },//用户信息
    { path: '/editpwd',name:'editpwd',component: _import('userinfo/editpwd'), meta: { title: 'editpwd', icon: 'editpwd'} },//修改密码
    { path: '/addTradePwd',name:'addTradePwd',component: _import('userinfo/addTradePwd'), meta: { title: 'addTradePwd', icon: 'addTradePwd'} },//修改密码
    { path: '/editphone',name:'editphone',component: _import('userinfo/editphone'), meta: { title: 'editphone', icon: 'editphone'} },//修改手机号
    { path: '/userauth',name:'userauth',component: _import('userinfo/userauth'), meta: { title: 'userauth', icon: 'userauth'} },//用户认证
    { path: '/tradeaccount',name:'tradeaccount',component: _import('tradeaccount/index'), meta: { title: 'tradeaccount', icon: 'tradeaccount'} },//交易账户信息
    { path: '/finanrec',name:'finanrec',component: _import('tradeaccount/traderecord'), meta: { title: 'traderecord', icon: 'traderecord'} },//账户出入金记录
    { path: '/withdraw',name:'withdraw',component: _import('tradeaccount/withdrawaddress'), meta: { title: 'withdrawaddress', icon: 'withdrawaddress'} },//提币地址管理
    { path: '/tradeorder',name:'tradeorder',component: _import('tradeaccount/tradeorder'), meta: { title: 'tradeorder', icon: 'tradeorder'} },//委托、成交记录
      { path: '/trader',name:'trader',component: _import('trader/index'), meta: { title: 'trader', icon: 'trader'} },//币币交易
      { path: '/agreement',name:'agreement',component: _import('register/agreement'), meta: { title: 'agreement', icon: 'agreement'} },//用户协议
      { path: '/notice',name:'notice',component: _import('notice/index'), meta: { title: 'notice', icon: 'notice'} },//公告列表
      { path: '/help',name:'help',component: _import('help/index'), meta: { title: 'help', icon: 'help'} },//帮助中心
      { path: '/noticedetail',name:'noticedetail',component: _import('notice/detail'), meta: { title: 'noticedetail', icon: 'noticedetail'} },//公告明细
      { path: '/fees',name:'fees',component: _import('other/fees'), meta: { title: 'fees', icon: 'fees'} },//费率
      { path: '/legal',name:'legal',component: _import('other/legal'), meta: { title: 'legal', icon: 'legal'} },//法律声明
      { path: '/privacy',name:'privacy',component: _import('other/privacy'), meta: { title: 'privacy', icon: 'privacy'} },//隐私条款
      { path: '/invite',name:'invite',component: _import('other/invite'), meta: { title: 'invite', icon: 'invite'} },//邀请好友
      { path: '/editemail',name:'editemail',component: _import('userinfo/editemail'), meta: { title: 'editemail', icon: 'editemail'} },//绑定邮箱
      { path: '/contactus',name:'contactus',component: _import('help/contactus'), meta: { title: 'contactus', icon: 'contactus'} },//联系我们
      { path: '/fundtrade',name:'fundtrade',component: _import('fund/index'), meta: { title: 'fundtrade', icon: 'fundtrade'} },//基金交易
      { path: '/funddetail',name:'funddetail',component: _import('fund/funddetail'), meta: { title: 'funddetail', icon: 'funddetail'} },//基金详情
      { path: '/fundaccount',name:'fundaccount',component: _import('fund/fundaccount'), meta: { title: 'fundaccount', icon: 'fundaccount'} },//基金賬戶详情
      { path: '/fundaccountlog',name:'fundaccountlog',component: _import('fund/fundaccountlog'), meta: { title: 'fundaccountlog', icon: 'fundaccountlog'} },//基金l流水
      { path: '/fundorder',name:'fundorder',component: _import('fund/fundorder'), meta: { title: 'fundorder', icon: 'fundorder'} },//基金订单
      { path: '/otctrade',name:'otctrade',component: _import('otc/index'), meta: { title: 'otctrade', icon: 'otctrade'} },//otc主页
      { path: '/otcnormalentrust',name:'normalEntrust',component: _import('otc/businessEntrust'), meta: { title: 'normalentrust', icon: 'normalentrust'} },//普通委托
      { path: '/otcbusinessentrust',name:'businessEntrust',component: _import('otc/businessEntrust'), meta: { title: 'businessentrust', icon: 'businessentrust'} },//商家委托
      { path: '/otctakerlist',name:'myTakerList',component: _import('otc/myTakerList'), meta: { title: 'myTakerList', icon: 'myTakerList'} },//我的订单
      { path: '/otcaccount',name:'otcaccount',component: _import('otc/otcAccount'), meta: { title: 'otcaccount', icon: 'otcaccount'} },//法币賬戶详情
      { path: '/otcaccountlog',name:'otcaccountlog',component: _import('otc/otcAccountLog'), meta: { title: 'otcaccountlog', icon: 'otcaccountlog'} },//法币流水
      { path: '/userlevel', name: 'userlevel', component: _import('userinfo/userLevel'), meta: { title: 'userlevel', icon: 'userlevel'} }, // 我的特权
      { path: '/paymentMethod', name: 'paymentMethod', component: _import('userinfo/paymentMethod'), meta: { title: 'paymentMethod', icon: 'paymentMethod'} }, // 收款方式
      { path: '/appealOrder', name: 'appealOrder', component: _import('otc/appealOrder'), meta: { title: 'appealOrder', icon: 'appealOrder'} }, // 申诉订单
      { path: '/viewAppealDetail', name: 'viewAppealDetail', component: _import('otc/viewAppealDetail'), meta: { title: 'viewAppealDetail', icon: 'viewAppealDetail'} }, // 查看申诉资料
      { path: '/aboutus',name:'aboutus',component: _import('about/index'), meta: { title: 'About Us', icon: 'About Us'} },//关于我们
      { path: '/about',name:'about',component: _import('other/about'), meta: { title: 'About Us', icon: 'About Us'} },//关于我们
      { path: '/aboutsto',name:'aboutsto',component: _import('other/about-sto'), meta: { title: 'About sto', icon: 'About sto'} },//关于sto
      { path: '/annoucements',name:'annoucements',component: _import('other/Annoucements'), meta: { title: 'Annoucements', icon: 'Annoucements'} },//关于我们
      { path: 'pastevents',name:'pastevents',component: _import('other/Past-Events'), meta: { title: 'Past-Events', icon: 'Past-Events'} },//关于我们
      { path: '/services',name:'services',component: _import('other/Services'), meta: { title: 'Services', icon: 'Services'} },//关于我们
      { path: '/upcoming',name:'upcoming',component: _import('other/Upcoming-Events'), meta: { title: 'Upcoming-Events', icon: 'Upcoming-Events'} },//关于我们
      { path: '/video',name:'video',component: _import('other/videos'), meta: { title: 'videos', icon: 'videos'} },//关于我们
      { path: '/news',name:'news',component: _import('other/masexnews'), meta: { title: 'news', icon: 'news'} },//关于我们
      { path: '/wes',name:'wes',component: _import('other/wes'), meta: { title: 'wes', icon: 'wes'} },//关于我们
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
