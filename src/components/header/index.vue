<template>
    <div>
      <header>
        <img class="logo" src="/static/layout/logo.png"/>
        <div class="profile">
          <!--<user_image class="user_image" :path="users_image" size="50"/>-->
          <div class="details">
            <a>{{user_name}}</a>
            <p>{{user_account}}</p>
          </div>
        </div>
      </header>
      <request :obj="request_header" v-model="request_header"/>
    </div>
</template>

<script>
import Request from "../../components/functions/request";
import User_image from "../user_image/index";
  export default {
    name: "global_header",
    components: {
      User_image,
      Request
    },
    data(){
      return{
        request_header: {
          params: {
            user_id: null //todo delete when authentication is implemented
          },
          url: 'http://newbackend.groe.me/users/get_user_header',
          data: {},
          request: false
        }
      }
    },
    computed:{
      user_name(){
        if('lastname' in this.request_header.data || 'firstname' in this.request_header.data ){
          return this.request_header.data.firstname + ' ' + this.request_header.data.lastname
        }
        else {
          return null
        }
      },
      users_image(){
        if('image' in this.request_header.data ){
          return this.request_header.data.image
        }
        else {
          return null
        }
      },
      user_account(){
        if('account' in this.request_header.data){
          return this.request_header.data.account + ' Euro'
        }
        else {
          return '0,00 Euro' //todo set null when account is added
        }
      }
    },
    mounted(){
      this.get_request_header()
    },
    methods:{
      get_request_header(){
        this.request_header.params.user_id = this.$route.params.id
        this.request_header.request = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    z-index: 1000;
    width: 100%;
    height: 90px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    text-align: center;
  }

  .logo {
    position: absolute;
    left:0;
    margin:15px;
    width: 60px;
    height: 60px;
  }

  .profile{
    position: absolute;
    right: 0;
    margin: 20px;
    height: 60px;
    text-align: left;

    .user_image{
      float:left;
    }

    .details{
      margin-left: 17px;
      float:left;

      a{
        font-weight: 700;
      }

      p{
        font-size: 12px;
        font-weight: 500;
        color: #3da0f5;
      }
    }
  }
</style>
