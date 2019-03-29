<template>
  <div class="edit_select">
    <i class="material-icons">edit</i>
  </div>
</template>

<script>
  export default {
    name: "edit_select",
    props:{
      clist: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

  .edit_select{
    position: absolute;
    right: 0;
    top: 0;

    i{
      font-size: 16px;
      color: gray;
    }
  }

</style>
