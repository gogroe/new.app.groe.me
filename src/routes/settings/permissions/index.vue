<template>
  <div class="permission">
    <ul>
      <h6>RECHTE MENU</h6>
      <li v-for="(permission, p_key) in request_get_permissions.data"
          :key="p_key"
          :class="{'active': active.navigation === p_key}"
          @click="active.navigation = p_key">
        {{translate(p_key)}}
      </li>
    </ul>
    <div class="content">
      <permission_table :permissions="permissions_data"
                        :name="active.navigation"/>
    </div>
    <div class="clear"></div>
    <request :obj="request_get_permissions" v-model="request_get_permissions"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Custom_helper from '../../../components/functions/custom_helper'
  import Request from "../../../components/functions/request";
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
      ...mapGetters([
        'reload'
      ]),
      permissions_data(){
        return this.active.navigation in this.request_get_permissions.data
          ? this.request_get_permissions.data[this.active.navigation]
          : {}
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'settings_permission'){
          this.$store.commit('update_reload', { action: null, section: null })
          this.request_get_permissions.request = true
        }
      },
    },
    mounted(){
      this.request_get_permissions.request = true
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
    width: calc(100% - 280px);
  }

</style>
