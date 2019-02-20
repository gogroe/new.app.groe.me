<template>
  <div class="edit_icon">
    <i class="material-icons" @click="delete_function()">delete</i>
  </div>
</template>

<script>
  export default {
    name: "edit_icon",
    data(){
      return{
      }
    },
    methods:{
      delete_function(){

      }
    }
  }
</script>

<style lang="scss" scoped>
.edit_icon{
  display: inline-block;
  position: absolute;

  i{
    font-size: 20px;
  }

  &:hover{
    cursor: pointer;
  }
}
</style>
