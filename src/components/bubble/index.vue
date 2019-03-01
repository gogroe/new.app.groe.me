<template>
  <div class="bubble"
       ref="bubble"
       :style="{width: bubble_obj.size + 'px'}">
    <div class="text">
      <div class="content" :class="{'icon_text' : bubble_obj.info_link !== null}">
        <p>{{bubble_obj.text}}</p>
      </div>
      <div class="icon" v-if="bubble_obj.info_link !== null">
        <i class="material-icons" @click="">info</i>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "bubble",

    data(){
      return{
        bubble_obj:{
          text: null,
          info_link: null,
          size: 200,
          x: 0,
          y: 0
        }
      }
    },
    mounted(){

    },
    computed:{
      ...mapGetters([
        'get_bubble'
      ])
    },
    watch:{
      get_bubble: function(obj){
        this.bubble_obj = obj
        if(obj.show){
          this.$refs['bubble'].style.display = 'block'
          this.set_axis()
        }
        else{
          this.$refs['bubble'].style.display = 'none'
        }
      }
    },
    methods:{
      set_axis: function(){
        let left = (this.bubble_obj.x + this.bubble_obj.size)
        let top = (this.bubble_obj.y - 30)
        console.log('top' + (this.$refs['bubble'].clientHeight))
        this.$refs['bubble'].style.left = left + 'px'
        this.$refs['bubble'].style.top = top + 'px'
      }
    }
  }
</script>

<style lang="scss" scoped>

.bubble{
  display: none;
  position: absolute;
  z-index: 1000;

  .text{
    width: 100%;
    clip-path: polygon(17px 0, 100% 0, 100% 100%, 17px 100%, 0 50%);
    background-color: #eee;
    padding: 10px 10px 10px 34px;
    border-radius: 3px;
    position: relative;

    .content{
      width: 100%;

      p{
        word-wrap:break-word;
      }
    }

    .icon_text{
      width: calc(100% - 34px);

      p{

      }
    }

    .icon{
      display: inline;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translate(-50%, -50%);

      i{
        font-size: 24px;

        &:hover{
          cursor: pointer;
        }
      }
    }
  }
}
</style>
