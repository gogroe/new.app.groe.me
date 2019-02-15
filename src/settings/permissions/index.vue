<template>
  <div class="permission">
    <div class="group default_box">
      <div class="box_header">
        render group
        on click open perm_table
        on click create popup
      </div>
      <permission_table/>
      <div class="box_footer">
        on click open methods
        <permission_method/>
      </div>
    </div>
  </div>
</template>

<script>
  import Permission_method from "./method";
  import Permission_table from "./table";
  export default {
    name: "permission",
    components: {Permission_table, Permission_method}
  }
</script>

<style scoped>

</style>
