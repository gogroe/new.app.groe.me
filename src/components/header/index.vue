<template>
    <div>

    </div>
</template>

<script>
import Request from "../../components/functions/request";
  export default {
    name: "header"
    components: {
      Request
    },
    data(){
      return{
        u_nav: {
          params: {

          },
          url: 'http://newbackend.groe.me/users/get_user_header',
          data: {},
          request: false
        }
      }
    },
  }
</script>

<style>

</style>
