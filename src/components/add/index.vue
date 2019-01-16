<template>
  <div class="add"
       @click="$emit('input', !active)"
       :class="{'inactive': active}">
    <p v-if="active === false">
      <i class="material-icons">add</i> {{name}} hinzufügen
    </p>
    <p v-else>
      <i class="material-icons">close</i> schließen
    </p>
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
    padding: 6.5px 0 11.5px 0;
  }

  i{
    margin-left: 17px;
    vertical-align: -7px;
    font-weight: 700;
  }

  p{
    color: #3da0f5;
    line-height: 17px;
  }

  .inactive p{
    color: #bbbbbb;
  }

</style>
