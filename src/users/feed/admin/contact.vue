<template>
  <div class="user_contact">
    <p class="section_name">NUTZER KONTAKT</p>
    <create_update name="phone"
                   :create_inputs="create_phone"
                   :update_inputs="update_phone"
                   :request_get_data="phone"
                   :reload="{action: 'reload', section: 'users_admin'}"/>
    <create_update name="email"
                   :create_inputs="create_email"
                   :update_inputs="update_email"
                   :request_get_data="email"
                   :reload="{action: 'reload', section: 'users_admin'}"/>
    <create_update name="skype"
                   :create_inputs="create_skype"
                   :update_inputs="update_skype"
                   :request_get_data="skype"
                   :reload="{action: 'reload', section: 'users_admin'}"/>
    <create_update name="discord"
                   :create_inputs="create_discord"
                   :update_inputs="update_discord"
                   :request_get_data="discord"
                   :reload="{action: 'reload', section: 'users_admin'}"/>
    <create_update name="facebook"
                   :create_inputs="create_facebook"
                   :update_inputs="update_facebook"
                   :request_get_data="facebook"
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
      request_get_user_contact:{
        required:true
      }
    },
    data(){
      return{
        update_phone:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            id: null,
            name: 'phone'
          },
          inputs:{
            value: {
              name: 'Telefon',
              type: 'text'
            }
          }
        },
        create_phone:{
          url: 'https://newbackend.groe.me/user_admin/contact/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            name: 'phone'
          },
          inputs:{
            value: {
              name: 'Telefon',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            }
          }
        },
        update_email:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            id: null,
            name: 'email'
          },
          inputs:{
            value: {
              name: 'Email',
              type: 'text'
            }
          }
        },
        create_email:{
          url: 'https://newbackend.groe.me/user_admin/contact/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            name: 'email'
          },
          inputs:{
            value: {
              name: 'Email',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            }
          }
        },
        update_discord:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            id: null,
            name: 'discord',
          },
          inputs:{
            value: {
              name: 'Discord',
              type: 'text'
            }
          }
        },
        create_discord:{
          url: 'https://newbackend.groe.me/user_admin/contact/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            name: 'discord'
          },
          inputs:{
            value: {
              name: 'Discord',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            }
          }
        },
        update_skype:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            id: null,
            name: 'skype'
          },
          inputs:{
            value: {
              name: 'Skype',
              type: 'text'
            }
          }
        },
        create_skype:{
          url: 'https://newbackend.groe.me/user_admin/contact/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            name: 'skype'
          },
          inputs:{
            value: {
              name: 'Skype',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            }
          }
        },
        update_facebook:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
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
        create_facebook:{
          url: 'https://newbackend.groe.me/user_admin/contact/create',
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
      phone(){
        return 'phone' in this.request_get_user_contact && this.request_get_user_contact.phone !== null
          ? this.request_get_user_contact.phone
          : {}
      },
      email(){
        return 'email' in this.request_get_user_contact && this.request_get_user_contact.email !== null
          ? this.request_get_user_contact.email
          : {}
      },
      skype(){
        return 'skype' in this.request_get_user_contact && this.request_get_user_contact.skype !== null
          ? this.request_get_user_contact.skype
          : {}
      },
      discord(){
        return 'discord' in this.request_get_user_contact && this.request_get_user_contact.discord !== null
          ? this.request_get_user_contact.discord
          : {}
      },
      facebook(){
        return 'facebook' in this.request_get_user_contact && this.request_get_user_contact.facebook !== null
          ? this.request_get_user_contact.facebook
          : {}
      },
    },
    watch:{
      route_id: function(){
        this.set_inputs_user_id(this.create_phone)
        this.set_inputs_user_id(this.update_phone)

        this.set_inputs_user_id(this.create_email)
        this.set_inputs_user_id(this.update_email)

        this.set_inputs_user_id(this.create_skype)
        this.set_inputs_user_id(this.update_skype)

        this.set_inputs_user_id(this.create_discord)
        this.set_inputs_user_id(this.update_discord)

        this.set_inputs_user_id(this.create_facebook)
        this.set_inputs_user_id(this.update_facebook)
      }
    },
    mounted(){
      this.set_inputs_user_id(this.create_phone)
      this.set_inputs_user_id(this.update_phone)

      this.set_inputs_user_id(this.create_email)
      this.set_inputs_user_id(this.update_email)

      this.set_inputs_user_id(this.create_skype)
      this.set_inputs_user_id(this.update_skype)

      this.set_inputs_user_id(this.create_discord)
      this.set_inputs_user_id(this.update_discord)

      this.set_inputs_user_id(this.create_facebook)
      this.set_inputs_user_id(this.update_facebook)
    },
    mixins:[Load_request]
  }
</script>
