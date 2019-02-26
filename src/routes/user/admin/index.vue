<template>
  <div class="admin">
    <div class="add_wrapper"></div>
    <h6>VERWALTEN</h6>
    <div class="default_box">
      <ul>
        <li :class="{'active': active.menu === 'user'}" @click="active.menu = 'user'">Nutzer</li>
        <li :class="{'active': active.menu === 'contact'}" @click="active.menu = 'contact'">Kontakt</li>
        <li :class="{'active': active.menu === 'adress'}" @click="active.menu = 'adress'">Adresse</li>
        <li :class="{'active': active.menu === 'bank'}" @click="active.menu = 'bank'">Bankdaten</li>
        <li v-if="is_perm('create')" :class="{'active': active.menu === 'password'}" @click="active.menu = 'password'">Password ändern</li>
      </ul>
      <div class="content">
        <admin_user v-if="active.menu === 'user'"
                    :request_get_user="request_get_user_data_user"/>
        <admin_contact v-if="active.menu === 'contact'"
                     :request_get_user_contact="request_get_user_data_contact"/>
        <admin_adress v-if="active.menu === 'adress'"
                      :request_get_user_adress="request_get_user_data_adress"/>
        <admin_bank v-if="active.menu === 'bank'"
                    :request_get_user_bank="request_get_user_data_bank"/>
        <admin_password v-if="active.menu === 'password' && is_perm('create')"/>
      </div>
      <div class="clear"></div>
    </div>
    <request :obj="request_get_user" v-model="request_get_user"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Load_request from '../../../components/functions/load_request'
  import Custom_helper from '../../../components/functions/custom_helper'
  import Permission from '../../../components/functions/permission'
  import Admin_user from "./users/index";
  import Admin_contact from "./contact";
  import Admin_adress from "./adress";
  import Admin_bank from "./bank";
  import Admin_password from "./password";
  import Request from "../../../components/functions/request";

  export default {
    name: "users_admin",
    components:{
      Request,
      Admin_password,
      Admin_bank,
      Admin_adress,
      Admin_contact,
      Admin_user,
    },
    data(){
      return{
        active:{
          menu: 'user'
        },
        navigation:[
          {
            name: 'Nutzer',
            route: 'user'
          }
        ],
        request_get_user: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/user_admin/get_one',
          data: {},
          request: false
        },
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      request_get_user_data_user(){
        return 'user' in this.request_get_user.data
          ?  this.request_get_user.data.user
          : {}
      },
      request_get_user_data_contact(){
        return 'contact' in this.request_get_user.data
          ?  this.request_get_user.data.contact
          : {}
      },
      request_get_user_data_adress(){
        return 'adress' in this.request_get_user.data
          ?  this.request_get_user.data.adress
          : {}
      },
      request_get_user_data_bank(){
        return 'bank' in this.request_get_user.data
          ?  this.request_get_user.data.bank
          : {}
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'users_admin'){
          this.request_get_user.request = true
          this.$store.commit('update_reload', {action: 'reload', section: 'all'})
        }
      }
    },
    mounted(){
      this.set_request_url()
      this.set_user_id(this.request_get_user)
      this.request_get_user.request = true
    },
    methods:{
      set_request_url(){
        if(this.cut_route_name_prefix(this.$route.name) === 'user'){
          this.request_get_user.url = 'https://newbackend.groe.me/user_admin/get_one'
        }
        else if(this.cut_route_name_prefix(this.$route.name) === 'users'){
          this.request_get_user.url = 'https://newbackend.groe.me/users_admin/get_one'
        }
      }
    },
    mixins:[Load_request,Permission, Custom_helper]
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
