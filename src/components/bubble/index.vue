<template>
  <div class="bubble">
    <svg height="240" width="500">
      <polygon points="5,45 30,5 400,5 400,90 30,90"/>
    </svg>
    <div class="text">
      <p>{{text}}</p>
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
        required: false
      },
      size:{
        type: Number,
        default: 1,
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
.bubble{

  polygon{
    fill: lightgray;
    stroke: lightgray;
    stroke-width: 10;
    stroke-linejoin: round;
  }

  .text{
    height: 100%;
    padding: 17px 27px 17px 47px;

    p{
      color: black;
    }
  }
}
</style>
