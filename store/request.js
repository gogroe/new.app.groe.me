var cookie = require('js-cookie')
import axios from 'axios'
import router from '../src/router'

const request = {
  state: {
    response: null,
    auth: {
      uid: null,
      token: null
    }
  },

  mutations: {
    update_response (state, data) {
      state.response = data
    },
    update_auth (state, data) {
      state.auth.uid = data.uid
      state.auth.token = data.token
    }
  },

  getters: {
    response(state){
      return state.response
    },
  },

  actions: {

  }
}

export default request
