<template>
  <div class="user_contact">
    <p class="section_name">NUTZER KONTAKT</p>
    <div class="section_wrapper">
      <edit_elements
        v-if="cload.phone != null"
        :url="update_phone.url"
        method="update"
        :inputs="update_phone.inputs"
        :cload="cload"
        :params="update_phone.params"
        :reload="update_phone.reload"/>
      <edit_elements
        v-else
        :url="create_phone.url"
        method="update"
        :inputs="create_phone.inputs"
        :cload="cload"
        :params="create_phone.params"
        :reload="create_phone.reload"/>
      <edit_elements
        v-if="cload.email != null"
        :url="update_email.url"
        method="update"
        :inputs="update_email.inputs"
        :cload="cload"
        :params="update_email.params"
        :reload="update_email.reload"/>
      <edit_elements
        v-else
        :url="create_email.url"
        method="update"
        :inputs="create_email.inputs"
        :cload="cload"
        :params="create_email.params"
        :reload="create_email.reload"/>
      <edit_elements
        v-if="cload.skype != null"
        :url="update_skype.url"
        method="update"
        :inputs="update_skype.inputs"
        :cload="cload"
        :params="update_skype.params"
        :reload="update_skype.reload"/>
      <edit_elements
        v-else
        :url="create_skype.url"
        method="update"
        :inputs="create_skype.inputs"
        :cload="cload"
        :params="create_skype.params"
        :reload="create_skype.reload"/>
      <edit_elements
        v-if="cload.discord != null"
        :url="update_discord.url"
        method="update"
        :inputs="update_discord.inputs"
        :cload="cload"
        :params="update_discord.params"
        :reload="update_discord.reload"/>
      <edit_elements
        v-else
        :url="create_discord.url"
        method="update"
        :inputs="create_discord.inputs"
        :cload="cload"
        :params="create_discord.params"
        :reload="create_discord.reload"/>
      <edit_elements
        v-if="cload.facebook != null"
        :url="update_facebook.url"
        method="update"
        :inputs="update_facebook.inputs"
        :cload="cload"
        :params="update_facebook.params"
        :reload="update_facebook.reload"/>
      <edit_elements
        v-else
        :url="create_facebook.url"
        method="update"
        :inputs="create_facebook.inputs"
        :cload="cload"
        :params="create_facebook.params"
        :reload="create_facebook.reload"/>
    </div>
  </div>
</template>

<script>
  import Create_update from "../../../components/inputs/create_update";
  import Edit_elements from "../../../components/edit/elements";
  import loader from "../../../components/functions/loader";

  export default {
    name: "user_contact",
    components: {
      Edit_elements,
      Create_update,
    },
    props:{
      cload:{
        required:true
      }
    },
    data(){
      return{
        update_phone:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          reload: this.reload,
          params: {
            user_id: null,
            id: 'get->id',
            name: 'phone'
          },
          inputs:{
            value: {
              name: 'Telefon',
              type: 'text',
              value: null
            }
          }
        },
        create_phone:{
          url: 'https://newbackend.groe.me/user_admin/contact/create',
          reload: this.reload,
          params: {
            user_id: null,
            name: 'phone'
          },
          inputs:{
            value: {
              name: 'Telefon',
              type: 'text',
              value: null
            }
          }
        },
        update_email:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          reload: this.reload,
          params: {
            user_id: null,
            id: 'get->id',
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
          reload: this.reload,
          params: {
            user_id: null,
            name: 'email'
          },
          inputs:{
            value: {
              name: 'Email',
              type: 'text',
              value: null
            }
          }
        },
        update_discord:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          reload: this.reload,
          params: {
            user_id: null,
            id: 'get->id',
            name: 'phone'
          },
          inputs:{
            value: {
              name: 'discord',
              type: 'text'
            }
          }
        },
        create_discord:{
          url: 'https://newbackend.groe.me/user_admin/contact/create',
          reload: this.reload,
          params: {
            user_id: null,
            name: 'discord'
          },
          inputs:{
            value: {
              name: 'Discord',
              type: 'text',
              value: null
            }
          }
        },
        update_skype:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          reload: this.reload,
          params: {
            user_id: null,
            id: 'get->id',
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
          reload: this.reload,
          params: {
            user_id: null,
            name: 'skype'
          },
          inputs:{
            value: {
              name: 'Skype',
              type: 'text',
              value: null
            }
          }
        },
        update_facebook:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          reload: this.reload,
          params: {
            user_id: null,
            id: 'get->id',
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
          reload: this.reload,
          params: {
            user_id: null,
            name: 'facebook'
          },
          inputs:{
            value: {
              name: 'Facebook',
              type: 'text',
              value: null
            }
          }
        }
      }
    },
    computed:{
      reload () {
        return { action: 'reload', section: 'users_admin' }
      },
      route_id(){
        return this.$route.params.id
      },
      phone(){
        return 'phone' in this.cload && this.cload.phone !== null
          ? this.cload.phone
          : {}
      },
      email(){
        return 'email' in this.cload && this.cload.email !== null
          ? this.cload.email
          : {}
      },
      skype(){
        return 'skype' in this.cload && this.cload.skype !== null
          ? this.cload.skype
          : {}
      },
      discord(){
        return 'discord' in this.cload && this.cload.discord !== null
          ? this.cload.discord
          : {}
      },
      facebook(){
        return 'facebook' in this.cload && this.cload.facebook !== null
          ? this.cload.facebook
          : {}
      },
    },
    watch:{
      route_id: function(){
        this.set_all_user_ids ()
      }
    },
    mounted(){
      this.set_all_user_ids ()
    },
    methods:{
      set_all_user_ids () {
        this.set_user_id(this.create_phone)
        this.set_user_id(this.update_phone)

        this.set_user_id(this.create_email)
        this.set_user_id(this.update_email)

        this.set_user_id(this.create_skype)
        this.set_user_id(this.update_skype)

        this.set_user_id(this.create_discord)
        this.set_user_id(this.update_discord)

        this.set_user_id(this.create_facebook)
        this.set_user_id(this.update_facebook)
      }
    },
    mixins:[loader]
  }
</script>
