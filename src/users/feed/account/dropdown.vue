<template>
    <div>
      <i v-if="!dropdown" @click="dropdown = true" class="material-icons">more_horiz</i>
      <i v-else @click="dropdown = false" class="material-icons">more_horiz</i>
      <div class="dropdown_div" v-if="dropdown" v-else @click="dropdown = false">
        <p @click="">show details</p>
        <p @click="">edit?</p>
        <p @click="">complain?</p>
      </div>
    </div>
</template>
<script>
  export default {
    name: "dropdown",
    data(){
      return {
        dropdown: false
      }
    }
  }
</script>

<style lang="scss" scoped>
div{
  i{
    cursor: pointer;
  }
  .dropdown_div{
    margin-left: 30px;
    margin-top: -15px;
    position: absolute;
    color: #999;
    background-color: #fff;
    border: 1px solid #e3e3e3;
    width: 90px;
    p{
      text-align: left;
      margin: 5px;
      cursor: pointer;
    }
  }
}
</style>
