<template>
  <div class="sidebar">
    <ul>
      <li v-for="(option , i) in options" :key="i"
          @click="sending(i)"
          class="list">
        <div>
             <div @mouseleave="mouseLeave(i)"
                  class="full_box" :class="{'active' : option.name === active}">
               {{option.name.toUpperCase()}}
             </div>
             <div class="short_box"
                  :class="{'active' : option.name === active}"
                  @mouseover="mouseOver(i)">
               {{option.name.substring(0, 1).toUpperCase()}}
             </div>
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
      // setTimeout(function(){
        let long = document.getElementsByClassName('full_box')[i]
        let short = document.getElementsByClassName('short_box')[i]
        long.style.display = 'inline-block';
        long.style.marginLeft = (long.offsetWidth -80) * (-1) + "px"
        short.style.display = 'none';

      // }, 2000);
    },
    mouseLeave: function(i){
      // setTimeout(function(){
        let long = document.getElementsByClassName('full_box')[i]
        let short = document.getElementsByClassName('short_box')[i]
        long.style.display = 'none';
        short.style.display = 'block';
      // }, 2000);
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
  padding-top: 173px;
  border-left: 1px solid #e6e6e6;

  ul{

    li{
      text-align: center;
      color: #bbb;
      margin-bottom: 8px;

      &:hover{
        cursor: pointer;
      }


      .short_box{
        line-height: 41px;
      }


      .full_box{
        display: none;
        line-height: 41px;
        border-radius: 20.5px;
        padding-left: 16px;
        padding-right: 101px;

      }

      &:hover{
        div{
          background-color: #f8f8f8;
        }
      }

      .active{
        background-color: #fff9e5 !important;
        color: #edad00;
      }
    }
  }

}
</style>
