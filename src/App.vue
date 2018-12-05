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

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700,800,900');
  @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');



  ////////////////////////////////////////////////////////////////////////////////// Variables

  :root {
    //fonts
    --font-size: 18px;

    //colors
    --color-005black: #f3f3f3;
  }



  ////////////////////////////////////////////////////////////////////////////////// Responsives

  //mobile
  @media all and (min-width: 0px ) and (max-width: 640px) {
    :root {
      --font-size: 16px;
    }
  }

  //tablet
  @media all and (min-width: 641px ) and (max-width: 1007px ) {
    :root {
      --font-size: 16px;
      --col: 100%;
    }
  }



  ////////////////////////////////////////////////////////////////////////////////// Basics

  html {
    font-family: 'Roboto', sans-serif;color: #7f7f7f;
    font-weight: 500;
    font-size: var(--font-size);
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    background-color: var(--color-005black);
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }



  ////////////////////////////////////////////////////////////////////////////////// Box-Modes

  .default_box{
    width: 100%;
    padding: 17px;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #e6e6e6;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);

    .head{

    }

    .content{

    }

    .footer{

    }
  }



  ////////////////////////////////////////////////////////////////////////////////// Buttons

  button {

  }



  ////////////////////////////////////////////////////////////////////////////////// Font-Tags

  h1 {

  }



  ////////////////////////////////////////////////////////////////////////////////// Elements

  ul{
    list-style-type: none;
  }

  .default_scrollbar{
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f3f3f3;
    }

    &::-webkit-scrollbar-thumb {
      margin: 1px;
      background: #cdcdcd;
      border-radius: 5px;
      border: solid #fff 1px;

      &:hover {
        background: #3da0f5;
      }
    }
  }


</style>
