<template>
    <div>
      <p>users</p>
      <u_head/>
      <sidebarNav/>
      <userNav/>
      <div>
        <router-view/>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import u_head from '@/components/u_head'
  import sidebarNav from '@/components/sidebar'
  import userNav from '@/components/user_nav'

  export default {
    name: "users",
    components:{
      u_head,
      sidebarNav,
      userNav
    },
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
