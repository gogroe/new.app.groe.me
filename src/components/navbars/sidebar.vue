<template>
  <div class="sidebar">
    <ul>
      <li
        v-for="(option , i) in options"
        :key="i"
        @click="sending(i)"
        class="list">
        <div>
          <div class="full_box">
           {{option.name.toUpperCase()}}
          </div>
          <div
            class="short_box"
            :class="{'active' : option.name === active}"
            @mouseover="mouseOver(i)"
            @mouseleave="mouseLeave(i)">
            {{option.name.substring(0, 1).toUpperCase()}}
          </div>
          <div class="clear"></div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'sidebar',
  props:{
    options:{
      type: Array,
      required: true,
    }
  },
  data(){
    return{
      active:'',
    }
  },
  mounted(){
    this.active = this.options[0].name
    document.getElementsByClassName('navbar')[0].style.width = 'calc(100% - 66px)'
  },
  destroyed(){
    if(document.getElementsByClassName('navbar').length>0)
      document.getElementsByClassName('navbar')[0].style.width = 100 + '%'
  },
  methods:{
    sending: function(i){
      this.active = this.options[i].name
      this.$emit('input', this.options[i].name)
    },
    mouseOver: function(i){
        let long = document.getElementsByClassName('full_box')[i]
        let short = document.getElementsByClassName('short_box')[i]
        long.style.display = 'inline-block';
        long.style.marginLeft = (long.offsetWidth + 25) * (-1) + "px"
    },
    mouseLeave: function(i){
        let long = document.getElementsByClassName('full_box')[i]
        let short = document.getElementsByClassName('short_box')[i]
        long.style.display = 'none';
        short.style.display = 'block';
    },
  },
}
</script>

<style lang="scss">
.sidebar{
  position: fixed;
  top: 64px;
  right: 0;
  width: 66px;
  height: calc(100% - 64px);
  border-left: 1px solid #e6e6e6;
  padding-top: 180px;

  ul{
    position: absolute;
    bottom: 180px;
    width: 100%;

    li{
      text-align: center;
      color: #bbb;
      margin-bottom: 1px;

      &:hover{
        cursor: pointer;
      }

      .short_box{
        line-height: 41px;
      }

      .full_box{
        float: left;
        display: none;
        color: white;
        font-size: 13px;
        border-radius: 5px;
        line-height: 25px;
        margin: 8px;
        padding: 0 25px;
        z-index: 20;
      }

      &:hover{
        .full_box{
          background-color: #f1f3f4;
          color: #3da0f5;
        }

        .short_box{
          background-color: #f1f3f4;
          color: #3da0f5;
        }

        .active{
          background-color: #fff9e5;
          color: #edad00;
        }
      }

      .active{
        background-color: #fff9e5;
        color: #edad00;
      }
    }
  }
}
</style>
