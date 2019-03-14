<template>
  <div class="edit_account default_popup_background" v-if="active">
    <div class="inner_popup" v-click-outside="hide">
      <p class="section_name">TRANSAKTION BEARBEITEN</p>
      <div class="section_wrapper">
        <edit_elements
          method="update"
          :url="update_user_account.url"
          :inputs="(update_user_account.inputs)"
          :params="update_user_account.params"
          :reload="update_user_account.reload"
          :cload="edit_account"/>
      </div>
    </div>
    <close_popup/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Close_popup from "../close_button/popup";
  import Edit_elements from "../edit/elements";

  export default {
    name: "edit_accounts",
    components:{
      Edit_elements,
      Close_popup,
    },
    props:{
      edit_account:{
        required:true
      },
      active:{
        required:true
      },
    },
    data(){
      return{
        update_user_account:{
          url: 'https://newbackend.groe.me/user_account/update',
          reload: {action: 'reload', section: 'accounts'},
          params: {
            account_id: 'get->id',
            description: 'Manuelle Transaktion',
            currency: 'EUR'
          },
          inputs:{
            value: {
              name: 'Betrag in Euro',
              type: 'number',
            },
            date: {
              name: 'Buchungsdatum',
              type: 'date',
            }
          }
        }
      }
    },
    methods:{
      hide(){
        this.$emit('input', false)
      },
    },
    directives: {
      ClickOutside
    }
  }
</script>
