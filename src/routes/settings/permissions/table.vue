<template>
    <div class="permission_table">
      <div class="options">
        <p class="section_name">{{translate(name).toUpperCase()}} RECHTE VERWALTEN</p>
        <add :active="active.create"
             class="add_create"
             :name="translate(name) + ' Rechte'"
             v-model="active.create"/>
        <div v-if="active.create"
             class="default_popup_background">
          <div class="create_popup inner_popup">
            <permissions_create :name="name"
                                :type="0"
                                v-model="active.create"
                                v-click-outside="hide"/>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td colspan="2">Benutzer Typ</td>
            <td>Benutzer Rolle</td>
            <td class="rights">Rechte</td>
          </tr>
        </thead>
        <tbody>
          <tr class="permission"
              v-for="(permission , i) in permissions.permissions"
              :key="i">
            <td>
              <delete icon="delete_outline"
                      :reload="{ action: 'reload', section:'settings_permission' }"
                      :obj="{
                        params: {
                          permission_id: permission.id
                        },
                        url: 'https://newbackend.groe.me/settings_permission/delete',
                        data: {},
                        request: false
                      }"/>
            </td>
            <td>
              {{render_list_name(lists.user_type, permission.user_type)}}
            </td>
            <td>{{render_list_name(lists[permission.user_type + '_role'], permission.user_role)}}</td>
            <td class="rights">
              <edit :reload="{ action: 'reload', section:'settings_permission'}"
                    :obj="{
                      url: 'https://newbackend.groe.me/settings_permission/update',
                      label: 'Rechte',
                      name: 'permission',
                      value: permission.permission,
                      select:'permissions',
                      placeholder: 'Rechte',
                      type: 'select',
                      input_class:'create_input',
                      label_class: 'create_input_label',
                      required_params: {permission_id: permission.id},
                      error_class: ''
                    }"/>
            </td>
          </tr>
        </tbody>
      </table>
      <list list_name="user_type" v-model="lists.user_type"/>
      <list list_name="0_role" v-model="lists['0_role']"/>
      <list list_name="1_role" v-model="lists['1_role']"/>
      <list list_name="2_role" v-model="lists['2_role']"/>
      <list list_name="3_role" v-model="lists['3_role']"/>
    </div>
</template>


<script>
    import ClickOutside from 'vue-click-outside'
    import { mapGetters } from 'vuex'
    import Custom_helper from '../../../components/functions/custom_helper'
    import Add from "../../../components/add/index";
    import Permissions_create from "./create";
    import List from "../../../components/list/index";
    import Edit from "../../../components/inputs/edit";
    import Delete from "../../../components/inputs/delete";
    
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
        },
      },
      components: {Delete, Edit, List, Permissions_create, Add},
      data(){
        return{
          active:{
            create: false
          },
          lists:{
            user_type:{},
            '0_role':{},
            '1_role':{},
            '2_role':{},
            '3_role':{},
          },
        }
      },
      methods:{
        hide(){
          this.active.create = false
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
    position: relative;
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

    thead tr{
      color: #bbbbbb;
      font-weight: bold;

      td{
        padding-bottom: 10px;
      }
    }

    tbody tr{
      td{
        line-height: 13px;

        i{
          cursor: pointer;
          vertical-align: middle;
          font-size: 24px;
          color: #bbbbbb;

          &:hover{
            color: #3da0f5;
          }
        }
      }
    }

    .rights{
      /*text-align: right;*/
    }
  }
</style>
