<template>
  <div class="create_account default_box">
    <p class="section_name">TRANSAKTION ERSTELLEN</p>
    <inputs v-for="(input, key, i) in create_user_account.inputs"
            :key="i"
            :obj="fill_inputs(key, create_user_account)"
            :request_data="request_create_user_account.data"
            v-model="create_user_account.inputs[key].input"/>
    <button @click="send_create_user_account">TRANSAKTION HINZUFÜGEN</button>
    <div class="clear"></div>
    <request :obj="request_create_user_account" v-model="request_create_user_account"/>
  </div>
</template>

<script>
  import Inputs from "../inputs/index";
  import Request from "../functions/request";
  import Load_request from "../functions/load_request"
  import Custom_helper from '../functions/custom_helper'

  export default {
    name: "create_account",
    components: {
      Request,
      Inputs
    },
    data(){
      return{
        request_create_user_account: {
          params: {
            user_id: null,
            uid: 1,
            description: 'Manuelle Transaktion',
            currency: 'EUR'
          },
          url: 'https://newbackend.groe.me/users/create_user_account',
          data: {},
          request: false
        },
        create_user_account:{
          url: 'https://newbackend.groe.me/users/create_user_account',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {},
          inputs:{
            value: {
              name: 'Betrag in Euro',
              type: 'number',
              input: {
                value: null,
                event:null
              }
            },
            date: {
              name: 'Buchungsdatum',
              type: 'number',
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
      route_id(){
        return this.$route.params.id
      },
      request_create_user_account_data(){
        return this.request_create_user_account.data
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_create_user_account)
      },
      request_create_user_account_data: function (object) {
        if('create' in object){
          this.create_user_account.inputs.value.input.value = null
          this.create_user_account.inputs.date.input.value = null
          this.$emit('input', 'reload')
        }
      }
    },
    mounted(){
      this.set_user_id(this.request_create_user_account)
    },
    methods:{
      send_create_user_account(){
        this.request_create_user_account.params.value = this.create_user_account.inputs.value.input.value
        this.request_create_user_account.params.date = this.create_user_account.inputs.date.input.value
        this.request_create_user_account.request = true
      }
    },
    mixins:[Custom_helper, Load_request]
  }
</script>

<style lang="scss" scoped>
  .default_box{
    margin-bottom: 17px;
  }

  button{
    float:right;
    margin-top: 10px;
  }
</style>
