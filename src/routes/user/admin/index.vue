<template>
  <div class="admin">
    <sidebar :options="menu_items" v-model="active.menu"/>
    <div class="add_wrapper"></div>
    <div class="default_box">
      <div class="content">
        <admin_user
          v-if="active.menu === 'user'"
          :cload="cload_data('user')"/>
        <admin_contact
          v-if="active.menu === 'contact'"
          :cload="cload_data('contact')"/>
        <admin_adress
          v-if="active.menu === 'adress'"
          :cload="cload_data('adress')"/>
        <admin_bank
          v-if="active.menu === 'bank'"
          :cload="cload_data('bank')"/>
        <admin_password
          v-if="active.menu === 'password' && $$permission.is_perm('create')"/>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import Sidebar from "../../../components/navbars/sidebar";
  import { mapGetters } from 'vuex'
  import Admin_user from "./users/index";
  import Admin_contact from "./contact";
  import Admin_adress from "./adress";
  import Admin_bank from "./bank";
  import Admin_password from "./password";
  import Request from "../../../components/functions/request";
  import loader from "../../../components/functions/loader";

  export default {
    name: "users_admin",
    components:{
      Request,
      Admin_password,
      Admin_bank,
      Admin_adress,
      Admin_contact,
      Admin_user,
      Sidebar
    },
    data(){
      return{
        menu_items:[
          {name: 'user'},
          {name: 'contact'},
          {name: 'adress'},
          {name: 'bank'},
          {name: 'password'},
        ],
        cload:{
          url: 'https://newbackend.groe.me/user_admin/get_one',
          params:{
            user_id: null
          },
          data: {}
        },
        active:{
          menu: 'user'
        },
        navigation:[
          {
            name: 'Nutzer',
            route: 'user'
          }
        ],
      }
    },
    computed:{
      ...mapGetters([
        'reload',
      ])
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'users_admin'){
          this.cload.request = true
          this.$store.commit('update_reload', {action: 'reload', section: 'all'})
        }
      }
    },
    created () {
      this.set_user_id(this.cload)
      this.set_request_url()
      this.get_cload()
    },
    methods:{
      set_request_url(){
        if(this.$$helper.edit.cut_route_name_prefix(this.$route.name) === 'user'){
          this.cload.url = 'https://newbackend.groe.me/user_admin/get_one'
        }
        else if(this.$$helper.edit.cut_route_name_prefix(this.$route.name) === 'users'){
          this.cload.url = 'https://newbackend.groe.me/users_admin/get_one'
        }
      },
      get_cload () {
        this.$$request.post.data(this.cload.url, this.cload.params)
          .then((response) => this.cload.data = response)
      },
      cload_data(type){
        return type in this.cload.data
          ?  this.cload.data[type]
          : {}
      },
    },
    mixins:[loader]
  }
</script>

<style lang="scss" scoped>
  .default_box{
    padding: 0 17px;
  }

  ul{
    width: 30%;
    padding-top: 27px;
    border-right: 1px solid #e6e6e6;
    float:left;

    li{
      margin-bottom: 27px;
      cursor: pointer;
      &.active{
        color: #3da0f5;
      }
    }
  }

  .content{
    width: 70%;
    padding: 27px 0 27px 17px;
    float:left
  }

</style>
