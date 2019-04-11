<template>
  <div
    class="default_popup_background"
    v-show="active">
    <div
      class="click"
      @click="hide()">

    </div>
    <div class="inner_popup">
      <slot>
      </slot>
    </div>
    <div class="close_popup" @click="hide()"><i class="material-icons">close</i> schließen</div>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props:{
    active:{
      type: Boolean,
      required: true
    }
  },
  watch:{
    active:{
       handler(obj){

       },deep: true
    },
  },
  methods:{
    hide(){
      this.$emit('input', false)
      document.getElementById("navbar").childNodes[2].childNodes[0].click()
    }
  }
}
</script>

<style lang="scss" scoped>

  .click{
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .inner_popup{
    max-height: calc(100% - 202px);
    overflow-y: auto;
  }
</style>
