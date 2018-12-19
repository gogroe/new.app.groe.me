<template>
  <div class="add"
       @click="$emit('input', !active)"
       v-if="active === false">
    <p><i class="material-icons">add</i> {{name}} hinzufügen</p>
  </div>
</template>

<script>
  export default {
    name: "add",
    props:{
      name:{
        required: true
      },
      active:{
        required: true
      }
    },
  }
</script>

<style lang="scss" scoped>

  .add{
    font-weight: 700;
    cursor: pointer;
  }

  i{
    margin-left: 17px;
    vertical-align: -7px;
    font-weight: 700;
  }

  p{
    color: #3da0f5;
  }

</style>
