import { loginByUsername, logout} from '@/api/login'
import {register, sendSms} from '@/api/register'
import {chkAccount} from '@/api/user'
import {getToken, getSessionUserInfo, removeToken, removeUserInfo, saveUserInfo, setToken} from '@/utils/auth'

const user = {
  state: {
    userInfo: getSessionUserInfo(),
    status: '',
    code: '',
    token: getToken(),
    setting: {
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_USER: (state, user) => {
      state.userInfo = user
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      // const username = userInfo.username.trim();
      // const password = userInfo.password.trim();
      // const veriCode = userInfo.veriCode.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          if(response.data){
            const data = response.data
            commit('SET_TOKEN', data.token)
            commit('SET_USER', data.userInfo)
            setToken(data.token)
            saveUserInfo(data.userInfo);
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          removeUserInfo();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUserInfo();
        resolve()
      })
    },

    // 发送短信验证码
    sendSms({ commit }, senddata) {
      return new Promise((resolve, reject) => {
        sendSms(senddata).then(response => {
          const data = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注册
    register({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo).then(response => {
          const data = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //检查账号信息
    chkAccount({ commit }, account) {
      return new Promise((resolve, reject) => {
        chkAccount(account).then(response => {
          const data = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
