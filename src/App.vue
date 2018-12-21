<template>
  <div id="app">
    <global_header/>
    <navigation/>
    <div class="main_content" :class="{'active_navigation': active_navigation}">
      <projects v-if="cut_route_name_prefix($route.name) === 'projects' ||
                      cut_route_name_prefix($route.name) === 'project' "/>
      <users v-else-if="cut_route_name_prefix($route.name) === 'users' ||
                         cut_route_name_prefix($route.name) === 'user' "/>
      <router-view v-else-if="cut_route_name_prefix($route.name) === 'projects' ||
                              cut_route_name_prefix($route.name) === 'project' ||
                              cut_route_name_prefix($route.name) === 'users' ||
                              cut_route_name_prefix($route.name) === 'user'"/>
    </div>
  </div>
</template>

<script>
  import Helper from './components/functions/custom_helper'
  import { mapGetters } from 'vuex'
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
    computed:{
      ...mapGetters([
        'active_navigation'
      ])
    },
    mixins:[Helper]
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

  .main_content{
    margin-top: 64px;
    position: relative;
    width: 100%;

    &.active_navigation{
      margin-left: 280px;
      width: calc(100% - 280px);
    }
  }




  ////////////////////////////////////////////////////////////////////////////////// Box-Modes

  .default_box{
    width: 100%;
    padding: 17px;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #e6e6e6;
    &.active, &:hover{
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
                  -5px -5px 15px rgba(0, 0, 0, 0.05);
    }

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

  .add_feed{
    margin-bottom: 5px;
    text-align: right;
  }


  ////////////////////////////////////////////////////////////////////////////////// Component classes inputs

  .input_error{
    font-size: 12px;
    font-weight: 600;
    color: red;
  }

  input, textarea{
    border: none;
    border-radius: 2px;
    font-size: var(--font-size);
    font-family: 'Roboto', sans-serif;
    outline: none;
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
    padding: 10px 0;
    margin-bottom: 8px;
    border: none;
  }

  .create_input_label {
    display: none;
    width: 100%;
    font-size: var(--font-size);
    color:#cdcdcd;
  }

  .edit_input, .edit_input_light{
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

  .edit_input_light{
    background: #fdfdfd;
  }





  ////////////////////////////////////////////////////////////////////////////////// Component classes images

  hr{
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #e4e4e4;
    margin: 0;
    padding: 0;
  }

  .clear{
    clear: both;
  }

</style>
