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
      <facebook v-model="social_signup_data"/>
    </div>
    <div class="social_buttons_wrapper">
      <google v-model="social_signup_data"/>
    </div>
    <p v-if="errors !== null"
       class="errors">
      {{errors}}
    </p>
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
  import Errors from "../errors/index";

  export default {
    name: "signup",
    components:{
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
        social_signup_data: {},
        request_signup_user: {
          params: {
            type: 2,
            uid: 1
          },
          url: 'https://newbackend.groe.me/authenticate/signup',
          data: {},
          request: false
        },
        signup_user:{
          url: 'https://newbackend.groe.me/authenticate/signup',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            type: 2,
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
    computed:{
      request_signup_user_data(){
        return this.request_signup_user.data
      }
    },
    watch:{
      social_signup_data: function (){
          this.signup_user.inputs.firstname.value = this.social_signup_data.name
          this.signup_user.inputs.lastname.value = this.social_signup_data.lastname
          this.signup_user.inputs.email.value = this.social_signup_data.email
      },
      request_signup_user_data(object){
        if('errors' in object){
          this.errors = object.errors
        }
        else if('create' in object){
          this.$router.push({name: this.redirect})
        }
      }
    },
    methods:{
      send_signup_user(){
        for(let value_key in this.signup_user.inputs){
          this.request_signup_user.params[value_key] = this.signup_user.inputs[value_key].input.value
        }
        this.request_signup_user.request = true
        this.errors = null
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

  .errors{
    text-align: center;
    margin-top: 17px;
    color: #990000;
  }
</style>
