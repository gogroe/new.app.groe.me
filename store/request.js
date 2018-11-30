var cookie = require('js-cookie')
import axios from 'axios'

const request = {
  state: {
    response: {},
    auth: {
      uid: null,
      token: null,
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
    get_response(state){
      return state.response
    }
  },

  actions: {
    async file_request ({commit, dispatch, state}, data) {
      let headers = {}
      headers.headers = { 'Content-Type': 'multipart/form-data'}

      let formData = new FormData()
      formData.append('file', data.files)
      formData.append('type', data.type)

      if (state.auth.uid && state.auth.token)
      {
        formData.append('uid', state.auth.userid)
        formData.append('token', state.auth.token)
      }
      else
      {
        let cookieData = cookie.getJSON('auth')
        formData.append('uid', cookieData.uid)
        formData.append('token', cookieData.token)
      }

      // let uri = process.env.NODE_ENV === 'development'
      //   ? data.uri
      //   : data.uri.replace( 'http://new.backend', 'https://newbackend.groe.me' )

      let uri = data.uri
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

    async data_request ({commit, dispatch, state}, data) {
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

      Object.assign(request, data);

      let uri = data.uri
      // let uri = process.env.NODE_ENV === 'development'
      //   ? data.uri
      //   : data.uri.replace( 'http://new.backend', 'https://newbackend.groe.me' )

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
