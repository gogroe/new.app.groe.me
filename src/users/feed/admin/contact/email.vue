<template>
  <div class="user_contact_email">
    <div v-if="active.update">
      <edit v-for="(input, key, i) in update_user_contact.inputs"
            :key="i"
            :obj="fill_inputs_edit(key, update_user_contact, request_get_user_contact.data)"/>
    </div>
    <add v-if="active.update === false"
         name="Email"
         :active="active.create"
         v-model="active.create"
         class="add"/>
    <div v-if="active.create">
      <inputs v-for="(input, key, i) in create_user_contact.inputs"
              :key="i"
              :obj="fill_inputs(key, create_user_contact)"
              :request_data="request_create_user_contact.data"
              v-model="create_user_contact.inputs[key].input"/>
      <button @click="send_create_user_contact">Email HINZUFÜGEN</button>
    </div>
    <request :obj="request_get_user_contact" v-model="request_get_user_contact"/>
    <request :obj="request_create_user_contact" v-model="request_create_user_contact"/>
  </div>
</template>

<script>
  import Request from "../../../../components/functions/request"
  import Load_request from "../../../../components/functions/load_request"
  import Edit from "../../../../components/inputs/edit"
  import Custom_helper from '../../../../components/functions/custom_helper'
  import Add from "../../../../components/add/index";
  import Inputs from "../../../../components/inputs/index";

  export default {
    name: "user_contact_email",
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
        request_get_user_contact: {
          params: {
            user_id: null,
            name: 'email'
          },
          url: 'https://newbackend.groe.me/users/get_user_contact',
          data: {},
          request: false
        },
        update_user_contact:{
          url: 'https://newbackend.groe.me/users/update_user_contact',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1,
            id: null,
            name: 'email'
          },
          inputs:{
            value: {
              name: 'Email',
              type: 'number'
            }
          }
        },
        request_create_user_contact: {
          params: {
            user_id: null,
            uid: 1,
            name: 'email'
          },
          url: 'https://newbackend.groe.me/users/create_user_contact',
          data: {},
          request: false
        },
        create_user_contact:{
          url: 'https://newbackend.groe.me/users/create_user_contact',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1,
            name: 'email'
          },
          inputs:{
            value: {
              name: 'Email',
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
      request_get_user_contact_data(){
        return this.request_get_user_contact.data
      },
      request_create_user_contact_data(){
        return this.request_create_user_contact.data
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_get_user_contact)
        this.set_user_id(this.request_create_user_contact)
        this.request_get_user_contact.request = true
      },
      request_get_user_contact_data(){
        this.set_active_update()
      },
      request_create_user_contact_data(){
        if('create' in this.request_create_user_contact.data){
          this.request_get_user_contact.request = true
        }
      }
    },
    mounted(){
      this.set_user_id(this.request_get_user_contact)
      this.set_user_id(this.request_create_user_contact)
      this.request_get_user_contact.request = true
    },
    methods:{
      send_create_user_contact(){
        this.request_create_user_contact.params.value = this.create_user_contact.inputs.value.input.value
        this.request_create_user_contact.request = true
      },
      set_active_update(){
        if(Object.keys(this.request_get_user_contact.data).length !== 0 && this.request_get_user_contact.data.constructor === Object){
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
