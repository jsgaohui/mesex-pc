import axios from 'axios';
import i18n from '../lang'
import {
  Message
} from 'element-ui';
import store from '../store';
import {getToken} from '@/utils/auth';
import Cookies from "js-cookie";

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['UUID'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  config.headers['locale']=Cookies.get('language')||i18n.locale;
  // config.headers['X-Requested-With']= 'XMLHttpRequest';
  config.headers[ 'Content-Type']='application/json; charset=UTF-8';
  config.headers['Access-Control-Allow-Origin']= '*';
  return config;
}, error => {
  // Do something with request error
  Message({
    message:i18n.t('common.syserror') ,
    type: 'error',
    duration: 3 * 1000
  });
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if (res.code === 401||res.code === "401") {
      Message({
        message:i18n.t('common.islogout') ,
        type: 'warning',
        duration: 3 * 1000,
        onClose: function () {
          store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        }
      });
      return Promise.reject('error');
    }else if (res.code === 40301) {
      Message({
        message: i18n.t('common.noAuth'),
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject('error');
    }else if (res.code !== 200) {
      if(res.code){
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        });
      }
    }
    return res;
  },
  error => {
    // console.log('err' + error); // for debug
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
