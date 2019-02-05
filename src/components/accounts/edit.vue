<template>
  <div class="edit_account default_popup_background" v-if="active">
    <div class="inner_popup" v-click-outside="hide">
      <p class="section_name">TRANSAKTION BEARBEITEN</p>
      <edit v-for="(input, key, i) in update_user_account.inputs"
            :key="i"
            :obj="fill_inputs_edit(key, update_user_account, edit_account)"
            v-model="edit_request"/>
    </div>
    <close_popup/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Request from "../functions/request"
  import Load_request from "../functions/load_request"
  import Edit from "../inputs/edit"
  import custom_helper from "../functions/custom_helper";
  import Close_popup from "../close_button/popup";

  export default {
    name: "edit_accounts",
    components:{
      Close_popup,
      Edit,
      Request,
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
        edit_request:{},
        update_user_account:{
          url: 'https://newbackend.groe.me/users/update_user_account',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: null,
            uid: 1,
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
              type: 'number',
            }
          }
        }
      }
    },
    watch:{
      edit_account: function () {
        this.set_inputs_user_id(this.update_user_account)
      },
      edit_request: function (object) {
        if('update' in object){
          this.$store.commit('update_reload', {action: 'reload', section: 'accounts'} )
          this.$emit('input', false)
        }
      }
    },
    mounted(){
      this.set_inputs_user_id(this.update_user_account)
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
