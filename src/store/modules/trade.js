
const trade = {
  state: {
    tradeInfo: {
      quetaObj:{},
      digitalSymbol:{}
    }


  },

  mutations: {
    SET_TRADEINFO: (state, tradeInfo) => {
      state.tradeInfo = tradeInfo;
    }
  },

  actions: {
    //保存交易信息
    saveTradeInfo({ commit }, tradeInfo) {
      return new Promise((resolve, reject) => {
        commit('SET_TRADEINFO', tradeInfo);
      })
    },
  }
}

export default trade
