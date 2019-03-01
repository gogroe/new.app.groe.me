<template>
  <div id="app">
    <global_header v-if="basic_component"/>
    <navigation v-if="basic_component"/>
    <bubble/>
    <div class="main" :class="[{'active_navigation': active_navigation}, {'main_content': basic_component}]">
      <users v-if="cut_route_name_prefix($route.name) === 'users' ||
                   cut_route_name_prefix($route.name) === 'user' "/>
      <router-view v-else-if="is_perm('read')"
      />
    </div>
  </div>
</template>

<script>
  var cookie = require('js-cookie')
  import Helper from './components/functions/custom_helper'
  import Bubble from './components/bubble'
  import Permission from './components/functions/permission'
  import { mapGetters } from 'vuex'
  import Users from "./routes/user/index";
  import Global_header from "./components/header/index";
  import Navigation from "./components/navigation/index";

  export default {
    name: 'App',
    components: {
      Navigation,
      Global_header,
      Users,
      Bubble
    },
    data(){
      return{
        basic_component: true,
      }
    },
    mounted(){
      this.set_basic_component()
    },
    computed:{
      ...mapGetters([
        'active_navigation'
      ]),
      route: function(){
        return this.$route
      }
    },
    watch:{
      route (to, from) {
        this.set_basic_component()
      }
    },
    created(){
      this.update_auth()
      this.$store.commit('update_perm_perm', this.list_permissions['read'])
    },
    methods:{
      update_auth(){
        let cookieData = cookie.getJSON('auth')

        if('uid' in cookieData && 'token' in cookieData){
          let auth = {
            uid: cookieData.uid,
            token: cookieData.token
          }
          this.$store.commit('update_auth', auth)
        }
      },
     set_basic_component: function(){
     switch(this.$route.name)
      {
        case 'signup':
        case 'verification':
        case 'login':
        case 'notification':
        case '404':
          this.basic_component = false
          break;
        default:
          this.basic_component = true
          break;
        }
      }
    },
    mixins:[Helper,Permission]
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

    .full_fixed {
      position: fixed;
      width: 100%;
      height: calc(100vh - 64px);

      .inner_full_fixed{
        position: relative;
        width: 100%;
        height: 100%;
      }
    }

    &.active_navigation{
      margin-left: 280px;
      width: calc(100% - 280px);

      .full_fixed{
        width: calc(100% - 280px);
        height: calc(100vh - 64px);
      }
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

  .section_name{
    color: #bbbbbb;
    margin-bottom: 17px;
  }

  .add_wrapper{
    width: 100%;
    height: 43px;
  }


  .default_popup_background{
    position: fixed;
    top:64px;
    left:0;
    width: 100%;
    height: calc(100% - 64px);
    z-index: 9000;
    background: rgba(0,0,0,0.9);

    .inner_popup{
      width: 450px;
      padding: 17px;
      position: relative;
      background: #fff;
      margin-left: calc(50% - 225px);
      margin-top: 101px;
      border-radius: 2px;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////// Buttons

  button {
    border: none;
    padding: 10px 17px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #3da0f5;
    background: transparent;
    font-family: 'Roboto', sans-serif;

    &:hover, &:focus{
      color: #383838;
      outline: 2px solid rgba(61,160,245,0.5);
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
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      margin: 1px;
      background: #cdcdcd;
      border-radius: 2px;
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
      font-size: var(--font-size);
    }
    &::-moz-placeholder { /* Firefox 19+ */
      font-family: 'Roboto', sans-serif;
      font-size: var(--font-size);
    }
    &:-ms-input-placeholder { /* IE 10+ */
      font-family: 'Roboto', sans-serif;
      font-size: var(--font-size);
    }
    &:-moz-placeholder { /* Firefox 18- */
      font-family: 'Roboto', sans-serif;
      font-size: var(--font-size);
    }
  }

  label{
    font-size: var(--font-size);
    display: inline-block;
  }

  .create_input {
    width: calc(100% - 17px);
    padding: 10px;
    margin-left: 7px;
    margin-bottom: 8px;
    border-radius: 4px;
    border: 2px solid transparent;

    &:hover, &:focus{
      border: 2px solid #3da0f5;
    }
  }

  .create_input_select {
    .v-select {
      .dropdown-toggle {
        margin-left: 7px;
        margin-bottom: 8px;
        padding: 4px 5px 8px 0px;
        border-radius: 4px;
        border: 2px solid transparent;

        &:hover, &:focus{
          border: 2px solid #3da0f5;
        }
      }
    }
  }

  .create_input_label, .crm_label {
    display: none;
    width: 100%;
    font-size: var(--font-size);
    color:#cdcdcd;
  }

  .crm_input{
    font-size: 13px;
    width: 140px;
    border: 1px solid #3da0f5;
    padding: 5px;
    margin: 19px 12px;
  }

  .crm_input_select{
    .v-select {
      .dropdown-toggle {
        position: absolute;
        font-size: 13px;
        width: 140px;
        height: 27px;
        margin-top: 19px;
        margin-left: 12px;
        padding: 0 0 5px;
        border: 1px solid #3da0f5;
        border-radius: 2px;
      }

      .dropdown-menu {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        min-width: 140px;
        padding: 5px 0;
        margin: 0;
        width: 100%;
        overflow-y: auto;
        border: 1px solid #3da0f5;
        box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);
        border-top: none;
        border-radius: 0 0 2px 2px;
      }
    }
  }

  .edit_input{
    width: 60%;
    padding: 4px;
    margin-bottom: 8px;
    border-bottom: 1px solid transparent;

    &:hover, &:focus{
      border-bottom: 1px solid #3da0f5;
    }

    &.vdp-datepicker{
      font-size: 13px;
      display: inline-block;

      input{
        padding: 0;
      }
    }
  }

  .edit_input_select{
    display: inline-block;
    .v-select {
      .dropdown-toggle {
        font-size: 13px;
        width: 226px;
        height: 27px;
        padding: 0 0 4px 0;
        margin-top: 0;
        margin-bottom: 8px;
        border: none;
        border-bottom: 1px solid transparent;
        border-radius: 2px;

        .selected-tag{
          margin: 0;
          padding: 0 0 0 1px;
          font-weight: 400;
        }

        .form-control{
          margin-top: 0;
          padding: 0;
        }
      }

      .dropdown-menu {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        min-width: 140px;
        padding: 5px 0;
        margin: 0;
        width: 100%;
        overflow-y: auto;
        border: 1px solid #3da0f5;
        box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);
        border-top: none;
        border-radius: 0 0 2px 2px;
      }
    }
  }

  .edit_input_label{
    width: 38%;
    padding: 4px;
    padding-right: 20px;
    text-align: right;
    margin-bottom: 8px;
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
