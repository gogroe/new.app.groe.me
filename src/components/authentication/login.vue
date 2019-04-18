<template>
  <div class="login">
    <cinput
      name="E-Mail"
      :cvalue="null"
      type="auth_email"
      v-model="login_user.inputs.email.input"/>
    <cinput
      name="Passwort"
      :cvalue="null"
      type="auth_password"
      v-model="login_user.inputs.password.input"/>
    <p class="opitons-text">
      Sie haben Ihr <a @click="$router.push({name: 'forgot'})">Passwort Vergessen?</a><br/>
      Ein neues Konto <a @click="$router.push({name: 'signup'})">registrieren.</a>
    </p>
    <button
      @click="login"
      class="filled">
      ANMELDEN
    </button>

    <p v-if="errors !== null"
       class="errors">
      {{errors}}
    </p>
  </div>
</template>

<script>
  import Cinput from "../input/index";
  var cookie = require('js-cookie')

  export default {
    name: "login",
    components: {Cinput},
    props:{
      redirect:{
        required: true
      }
    },
    data(){
      return{
        errors: null,
        login_user:{
          url: 'https://newbackend.groe.me/authenticate/login',
          params: {
            email: null,
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
              type: 'password',
              input: {
                value: null,
                event:null
              }
            }
          }
        }
      }
    },
    methods:{
      login(){
        for(let value_key in this.login_user.inputs){
          this.login_user.params[value_key] = this.login_user.inputs[value_key].input.value
        }

        this.$$request.post.data(this.login_user.url, this.login_user.params)
          .then((response) => this.handle_response(response))
      },
      handle_response (response) {
        if('uid' in response && 'token' in response){
          const auth = {
            uid: response.uid,
            token: response.token
          }

          cookie.set('auth', auth, {expires: 1})
          this.$store.commit('update_auth', auth)
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

  .login{
    position: relative;

    .cinput{
      margin-bottom: 16px;
    }

    .opitons-text{
      font-size: 14px;
      display: block;
      width: 100%;
      text-align: left;
      left: 0;
      margin-bottom: 25px;
      line-height: 22px;

      a{
        cursor: pointer;
        color: #3da0f5;
        font-weight: 500;
      }
    }
  }

</style>
