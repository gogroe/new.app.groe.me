<template>
  <div>
    <p>vita</p>
    <pre>{{u_vita.data}}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Request from "../../../components/functions/request";
export default {
  name: "users_vita",
  data(){
    return{
      u_vita: {
        params: {

        },
        url: 'https://newbackend.groe.me/users/get_user_vita',
        data: {},
        request: false
      }
    }
  },
  computed:{
    ...mapGetters([
      'user_vitas'
    ]),
    u_vita_data(){
      return this.u_vita.data
    }
  },
  watch:{
    u_vita_data: function(object) {
      this.$store.commit('update_user_vitas', object)
    }
  },
  mounted(){
    this.u_vita.request = true
  }
}
</script>

<style scoped>

</style>
