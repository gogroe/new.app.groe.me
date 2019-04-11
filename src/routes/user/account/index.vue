<template>
  <div class="user_accounts">
    <sidebar :options="menu_items" v-model="active.menu"/>
    <div class="add_wrapper">
      <h2>Ihr aktueller Kontostand beträgt &nbsp;<span>{{balance}} Euro</span></h2>
    </div>
    <accounts_table
      :request_get_accounts="cLoad"
      :options="options"
      v-model="cLoad.params"/>
    <button
      v-if="count > 10 && count !== currCount"
      class="rounded"
      @click="loadmore">
      mehr laden ({{currCount}}/{{count}})
    </button>
    <popup_white
      :active = "active.popup"
      v-model = "active.popup">
      <div class="wide create">
        <p class="section_name">Transaktion<br/><br/>
          <span>
            Hier können manuelle Transaktionen hinzugefügt werden. Beachten Sie das Transaktonen nicht gelöscht werden können.
          </span>
        </p>
        <edit_elements
          name="TRANSAKTION HINZUFÜGEN"
          button="TRANSAKTION ERSTELLEN"
          :url="create_user_account.url"
          :inputs="create_user_account.inputs"
          :params="create_user_account.params"
          :reload="create_user_account.reload"
          method="create"/>
      </div>
    </popup_white>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Accounts_table from "../../../components/accounts/index";
  import Popup_white from "../../../components/popup/white";
  import Add from "../../../components/add";
  import Sidebar from "../../../components/navbars/sidebar";
  import Create_section from "../../../components/inputs/create";
  import Edit_elements from "../../../components/edit/elements";
  import loader from "../../../components/functions/loader";

  export default {
    name: "accounts",
    components:{
      Edit_elements,
      Create_section,
      Accounts_table,
      Sidebar,
      Add,
      Popup_white
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
      },
      balance(){
        return 'balance' in this.cLoad.data
          ? this.cLoad.data.balance
          : '0,00'
      },
      count () {
        return 'count' in this.cLoad.data
          ? this.cLoad.data.count
          : 0
      },
      currCount () {
        return 'accounts' in this.cLoad.data
          ? this.cLoad.data.accounts.length
          : 0
      },
      activeCreate () {
        return this.active.popup
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
          this.active.popup = true
          this.$store.commit('update_reload', {action: null, section: null})
        }
      },
      activeCreate: function (boolean) {
        this.$store.commit('update_reload', {section: 'add_' + this.$route.name, action: false})
      },
      active_menu: function () {
        this.get_cLoad()
      }
    },
    mounted(){
      this.$store.commit('update_reload', {section: 'activeAdd', action: true})
      this.set_user_id(this.create_user_account)
      this.set_user_id(this.cLoad)
      this.get_cLoad()
    },
    methods:{
      loadmore(){
        let params = this.cLoad.params
        params.offset = this.currCount
        params.limit = 10

        this.$$request.post.data(this.cLoad.url, params)
          .then((response) => this.handle_loadmore(response) )
      },
      handle_loadmore (response) {
        if('accounts' in response){
          for(let key in response.accounts){
            this.cLoad.data.accounts.push(response.accounts[key])
          }
        }
      },
      get_cLoad () {
        this.set_active_menu()
        let params = this.cLoad.params
        params.limit = 10

        this.$$request.post.data(this.cLoad.url, params)
          .then((response) => this.cLoad.data = response)
      },
      set_active_menu () {
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
      }
    },
    mixins:[loader]
  }
</script>

<style lang="scss" scoped>

  .user_accounts{
    .add_wrapper{
      h2{
        font-weight: 500;
      }

      span{
        font-weight: 700;
        color: #272d33;
      }
    }

    .c_popup{
      padding: 25px 25px 0 25px;
    }
  }

  button{
    display: block;
    margin:41px auto;
  }

</style>
