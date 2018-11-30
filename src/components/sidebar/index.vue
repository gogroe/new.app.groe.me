<template>
  <div>
    <div v-if="sidebar_type==='projects'">
      <projectNav/>
    </div>
    <div v-else="sidebar_type==='user'">
      <userNav/>
    </div>
    <div v-else="sidebar_type==='store'">
      <storeNav/>
    </div>
    <div v-else>
      <userNav/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import projectNav from '@/components/sidebar/sidebar_projects'
  import userNav from '@/components/sidebar/sidebar_users'
  import storeNav from '@/components/sidebar/sidebar_shop'

  export default{
    name: "sidebar",
    components:{
      projectNav,
      userNav,
      storeNav
    },
    data(){
      return{
        sidebar_type:'user'
      }
    },
    methods:{
    }
  }
</script>

<style>

</style>
