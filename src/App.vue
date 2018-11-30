<template>
  <div id="app">
    <projects v-if="cut_path($route.path) === '/projects'"/>
    <users v-else-if="cut_path($route.path) === '/users'"/>
    <router-view v-else-if="
      cut_path($route.path) !== 'projects' ||
      cut_path($route.path) !== 'users'"/>
  </div>
</template>

<script>
  import Projects from "./projects/index";
  import Users from "./users/index";
  import Login from "./login/index";
  import Register from "./register/index";

  export default {
    name: 'App',
    components: {
      Register,
      Login,
      Users,
      Projects
    },
    methods:{
      cut_path(path){
        return path.substring(path.indexOf('/'),path.indexOf('/', 1));
      }
    }
  }
</script>

<style>
  button {

  }

  h1 {

  }


</style>
