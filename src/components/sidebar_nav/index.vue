<template>
  <div>
    <!--<div class="nav_buttons" v-for="(nav, key, i) in nav_buttons"  :key="i">
      <input type="radio" name="nav_buttons" :value="nav.value">
      <label @click="checked=nav.value" :for="nav.value">{{nav.value}}</label> <br>
    </div>
    {{checked}}
      <div class="nav_buttons" v-for="(nav, key2, i) in nav_buttons"  :key2="i">
        <div v-if="checked===nav.value">
          {{this.$router}}
        </div>
      </div>-->
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default{
        name: "sidebar_nav",
        data(){
          return{
            checked:'',
            nav_buttons:{
              activities:{
                value: 'activities',
                route: '../projects/activities',
              },
              administration_project:{
                value: 'administration_project',
                route: '../projects/administration',
              },
              feed:{
                value: 'feed',
                route: '../projects/feed',
              },
              reports:{
                value: 'reports',
                route: '../projects/reports',
              },
              setup:{
                value: 'setup',
                route: '../projects/setup',
              },
              account:{
                value: 'account',
                route: '../users/account',
              },
              administration_user:{
                value: 'administration_user',
                route: '../users/administration',
              },
              details:{
                value: 'details',
                route: '../users/details',
              },
              progress:{
                value: 'progress',
                route: '../users/progress',
              },
              vita:{
                value: 'vita',
                route: '../users/vita',
              }
            }
          }
        },
        computed:{
          ...mapGetters([
            'users_header'
          ])
        }
      }
</script>

<style>

</style>
