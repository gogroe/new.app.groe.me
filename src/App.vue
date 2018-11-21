<template>
  <div id="app">
    <projects v-if="$route.name === 'projects'"/>
    <users v-else-if="$route.name === 'users'"/>
    <login v-else-if="$route.name === 'users'"/>
    <router-view v-else-if="$route.name !== 'projects' || $route.name === 'users'"/>
  </div>
</template>

<script>
import Projects from "./projects/index";
import Users from "./users/index";
import Login from "./login/index";
export default {
  name: 'App',
  components: {Login, Users, Projects}
}
</script>

<style>
  button {

  }

  h1 {

  }


</style>
