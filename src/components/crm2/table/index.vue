<template>
  <div class="crm_table">
    <div class="table_body">
      <table>
        <tr>
          <td
            valign="top"
            v-for="(column, i ) in columns"
            :key="i">
            <crm_column
              :column="column"
              :action="action"
              v-model="action"/>
          </td>
        </tr>
      </table>
    </div>
    <div class="table_footer">

    </div>
  </div>
</template>

<script>
  //convert rows to columns
  import Crm_column from "./column";

  export default {
    name: "crm_table",
    components: {
      Crm_column
    },
    props:{
      columns:{
        type: Object,
        required: true,
      },
      cLoad:{
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
    computed:{
      cLoadRows () {
        return 'rows' in this.cLoad
          ? this.cLoad.rows
          : []
      }
    }
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
  }



</style>
