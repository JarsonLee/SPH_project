import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';
Vue.use(VueRouter);

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
};
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
};

const router = new VueRouter({
    routes,
    scrollBehavior() {
        return { y: 0 };
    }
});

export default router;

router.beforeEach(async(to, from, next) => {
    const hasToken = store.state.userOptions.token;
    const hasNickName = store.state.userOptions.nickName;
    let toPath = to.path;
    if (hasToken) {
        if (toPath == "/login" || toPath == "/register") {
            next('/home');
        } else {
            if (hasNickName) {
                next();
            } else {
                try {
                    //此处一定要有await进行等待，等待结果是否成功，
                    // 如果没有await将捕获不到错误，发生Uncaught 错误
                    await store.dispatch('userOptions/getNickName');
                    next();
                } catch (error) {
                    //这里不用try catch，与上面的不同，
                    // 让错误自己出在控制台上，注意区别，
                    // 上面是为了程序能够进行
                    await store.dispatch('userOptions/logout');
                    next('/login');
                }
            }
        }
    } else {
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('Center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
});