import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import {changeLanguage} from "../api/login";
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import krLocale from './kr'
import inLocale from './in'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
    // ...elementEnLocale
  },
  zh: {
    ...zhLocale
    // ...elementZhLocale
  },
  ko:{
    ...krLocale
  },
  in:{
    ...inLocale
  }
}

var type = navigator.appName;
var lang;
if (type == "Netscape"){
  lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
}else{
  lang = navigator.browserLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
};
lang = lang.substr(0, 2);//获取浏览器配置语言前两位


// Vue.nextTick(function() {
//     var locale = Cookies.get('language');
//     if (!locale) {
//       changeLanguage(lang).then((response) => {
//         if (response.code === 200) {
//           //i18n.locale = lang;
//           store.dispatch('setLanguage', lang);
//         }
//       })
//     }
//   }
//   );

// Vue.nextTick(function(){
//   var locale=Cookies.get('language');
//   var sessionLanguage=sessionStorage.getItem("changeLanguage");
//   if(!sessionLanguage||sessionLanguage!=="1"){
//     if(locale){
//       changeLanguage(locale);
//     }else{
//       changeLanguage(lang)
//     }
//     sessionStorage.setItem("changeLanguage","1")//初始化已经设置语言信息
//   }
// })
const i18n = new VueI18n({
  locale: Cookies.get('language')||lang, // set locale
  messages // set locale messages
})
export default i18n
