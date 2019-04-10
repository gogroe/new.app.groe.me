<template>
  <div
    v-if="active"
    class="popup_white default_popup_background">
    <div
      class="inner_popup"
      v-click-outside="hide">
      <slot>
      </slot>
    </div>
    <close_popup/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Close_popup from "../close_button/popup";

  export default {
    name: "popup_white",
    components: {Close_popup},
    props:{
      active:{
        type: Boolean,
        required: true
      }
    },
    methods:{
      hide() {
        this.$emit('input', false)
      }
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style scoped>

</style>
