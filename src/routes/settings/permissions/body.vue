<template>
  <div class="perm_item_body">
    <table
      cellspacing="0"
      cellpadding="0">
      <thead>
        <tr>
          <th></th>
          <th>Aktion</th>
          <th>Type</th>
          <th>Rolle</th>
          <th>Berechtigung</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(permission, i) in cLoad.permissions"
          :key="i"
          :class="{'last': cLoad.permissions.length === i + 1}">
          <td class="space"></td>
          <td>
            <delete
              icon="delete_outline"
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
            {{ $$translation(user_type(permission.user_type)) }}
          </td>
          <td>
            {{ $$translation(user_role(permission.user_type, permission.user_role)) }}
          </td>
          <td>
            <edit_elements
              method="update"
              url="https://newbackend.groe.me/settings_permission/update"
              :readonly="false"
              :inputs="{ permission:{
                name: 'Berechtigung',
                type: 'select',
                items: permissions,
                list: 'permissions',
                value: permission.permission
              }}"
              :cload="permission"
              :reload="{ action: 'reload', section:'settings_permission' }"
              :params="{
                permission_id: 'get->id'
              }"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Edit_elements from "../../../components/edit/elements";
  import Delete from "../../../components/inputs/delete";

  export default {
    name: "item_body",
    components: {Delete, Edit_elements},
    props:{
      cLoad:{
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      }
    },
    computed:{
      ...mapGetters([
        'list_user_types',
        'list_permissions'
      ]),
      permissions () {
        let permissions = []

        for(let key in this.list_permissions){
          permissions.push({
            name: this.$$translation(key),
            value: this.list_permissions[key].toString()
          })
        }

        return permissions
      }
    },
    methods:{
      user_type (value) {
        for(let key in this.list_user_types){
          if(value == this.list_user_types[key] ){
            return key
          }
        }
      },
      user_role (uValue, rValue) {
        let user_type = this.user_type(uValue)
        let user_role = null
        this.$$list.item( user_type + '_role', rValue)
          .then((result) => user_role = result)
        return user_role
      }
    }
  }
</script>

<style lang="scss">

  .perm_item_body{

    table{
      margin: 25px 0 16px 0;
      width: 100%;

      thead{
        th{
          text-align: center;
          margin:0;
          padding: 5px 10px;
          border-bottom: 1px solid #e9e9e9;

          &.rights {
            text-align: right;
          }
        }
      }

      tbody{
        .space{
          border-bottom: none;
        }

        td{
          height: 61px;
          text-align: center;
          border-bottom: 1px solid #e9e9e9;

          .edit_elements {
            margin-right: 25px;

            .input_label {
              display: none !important;
            }
          }
        }

        tr {
          &.last td{
            border-bottom: none;
          }

          &:hover{
            background: #f1f3f4;
          }
        }
      }
    }
  }


</style>
