<template>
  <div class="signup">
    <cinput
      name="Vorname"
      :cvalue="signup_user.inputs.firstname.input.value"
      type="auth_text"
      v-model="signup_user.inputs.firstname.input"/>
    <cinput
      name="Nachname"
      :cvalue="signup_user.inputs.lastname.input.value"
      type="auth_text"
      v-model="signup_user.inputs.lastname.input"/>
    <cinput
      name="E-Mail"
      :cvalue="signup_user.inputs.email.input.value"
      type="auth_text"
      v-model="signup_user.inputs.email.input"/>
    <p class="forgot-text">
      Sie haben bereits ein GROE-Konto?<br/>Weiter zum <a @click="$router.push({name: 'login'})">Anmdelden</a>
    </p>
    <button
      @click="signup"
      class="filled register">
      REGISTRIEREN
    </button>
    <div class="social_buttons_wrapper">
      <facebook v-model="social_signup_data"/>
    </div>
    <div class="social_buttons_wrapper">
      <google v-model="social_signup_data"/>
    </div>
    <p v-if="errors !== null"
       class="errors">
      {{errors}}
    </p>
 </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Bubble from "../bubble/index"
  import Facebook from './facebook'
  import Google from './gmail'
  import Inputs from "../inputs/index";
  import Request from "../functions/request";
  import Errors from "../errors/index";
  import Cinput from "../input/index";

  export default {
    name: "signup",
    components:{
      Cinput,
      Errors,
      Request,
      Inputs,
      Facebook,
      Google,
      Bubble
    },
    props:{
      redirect:{
        required: true
      }
    },
    data(){
      return{
        errors: null,
        social_signup_data: null,
        signup_user:{
          url: 'https://newbackend.groe.me/authenticate/signup',
          params: {
            type: 1,
            role: 1,
            uid: 1
          },
          inputs:{
            firstname: {
              name: 'Vorname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            lastname: {
              name: 'Nachname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            email: {
              name: 'Email',
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
      social_signup_data: function (){
          this.signup_user.inputs.firstname.input.value = this.social_signup_data.name
          this.signup_user.inputs.lastname.input.value = this.social_signup_data.lastname
          this.signup_user.inputs.email.input.value = this.social_signup_data.email
      },
    },
    methods:{
      signup(){
        for(let value_key in this.signup_user.inputs){
          this.signup_user.params[value_key] = this.signup_user.inputs[value_key].input.value
        }

        this.$$request.post.data(this.signup_user.url, this.signup_user.params)
          .then((response) => this.handle_response(response))
        this.errors = null
      },
      handle_response (response) {
        if('create' in response){
          this.$router.push({name: this.redirect})
        }
        else if('errors' in response){
          this.errors = response.errors
        }
      }
    }
  }
</script>

<style lang="scss">

  .signup{
    position: relative;

    .cinput{
      margin-bottom: 16px;
    }

    .forgot-text{
      font-size: 14px;
      display: block;
      width: 100%;
      text-align: left;
      left: 0;
      margin-bottom: 25px;

      a{
        cursor: pointer;
        color: #3da0f5;
        font-weight: 500;
      }
    }

    .social_buttons_wrapper{
      margin-bottom:10px !important;
    }

    .register{
      width: 100%;
      margin-bottom:10px !important;
    }

    .errors{
      text-align: center;
      margin-top: 17px;
      color: #990000;
    }
  }
</style>
