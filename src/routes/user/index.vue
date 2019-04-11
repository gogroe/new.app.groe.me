<template>
    <div>
      <navbar
        :options="navigations"
        v-model="active.add"/>
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
  import Navbar from "../../components/navbars/navbar";

  export default {
    name: "users",
    components: {U_head, Navbar},
    data(){
      return{
        active:{
          add: false
        },
        users_navigations:{
          vita:{
            name: 'Vita',
            route:  {name: 'users_vita', params:{id: null}},
          },
          accounts:{
            name: 'Konto',
            route:  {name: 'users_account' , params:{id: null}},
          },
          admin:{
            name: 'Profildaten',
            route: {name: 'users_admin'  , params:{id: null}},
          }
        },
        user_navigations:{
          vita:{
            name: 'Vita',
            route: {name: 'user_vita' },
          },
          accounts:{
            name: 'Konto',
            route: {name:'user_account'},
          },
          admin:{
            name: 'Profildaten',
            route: {name: 'user_admin' },
          }
        }
      }
    },
    computed:{
      navigations(){
        return this.$$helper.edit.cut_route_name_prefix(this.$route.name) === 'users'
          ? this.users_navigations
          : this.user_navigations
        }
    },
    mounted () {
      this.users_navigations.vita.route.params.id = this.$route.params.id
      this.users_navigations.accounts.route.params.id = this.$route.params.id
      this.users_navigations.admin.route.params.id = this.$route.params.id
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
