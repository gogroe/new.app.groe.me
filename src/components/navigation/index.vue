<template>
  <div class="navigation" v-if="active_navigation">
    <ul class="default_scrollbar">
      <li v-for="(navigation, i) in navigations"
          :key="i"
          v-if="hasPerm(navigation.perm)"
          @click="$router.push({name: navigation.route})"
          :class="{'active': set_active_class(navigation)}">
        <i class="material-icons">{{navigation.icon}}</i>
        <span>{{navigation.name}}</span>
      </li>
    </ul>
    <hr>
    <a v-for="(navigation, i) in navigations_admin"
       :key="i"
       v-if="hasPerm(navigation.perm)"
       :class="{'active': set_active_class(navigation)}"
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
            icon: 'home',
            perm: null
          },
          user:{
            name: 'Benutzer',
            route: 'crm_user_member',
            icon: 'face',
            perm: 'admin_read'
          },
          // project:{
          //   name: 'Projekte',
          //   route: 'project',
          //   icon: 'work'
          // },
          // article:{
          //   name: 'Artikel',
          //   route: 'articles',
          //   icon: 'receipt'
          // },
          // task:{
          //   name: 'Aufgaben',
          //   route: 'tasks',
          //   icon: 'playlist_add_check'
          // },
          // comunity:{
          //   name: 'Community',
          //   route: 'communitys',
          //   icon: 'group_work'
          // }
        },
        navigations_admin:{
          homepage:{
            name: 'Nutzerrechte',
            route: 'permissions',
            perm: 'admin_read'
          },
        }
      }
    },
    computed:{
      ...mapGetters([
        'active_navigation'
      ]),
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
      },
      hasPerm (perm) {
        if( perm === null ){
          return true
        }
        else {
          return this.$$permission.is_perm(perm)
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
      font-weight: 500;
      line-height: 14px;
      padding: 14px 14px 14px 27px;
      margin-bottom: 1px;
      width: 100%;
      cursor: pointer;
      border-radius: 2px;
      color: #737a80;
      &.active{
        color: #edad00;
        background: #fff9e5;
      }

      &:hover{
        background: #f1f3f4;
        color: #1a73e8
      }

      i{
        margin-right: 25px;
        font-size: 22px;
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
    &.active{
      color: #edad00;
    }
  }

</style>
