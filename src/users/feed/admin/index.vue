<template>
  <div>
    <p>vita</p>
    <pre>{{u_task.data}}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Request from "../../../components/functions/request";
export default {
  name: "users_admin",
  data(){
    return{
      u_task: {
        params: {
          user_id: null
        },
        url: 'https://newbackend.groe.me/users/get_user_task',
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
      this.$store.commit('add_user_vitas', object)
    }
  },
  // mounted(){
  //   this.u_vita.request = true
  // }
}
</script>

<style scoped>

</style>
