<template>
  <div class="user_bank">
    <p class="section_name">NUTZER BANKDATEN</p>
    <create_update name="bank"
                   :create_inputs="create_bank"
                   :update_inputs="update_bank"
                   :request_get_data="request_get_user_bank"
                   :reload="{action: 'reload', section: 'users_admin'}"/>
  </div>
</template>

<script>
  import Load_request from "../../../components/functions/load_request"
  import Create_update from "../../../components/inputs/create_update";

  export default {
    name: "user_contact",
    components:{
      Create_update,
    },
    props:{
      request_get_user_bank:{
        required:true
      }
    },
    data(){
      return{
        update_bank:{
          url: 'https://newbackend.groe.me/user_admin/bank/update',
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
              type: 'select',
              select: 'countrys',
            }
          }
        },
        create_bank:{
          url: 'https://newbackend.groe.me/user_admin/bank/create',
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
      }
    },
    watch:{
      route_id: function(){
        this.set_inputs_user_id(this.create_bank)
        this.set_inputs_user_id(this.update_bank)
      }
    },
    mounted(){
      this.set_inputs_user_id(this.create_bank)
      this.set_inputs_user_id(this.update_bank)
    },
    mixins:[Load_request]
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
