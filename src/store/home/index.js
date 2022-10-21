import { categoryReq, bannerReq, floorReq } from '@/api';
export default {
    namespaced: true,
    actions: {
        async categoryList({ commit }) {
            const result = await categoryReq();
            if (result.code === 200) {
                commit('category_list', result.data);
            }
        },
        async bannerList({ commit }) {
            const result = await bannerReq();
            if (result.code === 200) {
                commit('banner_list', result.data);
            }
        },
        async floorList({ commit }) {
            const result = await floorReq();
            if (result.code === 200) {
                commit('floor_list', result.data);
            }
        }

    },
    mutations: {
        category_list(state, value) {
            state.categoryListData = value;
        },
        banner_list(state, value) {
            state.bannerListData = value;
        },
        floor_list(state, value) {
            state.floorListData = value;
        }
    },
    state: {
        categoryListData: [],
        bannerListData: [],
        floorListData: []
    },
    getters: {

    }
};