<template>
  <div class="accounts_table">
    <table class="default_box_two">
      <tr>
        <th class="more">Aktion</th>
        <th class="date">Datum</th>
        <th>Verwendungszweck</th>
        <th class="value">Betrag</th>
        <th v-if="active_options"></th>
      </tr>
      <tr v-for="(account, i) in accounts.slice(offset, offset + limit)"
          :key="i"
          :class="{'last_row': i+1 === accounts.length }">
          <td v-if="active_options">
            <popup_menu class="popup_menu"
            v-if="is_perm('update')"
            :id="account.id"
            type="list"
            :options="options"
            icon="more_horiz"
            v-model="action"/></td>
        <td>
          <ddmmmyy :timestamp="account.date"
                   color="#333333"/>
        </td>
        <td class="date">{{account.description}}</td>
        <td class="value">{{account.value.replace('.',',') + ' ' + account.currency}}</td>
      </tr>
    </table>
    <div class="content_navigator">
      <button class="load_more" type="button" name="load_more" @click="limit += 5">Mehr laden</button>
      <button class="load_more" v-if="limit>5" type="button" name="load_more" @click="limit -= 5">weniger laden</button>
      <button class="previous" v-if="offset != 0" type="button" name="prev" @click="offset -= 5">
        <i class="material-icons">navigate_before</i>
      </button>
      <button class="next" v-if="offset < Object.keys(accounts).length-1 && offset+limit < Object.keys(accounts).length" type="button" name="next" @click="offset += 5">
        <i class="material-icons">navigate_next</i>
      </button>
    </div>
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
        edit_account:{},
        limit: 5,
        offset: 0
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
    padding: 0 0 18px 18px;
    border-spacing: 0;
    border-right: 1px solid #e9e9e9;
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
        border-top: 1px solid #e9e9e9;
      }

      td{
        font-size: 14px;
        border-bottom: 1px solid #e9e9e9;
        padding: 17.5px 5px;
      }

      &:hover{
        background-color: #e9e9e9;
      }
    }
  }

  .date, .value, .more{
    min-width: 100px;
  }

  .value{
    text-align: center;
  }

  .content_navigator{
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 66px;

    button{
      width: 107px;

      &.previous{

      }
      &.next{
        float: right;
      }
      &.load_more{
        display: grid;
        margin: 0 auto;
      }
    }
  }
</style>
