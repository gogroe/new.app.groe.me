<template>
    <div>
      <p>users</p>
      <user_navigation/>
      <div>
        <router-view/>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import User_navigation from "./navigation/index";


  export default {
    name: "users",
    components:{
      User_navigation,
    },
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters([

      ])
    }
  }
</script>

<style scoped>

</style>
