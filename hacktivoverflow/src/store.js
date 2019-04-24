/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    userId: '',
    userEmail: '',
    userName: '',
  },
  // dari dispatch
  actions: {
    login({ commit }, payload) {
      commit('login', payload);
    },
  },
  // dari commit
  mutations: {
    login(state, payload) {
      if (payload) {
        const {
          id, name, email,
        } = payload;
        state.userEmail = email;
        state.userId = id;
        state.userName = name;
        state.userToken = payload.access_token;
        state.isLoggedIn = true;
      }
    },
    logout(state, payload) {
      state.userId = '';
      state.userEmail = '';
      state.userName = '';
      state.isLoggedin = false;
    },
  },
});
