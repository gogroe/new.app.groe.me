
<template>
  <div class="accounts">
    <table class="default_box">
      <tr>
        <th>Datum</th>
        <th>Verwendungszweck</th>
        <th>Betrag</th>
        <th></th>
      </tr>
      <tr v-for="(account, i) in request_user_accounts.data"
          :key="i"
          :class="{'last_row': i+1 === request_user_accounts.data.length }">
        <td>{{timestamp_to_date(account.date)}}</td>
        <td>{{account.description}}</td>
        <td>{{account.value + ' ' + account.currency}}</td>
        <td><dropdown/></td>
      </tr>
    </table>

    <request :obj="request_user_accounts" v-model="request_user_accounts"/>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request"
  import Dropdown from "./dropdown"
  import U_head from "../../../components/u_head/index";
  import moment from 'moment'

  export default {
    name: "all_accounts",
    components:{
      U_head,
      Request,
      Dropdown
    },
    data(){
      return {
        request_user_accounts: {
          params: {
            uid: this.uid,
            user_id: this.$route.params.id
          },
          url: 'http://newbackend.groe.me/users/get_user_accounts',
          data: {},
          request: false
        },
        active:{
          menu: 0
        }
      }
    },
    computed:{
      ...mapGetters([
        'uid'
      ]),
    },
    mounted(){
      this.request_user_accounts.request = true
    },
    methods:{
      timestamp_to_date(timestamp){
        console.log(timestamp)
        return moment.unix(timestamp).locale("de").format('ll')
      }
    }
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
