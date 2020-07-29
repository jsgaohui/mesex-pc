import request from '@/utils/request'


export function fundlist(obj) {
  return request({
    url: '/app/fund/fundlist.api',
    method: 'post',
    data:obj
  })
}
export function funddetail(id) {
  return request({
    url: '/app/fund/funddetail.api',
    method: 'post',
    data:id
  })
}

export function buyFund(obj) {
  return request({
    url: '/app/fund/buyfund.api',
    method: 'post',
    data:obj
  })
}
export function fundassert() {
  return request({
    url: '/app/fundaccount/fundassert.api',
    method: 'post'
  })
}

export function userfundLoglist(obj) {
  return request({
    url: '/app/fundaccount/userfundLoglist.api',
    method: 'post',
    data:obj
  })
}
export function  fundAccountTrade(obj) {
  return request({
    url: '/app/fundaccount/fundAccountTrade.api',
    method: 'post',
    data:obj
  })
}
export function  fundOrderList(obj) {
  return request({
    url: '/app/fundaccount/fundlist.api',
    method: 'post',
    data:obj
  })
}

export function  queryAssertByDcCode(dcCode) {
  return request({
    url: '/app/fundaccount/'+dcCode+'/fundassertByDccode.api',
    method: 'post'
  })
}

