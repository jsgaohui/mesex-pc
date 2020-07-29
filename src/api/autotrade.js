import request from '@/utils/request'

/**
 * 跟单列表
 * @param obj
 */
export function atList (obj) {
  return request({
    url: '/app/autotrade/proList.api',
    method: 'POST',
    data: obj
  })
}
/**
 * 确认跟随
 * @param obj
 */
export function follow (obj) {
  return request({
    url: '/app/autotrade/follow.api',
    method: 'POST',
    data: obj
  })
}
