<template>
  <div class="signup">
    <h1 v-if="header !== undefined">{{header}}</h1>
    <p v-if="content !== undefined">{{content}}</p>
      <create_section :create_inputs="signup_user"
                      v-model="request_signup_user"
                      section_class="signup_inputs"/>
    <div class="social_buttons_wrapper">
      <facebook/>
      <google/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Create_section from "../inputs/create";
  import Facebook from './facebook'
  import Google from './gmail'

  export default {
    name: "signup",
    props:{
      header:{
        required: false
      },
      content:{
        required: false
      }
    },
    components:{
      Create_section,
      Facebook,
      Google
    },
    data(){
      return{
        request_signup_user: {},
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
      request_social_login: function (obj){
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

    }
  }
</script>

<style lang="scss">

  .signup{
    h1, p{
      padding: 0 17px;
    }

    p{
      margin-bottom: 27px;
    }
  }

  .signup_inputs{
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
    margin: 0;
  }
</style>
