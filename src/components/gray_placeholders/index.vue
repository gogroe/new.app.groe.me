<template>
  <div class="placeholders" ref="container">

    <div v-if="placeholder_type==='circle'"
         :style="{width: placeholder_size + 'px' , height: placeholder_size + 'px' , borderRadius: placeholder_size/2 + 'px'}"
         class="circle linear-background">
    </div>

    <div v-else-if="placeholder_type==='image'"
         :style="{width: placeholder_size + 'px' , height: placeholder_size + 'px' , borderRadius: placeholder_size/2 + 'px'}"
         class="ing linear-background">
      <img src="">
    </div>

    <div v-else-if="placeholder_type==='square'"
         :style="{width: placeholder_size + 'px' , height: placeholder_size + 'px'}"
         class="square linear-background">
    </div>

    <div v-else-if="placeholder_type === 'post'">
      <posts :request_get_data="request_get_data"
             :placeholder_height="placeholder_size"/>
    </div>

    <div v-else-if="placeholder_type === 'table'">
      <table_placeholders :request_get_data="request_get_data"/>
    </div>

    <div v-else class="text">
      <div class="linear-background"
           :style="{width: placeholder_size + '%'}">
      </div>
    </div>
  </div>
</template>

<script>
import posts from './posts'
import table_placeholders from './table'
export default {
  name: 'placeholders',
    components: {posts, table_placeholders},
  //when loaded use @loaded="" in parent html tag to toggle
  props:{
    request_get_data:{
      required: true
    },
    placeholder_type:{
      type: String,
      default: 'text',
      required: false
    },
    placeholder_size:{
      type: Number,
      required: false
    }
  },
  data(){
    return{
      counter: 0,
      old_content: null,
      new_content: null,
      show: true
    }
  },
  computed:{
    is_empty(object){
      return (object==='' || object===null || object ===undefined)
    },
    is_loading(){
      return this.counter===0
    },
  },
  watch:{
    request_get_data: function (object, old_object) {
      this.counter++
      this.show = false
      if(object !== old_object){
        this.$emit('loaded')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}

.linear-background {
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: darkgray;
    background: linear-gradient(to right, #ddd 8%, #ccc 18%, #ddd 33%);
    background-size: 1000px 104px;
    height: 338px;
    position: relative;
    overflow: hidden;
    opacity: 0.5;
}

.placeholders{
  width: 100%;
  height: calc(100% - 80px);
  text-align: center;

  .text {
    width: 100%;
    height: 100%;

    div{
      width: 100%;
      height: 10px;
      margin-bottom: 4px;
      opacity: 0.5;
      border-radius: 2px;
    }
  }
}
</style>
