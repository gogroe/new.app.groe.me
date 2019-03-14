<template>
  <div class="settings_list_create">
    <add :create="true"
         :class="{'active': active}"
         name="Listen"
         :active="active"
         v-model="active"/>
    <div v-if="active"
         class="default_popup_background">
      <div class="create_popup inner_popup">
        <create_section create_name="LISTEN ELEMENT HINZUFÜGEN"
                        button_name="LISTEN ELEMENT  ERSTELLEN"
                        :create_inputs="create_list"
                        :reload="{action: 'reload', section: 'settings_list'}"
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
    name: "settings_list_create",
    components: {Create_section, Add},
    props:{
      list_group:{
        required: true
      }
    },
    data(){
      return{
        active: false,
        create_list:{
          url: 'https://newbackend.groe.me/settings_table/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            list_group: null
          },
          inputs:{
            name: {
              name: 'Tabelle',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            dependency: {
              name: 'Feldname',
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
    mounted(){
      this.create_list.required_params.list_group = this.list_group
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
