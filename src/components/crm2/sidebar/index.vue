<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: "crm_sidebar",
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

<style>

</style>
