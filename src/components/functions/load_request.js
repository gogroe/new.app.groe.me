import { mapGetters } from 'vuex'
import axios from "axios";
var cookie = require('js-cookie')

export default {
  computed:{
    ...mapGetters([
      'get_header',
      'uid',
      'auth'
    ])
  },
  methods:{
    create_update_reload(request_data, reload_obj){
      if('update' in request_data && reload_obj !== undefined){
        this.$store.commit('update_reload', {action: reload_obj.action, section: reload_obj.section})
      }
      if('create' in request_data && reload_obj !== undefined){
        this.$store.commit('update_reload', {action: reload_obj.action, section: reload_obj.section})
      }
    },

    get_user_request(request_obj){
      this.set_user_id(request_obj)
      request_obj.request = true
    },

    set_user_id(request_obj){
      return request_obj.params.user_id = 'id' in this.$route.params
        ? this.$route.params.id
        : this.uid
    },

    set_inputs_user_id(input_obj){
      return input_obj.required_params.user_id = 'id' in this.$route.params
        ? this.$route.params.id
        : this.uid
    },

    async file_request ( object) {
      let return_response = null
      let headers = {
        headers: { 'Content-Type': 'multipart/form-data'}
      }

      let formData = new FormData()
      for(let param_key in object){
        formData.append(param_key, object[param_key])
      }

      if (this.auth.uid && this.auth.token)
      {
        formData.append('uid', this.auth.uid)
        formData.append('token', this.auth.token)
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
              this.$store.commit('update_auth', auth)
            }

            if('permission' in response.data){
              this.$store.commit('update_perm', response.data.permission)
            }

            if('response' in response.data){
              return_response = response.data.response
            }
          }
        )

      return return_response
    },

    async data_request ( object ) {
      let return_response = null
      let request = {
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' }
      }

      if (this.auth.uid && this.auth.token)
      {
        request.uid = this.auth.uid
        request.token = this.auth.token
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
              this.$store.commit('update_auth', auth)
            }

            if('permission' in response.data){
              this.$store.commit('update_perm', response.data.permission)
            }

            if('response' in response.data){
              return_response = response.data.response
            }
          },
        )

      return return_response
    }
  }
}
