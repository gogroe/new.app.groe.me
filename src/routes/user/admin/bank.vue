<template>
  <div class="user_bank">
    <p class="section_name">Bankdaten</p>
    <div class="section_wrapper">
      <edit_elements
        :method="method"
        :url="url"
        :inputs="update_bank.inputs"
        :cload="cload"
        :params="update_bank.params"
        :reload="update_bank.reload"/>
    </div>
  </div>
</template>

<script>
  import Edit_section from "../../../components/edit/section";
  import loader from "../../../components/functions/loader";
  import Edit_elements from "../../../components/edit/elements";

  export default {
    name: "admin_bank",
    components:{
      Edit_elements,
      Edit_section,
    },
    props:{
      cload:{
        required:true
      }
    },
    data(){
      return{
        update_bank:{
          url: 'https://newbackend.groe.me/user_admin/bank/update',
          reload:{action: 'reload', section: 'users_admin'},
          params: {
            user_id: null,
            id: 'get->id'
          },
          inputs:{
            iban: {
              name: 'IBAN',
              type: 'text'
            },
            swift: {
              name: 'SWIFT',
              type: 'text'
            },
            name: {
              name: 'Bankname',
              type: 'text'
            },
            street: {
              name: 'Straße',
              type: 'text'
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number'
            },
            city: {
              name: 'Stadt',
              type: 'text'
            },
            country: {
              name: 'Land',
              type: 'select',
              list: 'countrys',
            }
          }
        }
      }
    },
    computed:{
      route_id(){
        return this.$route.params.id
      },
      method () {
        return typeof this.cload === 'object' && this.$$helper.length(this.cload) > 0
          ? 'update'
          : 'create'
      },
      url () {
        if( this.method === 'update' ){
          return 'https://newbackend.groe.me/user_admin/bank/update'
        }
        else {
          return 'https://newbackend.groe.me/user_admin/bank/create'
        }
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.update_bank)
      }
    },
    mounted(){
      this.set_user_id(this.update_bank)
    },
    mixins:[loader]
  }
</script>
