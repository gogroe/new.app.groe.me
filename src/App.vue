<template>
  <div id="app">
    <global_header v-if="basic_component"/>
    <navigation v-if="basic_component"/>
    <div class="main" :class="[{'active_navigation': active_navigation}, {'main_content': basic_component}]">
      <users v-if="cut_route_name_prefix($route.name) === 'users' ||
                   cut_route_name_prefix($route.name) === 'user' "/>
      <router-view v-else-if="is_perm('read')"/>
    </div>
    <snotes class="system_notes"/>
  </div>
</template>

<script>
  import Snotes from "./components/snotes/index";
  var cookie = require('js-cookie')
  import Helper from './components/functions/custom_helper'
  import Permission from './components/functions/permission'
  import { mapGetters } from 'vuex'
  import Users from "./routes/user/index";
  import Global_header from "./components/header/index";
  import Navigation from "./components/navigation/index";

  export default {
    name: 'App',
    components: {
      Snotes,
      Navigation,
      Global_header,
      Users,
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
        let cookie_auth = cookie.getJSON('auth')

        if(cookie_auth !== undefined){
          let auth = {
            uid: cookie_auth.uid,
            token: cookie_auth.token
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
    --font-size: 14px;

    //colors
    --color-005black: #fff;
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
    color: #272d33;
    font-size: var(--font-size);
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    background-color: #fff;
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

  .default{
    &.box{
      &.rounded{

        .labels{

        }

        .inputs{

        }

        .whatever{

        }
      }
    }
  }


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
  }

  .default_box_two{
    width: 100%;
    padding: 25px;
    background: #fff;

    .head{
      padding-bottom: 27px;
    }
  }

  .create_box{
    padding: 27px 17px;
    margin-bottom: 17px;
  }

  .section_name{
    color: #bbbbbb;
    margin-bottom: 17px;
  }

  .section_wrapper{
    margin-left: 17px;
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
    // background: rgba(0,0,0,0.9);
    background: rgba(255,255,255,0.75);

    .inner_popup{
      width: 450px;
      padding: 17px;
      z-index: 2;
      background: #fff;
      margin-left: calc(50% - 225px);
      margin-top: 101px;
      border-radius: 5px;
      box-shadow: 10px -10px 15px rgba(0, 0, 0, 0.075),
                  -10px 10px 15px rgba(0, 0, 0, 0.075);
    }
  }

  .unblured{
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05), -5px -5px 15px rgba(0, 0, 0, 0.05);
    width: 450px;
    padding: 17px;
    position: fixed;
    z-index: 2;
    background: #fff;
    margin-left: calc(50% - 225px);
    margin-top: 101px;
    border-radius: 2px;
  }

  .blured {
    filter: blur(10px);
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='svgMask'><feGaussianBlur stdDeviation='10' /></filter></svg>#svgMask");
  }

    .close_popup{
      position: fixed;
      right: 17px;
      top: 107px;
      cursor: pointer;
      color: #bbbbbb;
      line-height: 17px;

      &:hover{
        color: #3da0f5;
      }

      i{
        margin-left: 17px;
        vertical-align: -7px;
        font-weight: 700;
      }
    }

  ////////////////////////////////////////////////////////////////////////////////// Buttons

  button {
    margin: 25px 41px;
    cursor: pointer;
    border: none;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 500;
    color: #1a73e8;
    background: transparent;
    font-family: 'Roboto', sans-serif;

    &:hover, &:focus{
      color: #737a80;
      outline: none;
    }

    &.filled{
      padding: 10px 25px;
      color: #fff;
      background: #1a73e8;

      &:hover{
        color: #fff;
        background: #1a66cc;
      }
    }
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


  i.dropdown_arrow, i.add_plus{
    cursor: pointer;
    vertical-align: middle;
    font-size: 24px;
    border-radius: 12px;
    background: #f1f3f4;
    color:#1a73e8;
  }

  i.add_plus{
    vertical-align: middle;
    font-size: 22px;
  }




  ////////////////////////////////////////////////////////////////////////////////// Component classes inputs

  .input_error{
    font-size: 12px;
    font-weight: 600;
    color: red;
  }


  ////////////////////////////////////////////////////////////////////////////////// Component classes images

  .system_notes{
    position: fixed;
    top:90px;
    left: calc(50% - 150px)
  }

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


  //////////////////////////////////////////////////////////////////////////////// Animation

  @-webkit-keyframes fadeinout {
    0%,100% { opacity: 0; }
    5% { opacity: 1; }
  }

  @keyframes fadeinout {
    0%,100% { opacity: 0; }
    5% { opacity: 1; }
  }

</style>
