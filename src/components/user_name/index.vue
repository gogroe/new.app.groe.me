<template>
  <div>
    <a @click="$router.push('/user/' + id + '/profile/')"
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

<style scoped>

</style>
