<template>
  <div class="crm_footer">
    <crm_create_user
      class="crm_create_user"/>
    <limit_offset
      class="limit_offset"
      :counts="counts"/>
  </div>
</template>

<script>
  import Limit_offset from "./limit_offset";
  import Crm_create_user from "./create";
  export default {
    name: "table_footer",
    components: {Crm_create_user, Limit_offset},
    props:{
      counts:{
        type: Object,
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>

  .crm_footer{
    position: relative;

    .crm_create_user{
      position: absolute;
      padding-top: 16px;
    }

    .limit_offset{
      padding-top: 16px;
    }
  }

</style>
