//一级路由（传统路由加载）
import RegisterRoute from '@/pages/register';

//二级路由
import GroupOrder from '@/pages/orderCenter/groupOrder';
export default [{
    path: '/home',
    //路由懒加载
    component: () =>
        import ('@/pages/home/HomeRoute'),
    meta: {
        isShowFooter: true
    }
}, {
    name: 'search',
    path: '/search/:keyword?',
    component: () =>
        import ('@/pages/search/SearchRoute'),
    meta: {
        isShowFooter: true
    }
    /* ,
            props($route) {
                return {
                    query: $route.query,
                    params: $route.params
                }
            } */
}, {
    name: 'detail',
    path: '/detail/:id',
    component: () =>
        import ('@/pages/detail'),
    meta: {
        isShowFooter: true
    }
}, {
    name: 'AddCart',
    path: '/addcart',
    component: () =>
        import ('@/pages/addCart'),
    meta: {
        isShowFooter: true
    }
}, {
    name: 'cart',
    path: '/cart',
    component: () =>
        import ('@/pages/cart'),
    meta: {
        isShowFooter: true
    }
}, {
    name: 'trade',
    path: '/trade',
    component: () =>
        import ('@/pages/trade'),
    meta: {
        isShowFooter: true
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
        if (from.path === '/cart') {
            next();
        } else {

            next(false);
        }
    },
}, {
    name: 'pay',
    path: '/pay',
    component: () =>
        import ('@/pages/pay'),
    meta: {
        isShowFooter: true
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
        if (from.path === '/trade') {
            next();
        } else {
            next(false);
        }
    },
}, {
    name: 'PaySuccess',
    path: '/paySuccess',
    component: () =>
        import ('@/pages/paySuccess'),
    meta: {
        isShowFooter: true
    }
}, {
    name: 'OrderCenter',
    path: '/orderCenter',
    component: () =>
        import ('@/pages/orderCenter'),
    meta: {
        isShowFooter: true
    },
    children: [{
            path: 'myOrder',
            component: () =>
                import ('@/pages/orderCenter/myOrder'),
        },
        {
            path: 'groupOrder',
            component: GroupOrder
        }
    ],
    redirect: '/orderCenter/myOrder'
}, {
    path: '/login',
    component: () =>
        import ('@/pages/login'),
}, {
    path: '/register',
    component: RegisterRoute
}, {
    path: '*',
    redirect: '/home'
}];