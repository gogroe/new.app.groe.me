var cookie = require('js-cookie')
import axios from 'axios'
import router from '../src/router'

const test = {
  state: {
    response: {
      head:{

      },
      user:{
        header:{
          lastname: '',
          firstname: '',
          name: '',
          image: '',
          gender: '',
          type: '',
          ballance:''
        },
        user_profile:{
          id:'',
          state:'',
          uid:'',
          date:'',
          country:'',
          city:'',
          zip:'',
          street:'',
          status: '',
          status_details: ''

        }
      }
    }
  },
  mutations: {

  },
  getters: {
    users_header(state){
      return state.response.user.header
    },
    users_profile(state){
      return state.response.user.profile
    },
    users_count(state){
      return state
    }
  },
  actions: {}
}

export default test
