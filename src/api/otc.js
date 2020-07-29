import request from '@/utils/request'

/**
 * 商家发布挂牌订单
 * @param obj
 */
export function publishOrder(obj) {
  return request({
    url: '/app/otc/publishOrder.api',
    method: 'post',
    data:obj
  })
}

/**
 * 买家买入生成委托单
 * @param obj
 */
export function buyOrder (obj) {
  return request({
    url: '/app/otc/buyOrder.api',
    method: 'post',
    data: obj
  })
}

/**
 * 确认付款
 */
export function confirmPayment (takerId, paymentTypeId,paymentTypeName ) {
  return request({
    url: '/app/otc/confirmPayment.api',
    method: 'post',
    data: {'takerId':takerId,'paymentTypeId':paymentTypeId,'paymentTypeName':paymentTypeName}
  })
}

/**
 * 确认收款
 */
export function confirmRemittance (takerId) {
  return request({
    url: '/app/otc/confirmRemittance.api',
    method: 'post',
    params: {takerId: takerId}
  })
}

/**
 * 法币交易行情数据
 */
export function marketTrade() {
  return request({
    url: '/app/otc/marketTrade.api',
    method: 'post',
  })
}

/**
 * 所有交易法币列表
 * @param obj
 */
export function getFbCoinList() {
  return request({
    url: '/app/otc/getFbCoinList.api',
    method: 'post'
  })
}

/**
 * 所有交易法币列表
 * @param obj
 */
export function getFbBusinessCoinList() {
  return request({
    url: '/app/otc/getFbBusinessCoinList.api',
    method: 'post'
  })
}

/**
 * 我的挂牌单查询
 * @param obj
 */
export function myMakerList(obj) {
  return request({
    url: '/app/otc/myMakerList.api',
    method: 'post',
    data:obj
  })
}

/**
 * 我的法币委托单
 * @param obj
 */
export function myTakeList(obj) {
  return request({
    url: '/app/otc/myTakeList.api',
    method: 'post',
    data:obj
  })
}

/**
 * 我的法币配对单
 * @param obj
 */
export function myMatchList(obj) {
  return request({
    url: '/app/otc/myMatchList.api',
    method: 'post',
    data:obj
  })
}

/**
 * 市场上的挂牌单（包含购买和出售）
 * @param obj
 */
export function makerList(obj) {
  return request({
    url: '/app/otc/makerList.api',
    method: 'post',
    data:obj
  })
}

/**
 * 交易筛选条件的数据（国家、法币、支付方式）
 */
export function getFilterData() {
  return request({
    url: '/app/otc/getFilterData.api',
    method: 'post'
  })
}

/**
 * 我的所有支付方式
 */
export function myPayType() {
  return request({
    url: '/app/otc/myPayType.api',
    method: 'post'
  })
}

/**
 * 获取我的资产
 */
export function getMyAsset() {
  return request({
    url: '/app/otc/getMyAsset.api',
    method: 'post'
  })
}

/**
 * 获取我的资产流水
 */
export function getMyAssetLog(obj) {
  return request({
    url: '/app/otc/getMyAssetLog.api',
    method: 'post',
    data:obj
  })
}

/**
 * 法币账币币账户互转
 */
export function assetTransfer(obj) {
  return request({
    url: '/app/otc/assetTransfer.api',
    method: 'post',
    data:obj
  })
}

/**
 *法币资产筛选
 */
export function getAssetFilterData() {
  return request({
    url: '/app/otc/getAssetFilterData.api',
    method: 'post'
  })
}

/**
 *获取法币用户信息
 */
export function getFbUserInfo() {
  return request({
    url: '/app/otc/getFbUserInfo.api',
    method: 'post'
  })
}

/**
 * 注册成为法币用户
 */
// export function registerFbUser(nickName, password) {
//   return request({
//     url: '/app/otc/registerFbUser.api',
//     method: 'post',
//     params: {nickName: nickName, password: password}
//   })
// }

/**
 * 下架挂牌单
 */
export function cancelMakerOrder(makerOrderId) {
  return request({
    url: '/app/otc/cancelMakerOrder.api',
    method: 'post',
    params: {makerOrderId: makerOrderId}
  })
}

/**
 * 下架挂牌单
 */
export function cancelTakerOrder(takerId) {
  return request({
    url: '/app/otc/cancelTakerOrder.api',
    method: 'post',
    params: {takerId: takerId}
  })
}
/**
 * 提交申诉
 */
export function goToAppealRequest(obj) {
  return request({
    url: '/app/otc/doAppeal.api',
    method: 'post',
    data: obj
  })
}
/**
 * 查询申诉详情
 */
export function getAppealDetailRequest(takerId) {
  return request({
    url: '/app/otc/getAppealDetail.api',
    method: 'post',
    params: {takerId: takerId}
  })
}
/**
 * 申诉撤销成功
 */
export function cancelAppealRequest(takerId) {
  return request({
    url: '/app/otc/cancelAppeal.api',
    method: 'post',
    params: {takerId: takerId}
  })
}
/**
 * 我的申诉订单
 * @param obj
 */
export function myAppealOrderList(obj) {
  return request({
    url: '/app/otc/myAppealOrderList.api',
    method: 'post',
    data:obj
  })
}



