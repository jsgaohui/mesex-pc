// import Cookies from 'js-cookie'

const TokenKey = 'Gindax-Token'
const UserInfoKey = 'Udax-UserInfo'

export function getToken() {
  var token=sessionStorage.getItem(TokenKey);
  if(token){
    return token;
  }
  return "";
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey,token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}

export function saveUserInfo(userInfo) {
  var jsonstr=JSON.stringify(userInfo);
  return sessionStorage.setItem(UserInfoKey,jsonstr)
}

export function getSessionUserInfo() {
  var jsonObj=sessionStorage.getItem(UserInfoKey);
  return JSON.parse(jsonObj)
}

export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfoKey)
}
