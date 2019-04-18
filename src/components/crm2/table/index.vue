<template>
  <div class="crm_table">
    <div class="table_body default_scrollbar">
      <table>
        <tr>
          <td
            valign="top"
            v-for="(column, i ) in columns"
            :key="i">
            <crm_column
              v-if="column.active"
              :column="column"
              :crmName="crmName"
              :action="action"
              v-model="action"/>
          </td>
        </tr>
      </table>
    </div>
    <table_footer
      class="table_footer"
      :counts="counts"/>
  </div>
</template>

<script>
  import Crm_column from "./column/index";
  import Table_footer from "./footer/index";

  export default {
    name: "crm_table",
    components: {
      Table_footer,
      Crm_column
    },
    props:{
      columns:{
        type: Array,
        required: true,
      },
      crmName:{
        type: String,
        required: true,
      },
      cLoad:{
        type: Object,
        required: true,
      },
      counts:{
        type: Object,
        required: true,
      }
    },
    data () {
      return {
        action: {
          action: null,
          value: null,
        },
      }
    },
  }
</script>

<style lang="scss">

  .crm_table{
    height: 100%;

    table{
      min-width: 100%;
    }

    table, th, td, tr {
      padding: 0;
      border-spacing: 0;
    }

    .table_body{
      overflow: auto;
      height: calc(100% - 66px);
      width: 100%;
    }

    .table_footer{
      height: 66px;
      width: 100%;
      border-top: 1px solid #e6e6e6;
    }


    .input_label{
      display: none;
    }

    .edit_elements.update .wrapper {
      margin-bottom: 0;
    }

    .input, input{
      text-align: center;
    }

    .v-select .dropdown-toggle {
      padding: 0;
      border: solid 1px transparent !important;
    }
  }

</style>
