import Vue from 'vue'
import Vuex from 'vuex'
import Layout from './layout'
import Request from './request'
import Dependencies from './dependencies'
import States from './states'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    Request,
    Layout,
    Dependencies,
    States,
  }
});

export default store
