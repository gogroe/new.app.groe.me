<template>
  <div class="user_adress">
    <p class="section_name">NUTZER ADRESSE</p>
    <div v-if="active.update">
      <edit v-for="(input, key, i) in update_user_adress.inputs"
            :key="i"
            :obj="fill_inputs_edit(key, update_user_adress, request_get_user_adress.data)"/>
    </div>
    <add v-if="active.update === false"
         name="Adresse"
         :active="active.create"
         v-model="active.create"
         class="add"/>
    <div v-if="active.create">
      <inputs v-for="(input, key, i) in create_user_adress.inputs"
              :key="i"
              :obj="fill_inputs(key, create_user_adress)"
              :request_data="request_create_user_adress.data"
              v-model="create_user_adress.inputs[key].input"/>
      <button @click="send_create_user_adress">ADRESSE HINZUFÜGEN</button>
    </div>
    <request :obj="request_get_user_adress" v-model="request_get_user_adress"/>
    <request :obj="request_create_user_adress" v-model="request_create_user_adress"/>
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
    name: "user_adress",
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
        request_get_user_adress: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/users/get_user_adress',
          data: {},
          request: false
        },
        update_user_adress:{
          url: 'https://newbackend.groe.me/users/update_user_adress',
          input_class:'edit_input_light',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1,
            id: null
          },
          inputs:{
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
        request_create_user_adress: {
          params: {
            user_id: null,
            uid: 1
          },
          url: 'https://newbackend.groe.me/users/create_user_adress',
          data: {},
          request: false
        },
        create_user_adress:{
          url: 'https://newbackend.groe.me/users/create_user_adress',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1
          },
          inputs:{
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
      request_get_user_adress_data(){
        return this.request_get_user_adress.data
      },
      request_create_user_adress_data(){
        return this.request_create_user_adress.data
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_get_user_adress)
        this.set_user_id(this.request_create_user_adress)
        this.request_get_user_adress.request = true
      },
      request_get_user_adress_data(){
        this.set_active_update()
      },
      request_create_user_adress_data(){
        if('create' in this.request_create_user_adress.data){
          this.request_get_user_adress.request = true
        }
      }
    },
    mounted(){
      this.set_user_id(this.request_get_user_adress)
      this.set_user_id(this.request_create_user_adress)
      this.request_get_user_adress.request = true
    },
    methods:{
      send_create_user_adress(){
        this.request_create_user_adress.params.street = this.create_user_adress.inputs.street.input.value
        this.request_create_user_adress.params.zip = this.create_user_adress.inputs.zip.input.value
        this.request_create_user_adress.params.city = this.create_user_adress.inputs.city.input.value
        this.request_create_user_adress.params.country = this.create_user_adress.inputs.country.input.value
        this.request_create_user_adress.request = true
      },
      set_active_update(){
        if(Object.keys(this.request_get_user_adress.data).length !== 0 && this.request_get_user_adress.data.constructor === Object){
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
