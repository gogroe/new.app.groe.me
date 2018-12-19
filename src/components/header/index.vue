<template>
    <div>
      <header>
        <div class="menu">
          <i class="material-icons" @click="$store.commit('update_active_navigation', !active_navigation)">menu</i>
          <span class="groe">groe</span><span class="dot">.</span><span class="ad">ad's</span> <span>&nbsp | &nbsp Benutzer</span>
        </div>
        <div class="profile">
          <user_image class="user_image" :path="users_image" size="35"/>
          <div class="details">
            <user_name :name="user_name" :id="user_id" class="user_name"/> &nbsp | &nbsp <a class="user_account">{{user_account}}</a>
          </div>
        </div>
      </header>
      <request :obj="request_header" v-model="request_header"/>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../components/functions/request";
  import User_image from "../user_image/index";
  import User_name from "../user_name/index";

  //todo ad user id in backend an frontend for routing

  export default {
    name: "global_header",
    components: {
      User_name,
      User_image,
      Request
    },
    data(){
      return{
        request_header: {
          params: {
            uid: null //todo auth/change
          },
          url: 'http://newbackend.groe.me/users/get_user_header',
          data: {},
          request: false
        }
      }
    },
    computed:{
      ...mapGetters([
        'active_navigation',
        'get_header',
        'uid',
        'reload'
      ]),
      user_id(){
        return 'id' in this.request_header.data
          ? this.request_header.data.id
          : null
      },
      user_name(){
        return 'lastname' in this.request_header.data || 'firstname' in this.request_header.data
          ? this.request_header.data.firstname + ' ' + this.request_header.data.lastname
          : null
      },
      users_image(){
        return 'image' in this.request_header.data
          ? this.request_header.data.image
          : null
      },
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

      reload: function (boolean) {
        if(boolean){
          this.request_header.params.uid = this.uid //todo auth/change
          this.request_header.request = true
        }
      }
    },
    mounted(){
      this.get_request_header()
    },
    methods:{
      get_request_header(){
        this.request_header.params.uid = this.uid
        this.request_header.request = true
        return true
      }
    }
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

    i{
      font-size: 24px;
      line-height: 30px;
      margin: 6px 43px 6px 6px;
      color: #bfbfbf;
      cursor: pointer;

      &:hover{
        color: #404040;
      }
    }

    span{
      display: inline-block;
      padding-top: 8px;
      font-size: 20px;
      vertical-align: top;
      color: #bfbfbf;
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
    }

    .details{
      margin-left: 17px;
      margin-top: 10px;
      float:left;

      .user_name{
        font-weight: 700;
        display: inline;
      }

      .user_account{
        color: #3da0f5;
      }
    }
  }
</style>
