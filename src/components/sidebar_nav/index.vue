<template>
  <div>
    <ul>
      <li class="main_item"
          v-for="(main_item, mi_key, mi_i) in nav"
          :key="mi_i"
          v-if="check_project_id">
        <p @click="$router.push(main_item.route + '/' + main_item.id)">{{main_item.name}}</p>
        <div class="sub_item"
             v-for="(sub_item, su_key, su_i) in main_item.projects">

        </div>
      </li>
    </ul>

    <div class="nav_buttons" v-for="(nav, key, i) in nav_buttons"  :key="i">
      <input type="radio" name="nav_buttons" :value="nav.value">
      <label @click="checked=nav.value" :for="nav.value">{{nav.value}}</label> <br>
    </div>
    {{checked}}
      <div class="nav_buttons" v-for="(nav, key2, i) in nav_buttons"  :key2="i">
        <div v-if="checked===nav.value">
          {{$route.name}}
        </div>
      </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default{
        name: "sidebar_nav",
        data(){
          return{
            nav:{
              company1: {
                id: 1,
                name: '',
                route: '',
                options:[
                  {
                    name: 'delte',
                    route: ''
                  },
                  {
                    name: 'add project',
                    route: ''
                  }
                ],
                projects:[
                  {
                    id: 10,
                    name: '',
                    route: '',
                  },
                  {
                    id: 12,
                    name: '',
                    route: '',
                  }
                ]
              },
              company2: {
                name: '',
                route: '',
                projects:{
                  name: '',
                  route: '',
                }
              }
            },

            checked:'',
            nav_buttons:{
              activities:{ //li
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
