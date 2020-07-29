import request from '@/utils/request'

/**
 * 首页初始化行情数据
 * @param username
 * @param password
 */
export function fees() {
  return request({
    url: '/app/other/fees.api',
    method: 'post'
  })
}
