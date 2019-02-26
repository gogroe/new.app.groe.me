<template>
  <div class="permission">
    <ul>
      <!--<li v-for="(permission, p_key) in request_get_users.data"-->
          <!--:key="p_key"-->
          <!--:class="{'active': active.navigation === p_key}"-->
          <!--@click="active.navigation = p_key">-->
        <!--{{translate(p_key)}}-->
      <!--</li>-->
    </ul>
    <div class="content">
      
    </div>
    <div class="clear"></div>
    <request :obj="request_get_users" v-model="request_get_users"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Custom_helper from '../../../components/functions/custom_helper'
  import Request from "../../../components/functions/request";

  export default {
    name: "appuser",
    components: {Request},
    data(){
      return {
        active:{
          navigation: null
        },
        request_get_users:{
          params: {},
          url: 'https://newbackend.groe.me/settings_users/get_all',
          data: {},
          request: false
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      permissions_data(){
        return this.active.navigation in this.request_get_users.data
          ? this.request_get_users.data[this.active.navigation]
          : {}
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'settings_users'){
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
    width: 180px;
    height: 100%;
    padding-top: 36px;
    padding-left: 17px;
    border-right: 1px solid #e6e6e6;

    li{
      cursor: pointer;
      height:27px;
      line-height: 18px;
      padding: 7px 0 1px 0;

      &.active, &:hover{
        color: #3da0f5;
      }
    }
  }

  .content{
    float: left;
    width: calc(100% - 180px);
  }

</style>
