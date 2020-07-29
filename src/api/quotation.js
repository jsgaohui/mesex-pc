import request from '@/utils/request'


export function hisQuotation(obj) {
  return request({
    url: '/app/quotation/hisQuotation.api', // 假地址 自行替换
    method: 'post',
    data:obj
  })
}

export function getServerTime() {
  return request({
    url: '/app/quotation/getServerTime.api', // 假地址 自行替换
    method: 'post'
  })
}
