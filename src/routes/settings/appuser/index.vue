<template>
  <div class="appuser">
    <ul>
      <h6>NUTZER MENU</h6>
      <li v-for="(user, p_key) in request_get_users.data"
          :key="p_key"
          :class="{'active': active.navigation === p_key}"
          @click="active.navigation = p_key">
        <user_visual class="user_visual"
                     :name="user.firstname + ' ' + user.lastname"
                     :path="user.image"
                     size="35"/>
        <span class="user_name">{{user.firstname + ' ' + user.lastname}}</span>
      </li>
    </ul>
    <div class="content">
      <appuser_content/>
    </div>
    <div class="clear"></div>
    <request :obj="request_get_users" v-model="request_get_users"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Custom_helper from '../../../components/functions/custom_helper'
  import Request from "../../../components/functions/request";
  import User_visual from "../../../components/user_visual/index";
  import User_name from "../../../components/user_name/index";
  import Edit from "../../../components/inputs/edit";
  import Appuser_content from "./content";

  export default {
    name: "appuser",
    components: {Appuser_content, Edit, User_name, User_visual, Request},
    data(){
      return {
        active:{
          navigation: null
        },
        request_get_users:{
          params: {},
          url: 'https://newbackend.groe.me/settings_user/get_all',
          data: {},
          request: false
        },
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      user_data(){
        return this.active.navigation in this.request_get_users.data
          ? this.request_get_users.data[this.active.navigation]
          : {}
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'settings_user'){
          this.$store.commit('update_reload', { action: null, section: null })
          this.request_get_users.request = true
        }
      },
    },
    mounted(){
      this.request_get_users.request = true
    },
    mixins:[Custom_helper]
  }
</script>

<style lang="scss" scoped>

  .permission{
    height: 100%;
  }

  ul{
    float: left;
    width: 280px;
    height: 100%;
    padding-top: 27px;
    padding-left: 17px;
    border-right: 1px solid #e6e6e6;

    h6{
      margin-bottom: 10px;
    }

    li{
      cursor: pointer;
      height:64px;
      line-height: 18px;
      padding: 7px 0 1px 0;

      &.active, &:hover{
        color: #3da0f5;
      }

      .user_visual{
        vertical-align: middle;
        display: inline-block;
      }

      span{
        margin-left: 17px;
        display: inline;
      }
    }
  }

  .content{
    float: left;
    width: calc(100% - 280px);
  }

</style>
