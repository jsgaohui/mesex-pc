import request from '@/utils/request'


/**
 * 查询账户的货币资金信息
 * @param username
 */
export function symbolCapital() {
  return request({
    url: '/app/account/symbolCapital.api',
    method: 'post'
  })
}
/**
 * 绑定货币充值地址
 * @param username
 */
export function bindAddress(symbol,protocolType) {
  return request({
    url: '/app/account/bindAddress.api',
    method: 'post',
    params:{symbol,protocolType}
  })
}

/**
 * 验证充值地址
 * @param username
 */
export function checkAddress(symbol,userAddress,protocolType) {
  return request({
    url: '/app/account/checkAddress.api',
    method: 'post',
    params:{symbol,userAddress,protocolType}
  })
}

/**
 *提现请求
 * @param username
 */
export function withdrawReq(symbol,protocolType) {
  return request({
    url: '/app/account/withdrawReq.api',
    method: 'post',
    params:{symbol,protocolType}
  })
}

/**
 *提交提现表单
 * @param username
 */
  export function withdrawals(obj) {
  return request({
    url: '/app/account/withdrawals.api',
    method: 'post',
    data:obj
  })
}

/**
 *查询充值记录
 * @param username
 */
export function queryRecords(obj) {
  return request({
    url: '/app/account/queryRecords.api',
    method: 'post',
    data:obj
  })
}

/**
 *查询提现记录
 * @param username
 */
export function withdrawRecords(obj) {
  return request({
    url: '/app/account/withdrawRecords.api',
    method: 'post',
    data:obj
  })
}

/**
 *委托、成交明细信息查询
 * @param username
 */
export function tradeRecords() {
  return request({
    url: '/app/account/tradeRecords.api',
    method: 'post'
  })
}

/**
 *当前委托、委托历史信息查询
 * @param username
 */
export function orderRecords() {
  return request({
    url: '/app/account/orderRecords.api',
    method: 'post'
  })
}

/**
 * 成交历史分页查询
 */
export function tradePageRecords(listQuery) {
  return request({
    url: '/app/account/tradePageRecords.api',
    method: 'post',
    data:listQuery
  })
}

/**
 * 查看账户所有币种资金信息
 */
export function calBalance() {
  return request({
    url: '/app/account/calBalance.api',
    method: 'post'
  })
}

/**
 * 查看代币资金信息
 */
export function symbolBalance(basicSymbol,tradeSymbol) {
  return request({
    url: '/app/account/symbolBalance.api',
    method: 'post',
    params:{basicSymbol,tradeSymbol}
  })
}

/**
 * 获得地址列表
 */
export function getAddressList(obj) {
  return request({
    url: '/app/withdraw/getAddressByUserId.api',
    method: 'post',
    data: obj
  })
}

/**
 * 新增地址
 */
export function addAddressRequest(obj) {
  return request({
    url: '/app/withdraw/addAddress.api',
    method: 'post',
    data: obj
  })
}
/**
 *删除地址
 */
export function delAddressRequest(id) {
  return request({
    url: '/app/withdraw/deleteAddress.api?id=' + id,
    method: 'post'
  })
}
/**
 * 通过代币代码获得地址列表
 */
export function getAddressByDcCode(dcCode,protocolType) {
  return request({
    url: '/app/withdraw/getAddressByDcCode.api?dcCode=' + dcCode+'&protocolType='+protocolType,
    method: 'post'
  })
}