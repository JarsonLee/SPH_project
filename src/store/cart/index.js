import { cartReq, delateGoodsReq, handleCheckedReq } from '@/api';
import { getUserTempId } from '@/utils/userTempId';

export default {
    namespaced: true,
    actions: {
        async getCartData({ commit }) {
            const result = await cartReq();
            if (result.code === 200) {
                commit('get_cart_data', result.data);
            }
        },
        async deleteGoods({ commit }, skuId) {
            commit;
            const result = await delateGoodsReq(skuId);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('Fail to delete the goods.'));
            }
        },
        async handleChecked({ commit }, { skuId, isChecked }) {
            commit;
            const result = await handleCheckedReq(skuId, isChecked);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('Fail to handle.'));
            }
        },
        deleteAllChecked({ dispatch, getters }) {
            const promiseAll = [];
            getters.detailCartData.cartInfoList.forEach(item => {
                //此处不用指明具体的为位置，cartOptions/getCartData,相当于actions
                const _promise = item.isChecked === 1 ? dispatch('deleteGoods', item.skuId) : '';
                promiseAll.push(_promise);
            });
            return Promise.all(promiseAll);
        },
        updateAllChecked({ state, dispatch }, isChecked) {
            const promiseAll = [];
            state.detailCartData[0].cartInfoList.forEach(item => {
                const _promise = dispatch('handleChecked', { skuId: item.skuId, isChecked });
                promiseAll.push(_promise);
            })
            return Promise.all(promiseAll);
        }
    },
    mutations: {
        get_cart_data(state, value) {
            state.detailCartData = value;
        }
    },
    state: {
        userTempId: getUserTempId(),
        detailCartData: []
    },
    getters: {
        detailCartData(state) {
            return state.detailCartData[0] || {};
        }
    }
};