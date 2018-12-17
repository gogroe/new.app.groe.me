<template>
  <div>
    <div class="u_head default_box">
      <user_image class="user_image" :path="users_image" size="120"/>
      <p class="user_name">{{user_name}}</p>
      <a @click="active.description = !active.description" class="desription">
        Steckbrief <i class="material-icons">arrow_drop_down</i>
      </a>
      <p v-if="active.description">{{user_description}}</p>
    </div>
    <request :obj="request_head" v-model="request_head"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../functions/request";
  import User_image from "../user_image/index";

  export default {
    name: "u_head",
    components: {
      User_image,
      Request},
    data(){
      return {
        request_head: {
          params: {
            user_id: null
          },
          url: 'http://newbackend.groe.me/users/get_user_header',
          data: {},
          request: false
        },
        active: {
          description: false
        }
      }
    },
    computed:{
      user_name(){
        if('lastname' in this.request_head.data || 'firstname' in this.request_head.data ){
          return this.request_head.data.firstname + ' ' + this.request_head.data.lastname
        }
        else {
          return null
        }
      },
      users_image(){
        if('image' in this.request_head.data ){
          if (this.request_head.data.image === null) {
            return '/static/layout/default_profile_image_female.jpg'
          }
          else {
            return this.request_head.data.image
          }
        }
        else {
          return null
        }
      },
      user_description(){
        if('decription' in this.request_head.data ){
          return this.request_head.data.description
        }
        else {
          return null
        }
      },
      ...mapGetters([])
    },
    mounted(){
      this.request_head.params.user_id = this.$route.params.id
      this.request_head.request = true
    }
  }
</script>

<style lang="scss" scoped>

  .u_head {
    height: 280px;
    margin-bottom: 17px;
    text-align: center;
  }

  .user_image{
    margin: 25px calc(50% - 60px);
  }

  .user_name{
    font-size: 18px;
  }

  a{
    cursor: pointer;

    i{
      vertical-align: -7px;
    }
  }

  .desription{
    color: #3da0f5;
  }

</style>
