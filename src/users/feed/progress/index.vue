<template>
  <div>
    <p>progress</p>
    <pre>{{request_progress.data}}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Request from "../../../components/functions/request";
export default {
  name: "users_progress",
  data(){
    return{
      test:false,
      request_progress: {
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
    request_progress_data(){
      return this.request_progress.data
    },
    route_id(){
      return this.$route.params.id
    }
  },
  watch:{
    route_id: function(){
      this.get_user_progress()
    },
    request_progress_data: function(object) {
      if (this.test){
        this.test = false
        this.$store.commit('update_user_progress', object)
      }
    }
  },
  mounted(){
    this.get_user_progress()
  },
  methods:{
    get_user_progress(){
      this.request_progress.params.user_id = this.$route.params.id
      for(let up_key in this.user_vitas){
        if( this.user_progress[up_key].id === this.route_id ){
          this.request_progress.data = this.user_progress[up_key]
          return
        }
      }
      this.request_progress.request = true
      this.test = true
    }
  }
}
</script>

<style scoped>

</style>
