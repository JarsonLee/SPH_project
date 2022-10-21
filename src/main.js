import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import TypeNav from '@/components/TypeNav/TypeNav';
import PaginationComponent from '@/components/Pagination';
import { categoryReq } from '@/api';
import store from '@/store';
import '@/mock/mockServe';
import 'swiper/css/swiper.min.css';
import * as http from '@/api';
import { MessageBox, Message } from 'element-ui';
//图片的懒加载
import VueLazyload from 'vue-lazyload';
//图片和json文件默认暴露，只要引入即可
import loadimage from '@/assets/loading.gif';
import errorimage from '@/assets/error.gif';
//表单验证
import '@/plugins/veeValidate';
Vue.config.productionTip = false;

Vue.use(VueLazyload, {
    error: errorimage,
    loading: loadimage,
});
Vue.component(TypeNav.name, TypeNav);
Vue.component(PaginationComponent.name, PaginationComponent);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
categoryReq();

new Vue({
    render: (h) => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$http = http;
    },
}).$mount('#app');