<template>
  <div v-if="active">
    <i class="material-icons">done</i>
  </div>
</template>

<script>
  export default {
    name: "success",
    props:{
      active: function (boolean) {
        console.log(boolean)
        this.active = boolean
        let that = this

        setTimeout(function(){
          that.active = false
        },2000)
      }
    },
    data () {
      return {
        active: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
