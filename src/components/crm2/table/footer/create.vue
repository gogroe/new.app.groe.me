<template>
  <div class="crm_create_user">
    <add_text
      v-model="active.popup">
      Nutzer
    </add_text>
    <popup_white
      :active="active.popup"
      v-model="active.popup">
      <div class="c_popup">
        <p class="section_name">NUTZER HINZUFÜGEN</p>
        <edit_elements
          :inputs="signup_user.inputs"
          :url="signup_user.url"
          method="create"
          :params="signup_user.params"
          :reload="{ action: 'reload', section: 'crm_created_field' }"/>
      </div>
    </popup_white>
  </div>
</template>

<script>
  import Popup_white from "../../../popup/white";
  import Edit_elements from "../../../edit/elements";
  import Add_text from "../../../add/add_text";
  export default {
    name: "crm_create_user",
    components: {Add_text, Edit_elements, Popup_white},
    data() {
      return {
        active:{
          popup: false
        },
        signup_user:{
          url: 'https://newbackend.groe.me/authenticate/signup',
          params: {
            type: 1,
            role: 1
          },
          inputs:{
            firstname: {
              name: 'Vorname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            lastname: {
              name: 'Nachname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            email: {
              name: 'Email',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            }
          }
        }
      }
    },
  }
</script>

<style lang="scss">

  .crm_create_user{
    .c_popup{
      padding: 16px 25px;

      .section_name{
        margin-bottom: 41px;
      }

      button{
        width: 100%;
      }
    }
  }

</style>
