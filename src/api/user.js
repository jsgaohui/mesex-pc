import request from '@/utils/request'


/**
 * 忘记密码
 * @param username
 */
export function chkAccount(account) {
  return request({
    url: '/app/chkAccount.api',
    method: 'post',
    data: account
  })
}

/**
 * 修改密码
 * @param oldPassword
 * @param password
 * @param comfirmPassword
 */
export function editpwd(obj) {
  return request({
    url: '/app/editpwd.api',
    method: 'post',
    data:obj
  })
}

/**
 * 修改绑定手机
 * @param oldPassword
 * @param password
 * @param comfirmPassword
 */
export function bindPhone(obj) {
  return request({
    url: '/app/bindPhone.api',
    method: 'post',
    data:obj
  })
}

/**
 * 修改绑定邮箱
 * @param email
 * @param validcode
 */
export function bindEmail(obj) {
  return request({
    url: '/app/bindEmail.api',
    method: 'post',
    data:obj
  })
}

/**
 * 获取用户登陆日志
 */
export function getUserLoginLogs(listQuery) {
  return request({
    url: '/app/user/loginlogs.api',
    method: 'post',
    data:listQuery
  })
}

/**
 * 获取用户所有邀请的子会员
 */
export function getOwnMember(listQuery) {
  return request({
    url: '/app/manage/getOwnMember.api',
    method: 'post',
    data:listQuery
  })
}
/**
 * 获取自己的所有返佣记录
 */
export function getOwnCommission(listQuery) {
  return request({
    url: '/app/manage/getCommissionLog.api',
    method: 'post',
    data:listQuery
  })
}
/**
 * 上传用户认证信息
 */
export function authUserInfo(obj) {
  return request({
    url: '/app/user/authuser.api',
    method: 'post',
    data:obj
  })
}

/**
 * 用户认证状态
 */
export function authStatus() {
  return request({
    url: '/app/user/authStatus.api',
    method: 'post'
  })
}
/**
 * 验证短信验证码
 */
export function checkSmsCode(username,mobileCode,emailCode) {
  const data={username,mobileCode,emailCode};
  return request({
    url: '/app/checkSmsCode.api',
    method: 'post',
    data
  })
}

/**
 * 重置密码
 */
export function changePwd(username,password) {
  const data={username,password};
  return request({
    url: '/app/changePwd.api',
    method: 'post',
    data
  })
}

/**
 * 重置密码
 */
export function getcountrys() {
  return request({
    url: '/app/user/getcountrys.api',
    method: 'post'
  })
}

/**
 * 设置开启、关闭手机Or邮箱的验证
 */
export function setValid(obj) {
  return request({
    url: '/app/account/setValid.api',
    method: 'post',
    data:obj
  })
}

/**
 * 查询是否已开启手机验证、邮箱验证
 */
export function queryNeedValid() {
  return request({
    url: '/app/account/queryNeedValid.api',
    method: 'post'
  })
}

/**
 * 修改交易密码
 * @param password
 * @param comfirmPassword
 */
export function editTradePwdRequest(obj) {
  return request({
    url: '/app/editTradePwd.api',
    method: 'post',
    data:obj
  })
}
/**
 * 查询用户等级
 * @param getUserLevel
 */
export function getUserLevel () {
  return request({
    url: '/app/user/getUserLevel.api',
    method: 'post'
  })
}
/**
 * 改变用户等级
 * @param password
 * @param changeUserLevel
 */
export function changeUserLevel (obj) {
  return request({
    url: '/app/user/changeUserLevel.api',
    method: 'post',
    data: obj
  })
}
/**
 * 查询收款方式
 */
export function getPayMethodList() {
  return request({
    url: '/app/otc/myPayType.api',
    method: 'post'
  })
}
/**
 * 更新收款方式
 */
export function updatePaymentMethod(id,paymentTypeId,status) {
  return request({
    url: '/app/otc/updatePaymentMethod.api',
    method: 'post',
    data:{"id":id,"paymentTypeId":paymentTypeId,"status":status}
  })
}
/**
 * 添加收款方式
 */
export function addOrModifyPayMethod(obj) {
  return request({
    url: '/app/otc/addPaymentMethod.api',
    method: 'post',
    data: obj
  })
}
