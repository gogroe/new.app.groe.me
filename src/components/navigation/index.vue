<template>
  <div class="navigation" v-if="active_navigation">
    <ul class="default_scrollbar">
      <li v-for="(navigation, i) in navigations"
          :key="i"
          @click="$router.push(navigation.route)"
          :class="{'active': $route.name === 'users_' + navigation.route}">
        <i class="material-icons">{{navigation.icon}}</i>
        <span>{{navigation.name}}</span>
      </li>
    </ul>
    <hr>
    <a>Einstellungen</a>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "navigation",
    data(){
      return{
        navigations:{
          homepage:{
            name: 'Startseite',
            route: 'profile',
            icon: 'home'
          },
          user:{
            name: 'Benutzer',
            route: '/users/',
            icon: 'face'
          },
          project:{
            name: 'Projekte',
            route: '/projects/',
            icon: 'work'
          },
          article:{
            name: 'Artikel',
            route: '',
            icon: 'receipt'
          },
          task:{
            name: 'Aufgaben',
            route: '',
            icon: 'playlist_add_check'
          },
          comunity:{
            name: 'Community',
            route: '',
            icon: 'group_work'
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'active_navigation'
      ])
    }
  }
</script>

<style lang="scss" scoped>


  .navigation{
    height: 100%;
    width: 280px;
    position: fixed;
    margin-top: 64px;
    top:64px;
    left:0;
  }

  ul{
    width: 100%;

    li{
      font-size: 18px;
      line-height: 18px;
      padding: 17.5px 17.5px 17.5px 64px;
      margin-bottom: 1px;
      width: 100%;
      cursor: pointer;
      &.active{
        color: #ff3434;
        background: #e9e9e9;
      }

      &:hover{
        background: #e9e9e9;
      }

      i{
        margin-right: 27px;
        font-size: 35px;
        vertical-align: middle;
      }
    }
  }

  hr{
    margin: 27px 0 64px 0;
    border-top: 1px solid #e9e9e9;
  }

  a{
    font-size: 18px;
    font-weight: 400;
    color: #bfbfbf;
    padding: 10px 10px 10px 64px;
  }

</style>
