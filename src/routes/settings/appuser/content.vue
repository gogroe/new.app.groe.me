<template>
    <div class="appuser_content">
      <div class="content">
        <p class="section_name">{{ user_name.toUpperCase() }} VERWALTEN</p>
       <appuser_create class="add_create"/>
        <div class="section">
          <edit v-for="(input, key, i) in update_user.inputs"
                :key="key"
                :obj="fill_inputs_edit(key, update_user, user)"
                :reload="{action: 'reload', section:'users_admin'}"/>
        </div>
        <div class="section">
          <button>
            <delete :obj="{}" icon="delete_outline" class="delete"/> NUTZER LOSCHEN
          </button>
        </div>
      </div>
    </div>
</template>

<script>
  import Custom_helper from '../../../components/functions/custom_helper'
  import Edit from "../../../components/inputs/edit";
  import Add from "../../../components/add/index";
  import Inputs from "../../../components/inputs/index";
  import Create_section from "../../../components/inputs/create";
  import Appuser_create from "./create";
  import Delete from "../../../components/inputs/delete";

  export default {
    name: "appuser_content",
    components: {Delete, Appuser_create, Create_section, Inputs, Add, Edit},
    props:{
      user:{
        type: Object,
        required: true
      }
    },
    data(){
      return {
        active:{
          create: false,
          user_role: false
        },
        update_user:{
          url: 'https://newbackend.groe.me/user_admin/user/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
          },
          inputs:{
            firstname: {
              name: 'Vorname',
              type: 'text',
            },
            lastname: {
              name: 'Nachname',
              type: 'text',

            },
            name: {
              name: 'Name',
              type: 'text',
            },
            type: {
              name: 'Typ',
              type: 'select',
              select: 'user_type'
            },
          }
        },
        request_create_user:{},
        create_user:{
          url: 'https://newbackend.groe.me/user_vita/vita/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {},
          inputs:{
            position: {
              name: 'Position',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            description: {
              name: 'Stellenbeschreibung',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            start_date: {
              name: 'Datum des Beginns',
              type: 'date',
              input: {
                value: null,
                event:null
              }
            },end_date: {
              name: 'Datum der Abschluss',
              type: 'date',
              input: {
                value: null,
                event:null
              }
            },company: {
              name: 'Firmanname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            street: {
              name: 'Straße',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number',
              input: {
                value: null,
                event:null
              }
            },
            city: {
              name: 'Stadt',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            country: {
              name: 'Land',
              type: 'select',
              select: 'countrys',
              input: {
                value: null,
                event:null
              }
            }
          }
        }
      }
    },
    computed:{
      user_name(){
        return 'firstname' in this.user ? this.user.firstname + ' ' + this.user.lastname : ''
      }
    },
    mixins:[Custom_helper]
  }
</script>

<style lang="scss" scoped>

  .appuser_content{
    position: relative;
    max-width: 600px;
    //width: 100%;
    margin: 0 auto;
    display: block;
  }

  .content{
    position: relative;
    margin-top: 41px;
    height: 64px;

    .add_create{
      position: absolute;
      padding: 0;
      right: 0;
      top: 0
    }
  }

  .section{
    margin-top: 47px;
   }

  button{
    padding: 5px 43px;
    color: #bababa;
    margin-left:calc( 50% - 127px);

    .delete{
      display: inline-block;
      vertical-align: middle;
      margin-right: 17px;
    }
  }

</style>
