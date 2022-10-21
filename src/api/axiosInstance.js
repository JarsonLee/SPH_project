import axios from 'axios';

//引入进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
//对axios进行二次封装
const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000
});

axiosInstance.interceptors.request.use((config) => {
    //此处生成临时id，网页生成的时候，userTempId在仓库中就已经生成了，在localStorage中，
    //所以可以放在detail或者home，search等中进行判断，这里放在了cartOptions模块中
    //之后每一次axios请求都会带上这个请求头
    if (store.state.cartOptions.userTempId) {
        config.headers.userTempId = store.state.cartOptions.userTempId;
    }
    if (store.state.userOptions.token) {
        config.headers.token = store.state.userOptions.token;
    }
    nprogress.start();
    return config;
}, function (err) {
    return Promise.reject(err);
});
axiosInstance.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, function (err) {
    return Promise.reject(err);
});




export default axiosInstance;