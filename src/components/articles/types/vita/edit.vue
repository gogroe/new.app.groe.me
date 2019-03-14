<template>
  <div class="edit_vita default_popup_background" v-if="active">
    <div class="inner_popup" v-click-outside="hide">
      <p class="section_name">VITA BEARBEITEN</p>
      <div class="section_wrapper">
        <edit_elements
          method="update"
          :url="update_user_vita.url"
          :inputs="(update_user_vita.inputs)"
          :params="update_user_vita.params"
          :reload="update_user_vita.reload"
          :cload="edit_vita"/>
        <edit_elements
          method="update"
          :url="update_user_vita_date.url"
          :inputs="(update_user_vita_date.inputs)"
          :params="update_user_vita_date.params"
          :reload="update_user_vita_date.reload"
          :cload="edit_vita"/>
        <edit_elements
          method="update"
          :url="update_user_vita_company.url"
          :inputs="(update_user_vita_company.inputs)"
          :params="update_user_vita_company.params"
          :reload="update_user_vita_company.reload"
          :cload="edit_vita"/>
        <edit_elements
          method="update"
          :url="update_user_vita_adress.url"
          :inputs="(update_user_vita_adress.inputs)"
          :params="update_user_vita_adress.params"
          :reload="update_user_vita_adress.reload"
          :cload="edit_vita.adress[0]"/>
      </div>
      </div>

    <close_popup/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Close_popup from "../../../close_button/popup";
  import Edit_elements from "../../../edit/elements";
  import loader from "../../../functions/loader";

  export default {
    name: "edit_vita",
    components:{
      Edit_elements,
      Close_popup,
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
        update_user_vita:{
          url: 'https://newbackend.groe.me/user_vita/vita/update',
          reload: {action: 'reload', section: 'vitas'},
          params: {
            user_id: null,
            vita_id:  'get->id'
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
          reload: {action: 'reload', section: 'vitas'},
          params: {
            user_id: null,
            vita_id:  'get->id'
          },
          inputs:{
            start_date: {
              name: 'Anfangsdatum',
              type: 'date',
            },
            end_date: {
              name: 'Abschlussdatum',
              type: 'date',
            },
          }
        },
        update_user_vita_company:{
          url: 'https://newbackend.groe.me/user_vita/company/update',
          reload: {action: 'reload', section: 'vitas'},
          params: {
            user_id: null,
            vita_id:  'get->id'
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
          reload: {action: 'reload', section: 'vitas'},
          params: {
            user_id: null,
            vita_id: 'get->id'
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
              list: 'countrys',
            }
          }
        }
      }
    },
    watch:{
      edit_vita: function () {
        this.set_user_id(this.update_user_vita)
      }
    },
    mounted(){
      this.set_user_id(this.update_user_vita)
      this.set_user_id(this.update_user_vita_date)
    },
    methods:{
      hide(){
        this.$emit('input', false)
      },
    },
    mixins:[loader],
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>

</style>
