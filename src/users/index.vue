<template>
    <div class="users">
      <users_feed/>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Users_feed from "./feed";
  import Global_header from "../components/header";

  export default {
    name: "users",
    components:{
      Global_header,
      Users_feed
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
