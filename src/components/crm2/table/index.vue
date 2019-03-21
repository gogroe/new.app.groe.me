<template>
  <div class="crm_table">
    <div class="table">
      <table>
        <tr>
          <td valign="top">

          </td>
        </tr>
      </table>
    </div>
    <div class="table_footer">

    </div>
    <crm_column/>
    <pre>{{cLoad.data}}</pre>
  </div>
</template>

<script>
  import Crm_column from "./column";

  export default {
    name: "crm_table",
    components: {Crm_column},
    props:{
      cLoad:{
        type: Object,
        required: true,
      },
      request_groups:{
        type: Object,
        required: true,
      },
      columns_settings:{
        type: Object,
        required: true,
      },
    },
  }
</script>

<style lang="scss">

</style>
