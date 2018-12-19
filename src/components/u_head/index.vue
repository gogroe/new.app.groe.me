<template>
  <div>
    <div class="u_head default_box">
      <user_image class="user_image" :path="users_image" size="110"/>
      <user_name :name="user_name" id="1" class="user_name"/>
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
  import User_name from "../user_name/index";

  export default {
    name: "u_head",
    components: {
      User_name,
      User_image,
      Request},
    data(){
      return {
        request_head: {
          params: {
            user_id: null
          },
          url: 'http://newbackend.groe.me/users/get_user_head',
          data: {},
          request: false
        },
        active: {
          description: false
        }
      }
    },
    computed:{
      ...mapGetters([]),
      user_id(){
        return 'id' in this.request_head.data
          ? this.request_head.data.id
          : null
      },
      user_name(){
        return 'lastname' in this.request_head.data || 'firstname' in this.request_head.data
          ? this.request_head.data.firstname + ' ' + this.request_head.data.lastname
          : null
      },
      users_image(){
        return 'image' in this.request_head.data
          ? this.request_head.data.image
          : null
      },
      user_description(){
        return 'decription' in this.request_head.data
          ? this.request_head.data.description
          : null
      },
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
    border-radius: 120px;
    width: 120px;
    height:120px;
    border: 5px solid #f3f3f3;
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
