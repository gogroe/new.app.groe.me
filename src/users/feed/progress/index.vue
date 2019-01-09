<template>
  <div>
    <p>progress</p>
    <pre>{{request_users.data}}</pre>
    <button @click="request_users.request = true">send request</button>
    <request :obj="request_users" v-model="request_users"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Request from "../../../components/functions/request";
export default {
  name: "users_progress",
  components: {Request},
  data(){
    return{
      request_users: {
        params: {
          user_id: null,
          user_conditions: {
            'firstname' : '%ja%'
          }
        },
        url: 'http://new.backend/users/get_users',
        data: {},
        request: false
      },
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
