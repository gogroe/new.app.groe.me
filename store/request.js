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
    }
  },

  mutations: {
    update_response (state, object) {
      state.response = object
    },
    update_reload (state, object) {
      state.reload = object
    },
    update_auth (state, object) {
      state.auth.uid = object.uid
      state.auth.token = object.token
    }
  },

  getters: {
    get_response(state){
      return state.response
    },
    reload(state){
      return state.reload
    },
    uid(state){
      return state.auth.uid
    }
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

      // let uri = process.env.NODE_ENV === 'development'
      //   ? object.uri
      //   : object.uri.replace( 'http://new.backend', 'https://newbackend.groe.me' )

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

          commit('update_response', response.data)
        }
      )
    },

    async data_request ({commit, dispatch, state}, object) {
      let request = {}
      request.headers = { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }

      if (state.auth.userid && state.auth.token)
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
      // let uri = process.env.NODE_ENV === 'development'
      //   ? object.uri
      //   : object.uri.replace( 'http://new.backend', 'https://newbackend.groe.me' )

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

          commit('update_response', response.data)
        }
      )
    }
  }
}

export default request
