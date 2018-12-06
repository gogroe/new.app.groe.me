<template>
    <div>
      <div class="feed">
        <ul>
          <p class="lable">MENU</p>
          <li @click="$router.push('/users/' + $route.params.id + '/profile')"
              :class="{'active': $route.name === 'users_profile'}">Profil</li>
          <li @click="$router.push('/users/' + $route.params.id + '/account')"
              :class="{'active': $route.name === 'users_account'}">Konto</li>
          <li @click="$router.push('/users/' + $route.params.id + '/vita')"
              :class="{'active': $route.name === 'users_vita'}">Vita</li>
          <li @click="$router.push('/users/' + $route.params.id + '/progress')"
              :class="{'active': $route.name === 'users_progress'}">Verlauf</li>
          <li @click="$router.push('/users/' + $route.params.id + '/task')"
              :class="{'active': $route.name === 'users_task'}">Aufgaben</li>
          <p class="lable more">EINSTELLUNGEN</p>
          <li @click="$router.push('/users/' + $route.params.id + '/admin')"
              :class="{'active': $route.name === 'users_admin'}">Verwalten</li>
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
        name: "users_feed"
    }
</script>

<style lang="scss" scoped>
  .feed{
    position:relative;
    width: 800px;
    padding-top: 55px;
    margin-left: calc(50% - 400px + 100px);
  }

  ul{
    width: 200px;
    float: left;

    .lable{
      font-size: 10px;
      color: #cdcdcd;
      margin-bottom: 10px;

      &.more{
        margin-top: 27px;
      }
    }

    li{
      font-size: 16px;
      font-weight: 600;
      padding: 4px 0;
      cursor: pointer;
      color: #333333;

      &.active{
        color: #3da0f5;
      }
    }
  }

  .router_feed{
    width: 600px;
    float: left;
  }

  .clear{
    clear: both;
  }
</style>
