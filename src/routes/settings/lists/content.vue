<template>
    <div class="settings_list_content">
      <div class="section">
        <p class="section_name">LISTEN VERWALTEN</p>
        <settings_list_create :list_group="list[0].list_group" class="add_create"/>
      </div>
      <table>
        <thead>
          <tr>
            <td colspan="2">Bezeichnung</td>
            <td>Abhängigkeit</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item , i) in list"
              :key="i">
            <td>
              <delete
                icon="delete_outline"
                :reload="{ action: 'reload', section:'settings_list' }"
                :obj="{
                  params: {
                    id: item.id
                  },
                  url: 'https://newbackend.groe.me/settings_permission/delete',
                  data: {},
                  request: false
                }"/>
            </td>
            <td>
              <edit :obj="fill_inputs_edit('name', update_list, item)"
                    :reload="{action: 'reload', section:'settings_list'}"/>
            </td>
            <td>
              <edit :obj="fill_inputs_edit('dependency', update_list, item)"
                    :reload="{action: 'reload', section:'settings_list'}"/>
            </td>
            <td>
              <i class="material-icons">drag_handle</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>


<script>
    import ClickOutside from 'vue-click-outside'
    import { mapGetters } from 'vuex'
    import Edit from "../../../components/inputs/edit";
    import Custom_helper from '../../../components/functions/custom_helper'
    import Delete from "../../../components/inputs/delete";
    import Settings_list_create from "./create";

    export default {
      name: "settings_list_content",
      components: {Settings_list_create, Delete, Edit},
      props:{
        list:{
          required: true
        }
      },
      data(){
        return {
          fields:{},
          update_list:{
            url: 'https://newbackend.groe.me/settings_table/update',
            input_class:'create_input',
            label_class: 'create_input_label',
            error_class: '',
            required_params: {
              user_id: this.$route.params.id,
            },
            inputs:{
              name: {
                name: 'Name',
                type: 'text',
              },
              dependency: {
                name: 'Abhängigkeit',
                type: 'text',
              },
            }
          },
        }
      },
      directives: {
        ClickOutside
      },
      mixins:[Custom_helper]
    }
</script>

<style lang="scss" scoped>
  .settings_list_content{
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
