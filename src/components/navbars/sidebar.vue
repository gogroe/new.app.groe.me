<template>
  <div class="sidebar">
    <ul>
      <li v-for="(option , i) in object" :key="i"
          @click="option.active = method_for_active()"
          class="list">
        <div>
             <div @mouseleave="mouseLeave(i)"
                  class="full_box" :class="{'active' : option.active === true}">
               {{option.name.toUpperCase()}}
             </div>
             <div class="short_box"
                  :class="{'active' : option.active === true}"
                  @mouseover="mouseOver(i)">
               {{option.name.substring(0, 1).toUpperCase()}}
             </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sidebar',
  data(){
    return{
      object:{},
    }
  },
  computed:{
    ...mapGetters([
      'get_sidebar'
    ]),
  },
  mounted(){
    this.object = this.get_sidebar
  },
  watch: {
    get_sidebar: {
       handler(val){
         this.object = this.get_sidebar
       },
       deep: true
    }
  },
  methods:{
    method_for_active(){
      for(let a in this.object){
        this.object[a].active = false
      }
      return true
    },
    mouseOver: function(i){
      // setTimeout(function(){
        let long = document.getElementsByClassName('full_box')[i]
        let short = document.getElementsByClassName('short_box')[i]
        long.style.display = 'inline-block';
        long.style.marginLeft = (long.offsetWidth -41) * (-1) + "px"
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
  width: 41px;
  height: calc(100% - 64px);
  padding-top: 173px;
  border-left: 1px solid #eee;

  ul{

    li{
      text-align: center;
      padding-bottom: 4px;
      color: #bbb;


      .short_box{
        line-height: 41px;
        background-color: #fff;
      }

      .full_box{
        display: none;
        line-height: 41px;
        border-radius: 20.5px;
        background-color: #fff;
        padding-left: 16px;
        padding-right: 41px;
      }

      .active{
        background-color: #fff9e5;
        color: #edad00;
      }
    }
  }

}
</style>
