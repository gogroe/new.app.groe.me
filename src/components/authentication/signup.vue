<template>
  <div class="signup">
    <inputs v-for="(input, key, i) in signup_user.inputs"
            :key="i"
            :obj="fill_inputs(key, signup_user)"
            :request_data="request_signup_user.data"
            v-model="signup_user.inputs[key].input"/>
    <button @click="send_signup_user">ANMELDEN</button>
    <request :obj="request_signup_user" v-model="request_signup_user"/>
    <div class="social_buttons_wrapper">
      <facebook/>
    </div>
    <div class="social_buttons_wrapper">
      <google/>
    </div>

    <!-- <bubble text="descriptive text of the pointed stuff" info_link="request_signup_user"/> -->
  </div>
</template>

<script>
  import Custom_helper from '../functions/custom_helper'
  import { mapGetters } from 'vuex'
  import Bubble from "../bubble/index"
  import Facebook from './facebook'
  import Google from './gmail'
  import Inputs from "../inputs/index";
  import Request from "../functions/request";

  export default {
    name: "signup",
    components:{
      Request,
      Inputs,
      Facebook,
      Google,
      Bubble
    },
    data(){
      return{
        request_signup_user: {
          params: {
            uid: 1

          },
          url: 'https://newbackend.groe.me/signup_user',
          data: {},
          request: false
        },
        signup_user:{
          url: 'https://newbackend.groe.me/signup_user',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {},
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
    computed:{
      ...mapGetters([
        'social_login',
      ]),
      request_social_login: function(){
        return this.social_login
      },
      request_signup_user_data(){
        return this.request_signup_user
      }
    },
    watch:{
      request_social_login: function (){
        this.signup_user.inputs.firstname.value = this.social_login.name
        this.signup_user.inputs.lastname.value = this.social_login.lastname
        this.signup_user.inputs.email.value = this.social_login.email
      },
      request_signup_user_data(){
        if('create' in this.request_signup_user){
          // create new page wher we can push to  like an aler button notiffying about recieved email or sth
          // use a store variable which includes some text
        }
      }
    },
    methods:{
      load_to_store: function(firstname, lastname, email){
        this.$store.commit('update_social_login', {
          firstname : firstname,
          lastname : lastname,
          email : email
        })
      },
      send_signup_user(){
        for(let value_key in this.signup_user.inputs){
          this.request_signup_user.params[value_key] = this.signup_user.inputs[value_key].input.value
        }

        this.request_signup_user.request = true
      }
    },
    mixins:[Custom_helper]
  }
</script>

<style lang="scss">

  .signup{
    button{
      width: calc(100% - 20px);
      margin: 0 10px;
      background-color: #3da0f5;
      color: white;

      &:hover{
        background-color: #2e7dbd;
        outline: none;
      }
    }
  }

  .social_buttons_wrapper{
    padding: 0 10px;
    margin: 8px 0 0 0;
  }
</style>
