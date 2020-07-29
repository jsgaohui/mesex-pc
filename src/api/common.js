import request from '@/utils/request'


/**
 * 公告
 * @param username
 */
export function notice () {
  return request({
    url: '/app/trade/notice.api',
    method: 'post'
  })
}
/**
 * 币种介绍
 * @param username
 */
export function symbolIntro (param) {
  return request({
    url: '/app/trade/symbolIntro' + param,
    method: 'post'
  })
}
/**
 * 支付密码免密剩余时间
 * @param username
 */
export function pwdTtl () {
  return request({
    url: '/app/common/pwdTtl.api',
    method: 'post'
  })
}
/**
 * 支付密码免密剩余时间
 * @param username
 */
export function queryAssertByDcCode (dcCode) {
  return request({
    url: '/app/common/' + dcCode + '/assertByDccode.api',
    method: 'post'
  })
}
