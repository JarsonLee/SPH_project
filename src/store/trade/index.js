import { getOrderInfoReq, getGoodsListReq } from "@/api";
export default {
  namespaced: true,
  actions: {
    async getOrderInfo ({ commit }) {
      const result = await getOrderInfoReq();
      if (result.code == 200) {
        commit('get_order_info', result.data);
        return 'ok'
      } else {
        return Promise.reject(new Error('Fail to get the order info!'));
      }
    },
    async getGoodsList ({ commit }) {
      const result = await getGoodsListReq();
      if (result.code == 200) {
        commit('get_goods_list', result.data);
        return 'ok';
      } else {
        return Promise.reject(new Error('Fail to get the goods list!'));
      }
    }

  },
  mutations: {
    get_order_info (state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    get_goods_list (state, goodList) {
      state.goodList = goodList;
    }
  },
  state: {
    orderInfo: [],
    goodList: {}
  },
  getters: {

  }
};