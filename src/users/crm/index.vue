<template>
  <div class="user_crm full_fixed">
    <list list_name="gender"/>
    <list list_name="user_status"/>
    <list list_name="user_status_details"/>
    <div class="inner_full_fixed">
      <crm_bar/>
      <div class="floater_wrapper">
        <crm_table class="floater"
                   :request_data="request_users.data"
                   :columns_settings="columns_settings"
                   :request_groups="request_groups"/>
        <crm_filter class="floater" :columns="columns_settings"/>
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
  import Crm_table from "../../components/crm/table/index";
  import Crm_bar from "./bar";
  import Crm_filter from "../../components/crm/filters/index";
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
          url: 'https://newbackend.groe.me/user_crm/get_all',
          data: {},
          request: false
        },
        request_groups: {
          link: {
            indicator: true,
            required_params: {
              id:'get_users.id'
            },
            create_url: '',
            edit_url: '',
          },
          users: {
            indicator: true,
            required_params: {
                    user_id:'get_users.id'
                  },
            create_url: 'https://newbackend.groe.me/user_crm/user/create',
            edit_url: 'https://newbackend.groe.me/user_crm/user/update',
          },
          gender: {
            indicator: false,
            required_params: {
              user_id: 'get_users.id',
            },
            create_url: 'https://newbackend.groe.me/user_crm/gender/create',
            edit_url: 'https://newbackend.groe.me/user_crm/gender/update',
          },
          status: {
            indicator: false,
            required_params: {
              user_id: 'get_users.id',
              status_id: 'get_status.id'
            },
            create_url: 'https://newbackend.groe.me/user_crm/status/create',
            edit_url: 'https://newbackend.groe.me/user_crm/status/update',
          },
          status_details: {
            indicator: false,
            required_params: {
              status_id: 'get_status.id',
              status_details_id: 'get_status_details.id'
            },
            create_url: 'https://newbackend.groe.me/user_crm/status_details/create',
            edit_url: 'https://newbackend.groe.me/user_crm/status_details/update',
          }
        },
        columns_settings: {
          'link':{
            id: 'link',
            name: 'Link',
            type: 'link',
            edit: false,
            request_group: 'link',
            rows: []
          },
          'users.image':{
            id: 'users.image',
            name: 'Bild',
            type: 'image',
            edit: false,
            request_group: 'users',
            rows: []
          },
          'users.firstname':{
            id: 'users.firstname',
            name: 'Vorname',
            type: 'text',
            edit: false,
            request_group: 'users',
            rows: []
          },
          'users.lastname':{
            id: 'users.lastname',
            name: 'Nachname',
            type: 'text',
            edit: false,
            request_group: 'users',
             rows: []
          },
          'users.role':{
            id: 'users.role',
            name: 'Position',
            type: 'select',
            select: 'user_role',
            edit: false,
            request_group: 'users',
             rows: []
          },
          'gender.value':{
            id: 'gender.value',
            name: 'Geschlecht',
            type: 'select',
            select: 'gender',
            edit: true,
            request_group: 'gender',
             rows: []
          },
          'status.value':{
            id: 'status.value',
            name: 'Status',
            type: 'select',
            select: 'user_status',
            edit: true,
            request_group: 'status',
             rows: []
          },
          'status_details.value':{
            id: 'status_details.value',
            name: 'Status Details',
            type: 'select',
            select: 'user_status_details',
            edit: true,
            request_group: 'status_details',
            rows: []
          },
        },
        stored_columns_settings:{}
      }
    },
    computed:{
      ...mapGetters([
        'get_header',
        'reload',
        'users_crm_order',
        'users_crm_filter',
        'users_crm_sorting',
        'users_crm_limit_offset',
      ]),
      request_users_data(){
        return this.request_users.data.rows
      }
    },
    watch:{
      request_users_data:function(){
        this.set_link(this.request_users.data.rows)
        this.set_image_data(this.request_users.data.rows)
      },
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'users_crm'){
          this.request_users.request = true
        }
        if(object.action === 'filter' && object.section === 'users_crm'){
          this.request_users.data.rows = []
          this.request_users.params = {}
          this.add_filters_conditions(this.users_crm_filter)
          this.add_filters_conditions(this.users_crm_sorting)
          this.add_limit_offset()
          this.request_users.request = true
          this.$store.commit('update_reload', {action: 'reload', section: 'filters_actives'})
        }
      },
      users_crm_order:function (array) {
        this.reorder_columns_settings(array)
      },
    },
    mounted(){
      this.stored_columns_settings = this.columns_settings
      this.request_users.request = true
    },
    methods:{
      set_request_param_filters_condtions(table, type, prams_key, param){
        if((table in this.request_users.params) === false){
          this.request_users.params[table] = {}
        }
        if((type in this.request_users.params[table]) === false){
          this.request_users.params[table][type] = {}
        }

        this.request_users.params[table][type][prams_key] = param
      },
      add_filters_conditions(object){
        for(let table_key in object){
          let table = object[table_key]

          for(let type_key in table){
            let type =  table[type_key]

            for(let param_key in type){
              let param =  type[param_key]

              this.set_request_param_filters_condtions(table_key, type_key, param_key, param)
            }
          }
        }
      },
      add_limit_offset(){
        if('limit' in this.users_crm_limit_offset){
          this.request_users.params.limit = this.users_crm_limit_offset.limit
        }
        if('offset' in this.users_crm_limit_offset){
          this.request_users.params.offset = this.users_crm_limit_offset.offset
        }
      },
      reorder_columns_settings(){
        let new_order = {}

        for(let order_key in this.users_crm_order){
          let order_item = this.users_crm_order[order_key]
          new_order[order_item] = this.stored_columns_settings[order_item]
        }
        this.columns_settings = new_order
      },
      set_link(object){
        for(let key in object){
          object[key]['link'] = 'users/:id/vita'
        }
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
