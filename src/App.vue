<template>
  <div id="app">
    <global_header/>
    <navigation/>
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
  import Global_header from "./components/header/index";
  import Navigation from "./components/navigation/index";

  export default {
    name: 'App',
    components: {
      Navigation,
      Global_header,
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
    --font-size: 13px;

    //colors
    --color-005black: #f3f3f3;
  }



  ////////////////////////////////////////////////////////////////////////////////// Responsives

  //mobile
  @media all and (min-width: 0px ) and (max-width: 640px) {
    :root {
      --font-size: 13px;
    }
  }

  //tablet
  @media all and (min-width: 641px ) and (max-width: 1007px ) {
    :root {
      --font-size: 14px;
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
    //box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);

    .head{
      padding-bottom: 27px;
    }

    .content{

    }

    .footer{

    }
  }



  ////////////////////////////////////////////////////////////////////////////////// Buttons

  button {
    border: none;
    padding: 10px 17px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 500;
    color: #b4b4b4;
    background: transparent;
    font-family: 'Roboto', sans-serif;

    &:hover{
      color: #3da0f5;
    }
  }

  .submit{
    button{
      display: block;
      margin: 40px auto 0;
      width: 30%;
      background-color: #3da0f5;
      color: white;
    }
    p{
      font-size: 13px;
      float: right;
      width: 46%;
      color: orange;
    }
  }

  .adress_buttons{
      display: block;
      width: 75%;
      margin: 0 auto;
      button{
        width: 40%;
        background-color: #3da0f5;
        margin: 40px 5% 0;
        color: white;
        float: left;
      }
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


  ////////////////////////////////////////////////////////////////////////////////// Component classes inputs
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
    font-size: var(--font-size);
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
      margin-top: 8px;
      border: none;
      border-top: 1px solid #e6e6e6;
      padding-left: 0;
      outline: none;
    }

    .create_input_label{
      display: none;
    }
  }



  ////////////////////////////////////////////////////////////////////////////////// Component classes images

  header{
    .user_image{
      .image_wrapper{
        border:1px;
      }
    }
  }

  .posts_user_image{
    .image_wrapper{
      float: left;
      margin-right: 17px;
      border-width: 1px !important;
    }
  }

  .clear{
    clear: both;
  }

</style>
