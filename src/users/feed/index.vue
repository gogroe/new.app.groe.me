<template>
    <div>
      <div class="feed">
        <ul>
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
    width: 800px;
    padding-top: 55px;
    margin-left: calc(50% - 400px);
  }

  ul{
    width: 200px;
    float: left;

    li{
      font-size: 16px;
      font-weight: 500;
      padding: 4px 0;
      cursor: pointer;

      &.active{
        color: #000;
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
