import { getUserCodedReq, registerReq, loginReq, getNickNameReq, logoutReq } from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token';
export default {
  namespaced: true,
  actions: {
    async getCode ({ commit }, phoneNum) {
      const result = await getUserCodedReq(phoneNum);
      if (result.code === 200) {
        commit('get_code', result.data);
        return 'ok';
      } else {
        return Promise.reject(new Error('Fail to get the code!'));
      }
    },
    async register ({ commit }, infoObj) {
      commit;
      const result = await registerReq(infoObj);
      if (result.code === 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async login ({ commit }, data) {
      const result = await loginReq(data);
      if (result.code === 200) {
        setToken(result.data.token);
        commit('save_token', result.data.token);
        return 'ok';
      } else {
        return Promise.reject(new Error('Fail to login!'));
      }

    },
    async getNickName ({ commit }) {

      const result = await getNickNameReq();
      if (result.code === 200) {
        commit('get_nick_name', result.data.nickName);
        return 'ok';
      } else {
        return Promise.reject(new Error('Fail to get the nickName!'));
      }
    },
    async logout ({ commit }) {
      let result = await logoutReq();
      if (result.code === 200) {
        commit('clear_login_info');
        return 'ok';
      } else {
        return Promise.reject(new Error('Fail to logout!'));
      }
    }

  },
  mutations: {
    get_code (state, code) {
      state.code = code;
    },
    save_token (state, token) {
      state.token = token;
    },
    get_nick_name (state, nickName) {
      state.nickName = nickName;
    },
    clear_login_info (state) {
      state.token = null;
      state.nickName = '';
      removeToken('token');
    }
  },
  state: {
    code: '',
    token: getToken(),
    nickName: ''
  },
  getters: {

  }
};