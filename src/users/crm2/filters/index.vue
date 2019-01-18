<template>
  <div class="crm_filter">
    <div class="filter_head">

    </div>
    <div class="filter_body">

    </div>
  </div>
</template>

<script>
  export default {
    name: "crm_filter"
  }
</script>

<style lang="scss" scoped>
  .crm_filter{
    position: relative;
    width: 450px;
    height: calc(100%);
  }

  .filter_head{
    width: 100%;
    height: 64px;
    background: #fff;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  .filter_body{
    width: 100%;
    height: calc(100% - 64px);
    background: #fff;
  }
</style>
