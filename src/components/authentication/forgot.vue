<template>
  <div class="forgot">
    <cinput
      name="E-Mail"
      :cvalue="null"
      type="auth_email"
      v-model="reset_password.inputs.email.input"/>
    <button
      @click="forgot"
      class="filled">
      PASSWORT ZURÜCKSETZTEN
    </button>
    <p v-if="errors !== null"
       class="errors">
      {{errors}}
    </p>
  </div>
</template>

<script>
  import Create_section from "../inputs/create";
  import Cinput from "../input/index";

  export default {
    name: "forgot",
    components: {Cinput, Create_section},
    props:{
      redirect:{
        required: true
      }
    },
    data(){
      return{
        errors: null,
        reset_password:{
          url: 'https://newbackend.groe.me/authenticate/forgot',
          params: {

          },
          inputs:{
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
    methods:{
      forgot(){
        for(let value_key in this.reset_password.inputs){
          this.reset_password.params[value_key] = this.reset_password.inputs[value_key].input.value
        }

        this.$$request.post.data(this.reset_password.url, this.reset_password.params)
          .then((response) => this.handle_response(response))
      },
      handle_response (response) {
        if('update' in response){
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

  .forgot{
    position: relative;

    .cinput{
      margin-bottom: 16px;
    }

    .errors{
      text-align: center;
      margin-top: 17px;
      color: #990000;
    }
  }

</style>
