<template>
  <div
    v-if="active"
    class="default dropdown"
    v-click-outside="hide">
    <slot>
    </slot>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'

  export default {
    name: "popup_box",
    props:{
      active:{
        type: Boolean,
        required: true,
        default: false
      },
      size:{
        type: Number,
        required: false,
        default: 180
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

<style lang="scss">

  .default.dropdown{
    background: #fff;
    padding-top: 16px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    box-shadow: 10px -10px 15px rgba(0, 0, 0, 0.04),
    -10px 10px 15px rgba(0, 0, 0, 0.04);

    &:after,
    &:before {
      content: '';
      display: block;
      position: absolute;
      left: calc(50% - 10px);
      width: 0;
      height: 0;
      border-style: solid;
    }

    &:after {
      top: -18px;
      border-color:  transparent transparent #fff transparent ;
      border-width: 10px;
    }

    &:before {
      top: -20px;
      border-color: transparent  transparent #f1f3f4 transparent  ;
      border-width: 10px;
    }
  }

</style>
