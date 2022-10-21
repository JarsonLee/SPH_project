import VeeValidate from 'vee-validate';
import Vue from 'vue';
//中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
//安装这个插件
Vue.use(VeeValidate);
//进行规则验证配置
VeeValidate.Validator.localize("zh_CN", {
    //修改人家内置规则:密码与确认密码相同
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: {
        phone: "手机号",
        code: "验证码",
        password: "密码",
        password1: "确认密码",
        agree: '协议'
    },
});
//自定义校验规则
VeeValidate.Validator.extend("agree", {
    validate: (value) => {
        return value;
    },
    //field 对应index.vue中的name="agree"，
    //再匹配 agree: '协议'
    getMessage: (field) => field + "必须同意",
});