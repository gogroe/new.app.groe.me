<template>
    <div>
      <request :obj="u_nav" v-model="u_nav"/>
    </div>
</template>

<script>
  import Request from "../../components/functions/request";
  export default {
    name: "user_navigation",
    components: {Request},
    data(){
      return{
        u_nav: {
            params: {

            },
            url: 'https://newbackend.groe.me/users/get_user_navigation',
            data: {},
            request: false
          }
      }
    },
    mounted(){
      this.u_nav.request = true
    }
  }
</script>

<style scoped>

</style>
