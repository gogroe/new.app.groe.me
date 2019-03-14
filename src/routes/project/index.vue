<template>
  <div>
    <edit_section
      :response="discord_response"
      :create="create_discord"
      :update="update_discord"
      :cload="discord_response"
      name="KONTAKT HINZUFÜGEN"
      button="KONTAKTE ANLEGEN"/>
  </div>
</template>

<script>
  import Edit_section from "../../components/edit/section";
  export default {
    name: "project",
    components: {Edit_section},
    data () {
      return {
        discord_response:{},
        create_discord:{
          url: 'https://newbackend.groe.me/user_admin/contact/create',
          reload:{action: 'reload', section: 'project'},
          params: {
            id: 41,
            name: 'discord'
          },
          inputs:{
            value: {
              name: 'Discord',
              type: 'text',
              value: null,
              placeholder: 'Discord hinzufügen'
            },
          }
        },
        update_discord:{
          url: 'https://newbackend.groe.me/user_admin/contact/update',
          reload:{action: 'reload', section: 'project'},
          params: {
            user_id: 41,
            name: 'discord',
            id: 'get->id'
          },
          inputs:{
            value: {
              name: 'Discord',
              type: 'text',
              value: null,
              list: '$user_status'
            }
          }
        },
        user_admin:{}
      }
    },
    computed:{
      reload () {
        return this.$$helper.reload
      }
    },
    watch:{
      reload: {
        handler: function (object) {
          if(object.action === 'reload', object.section === 'project'){
            this.get_user_admin()
            this.$store.commit('update_reload', {action: null, section:null})
          }
        }, deep:true
      }
    },
    created () {
      this.get_user_admin()
    },
    methods:{
      get_user_admin () {
        this.$$request.post.data('https://newbackend.groe.me/user_admin/get_one', { user_id: 41 })
          .then((response) => this.response_user_admin(response))
      },
      response_user_admin (response) {
        this.discord_response = response.contact.discord
      },
    }
  }
</script>

<style scoped>

</style>
