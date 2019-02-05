<template>
  <div class="menu_class">
    <i class="material-icons" @click="active = true">{{icon}}</i>
    <ul v-if="active === true && type === 'list'"
        class="list"
        v-click-outside="hide">
      <li v-for="(option, i) in options"
          :key="i"
          @click="set_action(option.action)">{{option.name}}</li>
    </ul>
    <div class="default_popup_background" v-if="active === true && type === 'popup'">
      <div class="inner_popup" v-click-outside="hide">
        <p v-for="(option, i) in options"
            :key="i"
            :class="{'last': options.length -1 === i}"
            @click="set_action(option.action)">{{option.name}}</p>
      </div>
      <div class="close_popup"><i class="material-icons">close</i> schließen</div>
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'

  export default {
    name: "popup_menu",
    props:{
      type:{
        required: true
      },
      id:{
        required: false
      },
      options:{
        required: true
      },
      icon:{
        required: true
      },
      menu_class:{
        required: false
      }
    },
    data(){
      return{
        active: false
      }
    },
    methods:{
      hide(){
        this.active = false
      },
      set_action(action){
        this.$emit('input', {action: action, id: this.id})
        this.active = false
      }
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>
  .menu_class{
    position: relative;
  }

  i{
    cursor: pointer;
  }

  ul{
    position: absolute;
    left: 25px;
    top: 12.5px;
    padding: 10px 0;
    z-index: 1000;
    background: #fff;
    border: 1px solid #3da0f5;
    border-radius: 2px;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);
  }

  li{
    cursor: pointer;
    padding: 10px 43px 10px 17px;

    &:hover{
      color: #fff;
      background: #3da0f5;
    }
  }

  .inner_popup{
    padding-left: 0;
    padding-right: 0;
  }

  p{
    cursor: pointer;
    width: 450px;
    padding: 17px;
    text-align: center;
    border-bottom: 1px solid #3da0f5;

    &.last{
      border-bottom: none;
    }

    &:hover{
      color: #fff;
      background: #3da0f5;
    }
  }

  .close_popup{
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
    color: #fff;
    line-height: 17px;

    &:hover{
      color: #3da0f5;
    }

    i{
      margin-left: 17px;
      vertical-align: -7px;
      font-weight: 700;
    }
  }

</style>
