<template>
  <div class="user_crm full_fixed">
    <list list_name="gender"/>
    <list list_name="user_status"/>
    <list list_name="user_status_details"/>
    <div class="inner_full_fixed">
      <crm_bar/>
      <div class="floater_wrapper">
        <crm_table class="floater"
                    :request_data="request_users_data"
                    :columns_settings="columns_settings"
                    :request_groups="request_groups"/>
        <crm_filter class="floater"
                    :columns="columns_settings"
                    :params="request_users.params"/>
      </div>
      <div class="clear"></div>
    </div>
    <request :obj="request_users" v-model="request_users"/>
    <list list_name="gender" :use_store="true"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Load_request from '../../components/functions/load_request'
  import Request from "../../components/functions/request"
  import Crm_table from "../crm2/table/index";
  import Crm_bar from "../crm2/bar/index";
  import Crm_filter from "../crm2/filters/index";
  import List from "../../components/list/index";

  export default {
    name: "user_crm",
    components:{
      List,
      Crm_filter,
      Crm_bar,
      Crm_table,
      Request,
    },
    data(){
      return {
        request_users: {
          params: {
            user_id: null,
          },
          url: 'http://newbackend.groe.me/users/get_users',
          data: {},
          request: false
        },
        request_groups: {
          users: {
            indicator: true,
            required_params: {
                    uid: null,
                    user_id:'get_users.id'
                  },
            create_url: 'http://newbackend.groe.me/users/create_user',
            edit_url: 'http://newbackend.groe.me/users/update_user',
          },
          status: {
            indicator: false,
            required_params: {
              uid: null,
              user_id: 'get_users.id',
              status_id: 'get_status.id'
            },
            create_url: 'http://newbackend.groe.me/users/create_user_status',
            edit_url: 'http://newbackend.groe.me/users/update_user_status',
          },
          status_details: {
            indicator: false,
            required_params: {
              uid: null,
              status_id: 'get_status.id',
              status_details_id: 'get_status_details.id'
            },
            create_url: 'http://newbackend.groe.me/users/create_user_status_details',
            edit_url: 'http://newbackend.groe.me/users/update_user_status_details',
          }
        },
        columns_settings: {
          'users.image':{
            id: 'users.image',
            name: '',
            display: true,
            type: 'image',
            edit: false,
            request_group: 'users',
            rows: []
          },
          'users.firstname':{
            id: 'users.firstname',
            name: 'Vorname',
            display: true,
            type: 'text',
            edit: false,
            request_group: 'users',
            rows: []
          },
          'users.lastname':{
            id: 'users.lastname',
            name: 'Nachname',
            display: true,
            type: 'text',
            edit: false,
            request_group: 'users',
             rows: []
          },
          'users.type':{
            id: 'users.type',
            name: 'Type',
            display: true,
            type: 'select',
            select: 'user_status',
            edit: false,
            request_group: 'users',
             rows: []
          },
          'users.gender':{
            id: 'users.gender',
            name: 'Geschlecht',
            display: true,
            type: 'select',
            select: 'gender',
            edit: true,
            request_group: 'users',
             rows: []
          },
          'status.value':{
            id: 'status.value',
            name: 'Status',
            display: true,
            type: 'select',
            select: 'user_status',
            edit: true,
            request_group: 'status',
             rows: []
          },
          'status_details.value':{
            id: 'status_details.value',
            name: 'Status Details',
            display: true,
            type: 'range',
            select: 'user_status_details',
            edit: true,
            request_group: 'status_details',
            rows: []
          },
        }
      }
    },
    computed:{
      ...mapGetters([
        'users_filter',
        'get_header',
        'reload',
        'users_crm_order'
      ]),
      request_users_data(){
        return this.request_users.data
      }
    },
    watch:{
      request_users_data:function(){
        this.set_image_data(this.request_users.data)
        this.set_required_params()
      },
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'users_crm'){
          this.request_users.request = true
          this.$store.commit('update_reload', {action: null, section: null})
        }
      },
      users_crm_order:function (array) {
        this.reorder_columns_settings()
      }
    },
    mounted(){
      this.set_user_id(this.request_users)
      this.set_required_params()
      this.request_users.request = true
    },
    methods:{
      reorder_columns_settings(){
        let new_order = {}

        for(let order_key in this.users_crm_order){
          let order_item = this.users_crm_order[order_key]
          new_order[order_item] = this.columns_settings[order_item]
        }
        this.columns_settings = new_order
      },
      set_image_data(object){
        for(let key in object){
          if('users.image' in object[key]){
            object[key]['users.image'] = {
              path: object[key]['users.image'],
              name: 'users.firstname' in object[key] && 'users.lastname' in object[key]
                ? object[key]['users.firstname'] + ' ' + object[key]['users.lastname']
                : null
            }
          }
        }
      },
      set_required_params(){
        for(let key in this.request_groups){
          if('uid' in this.request_groups[key].required_params){
            this.request_groups[key].required_params.uid = this.get_header.id
          }
        }
      }
    },
    mixins:[Load_request]
  }
</script>

<style lang="scss" scoped>
  .floater_wrapper{
    position: relative;
    width: 100%;
    height: calc(100% - 64px);
  }
  .floater{
    float:left;
  }
</style>
