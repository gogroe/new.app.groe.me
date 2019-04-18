<template>
  <div class="reset_password">
    <cinput
      name="Passwort"
      :cvalue="null"
      type="auth_password"
      v-model="reset_password.inputs.password.input"/>
    <button
      @click="reset"
      class="filled">
      PASSWORT ERSTELLEN
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
    name: "verification",
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
          url: 'https://newbackend.groe.me/authenticate/reset_password',
          params: {
            reset_token: this.$route.params.token
          },
          inputs:{
            password: {
              name: 'Geben Sie hier Ihr Passwort ein.',
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
      reset(){
        for(let value_key in this.reset_password.inputs){
          this.reset_password.params[value_key] = this.reset_password.inputs[value_key].input.value
        }

        this.$$request.post.data(this.reset_password.url, this.reset_password.params)
          .then((response) => this.handle_response(response))
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

  .reset_password{
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
