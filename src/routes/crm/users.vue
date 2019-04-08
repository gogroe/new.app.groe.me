<template>
  <div class="user_crm">
    <crm
      url="https://newbackend.groe.me/user_crm/get_all"
      :crm="crms[active.crm]"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Crm from "../../components/crm2";

  export default {
    name: "user_crm",
    components: {Crm},
    data(){
      return {
        active: {
          crm: 'user'
        },
        crms: {
          admin: {
            id: 'admin',
            name: 'Adminverwaltung',
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
            ]
          },
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
            ]
          },
          company: {
            id: 'company',
            name: 'Firmenverwaltung',
            baseColumns: [
              {
                table: 'users',
                active: true,
                type: 'indicator',
                params: {
                  name: 'get_users.name',
                  image: 'get_users.image',
                  user_id: 'get_users.id'
                },
                rows: []
              },
              {
                active: true,
                id: 'users.name',
                name: 'Name',
                type: 'text',
                params: {user_id: 'get_users.id'},
                create_url: 'https://newbackend.groe.me/user_crm/user/create',
                update_url: 'https://newbackend.groe.me/user_crm/user/update',
                rows: []
              },
            ]
          },
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ])
    },
    watch:{
      reload:function (object) {
        if(object.section === 'active_crm'){
          this.active.crm = object.action
          this.$store.commit('update_reload', {section: null, action: null})
        }
      }
    }
  }
</script>
