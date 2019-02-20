<template>
  <div class="edit_vita default_popup_background" v-if="active">
    <div class="inner_popup" v-click-outside="hide">
      <p class="section_name">VITA BEARBEITEN</p>
      <edit v-for="(input, key, i) in update_user_vita.inputs"
            :key="key"
            :obj="fill_inputs_edit(key, update_user_vita, edit_vita)"
            v-model="edit_request"/>
      <edit v-for="(input, key, i) in update_user_vita_date.inputs"
            :key="key"
            :obj="fill_inputs_edit(key, update_user_vita_date, edit_vita)"
            v-model="edit_request"/>
      <edit v-for="(input, key, i) in update_user_vita_company.inputs"
            :key="key"
            :obj="fill_inputs_edit(key, update_user_vita_company, edit_vita)"
            v-model="edit_request"/>
      <edit v-for="(input, key, i) in update_user_vita_adress.inputs"
            :key="key"
            :obj="fill_inputs_edit(key, update_user_vita_adress, edit_vita.adress[0])"
            v-model="edit_request"/>
    </div>
    <close_popup/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Request from "../../../functions/request"
  import Load_request from "../../../functions/load_request"
  import Edit from "../../../inputs/edit"
  import custom_helper from "../../../functions/custom_helper";
  import Close_popup from "../../../close_button/popup";

  export default {
    name: "edit_vita",
    components:{
      Close_popup,
      Edit,
      Request,
    },
    props:{
      edit_vita:{
        required:true
      },
      active:{
        required:true
      },
    },
    data(){
      return{
        edit_request:{},
        update_user_vita:{
          url: 'https://newbackend.groe.me/user_vita/vita/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: null,
          },
          inputs:{
            position: {
              name: 'Position',
              type: 'text',
            },
            description: {
              name: 'Beschreibung',
              type: 'textarea',
            }
          }
        },
        update_user_vita_date:{
          url: 'https://newbackend.groe.me/user_vita/date/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: null,
            vita_id: this.edit_vita.id
          },
          inputs:{
            start_date: {
              name: 'Anfangsdatum',
              type: 'number',
            },
            end_date: {
              name: 'Abschlussdatum',
              type: 'number',
            },
          }
        },
        update_user_vita_company:{
          url: 'https://newbackend.groe.me/user_vita/company/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: null,
            vita_id: this.edit_vita.id
          },
          inputs:{
            company: {
              name: 'Unternehmen',
              type: 'text',
            }
          }
        },
        update_user_vita_adress:{
          url: 'https://newbackend.groe.me/user_vita/adress/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: null,
            vita_id: this.edit_vita.id
          },
          inputs:{
            street: {
              name: 'Straße',
              type: 'text',
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number',
            },
            city: {
              name: 'Stadt',
              type: 'text',
            },
            country: {
              name: 'Land',
              type: 'select',
              select: 'countrys',
            }
          }
        }
      }
    },
    watch:{
      edit_vita: function () {
        this.set_inputs_user_id(this.update_user_vita)
      },
      edit_request: function (object) { //todo
        if('update' in object){
          this.$store.commit('update_reload', {action: 'reload', section: 'vitas'} )
        }
      }
    },
    mounted(){
      this.set_inputs_user_id(this.update_user_vita)
      this.set_inputs_user_id(this.update_user_vita_date)
    },
    methods:{
      hide(){
        this.$emit('input', false)
      },
    },
    mixins:[custom_helper, Load_request],
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>

</style>
