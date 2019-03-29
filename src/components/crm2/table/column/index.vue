<template>
  <div
    class="crm_column"
    :class="column.type">
    <table>
      <thead>
      <tr>
        <th
          v-if="isIndicator"
          class="space"
          valign="bottom">
          <i class="material-icons dropdown_arrow">arrow_drop_down</i>
        </th>
        <th
          valign="bottom">
          <p v-if="isIndicator">
            Nutzerverwaltung
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

  export default {
    name: "crm_column",
    components: {Crm_icell, Crm_cell},
    props:{
      column:{
        type: Object,
        required: true,
      },
      action: {
        required: true,
      }
    },
    computed:{
      isIndicator () {
        return this.column.type === 'indicator'
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
        color: #1a73e8;
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
