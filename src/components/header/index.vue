<template>
    <div>
      <header>
        <div class="menu">
          <i class="material-icons" @click="$store.commit('update_active_navigation', !active_navigation)">menu</i>
          <img src="../../../static/layout/logo.png"/>
          <span class="groe">groe</span> <span class="ad">app</span>
        </div>
        <div class="profile">
          <div class="details">
            <i class="material-icons">account_balance_wallet</i> <a class="user_account">{{user_account.replace('.',',')}}</a>
          </div>
          <user_visual
            class="user_image"
            :path="request_header_data.image"
            :name="request_header_data.firstname + ' ' + request_header_data.lastname"
            size="35"/>
        </div>
      </header>
      <request :obj="request_header" v-model="request_header"/>
    </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import Load_request from "../../components/functions/load_request"
  import Request from "../../components/functions/request";
  import User_name from "../user_name/index";
  import User_visual from "../user_visual/index";

  //todo ad user id in backend an frontend for routing

  export default {
    name: "global_header",
    components: {
      User_visual,
      User_name,
      Request
    },
    data(){
      return{
        request_header: {
          params: {
            user_id: this.uid
          },
          url: 'https://newbackend.groe.me/header/get_one',
          data: {},
          request: false
        }
      }
    },
    computed:{
      ...mapGetters([
        'active_navigation',
        'reload',
        'uid'
      ]),
      user_account(){
        return 'account' in this.request_header.data
          ? this.request_header.data.account + ' Euro'
          : '0,00 Euro'
      },
      request_header_data(){
        return this.request_header.data
      }
    },
    watch:{
      request_header_data: function (object) {
        this.$store.commit('update_header', object)
      },
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'all'){
          this.request_header.request = true
          this.$store.commit('update_reload', {action: null, section: null})
        }
        if(object.action === 'reload' && object.section === 'header'){
          this.request_header.request = true
          this.$store.commit('update_reload', {action: null, section: null})
        }
      },
    },
    mounted(){
      this.request_header.user_id = this.uid
      this.request_header.request = true
    },
    mixins:[Load_request],
  }
</script>

<style lang="scss" scoped>

  header {
    z-index: 1000;
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    text-align: center;
  }

  .menu{
    position: absolute;
    padding: 10px 18px;
    cursor: pointer;
    color: #596066;

    img{
      height: 35px;
      vertical-align: middle;
      margin-right: 6px;
    }

    i{
      vertical-align: middle;
      font-size: 24px;
      line-height: 30px;
      margin: 6px 17px 6px 6px;
      cursor: pointer;

      &:hover{
        color: #596066;
      }
    }

    span{
      display: inline-block;
      padding-top: 8px;
      font-size: 20px;
      vertical-align: top;
      font-weight: 300;

      &.groe{
        font-weight: 500;
      }

      &.dot{
        color: #3da0f5;
        font-weight: 900;
      }
    }

    .logo {
      position: absolute;
      left:0;
      margin:10px 18px;
      width: 43px;
      height: 43px;
    }
  }

  .profile{
    position: absolute;
    right: 0;
    margin: 13px 18px;
    height: 60px;
    text-align: left;

    .user_image{
      float:left;
      cursor: pointer;
    }

    .details{
      font-weight: 500;
      margin-right: 27px;
      margin-top: 7px;
      float:left;
      color: #a5adb3;

      i {
        vertical-align: middle;
      }
    }
  }
</style>
