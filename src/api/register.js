import request from '@/utils/request'

export function sendSms(senddata) {
  return request({
    url: '/app/sendsms.api',
    method: 'post',
    data:senddata
  })
}

export function register(obj) {
  return request({
    url: '/app/regin.api',
    method: 'post',
    data:obj
  })
}
