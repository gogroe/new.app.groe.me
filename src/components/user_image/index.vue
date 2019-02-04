<template>
  <div>
    <div class="user_image" :class="image_class">
      <div class="image_wrapper" :style="{ backgroundImage: `url('${path}')`, width: size + 'px', height: size + 'px', borderRadius: size + 'px' }">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user_image",
    props:{
      path:{
        required: true
      },
      size:{
        type: String,
        required: false
      },
      image_class:{
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image_wrapper{
    overflow: hidden;
    border: 1px solid #ebebeb;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    img{
      height: 100%;
    }
  }

</style>
