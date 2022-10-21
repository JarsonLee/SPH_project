import { detailReq, addOrUpdateProductReq } from '@/api';

export default {
    namespaced: true,
    actions: {
        async detailList({ commit }, skuId) {
            const result = await detailReq(skuId);
            if (result.code === 200) {
                commit('detail_list', result.data);
            }
        },
        async addOrUpdateProduct({ commit }, { id, productNum }) {
            commit;
            const result = await addOrUpdateProductReq(id, productNum);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('Fail to add to cart!'));
            }
        }
    },
    mutations: {
        detail_list(state, value) {
            state.detailListData = value;
        }
    },
    state: {
        detailListData: {}
    },
    getters: {
        categoryView(state) {
            return state.detailListData.categoryView || {};
        },
        skuInfo(state) {
            return state.detailListData.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.detailListData.spuSaleAttrList || [];
        }
    }
};