import request from '@/utils/request'


/**
 * 查询账户的货币资金信息
 * @param username
 */
export function helps() {
  return request({
    url: '/app/help/helps.api',
    method: 'post'
  })
}

/**
 * 查询公告列表
 * @param username
 */
export function noticeList(obj) {
  return request({
    url: '/app/help/notice.api',
    method: 'post',
    data:obj
  })
}

/**
 * 查询公告明细
 * @param username
 */
export function noticeDetail(detailId) {
  return request({
    url: '/app/help/noticeDetail.api',
    method: 'post',
    params:{detailId}
  })
}

/**
 * 查询数据货币列表
 * @param username
 */
export function symbolList() {
  return request({
    url: '/app/help/symbolList.api',
    method: 'post'
  })
}

/**
 * 查询数据货币列表
 * @param username
 */
export function symbolDetail(symbol) {
  return request({
    url: '/app/help/symbolDetail.api',
    method: 'post',
    params:{symbol}
  })
}

