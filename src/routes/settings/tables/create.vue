<template>
  <div class="settings_table_create">
    <add :create="true"
         :class="{'active': active}"
         name="Feld"
         :active="active"
         v-model="active"/>
    <div v-if="active"
         class="default_popup_background">
      <div class="create_popup inner_popup">
        <create_section create_name="FELD HINZUFÜGEN"
                        button_name="FELD ERSTELLEN"
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
    name: "settings_table_create",
    components: {Create_section, Add},
    data(){
      return{
        active: false,
        create_user:{
          url: 'https://newbackend.groe.me/settings_table/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            type: 2
          },
          inputs:{
            table: {
              name: 'Tabelle',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            name: {
              name: 'Feldname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            type: {
              name: 'Datentyp',
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
