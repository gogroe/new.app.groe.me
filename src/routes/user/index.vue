<template>
    <div>
      <Sidebar/>
      <Top_navbar :options="users_navigations"/>
      <div class="user">
        <u_head class="u_head"/>
        <div class="router_feed" v-if="is_perm('read')">
          <router-view/>
        </div>
        <div class="clear"></div>
      </div>
    </div>
</template>

<script>

  import Permission from '../../components/functions/permission'
  import Custom_helper from '../../components/functions/custom_helper'
  import U_head from "../../components/u_head/index";
  import Top_navbar from "../../components/navbars/top_navbar";
  import Sidebar from "../../components/navbars/sidebar";

  export default {
    name: "users",
    components: {U_head, Top_navbar, Sidebar},
    data(){
      return{
        users_navigations:{
          vita:{
            name: 'Vita',
            route: 'users_vita',
            section: 'menu',
          },
          accounts:{
            name: 'Konto',
            route: 'users_account',
            section: 'settings'
          },
          admin:{
            name: 'Profildaten',
            route: 'users_admin',
            section: 'settings'
          }
        },
        user_navigations:{
          vita:{
            name: 'Vita',
            route: 'user_vita',
            section: 'menu'
          },
          accounts:{
            name: 'Konto',
            route: 'user_account',
            section: 'settings'
          },
          admin:{
            name: 'Profildaten',
            route: 'user_admin',
            section: 'settings'
          }
        }
      }
    },
    navigations(){
      return this.cut_route_name_prefix(this.$route.name) === 'users'
        ? this.users_navigations
        : this.user_navigations
    },
    created(){
      this.$store.commit('update_perm_perm', this.list_permissions['read'])
    },
    mixins:[Custom_helper, Permission]
  }
</script>

<style lang="scss" scoped>
  .user{
    position:relative;
    width: 800px;
    padding-top: 55px;
    margin-left: calc(50% - 400px - 100px); //-100 for centering
  }

  ul{
    width: 200px;
    float: left;
    padding-right: 10px;
    margin-top: 42px;

    h6{
      margin-left: 10px;
      margin-bottom: 10px;

      &.more{
        margin-top: 27px;
      }
    }

    li{
      height: 50px;
      font-size: 14px;
      line-height: 14px;
      padding: 17px 18px;
      margin-bottom: 1px;
      border-radius: 2px;
      /*font-weight: 600;*/
      cursor: pointer;
      color: #7f7f7f;

      .dot {
        margin-right: 27px;
        font-size: 20px;
        line-height: 14px;
      }

      &.active{
        color: #ff3434;
        background: #e9e9e9;

        .dot{
          text-shadow:  3px  3px 3px #fff,
          3px -3px 3px #fff,
          -3px  3px 3px #fff,
          -3px -3px 3px #fff;
        }
      }

      &:hover{
        background: #e9e9e9;
      }
    }
  }

  .router_feed{
    width: 100%;
    float: left;
  }

</style>
