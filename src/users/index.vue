<template>
    <div class="users">
      <users_feed/>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import User_navigation from "./navigation";
  import Users_feed from "./feed";
  import Global_header from "../components/header";

  export default {
    name: "users",
    components:{
      Global_header,
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

<style lang="scss" scoped>
</style>
