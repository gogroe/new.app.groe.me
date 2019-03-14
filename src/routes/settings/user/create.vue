<template>
  <div class="settings_user_create">
    <add :create="true"
         :class="{'active': active}"
         name="Benutzer"
         :active="active"
         v-model="active"/>
    <div v-if="active"
         class="default_popup_background">
      <div class="create_popup inner_popup">
        <create_section create_name="BENUTZER HINZUFÜGEN"
                        button_name="BENUTZER ERSTELLEN"
                        :create_inputs="create_user"
                        :reload="{action: 'reload', section: 'users_crm'}"
                        v-click-outside="hide"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Add from "../../../components/add/index";
  import Create_section from "../../../components/inputs/create";

  export default {
    name: "settings_user_create",
    components: {Create_section, Add},
    data(){
      return{
        active: false,
        create_user:{
          url: 'https://newbackend.groe.me/user_crm/user/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            type: 2
          },
          inputs:{
            role: {
              name: 'Position',
              type: 'select',
              select: 'user_role',
              input: {
                value: null,
                event:null
              }
            },
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
            },
          }
        }
      }
    },
    methods:{
      hide(){
        this.active = false
      },
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>

</style>
