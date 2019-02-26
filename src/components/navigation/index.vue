<template>
  <div class="navigation" v-if="active_navigation">
    <ul class="default_scrollbar">
      <li v-for="(navigation, i) in navigations"
          :key="i"
          @click="$router.push({name: navigation.route})"
          :class="{'active': set_active_class(navigation)}">
        <i class="material-icons">{{navigation.icon}}</i>
        <span>{{navigation.name}}</span>
      </li>
    </ul>
    <hr>
    <a v-for="(navigation, i) in navigations_admin"
       :key="i"
       @click="$router.push({name: navigation.route})">
      {{navigation.name}}</a>
  </div>
</template>

<script>
  import Helper from '../functions/custom_helper'
  import { mapGetters } from 'vuex'

  export default {
    name: "navigation",
    data(){
      return{
        navigations:{
          homepage:{
            name: 'Startseite',
            route: 'user_vita',
            icon: 'home'
          },
          user:{
            name: 'Benutzer',
            route: 'users',
            icon: 'face'
          },
          project:{
            name: 'Projekte',
            route: 'projects',
            icon: 'work'
          },
          article:{
            name: 'Artikel',
            route: 'articles',
            icon: 'receipt'
          },
          task:{
            name: 'Aufgaben',
            route: 'tasks',
            icon: 'playlist_add_check'
          },
          comunity:{
            name: 'Community',
            route: 'communitys',
            icon: 'group_work'
          }
        },
        navigations_admin:{
          homepage:{
            name: 'Einstellungen',
            route: 'appuser',
          },
        }
      }
    },
    computed:{
      ...mapGetters([
        'active_navigation'
      ])
    },
    methods:{
      set_active_class(navigation){
        if( this.cut_route_name_prefix(this.$route.name) === this.cut_route_name_prefix(navigation.route) &&
            this.cut_route_name_prefix(this.$route.name) !== '' ){
          return true
        }
        else if(this.cut_route_name_prefix(this.$route.name) ===  navigation.route){
          return true
        }
        else if(this.$route.name === navigation.route){
          return true
        }
        else {
          return false
        }
      }
    },
    mixins:[Helper]
  }
</script>

<style lang="scss" scoped>


  .navigation{
    height: 100%;
    width: 227px;
    position: fixed;
    margin-top: 64px;
    top:64px;
    left:0;
  }

  ul{
    width: 100%;

    li{
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      padding: 14px 14px 14px 27px;
      margin-bottom: 1px;
      width: 100%;
      cursor: pointer;
      border-radius: 2px;
      color: #7f7f7f;
      &.active{
        color: #ff3434;
        background: #e9e9e9;
      }

      &:hover{
        background: #e9e9e9;
      }

      i{
        margin-right: 27px;
        font-size: 27px;
        vertical-align: middle;
      }
    }
  }

  hr{
    margin: 17px 0 27px 0;
    border-top: 1px solid #e9e9e9;
  }

  a{
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: #bfbfbf;
    padding: 10px 10px 10px 27px;
  }

</style>
