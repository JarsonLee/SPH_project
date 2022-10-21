import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import homeOptions from './home';
import searchOptions from './search';
import detailOptions from './detail';
import cartOptions from './cart';
import userOptions from './user';
import tradeOptions from './trade';
export default new Vuex.Store({
    modules: {
        homeOptions,
        searchOptions,
        detailOptions,
        cartOptions,
        userOptions,
        tradeOptions
    }
});