<template>
  <div
    class="crm_column"
    :class="column.type">
    <table>
      <thead>
      <tr>
        <th
          v-if="isIndicator"
          class="space indicator"
          valign="bottom">
          <!--<dropdown_menu-->
            <!--:options="options"-->
            <!--icon="arrow_drop_down"-->
            <!--v-model="crmMenu"/>-->
            <crm_list/>
        </th>
        <th
          valign="bottom">
          <p
            v-if="isIndicator"
            class="indicator">
            {{crmName}}
          </p>
          <p v-else>
            {{column.name}}
          </p>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(row, i) in column.rows"
        :key="i"
        @mouseover="$emit('input', {action: 'activeRow', value: i})"
        @mouseout="$emit('input', {action: 'activeRow', value: null})">
        <td
          v-if="isIndicator"
          class="space">
        </td>
        <td
          v-if="isIndicator"
          class="options"
          :class="{'active': action.action === 'activeRow' && action.value === i}">
          <crm_icell :row="row"/>
        </td>
        <td
          v-else
          :class="{'active': action.action === 'activeRow' && action.value === i}">
          <crm_cell
            :row="row"
            :create_url="column.create_url"
            :update_url="column.update_url"
            :id="column.id"
            :name="column.name"
            :list="list"
            :params="column.params"
            :type="column.type"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Crm_cell from "./cell";
  import Crm_icell from "./iCell";
  import Crm_list from "./dropdown";
  import Dropdown_menu from "../../../dropdown/menu";

  export default {
    name: "crm_column",
    components: {Dropdown_menu, Crm_list, Crm_icell, Crm_cell},
    props:{
      column:{
        type: Object,
        required: true,
      },
      crmName:{
        type: String,
        required: true,
      },
      action: {
        required: true,
      }
    },
    data() {
      return {
        crmMenu: null,
        options:[
          {name: 'Nutzerverwaltung', value: 'crm_user'},
          {name: 'Firmenverwaltung', value: 'crm_company'}
        ]
      }
    },
    computed:{
      isIndicator () {
        return this.column.type === 'indicator'
      },
      list () {
        return 'list' in this.column
          ? this.column.list
          : null
      }
    },
    watch:{
      crmMenu: function (object) {
        if(object !== null){
          this.$router.push({name: object.value})
        }
      }
    },
    mounted () {
      if(this.$$permission.is_perm('admin_write')){
        this.options.push({name: 'Adminverwaltung', value: 'crm_admin'})
      }
    }
  }
</script>

<style lang="scss">

  .crm_column{

    table{
      font-size: 14px;

      tr{

        th{
          position: sticky;
          height: 66px;
          padding: 10px 16px;
          top: 0;
          z-index: 10;
          background-color: white;
          border-bottom: 1px solid #e6e6e6;

          /*p.indicator{*/
            /*color: #1a73e8;*/
          /*}*/

          /*.dropdown_menu{*/
            /*.icon{*/
              /*color: #1a73e8;*/
              /*background: #f1f3f4;*/
              /*border-radius: 20px;*/
              /*margin-left: 16px;*/
            /*}*/

            /*.default.dropdown{*/
              /*font-weight: 500;*/
              /*z-index: 9999;*/
              /*table-layout: fixed;*/
            /*}*/
          /*}*/
        }

        td{
          border-left:  1px solid #e6e6e6;
          text-align: center;
          height: 41px;

          &.active{
            background: #f1f3f4;
          }
        }

        td {
          padding: 6px;
          border-bottom: 1px solid #e6e6e6;
        }
      }
    }

    //field types
    &.indicator{
      tr,td,th{
        text-align: left;
      }

      th {
        padding: 10px 16px 10px 0;

        p{
          font-size: 18px;
        }

        &.space{
          border-bottom: 1px solid #e6e6e6;
          width: 25px;
        }
      }

      td{
        padding: 6px 16px;
      }

      .space{
        border: none;
      }

      .options{
        border-left: 6px solid #1a73e8;
      }
    }
  }

</style>
