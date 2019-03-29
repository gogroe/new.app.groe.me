<template>
  <div
    class="status"
    v-click-outside="hide">
    <input
      @click="active.dropdown = !active.dropdown"
      :style="{background: backgroundColor(cvalue)}"
      class="input value"
      readonly
      type="text"
      :placeholder="placeholder"
      :value="value">
    <status_dropdown
      v-if="active.dropdown"
      :options="options"
      :clist="clist"
      :type="type"
      :dependent="dependent"
      v-model="xValue"/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Status_dropdown from "./dropdown/index";

  export default {
    name: "status",
    components: {Status_dropdown},
    props:{
      clist:{
        type: String,
        required: true,
      },
      type:{
        type: String,
        required: true,
      },
      dependent:{
        required: false,
        default: null
      },
      options: {
        type: Array,
        required: true,
        default: function () { return [] }
      },
      label:{
        type: String,
        required: true,
      },
      cvalue:{
        //type: Object,
        required: true,
        default: function () { return {} }
      },
      placeholder:{
        type: String,
        required: true,
        default: ''
      },
    },
    data () {
      return {
        active:{
          dropdown: false,
        },
        xValue: null
      }
    },
    computed:{
      value () {
        return this.cvalue !== null && this.label in this.cvalue
          ? this.cvalue[this.label]
          : this.cvalue
      },
    },
    watch:{
      xValue: function (object) {
        this.$emit('input', object)
        this.active.dropdown = false
      }
    },
    methods: {
      backgroundColor (option) {
        return option !== null && 'color' in option && option.color !== null
          ? option.color
          : undefined
      },
      hide() {
        this.active.dropdown = false
      },
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>

  .status{
    position: relative;

    input{
      border-radius: 2px;
      font-weight: 500;
      text-align: center !important;

      &.active{
        background: #fff;
      }
    }
  }

</style>
