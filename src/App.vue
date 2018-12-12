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
    --font-size: 16px;

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
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    color: #333333;
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
      padding-bottom: 17px;
    }

    .content{

    }

    .footer{

    }
  }



  ////////////////////////////////////////////////////////////////////////////////// Buttons

  button {
    border: none;
    padding: 10px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    font-family: 'Roboto', sans-serif;
  }



  ////////////////////////////////////////////////////////////////////////////////// Font-Tags

  h1 {

  }

  h6{
    font-size: 10px;
    font-weight: 600;
    color: #cdcdcd;
  }



  ////////////////////////////////////////////////////////////////////////////////// Elements

  ul{
    list-style-type: none;
    padding: 0;
  }

  .default_scrollbar{
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      margin: 1px;
      background: #cdcdcd;
      border-radius: 5px;
      border: solid transparent 1px;

      &:hover {
        background: #3da0f5;
      }
    }
  }


  ////////////////////////////////////////////////////////////////////////////////// Component classes
  .input_error{
    font-size: 12px;
    font-weight: 600;
    color: red;
  }

  .navigation_user_image{
    .image_wrapper{
      border-color: #505050 !important;
    }
  }

  input, textarea{
    border: 1px solid #cdcdcd;
    border-radius: 2px;
    font-size: var(--font-size);
    font-family: 'Roboto', sans-serif;
    outline-color: #3da0f5;
    display: inline-block;

    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      font-family: 'Roboto', sans-serif;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      font-family: 'Roboto', sans-serif;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      font-family: 'Roboto', sans-serif;
    }
    &:-moz-placeholder { /* Firefox 18- */
      font-family: 'Roboto', sans-serif;
    }
  }

  label{
    font-size: var(--font-size);
    display: inline-block;
  }

  .create_input {
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
  }

  .create_input_label {
    width: 100%;
    font-size: 12px;
    color:#cdcdcd;
  }

  .edit_input{
    width: 60%;
    padding: 4px;
    margin-bottom: 8px;
  }

  .edit_input_label{
    width: 38%;
    padding: 4px;
    padding-right: 20px;
    text-align: right;
    margin-bottom: 8px;
  }

  .articles{
    .create_input_label{
      display: none;
    }
  }

  .article_comments{
    .create_input{

    }

    .create_input_label{
      display: none;
    }
  }


</style>
