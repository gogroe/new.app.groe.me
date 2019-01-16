<template>
  <div class="user_password">
    <p class="section_name">NUTZER PASSWORT</p>
    <inputs v-for="(input, key, i) in create_user_secret.inputs"
            :key="i"
            :obj="fill_inputs(key, create_user_secret)"
            :request_data="request_create_user_secret.data"
            v-model="create_user_secret.inputs[key].input"/>
    <p class="request_message">{{message}}</p>
    <button @click="send_create_user_secret">PASSWORT ÄNDERN</button>
    <request :obj="request_create_user_secret" v-model="request_create_user_secret"/>
  </div>
</template>

<script>
  import Request from "../../../components/functions/request"
  import Load_request from "../../../components/functions/load_request"
  import Edit from "../../../components/inputs/edit"
  import Custom_helper from '../../../components/functions/custom_helper'
  import Add from "../../../components/add/index";
  import Inputs from "../../../components/inputs/index";

  export default {
    name: "user_password",
    components:{
      Inputs,
      Add,
      Edit,
      Request,
    },
    data(){
      return{
        message: '',
        request_create_user_secret: {
          params: {
            user_id: null,
            uid: 1,
          },
          url: 'https://newbackend.groe.me/users/create_user_secret',
          data: {},
          request: false
        },
        create_user_secret:{
          url: '',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1,
          },
          inputs:{
            old_hash: {
              name: 'Altes Passwort',
              type: 'text',
              input: {
                value: null,
                event: null
              }
            },
            hash: {
              name: 'Neues Passwort',
              type: 'text',
              input: {
                value: null,
                event: null
              }
            },
            commit_hash: {
              name: 'Neues Passwort bestätigen',
              type: 'text',
              input: {
                value: null,
                event: null
              }
            }
          }
        }
      }
    },
    computed:{
      route_id(){
        return this.$route.params.id
      },
      request_create_user_secret_data(){
        return this.request_create_user_secret.data
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_create_user_secret)
      },
      request_create_user_secret_data(object){
        if('create' in object){
          this.message = 'Ihr Passwort wurde geändert'
        }
      }
    },
    mounted(){
      this.set_user_id(this.request_create_user_secret)
    },
    methods:{
      send_create_user_secret(){
        //check empty
        if(
          this.create_user_secret.inputs.old_hash.input.value === null ||
          this.create_user_secret.inputs.hash.input.value === null ||
          this.create_user_secret.inputs.commit_hash.input.value === null ||
          this.create_user_secret.inputs.old_hash.input.value === '' ||
          this.create_user_secret.inputs.hash.input.value === '' ||
          this.create_user_secret.inputs.commit_hash.input.value === ''
        ){
          this.message = 'Alle felder müssen ausgefüllt werden.'
        }

        //check commit
        else if(
          this.create_user_secret.inputs.hash.input.value === this.create_user_secret.inputs.commit_hash.input.value
        ){
          this.request_create_user_secret.params.hash = this.create_user_secret.inputs.hash.input.value
          this.request_create_user_secret.params.old_hash = this.create_user_secret.inputs.old_hash.input.value
          //console.log(this.request_create_user_secret)
          this.request_create_user_secret.request = true
          this.message = null
        }
        else{
          this.message = 'Passwörter stimmen nicht überein.'
        }
      }
    },
    mixins:[Custom_helper, Load_request]
  }
</script>

<style lang="scss" scoped>
  .add{
    margin-bottom: 17px;
  }

  button{
    margin: 10px 0;
  }

  .request_message{
    margin-top: 10px;
    margin-left: 17px;
  }
</style>
