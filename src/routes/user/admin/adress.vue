<template>
  <div class="user_adress">
    <p class="section_name">NUTZER ADRESSE</p>
    <div class="section_wrapper">
      <edit_section
        name="Adresse"
        :create="create_adress"
        :update="update_adress"
        :cload="shipping_adress"/>
    </div>
  </div>
</template>

<script>
  import Edit_section from "../../../components/edit/section";
  import loader from "../../../components/functions/loader";

  export default {
    name: "user_contact",
    components: {
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
          url: 'https://newbackend.groe.me/user_admin/adress/update',
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
        create_adress:{
          url: 'https://newbackend.groe.me/user_admin/adress/create',
          reload: {action: 'reload', section: 'users_admin'},
          params: {
            user_id: null,
            type: 'shipping'
          },
          inputs:{
            street: {
              name: 'Straße',
              type: 'text',
              value: null
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number',
              value: null
            },
            city: {
              name: 'Stadt',
              type: 'text',
              value: null
            },
            country: {
              name: 'Land',
              type: 'select',
              list: 'countrys',
              value: null
            }
          }
        }
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
        this.set_user_id(this.create_adress)
        this.set_user_id(this.update_adress)
      }
    },
    mixins:[loader]
  }
</script>
