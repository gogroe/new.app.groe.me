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
      <create_section :create_inputs="register_user"
                      button_name="BANKDATEN ERSTELLEN"
                      v-model="request_register_user"/>
    </div>
    <request :obj="request_get_user_bank" v-model="request_get_user_bank"/>
  </div>
</template>

<script>
  import Request from "../../../components/functions/request"
  import Load_request from "../../../components/functions/load_request"
  import Edit from "../../../components/inputs/edit"
  import Custom_helper from '../../../components/functions/custom_helper'
  import Add from "../../../components/add/index";
  import Inputs from "../../../components/inputs/index";
  import Create_section from "../../../components/inputs/create";

  export default {
    name: "user_contact",
    components:{
      Create_section,
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
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            id: null
          },
          inputs:{
            iban: {
              name: 'IBAN',
              type: 'text'
            },
            swift: {
              name: 'SWIFT',
              type: 'text'
            },
            name: {
              name: 'Bankname',
              type: 'text'
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
        request_register_user: {},
        register_user:{
          url: 'https://newbackend.groe.me/users/register_user',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
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
      request_register_user_data(){
        return this.request_register_user
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_get_user_bank)
        this.set_inputs_user_id(this.register_user)
        this.request_get_user_bank.request = true
      },
      request_get_user_bank_data(){
        this.set_active_update()
      },
      request_register_user_data(){
        if('create' in this.request_register_user){
          this.request_get_user_bank.request = true
        }
      }
    },
    mounted(){
      this.set_user_id(this.request_get_user_bank)
      this.set_inputs_user_id(this.register_user)
      this.request_get_user_bank.request = true
    },
    methods:{
      set_active_update(){
        if(Object.keys(this.request_get_user_bank.data).length !== 0 && this.request_get_user_bank.data.constructor === Object){
          this.active.update = true
          this.active.create = false
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
