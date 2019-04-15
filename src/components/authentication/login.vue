<template>
  <div class="login">
    <Floating_label :create_inputs="login_user"
                    button_name="ANMELDEN"
                    v-model="request_login_user"/>
    <p v-if="errors !== null"
       class="errors">
      {{errors}}
    </p>
  </div>
</template>

<script>
  var cookie = require('js-cookie')
  import Floating_label from "../inputs/floating_label";

  export default {
    name: "login",
    components: {Floating_label},
    props:{
      redirect:{
        required: true
      }
    },
    data(){
      return{
        errors: null,
        request_login_user:{},
        login_user:{
          url: 'https://newbackend.groe.me/authenticate/login',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            reset_token: this.$route.params.token
          },
          inputs:{
            email: {
              name: 'Email',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            password: {
              name: 'Passwort',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            }
          }
        }
      }
    },
    watch:{
      request_login_user:function (object){
        if('uid' in object && 'token' in object){
          const auth = {
            uid: object.uid,
            token: object.token
          }

          cookie.set('auth', auth, {expires: 1})
          this.$store.commit('update_auth', auth)
          this.$router.push({name: this.redirect})
        }
        else if('errors' in object){
          this.errors = object.errors
        }
      }
    }
  }
</script>
