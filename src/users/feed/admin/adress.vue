<template>
  <div class="user_adress">
    <p class="section_name">NUTZER ADRESSE</p>
    <create_update name="phone"
                   :create_inputs="create_adress"
                   :update_inputs="update_adress"
                   :request_get_data="shipping_adress"
                   :reload="{action: 'reload', section: 'users_admin'}"/>
  </div>
</template>

<script>
  import Load_request from "../../../components/functions/load_request"
  import Create_update from "../../../components/inputs/create_update";

  export default {
    name: "user_contact",
    components: {
      Create_update,
    },
    props:{
      request_get_user_adress:{
        required:true
      }
    },
    data(){
      return{
        update_adress:{
          url: 'https://newbackend.groe.me/user_admin/adress/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            id: null,
            type: 'shipping'
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
              type: 'select',
              select: 'countrys',
            }
          }
        },
        create_adress:{
          url: 'https://newbackend.groe.me/user_admin/adress/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            type: 'shipping'
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
              type: 'select',
              select: 'countrys',
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
      shipping_adress(){
        return 'shipping' in this.request_get_user_adress && this.request_get_user_adress.shipping !== null
          ? this.request_get_user_adress.shipping
          : {}
      },
    },
    watch:{
      route_id: function(){
        this.set_inputs_user_id(this.create_adress)
        this.set_inputs_user_id(this.update_adress)
      }
    },
    mounted(){
      this.set_inputs_user_id(this.create_adress)
      this.set_inputs_user_id(this.update_adress)
    },
    mixins:[Load_request]
  }
</script>
