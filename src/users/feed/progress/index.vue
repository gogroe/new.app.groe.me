<template>
  <div>
    <p>progress</p>
    <pre>{{u_progress.data}}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Request from "../../../components/functions/request";
export default {
  name: "users_progress",
  data(){
    return{
      u_progress: {
        params: {

        },
        url: 'https://newbackend.groe.me/users/get_user_progress',
        data: {},
        request: false
      }
    }
  },
  computed:{
    ...mapGetters([
      'user_progress'
    ]),
    u_progress_data(){
      return this.u_progress.data
    }
  },
  watch:{
    u_progress_data: function(object) {
      this.$store.commit('update_user_progress', object)
    }
  },
  mounted(){
    this.u_progress.request = true
  }
}
</script>

<style scoped>

</style>
