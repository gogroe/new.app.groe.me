<template>
  <div>
    <div class="user_initials" :class="initials_class">
      <div class="initials_wrapper" :style="{ width: size + 'px', height: size + 'px', borderRadius: size + 'px'}">
        <p :style="{fontSize: (size * 0.5) + 'px', lineHeight: (size * 0.5) + 'px', marginTop: 'calc(51% - ' + (size * 0.25) + 'px)'}">
          {{initials(name)}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user_initials",
    props:{
      name:{
        required: true
      },
      size:{
        required: true
      },
      initials_class:{
        type: String,
        required: false
      }
    },
    methods:{
      initials(string){
        return string.charAt(0).toUpperCase();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .initials_wrapper{
    overflow: hidden;
    background: #9c9c9c;

    p{
      text-align: center;
      color: #fff
    }
  }

</style>
