<template>
  <div>
    <create_section :create_inputs="create_user_password"
                    button_name="PASSWORD ERSTELLEN"
                    v-model="request_create_user_password"/>
    <p v-if="errors !== null"
       class="errors">
      {{errors}}
    </p>
  </div>
</template>

<script>
  import Create_section from "../inputs/create";

  export default {
    name: "verification",
    components: {Create_section},
    props:{
      redirect:{
        required: true
      }
    },
    data(){
      return{
        errors: null,
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
          this.$router.push({name: this.redirect})
        }
        else  if('errors' in object){
          this.errors = object.errors
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .errors{
    text-align: center;
    margin-top: 17px;
    color: #990000;
  }

</style>
