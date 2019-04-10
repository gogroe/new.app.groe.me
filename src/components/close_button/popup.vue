<template>
    <div>
      <div class="close_popup" @click="$emit('input', false)"><i class="material-icons">close</i> schließen</div>
    </div>
</template>

<script>
  export default {
    name: "close_popup"
  }
</script>

<style lang="scss" scoped>

  .close_popup{
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
    color: #3da0f5;
    line-height: 17px;

    &:hover{
      color: #3b83d6;
    }

    i{
      margin-left: 17px;
      vertical-align: middle;
      font-weight: 700;
    }
  }

</style>
