<template>
  <div class="user_password">
    <p class="section_name">RECHTE HINZUFÜGEN</p>
    <inputs :obj="fill_inputs('user_type', create_permission)"
            :request_data="request_create_permission.data"
            v-model="create_permission.inputs['user_type'].input"/>
    <inputs v-if="active.user_role"
            :obj="fill_inputs('user_role', create_permission)"
            :request_data="request_create_permission.data"
            v-model="create_permission.inputs['user_role'].input"/>
    <inputs :obj="fill_inputs('permission', create_permission)"
            :request_data="request_create_permission.data"
            v-model="create_permission.inputs['permission'].input"/>
    <p class="request_message">{{message}}</p>
    <button @click="send_create_permission">RECHTE HINZUFÜGEN</button>
    <request :obj="request_create_permission" v-model="request_create_permission"/>
  </div>
</template>

<script>
  import Request from "../../components/functions/request"
  import Load_request from "../../components/functions/load_request"
  import Edit from "../../components/inputs/edit"
  import Custom_helper from '../../components/functions/custom_helper'
  import Inputs from "../../components/inputs/index";

  export default {
    name: "permission_create",
    components:{
      Inputs,
      Edit,
      Request,
    },
    props:{
      type:{
        required: true
      },
      name:{
        required: true
      }
    },
    data(){
      return{
        active: {
          user_role: false
        },
        message: '',
        request_create_permission: {
          params: {
            type: null,
            name: null
          },
          url: 'https://newbackend.groe.me/settings_permission/create',
          data: {},
          request: false
        },
        create_permission:{
          url: 'https://newbackend.groe.me/settings_permission/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {},
          inputs:{
            user_type: {
              name: 'Nutzer Typ',
              type: 'select',
              select: 'user_type',
              input: {
                value: null,
                event:null
              }
            },
            user_role: {
              name: 'Nutzer Rolle',
              type: 'select',
              select: '',
              input: {
                value: null,
                event:null
              }
            },
            permission: {
              name: 'Berichtigung',
              type: 'select',
              select: 'permissions',
              input: {
                value: null,
                event:null
              }
            },
          }
        }
      }
    },
    computed:{
      user_type(){
        return this.create_permission.inputs.user_type.input.value
      },
      request_create_permission_data(){
        return this.request_create_permission.data
      }
    },
    watch:{
      user_type: function(string){
        if(string !== null){
          this.active.user_role = true
          this.create_permission.inputs.user_role.select = this.create_permission.inputs.user_type.input.value + '_role'
        }
      },
      request_create_permission_data: function (object) {
        this.create_update_reload(object, { action: 'reload', section: 'settings_permission' })
        this.$emit('input', false)
      }
    },
    mounted(){
      this.request_create_permission.params.type = this.type
      this.request_create_permission.params.name = this.name
    },
    methods:{
      send_create_permission(){
        for(let value_key in this.create_permission.inputs){
          this.request_create_permission.params[value_key] = this.create_permission.inputs[value_key].input.value
        }

        this.request_create_permission.request = true
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
