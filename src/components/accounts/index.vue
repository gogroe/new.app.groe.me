<template>
  <div class="accounts_table">
    <table>
      <thead>
        <tr>
          <th class="more">Aktion</th>
          <th class="date">Datum</th>
          <th>Verwendungszweck</th>
          <th class="value">Betrag</th>
          <th v-if="active_options"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, i) in accounts"
            :key="i"
            :class="{'last_row': i+1 === accounts.length }">
          <td
            v-if="active_options"
            class="more">
            <popup_menu class="popup_menu"
                        v-if="is_perm('update')"
                        :id="account.id"
                        type="list"
                        :options="options"
                        icon="more_horiz"
                        v-model="action"/>
          </td>
          <td class="date">
            <ddmmmyy
              :timestamp="account.date"
              color="#333333"/>
          </td>
          <td >{{account.description}}</td>
          <td class="value">{{account.value.replace('.',',') + ' ' + account.currency}}</td>
        </tr>
      </tbody>

    </table>
    <edit_accounts :edit_account="edit_account" :active="active.edit" v-model="active.edit"/>
  </div>
</template>
<script>
  import Permission from '../functions/permission'
  import Ddmmmyy from "../date/ddmmmyy";
  import Popup_menu from "../popup_menu/index";
  import Edit_accounts from "./edit";

  export default {
    name: "accounts_table",
    components:{
      Edit_accounts,
      Popup_menu,
      Ddmmmyy
    },
    props:{
      request_get_accounts:{
        required: true,
      },
    },
    data(){
      return{
        active:{
          edit: false
        },
        action: {},
        options:[
          {
            name: 'bearbeiten',
            action: 'edit',
          }
        ],
        edit_account:{}
      }
    },
    computed:{
      active_options(){
        return this.options !== undefined
      },
      accounts(){
        return 'accounts' in this.request_get_accounts.data
          ? this.request_get_accounts.data.accounts
          : []
      }
    },
    watch:{
      action: function (object) {
        if(object.action === 'edit'){
          this.set_edit_account(object.id)
          this.action = {}
        }
      },
      accounts: function () {

      }
    },
    methods:{
      set_edit_account(action_id){
        for(let account_key in this.accounts){
          if(this.accounts[account_key]['id'] === action_id){
            this.edit_account = this.accounts[account_key]
          }
        }
        this.active.edit = true
      }
    },
    mixins:[Permission]
  }
</script>

<style lang="scss" scoped>

  table{
    width: 100%;
    position:relative;
    //padding: 0 18px 18px 18px;
    border-spacing: 0;
    border-top-right-radius: 10px;
    border-right: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    //border-bottom: 1px solid #e6e6e6;

    &.default.box{
      padding-left: 0;
      padding-right: 0;
    }

    tbody tr:hover{
      background: #f1f3f4;
    }

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

  .more, .date, .value{
    text-align: center;
  }

  .date, .value{
    min-width: 100px;
  }

  td.value{
    text-align: right;
  }
</style>
