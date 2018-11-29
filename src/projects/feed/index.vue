<template>
  <div>
    <p>feed</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        name: "projects_feed",
      data(){
        return {
          
        }
      },
      computed:{
        ...mapGetters([
          'users_header',
          'users_profile'
        ])
      }
    }
</script>

<style scoped>

</style>
