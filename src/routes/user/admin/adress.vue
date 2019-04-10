<template>
  <div class="admin_adress">
    <p class="section_name">Adresse</p>
    <div class="section_wrapper">
      <edit_elements
        :method="method"
        :url="url"
        :inputs="update_adress.inputs"
        :cload="shipping_adress"
        :params="update_adress.params"
        :reload="update_adress.reload"/>
    </div>
  </div>
</template>

<script>
  import Edit_section from "../../../components/edit/section";
  import loader from "../../../components/functions/loader";
  import Edit_elements from "../../../components/edit/elements";

  export default {
    name: "admin_adress",
    components: {
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
        update_adress:{
          reload: {action: 'reload', section: 'users_admin'},
          params: {
            user_id: null,
            id: 'get->id',
            type: 'shipping'
          },
          inputs:{
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
        },
      }
    },
    computed:{
      route_id(){
        return this.$route.params.id
      },
      shipping_adress(){
        return 'shipping' in this.cload && this.cload.shipping !== null
          ? this.cload.shipping
          : {}
      },
      method () {
        return typeof this.shipping_adress === 'object' && this.$$helper.length(this.shipping_adress) > 0
          ? 'update'
          : 'create'
      },
      url () {
        if( this.method === 'update' ){
          return 'https://newbackend.groe.me/user_admin/contact/update'
        }
        else {
          return 'https://newbackend.groe.me/user_admin/contact/create'
        }
      }
    },
    watch:{
      route_id: function(){
        this.set_all_user_ids ()
      }
    },
    mounted(){
      this.set_all_user_ids ()
    },
    methods:{
      set_all_user_ids () {
        this.set_user_id(this.update_adress)
      }
    },
    mixins:[loader]
  }
</script>
