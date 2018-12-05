import Vue from 'vue'
import Vuex from 'vuex'
import Layout from './layout'
import Request from './request'
import Dependencies from './dependencies'
import Test from './test'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    Request,
    Layout,
    Dependencies,
    Test,
  }
});

export default store
