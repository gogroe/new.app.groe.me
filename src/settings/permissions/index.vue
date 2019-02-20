<template>
  <div class="permission">
    <ul>
      <li v-for="(permission, p_key) in request_get_permissions.data"
          :key="p_key"
          :class="{'active': active.navigation === p_key}"
          @click="active.navigation = p_key">
        {{translate(p_key)}}
      </li>
    </ul>
    <div class="content">
      <permission_table :permissions="permissions_data" :name="translate(active.navigation)"/>
    </div>
    <div class="clear"></div>
    <request :obj="request_get_permissions" v-model="request_get_permissions"/>
  </div>
</template>

<script>
  import Custom_helper from '../../components/functions/custom_helper'
  import Request from "../../components/functions/request";
  import Permission_table from "./table";

  export default {
    name: "permissions",
    components: {Permission_table, Request},
    data(){
      return {
        active:{
          navigation: 'list'
        },
        request_get_permissions:{
          params: {},
          url: 'https://newbackend.groe.me/settings_permission/get_all',
          data: {},
          request: false
        }
      }
    },
    computed:{
      permissions_data(){
        return this.active.navigation in this.request_get_permissions.data
          ? this.request_get_permissions.data[this.active.navigation]
          : {}
      }
    },
    mounted(){
      this.request_get_permissions.request = true
    },
    mixins:[Custom_helper]
  }
</script>

<style lang="scss" scoped>

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
