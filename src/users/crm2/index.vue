<template>
  <div class="user_crm full_fixed">
    <div class="inner_full_fixed">
      <crm_bar/>
      <div class="floater_wrapper">
        <crm_table class="floater"
                   :request_data="request_users_data"
                   :columns_settings="columns_settings"
                   :request_groups="request_groups"/>
        <crm_filter class="floater"/>
      </div>
      <div class="clear"></div>
    </div>
    <request :obj="request_users" v-model="request_users"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Load_request from '../../components/functions/load_request'
  import Request from "../../components/functions/request"
  import Crm_table from "../crm2/table/index";
  import Crm_bar from "../crm2/bar/index";
  import Crm_filter from "../crm2/filters/index";

  export default {
    name: "user_crm",
    components:{
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
            user_conditions: null,
            user_columns: null,
            user_order: ''
          },
          url: 'http://newbackend.groe.me/users/get_users',
          data: {},
          request: false
        },
        request_groups: {
          users: {
            required_params: {
                    user_id: '1'
                  },
            create_url: 'http...',
            edit_url: 'http...',
          },
          status: {
            required_params: {
              user_id: '1'
            },
            create_url: 'http...',
            edit_url: 'http...',
          }
        },
        columns_settings: {
          image:{
            name: '',
            type: 'image',
            edit: false,
            request_group: 'users',
            rows: []
          },
          firstname:{
            name: 'Vorname',
            type: 'text',
            edit: false,
            request_group: 'users',
            rows: []
          },
          lastname:{
            name: 'Nachname',
            type: 'text',
            edit: false,
            request_group: 'users',
             rows: []
          },
          type:{
            name: 'Type',
            type: 'text',
            edit: false,
            request_group: 'users',
             rows: []
          },
          gender:{
            name: 'Geschlecht',
            type: 'select',
            edit: true,
            request_group: 'users',
             rows: []
          },
          status:{
            name: 'Status',
            type: 'select',
            edit: true,
            request_group: 'status',
             rows: []
          },
          status_details:{
            name: 'Status Details',
            type: 'select',
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
      ]),
      request_users_data(){
        return this.request_users.data
      }
    },
    mounted(){
      this.set_user_id(this.request_users)
      this.request_users.request = true
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
