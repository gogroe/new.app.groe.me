<template>
  <div class="accounts">
    <sidebar :options="menu_items" v-model="active.menu"/>
    <div class="add_wrapper">
    </div>

    <div class="create_box default_box"
         v-if="reload.action === true && reload.section === 'users_account'">
      <edit_elements
        name="TRANSAKTION HINZUFÜGEN"
        button="TRANSAKTION ERSTELLEN"
        :url="create_user_account.url"
        :inputs="create_user_account.inputs"
        :params="create_user_account.params"
        :reload="create_user_account.reload"
        method="create"/>
    </div>
    <account_balance :request_accounts_data="cLoad.data"/>
    <accounts_table :request_get_accounts="cLoad" :options="options"/>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Accounts_table from "../../../components/accounts/index";
  import Add from "../../../components/add";
  import Sidebar from "../../../components/navbars/sidebar";
  import Account_balance from "../../../components/accounts/balance";
  import Create_section from "../../../components/inputs/create";
  import Edit_elements from "../../../components/edit/elements";
  import loader from "../../../components/functions/loader";

  export default {
    name: "accounts",
    components:{
      Edit_elements,
      Create_section,
      Account_balance,
      Accounts_table,
      Sidebar,
      Add
    },
    data(){
      return {
        active:{
          menu: 'ALLE',
        },
        menu_items:[
          { name: 'ALLE'},
          { name: 'EINGANG'},
          { name: 'AUSGANG'},
        ],
        create_user_account:{
          url: 'https://newbackend.groe.me/user_account/create',
          reload: {action: 'reload', section: 'accounts'},
          params: {
            currency: 'EUR',
            user_id: null,
            description: 'Manuelle Transaktion',
          },
          inputs:{
            value: {
              name: 'Betrag in Euro',
              type: 'number',
              value: null,
              placeholder: 'Betrag in Euro'
            },
            date: {
              name: 'Buchungsdatum',
              type: 'date',
              value: null,
              placeholder: 'Buchungsdatum'
            }
          }
        },
        cLoad:{
          url: 'https://newbackend.groe.me/user_account/get_all',
          params: {
            user_id: null,
            //AUSGANG 'smaller->value': 0
            //EINGANG 'bigger->value': -1
          },
          data: {},
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
      ]),
      active_menu () {
        return this.active.menu
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'accounts'){
          this.$store.commit('update_reload', {action: 'reload', section: 'header'})
          this.get_cLoad()
          this.active.create = false
        }
      },
      active_menu: function () {
        this.get_cLoad()
      }
    },
    mounted(){
      this.set_user_id(this.create_user_account)
      this.set_user_id(this.cLoad)
      this.get_cLoad()
    },
    methods:{
      get_cLoad () {
        switch(this.active.menu){
          case 'ALLE':
            if( 'smaller->value' in  this.cLoad.params){
              delete this.cLoad.params['smaller->value']
            }
            if( 'bigger->value' in  this.cLoad.params){
              delete this.cLoad.params['bigger->value']
            }
            break
          case 'EINGANG':
            if( 'smaller->value' in  this.cLoad.params){
              delete this.cLoad.params['smaller->value']
            }
            this.cLoad.params['bigger->value'] =  -1
            break
          case 'AUSGANG':
            if( 'bigger->value' in  this.cLoad.params){
              delete this.cLoad.params['bigger->value']
            }
            this.cLoad.params['smaller->value'] =  0
            break
        }

        this.$$request.post.data(this.cLoad.url, this.cLoad.params)
          .then((response) => this.cLoad.data = response)
      },
    },
    mixins:[loader]
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
    padding-left: 34px
  }

</style>
