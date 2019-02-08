<template>
  <div class="default_popup_background">
    <div class="inner_popup">
      <create_section :create_inputs="create_user_password"
                      v-model="request_create_user_password"/>
    </div>
  </div>
</template>

<script>
  import Create_section from "../components/inputs/create";

  export default {
    name: "verification",
    components: {Create_section},
    data(){
      return{
        request_create_user_password:{},
        create_user_password:{
          url: 'https://newbackend.groe.me/authenticate/reset_password',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
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
    watch:{
      request_create_user_password:function (object) {
        if('create' in object){
          //go to login page
          alert('succsess')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .default_popup_background{
    background: transparent;
  }

</style>
