<template>
  <div>
    <a @click="$router.push('/users/' + id + '/vita/')"
       :class="name_class"
        class="user_name">{{name}}</a>
  </div>
</template>

<script>
  export default {
    name: "user_name",
    props:{
      name:{
        required: true
      },
      id:{
        required: true
      },
      name_class:{
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>

  .user_name{
    cursor: pointer !important;
  }

</style>
