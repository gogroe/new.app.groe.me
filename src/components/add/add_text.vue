<template>
  <div
    class="add_text"
    @click="$emit('input', true)">
    <div>
      <i
        class="material-icons add_plus">
        add
      </i>
      <span>
      <slot>
      </slot>
    </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "add_text",
  }
</script>

<style lang="scss">

  .add_text{
    cursor: pointer;

    i.add_plus{
      vertical-align: middle;
      font-size: 22px;
      margin-right: 6px;
    }

    span{
      color: #a5adb3;
    }
  }
</style>
