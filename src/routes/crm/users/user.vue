<template>
  <div class="user_crm">
    <crm
      :key="key"
      url="https://newbackend.groe.me/user_crm/get_all"
      :crm="user"/>
  </div>
</template>

<script>
  import Crm from "../../../components/crm2/index";

  export default {
    name: "user_crm",
    components: {Crm},
    data(){
      return {
        key: 0,
        user: {
          id: 'user',
          name: 'Nutzerverwaltung',
          baseColumns: [
            {
              table: 'users',
              active: true,
              type: 'indicator',
              params: {
                firstname: 'get_users.firstname',
                lastname: 'get_users.lastname',
                image: 'get_users.image',
                user_id: 'get_users.id'
              },
              rows: []
            },
            {
              active: true,
              id: 'users.firstname',
              name: 'Vorname',
              type: 'text',
              params: {user_id: 'get_users.id'},
              create_url: 'https://newbackend.groe.me/user_crm/user/create',
              update_url: 'https://newbackend.groe.me/user_crm/user/update',
              rows: []
            },
            {
              active: true,
              id: 'users.lastname',
              name: 'Nachname',
              type: 'text',
              params: {user_id: 'get_users.id'},
              create_url: 'https://newbackend.groe.me/user_crm/user/create',
              update_url: 'https://newbackend.groe.me/user_crm/user/update',
              rows: []
            },
            // {
            //   active: true,
            //   id: 'users.role',
            //   name: 'Rolle',
            //   type: 'select',
            //   list: 'user_role',
            //   params: {user_id: 'get_users.id'},
            //   create_url: 'https://newbackend.groe.me/user_crm/user/create',
            //   update_url: 'https://newbackend.groe.me/user_crm/user/update',
            //   rows: []
            // }
          ]
        },
      }
    },
    watch: {
      '$route.name': {
        handler: function() {
          this.user.id = this.$route.name.replace('crm_', '')
          this.key += 1
        },
        deep: true,
        immediate: true
      }
    },
    created () {
      this.user.id = this.$route.name.replace('crm_', '')
    }
  }
</script>
