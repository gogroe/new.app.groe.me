<template>
  <div class="accounts">
    <sidebar :options="menu_items" v-model="active.menu"/>
    <div class="add_wrapper">
    </div>

    <popup :active = "active.popup" v-model = "active.popup">
      <edit_elements
      name="TRANSAKTION HINZUFÜGEN"
      button="TRANSAKTION ERSTELLEN"
      :url="create_user_account.url"
      :inputs="create_user_account.inputs"
      :params="create_user_account.params"
      :reload="create_user_account.reload"
      method="create"/>
    </popup>

    <account_balance :request_accounts_data="cLoad.data"/>
    <accounts_table :request_get_accounts="cLoad" :options="options" v-model="cLoad.params"/>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Accounts_table from "../../../components/accounts/index";
  import Popup from "../../../components/popup/white";
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
      Add,
      Popup
    },
    data(){
      return {
        active:{
          menu: 'ALLE',
          create: false,
          popup: false
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
            description: 'Manuelle Transaktion'
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
            limit: 5,
            offset: 0
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
          console.log(this.cLoad.data);
          this.active.create = false
        }
        if(object.section === this.$route.name){
          this.active.popup = object.action
          this.$store.commit('update_reload', { action: null, section: null })
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

  .click{
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .inner_popup{
    max-height: calc(100% - 202px);
    overflow-y: auto;
  }
</style>
