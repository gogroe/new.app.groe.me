var cookie = require('js-cookie')
import axios from 'axios'

const request = {
  state: {
    response: {},
    reload: {
      action: null,
      section: null
    },
    auth: {
      uid: null,
      token: null,
    },
    perm: {
      perm: null,
      type: null,
      role: null
    },
    errors: [],
    isLoaded: false, //if all loads true then true
    loads:{}, //component_token: false
    sidebar: []
  },

  mutations: {
    update_sidebar (state, object) {
      state.sidebar = object
    },
    update_response (state, object) {
      state.response = object
    },
    update_reload (state, object) {
      state.reload = object
    },
    update_auth (state, object) {
      state.auth.uid = object.uid
      state.auth.token = object.token
    },
    update_errors (state, object) {
      state.errors.push(object)
    },
    update_perm (state, object) {
      state.perm = object
    },
    update_perm_perm (state, object) {
      state.perm.perm = object
    },
    update_isLoaded (state, object) {
      state.isLoaded = object
    },
    update_loads (state, object) {
      state.loads = object
    }
  },

  getters: {
    get_sidebar(state){
      return state.sidebar
    },
    get_response(state){
      return state.response
    },
    reload(state){
      return state.reload
    },
    auth(state){
      return state.auth
    },
    errors(state){
      return state.errors
    },
    uid(state){
      return state.auth.uid
    },
    perm(state){
      return state.perm
    },
    isLoaded(state){
      return state.isLoaded
    },
    loads(state){
      return state.loads
    },
  },

  actions: {
    async file_request ({commit, dispatch, state}, object) {
      let headers = {}
      headers.headers = { 'Content-Type': 'multipart/form-data'}

      let formData = new FormData()
      for(let param_key in object){
        formData.append(param_key, object[param_key])
      }

      if (state.auth.uid && state.auth.token)
      {
        formData.append('uid', state.auth.uid)
        formData.append('token', state.auth.token)
      }
      else
      {
        let cookieData = cookie.getJSON('auth')
        formData.append('uid', cookieData.uid)
        formData.append('token', cookieData.token)
      }

      let uri = object.uri
      await axios.post( uri, formData, headers )
        .then(( response ) => {

          if('uid' in response.data && 'token' in response.data){
            const auth = {
              uid: response.data.uid,
              token: response.data.token,
            }
            cookie.set('auth', auth, {expires: 1})
            commit('update_auth', auth)
          }

          if('permission' in response.data){
            commit('update_perm', response.data.permission)
          }

          commit('update_response', response.data)
        }
      )
    },

    async data_request ({commit, dispatch, state}, object) {
      let request = {}
      request.headers = { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }

      if (state.auth.uid && state.auth.token)
      {
        request.uid = state.auth.uid
        request.token = state.auth.token
      }

      else if(cookie.getJSON('auth'))
      {
        let cookieData = cookie.getJSON('auth')
        request.uid = cookieData.uid
        request.token = cookieData.token
      }

      else
      {
        request.uid = null
        request.token = null
      }

      Object.assign(request, object);

      let uri = object.uri

      await axios.post( uri, request)
        .then((response) => {

          if('uid' in response.data && 'token' in response.data){
            const auth = {
              uid: response.data.uid,
              token: response.data.token,
            }
            cookie.set('auth', auth, {expires: 1})
            commit('update_auth', auth)
          }

          if('permission' in response.data){
            commit('update_perm', response.data.permission)
          }

          commit('update_response', response.data)
        }
      )
    }
  }
}

export default request
