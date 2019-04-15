<template>
  <div class="dropdown_menu">
    <i
      v-if="icon !== null"
      @click="active = true"
      class="material-icons icon">{{icon}}
    </i>
    <span v-if="icon !== null && text !== null"> </span>
    <a
      @click="active = true"
      v-if="text !== null"
      class="text">
      {{text}}
    </a>
    <popup_box
      :style="{
        width: size + 'px',
        left: 'calc( -' +size * 0.5+ 'px + ' +menuWidth * 0.5+ 'px )' ,
      }"
      class="popup_box"
      :active="active"
      v-model="active">
      <a
        class="menu_item m_over blue"
        @click="$emit('input', option)"
        v-for="(option, i) in options"
        :key="i"
        :class="[
          {'first': i === 0},
          {'last': options.length === i +1}
        ]">
        {{option.name}}
      </a>
    </popup_box>
  </div>

</template>

<script>
  import Popup_box from "../popup/box";
  import $ from 'jquery'

  export default {
    name: "dropdown_menu",
    components: {Popup_box},
    props:{
      icon:{
        type: String,
        required: false,
        default: null
      },
      text:{
        type: String,
        required: false,
        default: null
      },
      options:{
        type: Array,
        required: true,
      }
    },
    data() {
      return {
        active: false,
        menuWidth: 0,
        size: 180
      }
    },
    mounted () {
      this.menuWidth = $(".dropdown_menu").width()
    }
  }
</script>

<style lang="scss">

  .dropdown_menu{
    position: relative;
    display: inline-block;

    .icon, .text{
      cursor: pointer;
      display: inline;
    }

    .icon{
      vertical-align: middle;
    }

    .popup_box{
      z-index: 100;
      position: absolute;
      display: block;
      margin: 0 auto;
    }

    .menu_item{
      cursor: pointer;
      width: 100%;
      display: block;
      text-align: center;
      padding: 16px;
      border-bottom: 1px solid #e6e6e6;

      &.first{

      }

      &.last{
        border-bottom: none;
        padding-bottom:25px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }

</style>
