import Vue from 'vue'
import Vuex from 'vuex'
import Request from './request'
import Layout from './layout'
import Test from './test'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    Request,
    Layout,
    Test,
  }
});

export default store
