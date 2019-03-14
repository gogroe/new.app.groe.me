import { mapGetters } from 'vuex'
import axios from "axios";
import store from '../../store'
var cookie = require('js-cookie')


const computed = {
  ...mapGetters([
      'auth'
    ])
  }

export default {
  post:{
    file: async function ( uri, object ) {
      let auth = computed.auth

      let return_response = null
      let headers = {
        headers: { 'Content-Type': 'multipart/form-data'}
      }

      let formData = new FormData()
      for(let param_key in object){
        formData.append(param_key, object[param_key])
      }

      if (auth.uid && auth.token)
      {
        formData.append('uid', auth.uid)
        formData.append('token', auth.token)
      }
      else
      {
        let cookieData = cookie.getJSON('auth')
        formData.append('uid', cookieData.uid)
        formData.append('token', cookieData.token)
      }

      await axios.post( uri, formData, headers )
        .then(( response ) => {

            if('uid' in response.data && 'token' in response.data){
              const auth = {
                uid: response.data.uid,
                token: response.data.token,
              }
              cookie.set('auth', auth, {expires: 1})
              store.commit('update_auth', auth)
            }

            if('permission' in response.data){
              store.commit('update_perm', response.data.permission)
            }

            handle_errors(response)

            if('response' in response.data){
              return_response = response.data.response
            }
          }
        )

      return return_response
    },

    data: async function ( uri, object ) {
      let auth = computed.auth

      let return_response = null
      let request = {
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
      }

      if (auth.uid && auth.token)
      {
        request.uid = auth.uid
        request.token = auth.token
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

      await axios.post( uri, request)
        .then((response) => {

            if('uid' in response.data && 'token' in response.data){

              const auth = {
                uid: response.data.uid,
                token: response.data.token,
              }
              cookie.set('auth', auth, {expires: 1})
              store.commit('update_auth', auth)
            }

            if('permission' in response.data){
              store.commit('update_perm', response.data.permission)
            }

            handle_errors(response.data.response)

            if('response' in response.data){
              return_response = response.data.response
            }
          },
        )

      return return_response
    }
  }
}

function handle_errors(response) {
  if('errors' in response && typeof response.errors === 'number'){
    let errors = {
      errors: response.errors,
      details: null
    }

    if('details' in response){
      errors.details = response.details
    }
    store.commit('update_errors', errors)
  }
}


