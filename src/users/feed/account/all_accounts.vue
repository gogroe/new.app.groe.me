
<template>
  <div class="accounts">
    <account_balance :request_accounts_data="request_user_accounts.data"/>
    <accounts_table :request_get_accounts="request_user_accounts" :options="options"/>
    <request :obj="request_user_accounts" v-model="request_user_accounts"/>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Load_request from '../../../components/functions/load_request'
  import Request from "../../../components/functions/request"
  import U_head from "../../../components/u_head/index";
  import Accounts_table from "../../../components/accounts/index";
  import Account_balance from "../../../components/accounts/balance";

  export default {
    name: "all_accounts",
    components:{
      Account_balance,
      Accounts_table,
      U_head,
      Request
    },
    data(){
      return {
        request_user_accounts: {
          params: {
            user_id: this.$route.params.id
          },
          url: 'http://newbackend.groe.me/users/get_user_accounts',
          data: {},
          request: false
        },
        options:[
          {
            name: 'bearbeiten',
            value: 'edit'
          }
        ],
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ])
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'accounts'){
          this.$store.commit('update_reload', {action: 'reload', section: 'header'})
          this.get_user_request(this.request_user_accounts)
        }
      }
    },
    mounted(){
      this.get_user_request(this.request_user_accounts)
    },
    mixins:[Load_request]
  }
</script>

<style lang="scss" scoped>

  table{
    width: 100%;
    position:relative;
    padding: 0 18px 18px 18px;
    margin-left: calc(50% - 400px + 100px);
    border-spacing: 0;
    tr{
      &.last_row td{
        border-bottom: none;
      }
      th{
        text-align: left;
        color: #bbbbbb;
        font-weight: bold;
        padding: 13.5px 5px;
        border-bottom: 1px solid #e9e9e9;
      }
      td{
        font-size: 14px;
        border-bottom: 1px solid #e9e9e9;
        padding: 17.5px 5px;
      }
    }
  }
</style>
