const getters = {
  language: state => state.app.language,
  token: state => state.user.token,
  user:state=>state.user.userInfo,
  status: state => state.user.status,
  tradeInfo:state => state.trade.tradeInfo,
  errorLogs: state => state.errorLog.logs
}
export default getters
