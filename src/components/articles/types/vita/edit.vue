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
          url: 'https://newbackend.groe.me/users/update_user_vita',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: null,
            uid: 1,
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
          url: 'https://newbackend.groe.me/users/update_user_vita_date',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: null,
            uid: 1,
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
            }
          }
        }
      }
    },
    watch:{
      edit_vita: function () {
        this.set_inputs_user_id(this.update_user_vita)
      },
      edit_request: function (object) {
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
