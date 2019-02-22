<template>
  <div class="accounts">
    <add name="Transaktion"
         :active="active.create"
         v-model="active.create"
         class="add_feed"/>
    <h6>TRANSAKTIONEN</h6>
    <div class="create_account default_box" v-if="active.create">
      <create_section create_name="TRANSAKTION HINZUFÜGEN"
                      button_name="TRANSAKTION ERSTELLEN"
                      :create_inputs="create_user_account"
                      v-model="request_create_user_account"/>
    </div>
    <ul class="default_box account_menu">
      <li @click="active.menu = i"
          :class="{'active': active.menu === i}"
          v-for="(item, i) in menu_items"
          :key="i">{{item.name}}
      </li>
    </ul>
    <all_accounts v-if="active.menu === 0"/>
    <credit_accounts v-if="active.menu === 2"/>
    <debit_accounts v-if="active.menu === 1"/>
  </div>
</template>
<script>
  import Load_request from '../../../components/functions/load_request'
  import Custom_helper from '../../../components/functions/custom_helper'
  import All_accounts from "./all_accounts";
  import Add from "../../../components/add/index";
  import Credit_accounts from "./credit_accounts";
  import Debit_accounts from "./debit_accounts";
  import Create_section from "../../../components/inputs/create";

  export default {
    name: "accounts",
    components:{
      Create_section,
      Debit_accounts,
      Credit_accounts,
      Add,
      All_accounts,
    },
    data(){
      return {
        active:{
          menu: 0,
          create: false
        },
        menu_items:[
          { name: 'ALLE' },
          { name: 'EINGANG' },
          { name: 'AUSGANG' },
        ],
        request_create_user_account:{},
        create_user_account:{
          url: 'https://newbackend.groe.me/user_account/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            currency: 'EUR',
            user_id: null,
            description: 'Manuelle Transaktion',
          },
          inputs:{
            value: {
              name: 'Betrag in Euro',
              type: 'number',
              input: {
                value: null,
                event:null
              }
            },
            date: {
              name: 'Buchungsdatum',
              type: 'date',
              input: {
                value: null,
                event:null
              }
            }
          }
        }
      }
    },
    watch:{
      request_create_user_account:function (object) {
        this.create_update_reload(object, {action: 'reload', section: 'accounts'})
        this.active.create = false
      }
    },
    mounted(){
      this.set_inputs_user_id(this.create_user_account)
    },
    mixins:[Load_request, Custom_helper]
  }
</script>

<style lang="scss" scoped>

  .u_head{
    margin-bottom: 17px;
  }

  ul{
    position: relative;
    width: 100%;
    text-align: center;
    padding: 0;
    height: 64px;


    li{
      display: inline-block;
      cursor: pointer;
      padding: 22px 0 20px 0;
      margin: 0 20px;
      line-height: 18px;
      color: #ddd;

      &.active{
        color: #ff3434;
        border-bottom: 2px solid #ff3434;
      }
    }
  }

  .create_account{
    margin-bottom: 17px;
  }

</style>
