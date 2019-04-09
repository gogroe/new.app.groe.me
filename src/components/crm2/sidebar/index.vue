<template>
  <div class="crm_sidebar">
    <crm_filter
      :columns="columns"
      :crmType="crmType"/>
    <crm_history/>
  </div>
</template>

<script>
  import Crm_filter from "./filter/index";
  import Crm_history from "./history/index";

  export default {
    name: "crm_sidebar",
    components: {Crm_history, Crm_filter},
    props:{
      columns:{
        type: Array,
        required: true,
      },
      crmType:{
        type: String,
        required: true,
      },
    }
  }
</script>

<style lang="scss">



</style>
