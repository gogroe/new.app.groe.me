<template>
  <div class="user_contact_facebook">
    <div v-if="active.update">
      <edit v-for="(input, key, i) in update_user_contact.inputs"
            :key="i"
            :obj="fill_inputs_edit(key, update_user_contact, request_get_user_contact.data)"/>
    </div>
    <add v-if="active.update === false"
         name="Facebook"
         :active="active.create"
         v-model="active.create"
         class="add"/>
    <div v-if="active.create">
      <create_section :create_inputs="create_user_contact"
                      button_name="FACEBOOK ERSTELLEN"
                      v-model="request_create_user_contact"/>
    </div>
    <request :obj="request_get_user_contact" v-model="request_get_user_contact"/>
  </div>
</template>

<script>
  import Request from "../../../../components/functions/request"
  import Load_request from "../../../../components/functions/load_request"
  import Edit from "../../../../components/inputs/edit"
  import Custom_helper from '../../../../components/functions/custom_helper'
  import Add from "../../../../components/add/index";
  import Create_section from "../../../../components/inputs/create";

  export default {
    name: "user_contact_facebook",
    components:{
      Create_section,
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
            name: 'facebook'
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
            id: null,
            name: 'facebook'
          },
          inputs:{
            value: {
              name: 'Facebook',
              type: 'text'
            }
          }
        },
        request_create_user_contact:{},
        create_user_contact:{
          url: 'https://newbackend.groe.me/users/create_user_contact',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            name: 'facebook'
          },
          inputs:{
            value: {
              name: 'Facebook',
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
      request_get_user_contact_data(){
        return this.request_get_user_contact.data
      },
      request_create_user_contact_data(){
        return this.request_create_user_contact
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_get_user_contact)
        this.set_inputs_user_id(this.create_user_contact)
        this.request_get_user_contact.request = true
      },
      request_get_user_contact_data(){
        this.set_active_update()
      },
      request_create_user_contact_data(){
        if('create' in this.request_create_user_contact){
          this.request_get_user_contact.request = true
        }
      }
    },
    mounted(){
      this.set_user_id(this.request_get_user_contact)
      this.set_inputs_user_id(this.create_user_contact)
      this.request_get_user_contact.request = true
    },
    methods:{
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
