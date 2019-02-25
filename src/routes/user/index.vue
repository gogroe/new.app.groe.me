<template>
    <div>
      <div class="user">
        <u_head class="u_head"/>
        <ul>
          <h6 class="lable">MENU</h6>
          <li v-for="(navigation, i) in navigations" :key="i"
              @click="$router.push({ name: navigation.route, params: { id: user_id } })"
              :class="{'active': $route.name === navigation.route}"
              v-if="navigation.section === 'menu'"><span class="dot">&#9679;</span> {{navigation.name}}</li>
          <div v-if="is_self(user_id) || is_ptype('admin')">
            <h6 class="lable more">VERWALTEN</h6>
            <li v-for="(navigation, i) in navigations" :key="i"
                @click="$router.push({ name: navigation.route, params: { id: user_id } })"
                :class="{'active': $route.name === navigation.route}"
                v-if="navigation.section === 'settings'"><span class="dot">&#9679;</span> {{navigation.name}}</li>
          </div>
        </ul>
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
  import { mapGetters } from 'vuex'
  import U_head from "../../components/u_head/index";

  export default {
    name: "users",
    components: {U_head},
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
    computed:{
      ...mapGetters([
        'uid'
      ]),
      navigations(){
        return this.cut_route_name_prefix(this.$route.name) === 'users'
          ? this.users_navigations
          : this.user_navigations
      },
      user_id(){
        return 'id' in this.$route.params
          ? this.$route.params.id
          : this.uid
      }
    },
    created(){
      this.$store.commit('update_perm_perm', 0)
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
    width: 600px;
    float: left;
  }

</style>
