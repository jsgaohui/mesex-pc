import request from '@/utils/request'

/**
 * 登陆
 * @param username
 * @param password
 */
export function loginByUsername(obj) {
  return request({
    url: '/app/login.api',
    method: 'post',
    data:obj
  })
}

/**
 * 退出
 */
export function logout(token) {
  return request({
    url: '/app/logout.api',
    method: 'post',
    params: { token }
  })
}

/**
 * 切换语言
 * @param lang
 */
export function changeLanguage(locale) {
  return request({
    url: '/app/changeLanguage.api',
    method: 'post',
    params: { locale }
  })
}
