<template>
  <div>
    create user
    <limit_offset
      class="limit_offset"
      :counts="counts"/>
  </div>
</template>

<script>
  import Limit_offset from "./limit_offset";
  export default {
    name: "table_footer",
    components: {Limit_offset},
    props:{
      counts:{
        type: Object,
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>

  .limit_offset{
    padding-top: 16px;
  }
</style>
