<template>
  <div class="user_crm full_fixed">
    <div class="inner_full_fixed">
      <crm_bar/>
      <div class="floater_wrapper">
        <crm_table class="floater"/>
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
