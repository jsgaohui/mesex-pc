import request from '@/utils/request'

/**
 * 首页初始化行情数据
 * @param username
 * @param password
 */
export function initQuotation() {
  //获取浏览器语言
  return request({
    url: '/app/initQuotation.api',
    method: 'post'
  })
}
