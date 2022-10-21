import axiosInstance from './axiosInstance';
import mockInstance from './mockInstance';
export const categoryReq = () => axiosInstance({
    method: 'get',
    url: '/product/getBaseCategoryList'
});
export const bannerReq = () => mockInstance({
    method: 'get',
    url: '/banners'
});
export const floorReq = () => mockInstance({
    method: 'get',
    url: '/floors'
});
//post请求data必须至少是一个空对象
export const searchReq = data => axiosInstance({
    method: 'post',
    url: '/list',
    data
});
export const detailReq = skuId => axiosInstance({
    method: 'get',
    url: `/item/${skuId}`
});
export const addOrUpdateProductReq = (id, productNum) => axiosInstance({
    method: 'post',
    url: `/cart/addToCart/${id}/${productNum}`
});
export const cartReq = () => axiosInstance({
    method: 'get',
    url: '/cart/cartList'
});
export const delateGoodsReq = (skuId) => axiosInstance({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`
});
export const handleCheckedReq = (skuId, isChecked) => axiosInstance({
    method: 'get',
    url: `/cart/checkCart/${skuId}/${isChecked}`
});
export const getUserCodedReq = (phone) => axiosInstance({
    method: 'get',
    url: `/user/passport/sendCode/${phone}`
});
export const registerReq = data => axiosInstance({
    method: 'post',
    url: '/user/passport/register',
    data
});
export const loginReq = data => axiosInstance({
    method: 'post',
    url: '/user/passport/login',
    data
});
export const getNickNameReq = () => axiosInstance({
    method: 'get',
    url: '/user/passport/auth/getUserInfo',
});
export const logoutReq = () => axiosInstance({
    method: 'get',
    url: '/user/passport/logout',
});
export const getOrderInfoReq = () => axiosInstance({
    method: 'get',
    url: '/user/userAddress/auth/findUserAddressList'
});
export const getGoodsListReq = () => axiosInstance({
    method: 'get',
    url: '/order/auth/trade'
});
export const submitOrderInfoReq = (tradeNo, data) => axiosInstance({
    method: 'post',
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data
});
export const getPayInfoReq = orderId => axiosInstance({
    method: 'get',
    url: `/payment/weixin/createNative/${orderId}`,
});

export const orderPayStatusReq = orderId => axiosInstance({
    method: 'get',
    url: `/payment/weixin/queryPayStatus/${orderId}`,
});
export const getMyOrderListReq = (page, limit) => axiosInstance({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
});