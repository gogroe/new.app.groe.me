<template>
  <div class="bubble"
       ref="bubble"
       :style="{width: size + 'px'}">
    <div class="text">
      <div class="content" :class="{'icon_text' : info_link !== null}">
        <p>{{text}}</p>
      </div>
      <div class="icon" v-if="info_link !== null">
        <i class="material-icons" @click="">info</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bubble",
    props:{
      text:{
        type: String,
        required: true
      },
      info_link:{
        type: String,
        default: null,
        required: false
      },
      size:{
        type: Number,
        default: 200,
        required: false
      }
    },
    data(){
      return{
        hover: null,
        not_hover: null
      }
    },
    mounted(){
      this.$refs['bubble'].parentElement.onmouseover = this.is_hovering
      this.$refs['bubble'].parentElement.onmouseout = this.isnt_hovering
    },
    methods:{
      is_hovering(){
          clearTimeout(this.not_hover);
          //
          // let left = this.$refs['bubble'].getBoundingClientRect().left
          // let width = this.$refs['bubble'].getBoundingClientRect().width
          // let viewport_width = window.innerWidth
          // if (left + (width / 2) < viewport_width / 2){
          //   this.$refs['bubble'].style.clipPath = 'polygon(0 100%, calc(100% - 17px) 100%, 100% 50%,  calc(100% - 17px) 0, 0 0)'
          // }
          // else{
          //   this.$refs['bubble'].style.clipPath = 'polygon(17px 0, 100% 0, 100% 100%, 17px 100%, 0 50%)'
          // }

          this.hover = setTimeout(this.is_hovering_function, 1000)
      },
      isnt_hovering(){
        clearTimeout(this.hover);
        this.not_hover = setTimeout(this.isnt_hovering_function, 3000)
      },
      is_hovering_function(){
        this.$refs['bubble'].style.display = 'inline-block'
        console.log(this.$refs['bubble'].getBoundingClientRect());
        // this.$refs['bubble'].style.marginTop = this.$refs.bubble.getBoundingClientRect.height  (-2) + 'px'
        // this.$refs['bubble'].style.marginTop = -20+ '%'
      },
      isnt_hovering_function(){
        this.$refs['bubble'].style.display = 'none'
      }
    }
  }
</script>

<style lang="scss" scoped>

.bubble{
  display: none;
  vertical-align: bottom;

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
