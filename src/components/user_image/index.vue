<template>
  <div>
    <div class="user_image" :class="image_class">
      <div class="image_wrapper" :style="{ width: size + 'px', height: size + 'px', borderRadius: size + 'px'}">
        <img :src="path_check(path, gender)"/>
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
      gender:{
        required: false
      },
      image_class:{
        type: String,
        required: false
      }
    },
    mounted(){
      this.path_check()
    },
    methods:{
      path_check(path, gender){
        if (path === null || path === '') {
          if(gender === 'male'){
            return '/static/layout/default_profile_image_male.png'
          }
          else{
            return '/static/layout/default_profile_image_female.jpg'
          }
        }
        else {
          return path
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image_wrapper{
    overflow: hidden;
    border: 1px solid #ebebeb;

    img{
      height: 100%;
    }
  }

</style>
