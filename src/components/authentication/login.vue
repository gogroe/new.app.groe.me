<template>
  <div >
    <create_section :create_inputs="login_user"
                    button_name="ANMELDEN"
                    v-model="request_login_user"/>
  </div>
</template>

<script>
  import Create_section from "../inputs/create";

  export default {
    name: "login",
    components: {Create_section},
    data(){
      return{
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
      request_login_user:function (object) {
        if('create' in object){
          //go to login page
          alert('succsess')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
