import axios from 'axios';

//引入进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
//对axios进行二次封装
const mockInstance = axios.create({
    baseURL: '/mock',
    timeout: 5000
});

mockInstance.interceptors.request.use((config) => {
    nprogress.start();
    return config;
}, function(err) {
    return Promise.reject(err);
});
mockInstance.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, function(err) {
    return Promise.reject(err);
});




export default mockInstance;