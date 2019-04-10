<template>
  <div class="admin_contact">
    <p class="section_name">Kontakt</p>
    <div class="section_wrapper">
      <edit_elements
        class="phone"
        :url="set_url(phone)"
        method="update"
        :inputs="update_phone.inputs"
        :cload="phone"
        :params="update_phone.params"
        :reload="reload"/>
      <edit_elements
        :url="set_url(email)"
        method="update"
        :inputs="update_email.inputs"
        :cload="email"
        :params="update_email.params"
        :reload="reload"/>
      <edit_elements
        :url="set_url(skype)"
        method="update"
        :inputs="update_skype.inputs"
        :cload="skype"
        :params="update_skype.params"
        :reload="reload"/>
      <edit_elements
        :url="set_url(discord)"
        method="update"
        :inputs="update_discord.inputs"
        :cload="discord"
        :params="update_discord.params"
        :reload="reload"/>
      <edit_elements
        class="facebook"
        :url="set_url(facebook)"
        method="update"
        :inputs="update_facebook.inputs"
        :cload="facebook"
        :params="update_facebook.params"
        :reload="reload"/>
    </div>
  </div>
</template>

<script>
  import Create_update from "../../../components/inputs/create_update";
  import Edit_elements from "../../../components/edit/elements";
  import loader from "../../../components/functions/loader";

  export default {
    name: "admin_contact",
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
        update_email:{
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
        update_discord:{
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
        update_skype:{
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
        update_facebook:{
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
        this.set_user_id(this.update_phone)
        this.set_user_id(this.update_email)
        this.set_user_id(this.update_skype)
        this.set_user_id(this.update_discord)
        this.set_user_id(this.update_facebook)
      },
     set_url (data) {
        if(typeof data === 'object' && this.$$helper.length(data) > 0  ){
          return 'https://newbackend.groe.me/user_admin/contact/update'
        }
        else {
          return 'https://newbackend.groe.me/user_admin/contact/create'
        }
      }
    },
    mixins:[loader]
  }
</script>


<style lang="scss">

  .admin_contact{
    .phone{
      .wrapper {
        &.value{
          &:hover{
            &:after{
              display: none;
            }
          }
        }
      }
    }

    .facebook{
      .wrapper {
        border-bottom: none !important;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }

</style>
