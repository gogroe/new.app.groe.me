<template>
    <div class="settings_table_content">
      <div class="section">
        <p class="section_name">NUTZER TABELLE VERWALTEN</p>
        <tables_create class="add_create"/>
      </div>
      <table>
        <thead>
          <tr>
            <td colspan="2">Feldname</td>
            <td class="rights">Typ</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field , i) in fields"
              :key="i">
            <td>
              <delete :obj="{
                        params: {
                          id: field.id,
                        },
                        url: 'https://newbackend.groe.me/settings_table/delete',
                        data: {},
                        request: false
                      }"
                      icon="delete_outline"/>
            </td>
            <td>
              <edit v-for="(input, key, i) in update_field.inputs"
                    :key="key"
                    :obj="fill_inputs_edit(key, update_field, field)"
                    :reload="{action: 'reload', section:'users_admin'}"/>
            </td>
            <td>
              {{field.field_type}}
            </td>
            <td class="rights">
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>


<script>
    import ClickOutside from 'vue-click-outside'
    import { mapGetters } from 'vuex'
    import Custom_helper from '../../../components/functions/custom_helper'
    import Load_request from '../../../components/functions/load_request'
    import Tables_create from "./create";
    import Delete from "../../../components/inputs/delete";
    import Edit from "../../../components/inputs/edit";

    
    export default {
      name: "settings_table_content",
      components: {Edit, Delete, Tables_create},
      data(){
        return {
          fields:{},
          update_field:{
            url: 'https://newbackend.groe.me/settings_table/update',
            input_class:'create_input',
            label_class: 'create_input_label',
            error_class: '',
            required_params: {
              user_id: this.$route.params.id,
            },
            inputs:{
              name: {
                name: 'Feldname',
                type: 'text',
              },
            }
          },
        }
      },
      mounted(){
        this.custom_fields = this.data_request({
          table: 'users',
          uri: 'https://newbackend.groe.me/custom_field/get_all'
        }).then((result) =>
          this.fields = result
        )
      },
      directives: {
        ClickOutside
      },
      mixins:[Custom_helper, Load_request]
    }
</script>

<style lang="scss" scoped>
  .settings_table_content{
    position: relative;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .section{
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
