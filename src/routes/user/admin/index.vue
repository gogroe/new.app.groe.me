<template>
  <div class="admin">
    <sidebar
      :options="menu_items"
      v-model="active.menu"/>
    <div class="add_wrapper">
      <h2>Persönliche Daten</h2>
      <p>Allgemeine Informationenwie Name und Foto bei groe.</p>
    </div>
      <admin_user
        class="default box edit Nutzer"
        :cload="cload_data('user')"/>
      <admin_contact
        class="default box edit Kontakt"
        :cload="cload_data('contact')"/>
      <admin_adress
        class="default box edit Adresse"
        :cload="cload_data('adress')"/>
      <admin_bank
        class="default box edit Bank"
        :cload="cload_data('bank')"/>
      <admin_password
        v-if="$$permission.is_perm('create')"
        class="default box edit Passwort"
        />
    <div class="clear"></div>
  </div>
</template>

<script>
  import Sidebar from "../../../components/navbars/sidebar";
  import { mapGetters } from 'vuex'
  import Admin_user from "./users/index";
  import Admin_contact from "./contact";
  import Admin_adress from "./adress";
  import Admin_bank from "./bank";
  import Admin_password from "./password";
  import Request from "../../../components/functions/request";
  import loader from "../../../components/functions/loader";

  export default {
    name: "users_admin",
    components:{
      Request,
      Admin_password,
      Admin_bank,
      Admin_adress,
      Admin_contact,
      Admin_user,
      Sidebar
    },
    data(){
      return{
        menu_items:[
          {name: 'Nutzer'},
          {name: 'Kontakt'},
          {name: 'Adresse'},
          {name: 'Bank'},
          {name: 'Passwort'},
        ],
        cload:{
          url: 'https://newbackend.groe.me/user_admin/get_one',
          params:{
            user_id: null
          },
          data: {}
        },
        active:{
          menu: 'Nutzer'
        },
        navigation:[
          {
            name: 'Nutzer',
            route: 'user'
          }
        ],
      }
    },
    computed:{
      ...mapGetters([
        'reload',
      ]),
      activeMenu(){
        return this.active.menu
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'users_admin'){
          this.get_cload()
          this.$store.commit('update_reload', {action: 'reload', section: 'all'})
        }
      },
      activeMenu:{
        handler: function(string){
          let y = 0
          var child=document.getElementsByClassName('admin')[0].childNodes;
          for (let i in this.menu_items) {
            if(this.menu_items[i].name === string){
              y=child[i*2+4].offsetTop
            }
          }
          window.scrollTo({
            top: y+50,
            left: 0,
            behavior: 'smooth'
          });
        }, deep: true
      }
    },
    mounted () {
      this.$store.commit('update_reload', {section: 'activeAdd', action: false})
    },
    created () {
      this.set_user_id(this.cload)
      this.set_request_url()
      this.get_cload()
    },
    methods:{
      set_request_url(){
        if(this.$$helper.edit.cut_route_name_prefix(this.$route.name) === 'user'){
          this.cload.url = 'https://newbackend.groe.me/user_admin/get_one'
        }
        else if(this.$$helper.edit.cut_route_name_prefix(this.$route.name) === 'users'){
          this.cload.url = 'https://newbackend.groe.me/users_admin/get_one'
        }
      },
      get_cload () {
        this.$$request.post.data(this.cload.url, this.cload.params)
          .then((response) => this.cload.data = response)
      },
      cload_data(type){
        return type in this.cload.data
          ?  this.cload.data[type]
          : {}
      },
    },
    mixins:[loader]
  }
</script>

<style lang="scss">
  .admin{

  }
</style>
