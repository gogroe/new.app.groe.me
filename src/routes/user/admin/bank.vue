<template>
  <div class="user_bank">
    <p class="section_name">NUTZER BANKDATEN</p>
    <div class="section_wrapper">
      <edit_section
        name="Bank"
        :create="create_bank"
        :update="update_bank"
        :cload="cload"/>
    </div>
  </div>
</template>

<script>
  import Edit_section from "../../../components/edit/section";
  import loader from "../../../components/functions/loader";

  export default {
    name: "user_bank",
    components:{
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
        },
        create_bank:{
          url: 'https://newbackend.groe.me/user_admin/bank/create',
          reload:{action: 'reload', section: 'users_admin'},
          params: {
            user_id: this.$route.params.id,
          },
          inputs:{
            iban: {
              name: 'IBAN',
              type: 'text',
              value: null
            },
            swift: {
              name: 'SWIFT',
              type: 'text',
              value: null
            },
            name: {
              name: 'Bankname',
              type: 'text',
              value: null
            },
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
        this.set_user_id(this.create_bank)
        this.set_user_id(this.update_bank)
      }
    },
    mixins:[loader]
  }
</script>
