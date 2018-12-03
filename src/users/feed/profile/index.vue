<template>
  <div>
      <p>details</p>
      <request :obj="u_profile" v-module="u_profile"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Request from "../../../components/functions/request";

  export default {
    name: "users_profile",
    components:{
      Request,
    },
    data(){
      return{
        u_profile: {
            params: {

            },
            url: 'https://newbackend.groe.me/users/get_user_navigation',
            data: {},
            request: false
          }
      }
    },
    computed:{
      ...mapGetters([
        'user_navigation'
      ])
    },
    mounted(){
      if(this.user_navigation.length !== 0){

      }
    }
  }
</script>

<style scoped>

</style>
