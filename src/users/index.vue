<template>
    <div>
      <p>users</p>
      <user_navigation/>
      <users_feed/>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import User_navigation from "./navigation/index";
  import Users_feed from "./feed/index";


  export default {
    name: "users",
    components:{
      Users_feed,
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
