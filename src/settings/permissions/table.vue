<template>
    <div class="permission_table">
      <div class="options">
        <p class="section_name">{{name.toUpperCase()}} VERWALTEN</p>
        <add :active="active.create"
             class="add_create"
             :name="name"
             v-model="active.create"/>
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
      <table>
        <thead>
          <tr>
            <td>Benutzer Typ</td>
            <td>Benutzer Role</td>
            <td class="rights">Rechte</td>
          </tr>
        </thead>
        <tbody>
          <tr class="permission"
              v-for="(permission , i) in permissions.permissions"
              :key="i">
            <td>
              <i class="material-icons" @click="delete_function()">delete</i>
              <p>
                {{permission.user_type}}
              </p>
            </td>
            <td>{{permission.user_role}}</td>
            <td>{{(permission.permission)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>


<script>
    import ClickOutside from 'vue-click-outside'
    import { mapGetters } from 'vuex'
    import Custom_helper from '../../components/functions/custom_helper'
    import Permission_method from "./method";
    import Add from "../../components/add/index";
    import Create_section from "../../components/inputs/create";
    
    export default {
      name: "permission_table",
      props:{
        permissions:{
          type: Object,
          required: true
        },
        name:{
          type: String,
          required: true
        }
      },
      components: {Create_section, Add, Permission_method},
      data(){
        return{
          active:{
            create: false
          },
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
      computed:{
        ...mapGetters([
         'list_permission_types' 
        ])
      },
      methods:{
        hide(){
          this.active = false
        },
      },
      directives: {
        ClickOutside
      },
      mixins:[Custom_helper]
    }
</script>

<style lang="scss" scoped>
  .permission_table{
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .options{
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

  table{
    width: 100%;

    .rights{
      text-align: right;
    }

    thead tr{
      color: gray;
      font-weight: bold;
    }

    tbody tr{
      td{
        i{
          font-size: 20px;
          color: gray;

          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
