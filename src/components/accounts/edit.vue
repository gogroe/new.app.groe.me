<template>
    <popup_white
      :active = "active"
      v-model = "activeEdit">
      <div class="wide update">
        <p class="section_name">Transaktion<br/><br/>
          <span>
            Hier können manuelle Transaktionen manuell bearbeiten.
          </span>
        </p>
        <edit_elements
          button="TRANSAKTION BEARBEITEN"
          method="update"
          :url="update_user_account.url"
          :inputs="(update_user_account.inputs)"
          :params="update_user_account.params"
          :reload="update_user_account.reload"
          :cload="edit_account"/>
      </div>
    </popup_white>
</template>

<script>
  import Close_popup from "../close_button/popup";
  import Edit_elements from "../edit/elements";
  import Popup_white from "../popup/white";

  export default {
    name: "edit_accounts",
    components:{
      Popup_white,
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
        activeEdit: true,
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
    watch:{
      activeEdit:function (Boolean){
        if(Boolean === false){
          this.$emit('input', false)
          this.activeEdit = true
        }
      }
    }
  }
</script>
