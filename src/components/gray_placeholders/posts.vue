<template>
  <div class="posts"
       :style="{height: placeholder_height + 'px'}">
       <div class="parrent">
         <div class="pic linear-background"/>
         <div class="text heading linear-background" :style="{width:'36%'}"/>
         <div class="text heading linear-background" :style="{width:'22%'}"/>
       </div>
       <div class="parrent">
         <div class="text linear-background" :style="{width:'57%'}"/>
         <div class="text linear-background" :style="{width:'68%'}"/>
         <div class="text linear-background" :style="{width:'47%'}"/>
       </div>
  </div>
</template>

<script>
//add placeholders inside

export default {
  name: 'posts',
  props:{
    request_get_data:{
      required: true
    },
    placeholder_height:{
      type: Number,
      required: false
    }
  },
  data(){
    return{

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
    width: 100%;
}

.posts{
  width: 100%;
  z-index: 2;
  padding: 17px;

  .parrent{
    position: relative;
    width: 100%;
    height: calc(5vw + 34px);
    display: inline-block;
    z-index: 1;
    margin-bottom: 17px;

    .pic{
      position: absolute;
      background-color: black;
      width: 5vw;
      height: 5vw;
      margin: 17px auto;
      border-radius: 50%;
    }

    .text{
      background-color: black;
      height: 10px;
      border-radius: 2px;
      margin-top: 17px;
      margin-left: 2.5vw;
    }

    .heading{
      margin-top: 34px;
      margin-left: calc(5vw + 34px);
    }
  }
}
</style>
