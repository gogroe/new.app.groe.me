<template>
  <div>
    <ul>
      <li class="user_menu" v-for="(user_menu, mi_key, mi_i) in nav" :key="mi_i">
        <p>{{user_menu.value}}</p>
      </li>
    </ul>
    <ul>
      <li class="users" v-for="(users, user_key, user_i) in nav" :key="user_i">
        <p>{{users.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default{
        name: "user_nav",
        data(){
          return{
            nav:{
              account:{
                value:'Konto',
                route:'../users/account'
              },
              details:{
                value:'Details',
                route:'../users/details'
              },
              vita:{
                value:'Verlauf',
                route:'../users/progress'
              },
              progress:{
                value:'Vita',
                route:'../users/vita'
              }
            }


          }
        },
        computed:{
          ...mapGetters([
            'users_header'
          ])
        },
      methods:{
        check_project_id(){
          let check = false
          //check if project id exists in company
          for(let nav_key in this.nav){
            for(let sub_nav_key in this.nav[nav_key]){
               if(this.$route.params.id === sub_nav_key.id){
                 check = true
               }
            }
          }
          return check
        }
      }
      }
</script>

<style>

</style>
