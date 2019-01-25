<template>
  <div class="custom_checkbox">
    <div class="item"
    :class="{'checked': active}" :style="{ height: size + 'px', width: size  + 'px' }"
    @click="$emit('input', !active)"
    >
  </div>
  </div>
</template>

<script>
  export default {
    name:'custom_checkbox',
    props:{
      active:{
      //   type: 'Boolean',
        reqired: true
      },
      size:{
        // type:'Number',
        reqired: false
      }
    }
  }
</script>

<style lang="scss" scoped>

  .item{
    display: inline-block;
    height: 25px;
    width: 25px;
    border: 2px solid #3da0f5;
    background: transparent;
    border-radius: 2px;
    cursor:pointer;

    &.checked{
      background:  #3da0f5;
    }
  }

</style>
