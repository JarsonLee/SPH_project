import { searchReq } from '@/api';

export default {
    namespaced: true,
    actions: {
        //post请求data必须至少是一个空对象：value = {}
        async searchList({ commit }, value = {}) {
            const result = await searchReq(value);
            if (result.code === 200) {
                commit('search_list', result.data);
            }
        }
    },
    mutations: {
        search_list(state, value) {
            state.searchListData = value;
        }
    },
    state: {
        searchListData: {},
    },
    getters: {
        attrsList(state) {
            return state.searchListData.attrsList || [];
        },
        goodsList(state) {
            return state.searchListData.goodsList || [];
        },
        trademarkList(state) {
            return state.searchListData.trademarkList || [];
        }

    }
};