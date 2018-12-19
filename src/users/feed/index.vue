<template>
    <div>
      <div class="feed">
        <ul>
          <h6 class="lable">MENU</h6>
          <li v-for="(navigation, i) in navigations" :key="i"
              @click="$router.push('/users/' + $route.params.id + '/' + navigation.route)"
              :class="{'active': $route.name === 'users_' + navigation.route}"
              v-if="navigation.section === 'menu'"><span class="dot">&#9679;</span> {{navigation.name}}</li>
          <h6 class="lable more">EINSTELLUNGEN</h6>
          <li v-for="(navigation, i) in navigations" :key="i"
              @click="$router.push('/users/' + $route.params.id + '/' + navigation.route)"
              :class="{'active': $route.name === 'users_' + navigation.route}"
              v-if="navigation.section === 'settings'"><span class="dot">&#9679;</span> {{navigation.name}}</li>
        </ul>
        <div class="router_feed">
          <router-view/>
        </div>
        <div class="clear"></div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "users_feed",
    data(){
      return{
        navigations:{
          trophies:{
            name: 'Tropähen',
            route: 'profile',
            section: 'menu'
          },
          accounts:{
            name: 'Konto',
            route: 'account',
            section: 'menu'
          },
          vita:{
            name: 'Vita',
            route: 'vita',
            section: 'menu'
          },
          progress:{
            name: 'Verlauf',
            route: 'progress',
            section: 'menu'
          },
          admin:{
            name: 'Verwalten',
            route: 'admin',
            section: 'settings'
          },
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .feed{
    position:relative;
    width: 800px;
    padding-top: 55px;
    margin-left: calc(50% - 400px);
  }

  ul{
    width: 200px;
    float: left;
    padding-right: 10px;

    h6{
      margin-left: 10px;
      margin-bottom: 10px;

      &.more{
        margin-top: 27px;
      }
    }

    li{
      height: 50px;
      font-size: 14px;
      line-height: 14px;
      padding: 17px 18px;
      margin-bottom: 1px;
      border-radius: 2px;
      font-weight: 600;
      cursor: pointer;
      color: #333333;

      .dot {
        margin-right: 27px;
        font-size: 20px;
        line-height: 14px;
      }

      &.active{
        color: #ff3434;
        background: #e9e9e9;
        
        .dot{
          text-shadow:  3px  3px 3px #fff,
          3px -3px 3px #fff,
          -3px  3px 3px #fff,
          -3px -3px 3px #fff;
        }
      }

      &:hover{
        background: #e9e9e9;
      }
    }
  }

  .router_feed{
    width: 600px;
    float: left;
  }

</style>
