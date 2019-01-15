<template>
  <div class="user_contact">
    <p class="section_name">NUTZER BANKDATEN</p>
    <div v-if="active.update">
      <edit v-for="(input, key, i) in update_user_bank.inputs"
            :key="i"
            :obj="fill_inputs_edit(key, update_user_bank, request_get_user_bank.data)"/>
    </div>
    <add v-if="active.update === false"
         name="Bankdaten"
         :active="active.create"
         v-model="active.create"
         class="add"/>
    <div v-if="active.create">
      <inputs v-for="(input, key, i) in create_user_bank.inputs"
              :key="i"
              :obj="fill_inputs(key, create_user_bank)"
              :request_data="request_create_user_bank.data"
              v-model="create_user_bank.inputs[key].input"/>
      <button @click="send_create_user_bank">BANKDATEN HINZUFÜGEN</button>
    </div>
    <request :obj="request_get_user_bank" v-model="request_get_user_bank"/>
    <request :obj="request_create_user_bank" v-model="request_create_user_bank"/>
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
    name: "user_contact",
    components:{
      Inputs,
      Add,
      Edit,
      Request,
    },
    data(){
      return{
        active:{
          create: false,
          update: false
        },
        request_get_user_bank: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/users/get_user_bank',
          data: {},
          request: false
        },
        update_user_bank:{
          url: 'https://newbackend.groe.me/users/update_user_bank',
          input_class:'edit_input_light',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1,
            id: null
          },
          inputs:{
            iban: {
              name: 'IBAN',
              type: 'number'
            },
            swift: {
              name: 'SWIFT',
              type: 'number'
            },
            name: {
              name: 'Bankname',
              type: 'number'
            },
            street: {
              name: 'Straße',
              type: 'text'
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number'
            },
            city: {
              name: 'Stadt',
              type: 'text'
            },
            country: {
              name: 'Land',
              type: 'text'
            }
          }
        },
        request_create_user_bank: {
          params: {
            user_id: null,
            uid: 1
          },
          url: 'https://newbackend.groe.me/users/create_user_bank',
          data: {},
          request: false
        },
        create_user_bank:{
          url: 'https://newbackend.groe.me/users/create_user_bank',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1
          },
          inputs:{
            iban: {
              name: 'IBAN',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            swift: {
              name: 'SWIFT',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            name: {
              name: 'Bankname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            street: {
              name: 'Straße',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number',
              input: {
                value: null,
                event:null
              }
            },
            city: {
              name: 'Stadt',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            country: {
              name: 'Land',
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
      route_id(){
        return this.$route.params.id
      },
      request_get_user_bank_data(){
        return this.request_get_user_bank.data
      },
      request_create_user_bank_data(){
        return this.request_create_user_bank.data
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_get_user_bank)
        this.set_user_id(this.request_create_user_bank)
        this.request_get_user_bank.request = true
      },
      request_get_user_bank_data(){
        this.set_active_update()
      },
      request_create_user_bank_data(){
        if('create' in this.request_create_user_bank.data){
          this.request_get_user_bank.request = true
        }
      }
    },
    mounted(){
      this.set_user_id(this.request_get_user_bank)
      this.set_user_id(this.request_create_user_bank)
      this.request_get_user_bank.request = true
    },
    methods:{
      send_create_user_bank(){
        this.request_create_user_bank.params.name = this.create_user_bank.inputs.name.input.value
        this.request_create_user_bank.params.iban = this.create_user_bank.inputs.iban.input.value
        this.request_create_user_bank.params.swift = this.create_user_bank.inputs.swift.input.value
        this.request_create_user_bank.params.street = this.create_user_bank.inputs.street.input.value
        this.request_create_user_bank.params.zip = this.create_user_bank.inputs.zip.input.value
        this.request_create_user_bank.params.city = this.create_user_bank.inputs.city.input.value
        this.request_create_user_bank.params.country = this.create_user_bank.inputs.country.input.value
        this.request_create_user_bank.request = true
      },
      set_active_update(){
        if(Object.keys(this.request_get_user_bank.data).length !== 0 && this.request_get_user_bank.data.constructor === Object){
          this.active.update = true
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
</style>
