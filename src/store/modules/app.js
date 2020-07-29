import Cookies from 'js-cookie'

var type = navigator.appName;
var locale;
if (type == "Netscape"){
  locale = navigator.language;//获取浏览器配置语言，支持非IE浏览器
}else{
  locale = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
};
const app = {
  state: {
    language: Cookies.get('language') || locale
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
