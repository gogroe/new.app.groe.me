<template>
  <div>
    <p>vita</p>
    <pre>{{request_vita.data}}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Request from "../../../components/functions/request";
export default {
  name: "users_vita",
  data(){
    return{
      test:false,
      request_vita: {
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
    request_vita_data(){
      return this.request_vita.data
    },
    route_id(){
      return this.$route.params.id
    }
  },
  watch:{
    route_id: function(){
      this.get_user_profile()
    },
    request_vita_data: function(object) {
      if (this.test){
        this.test = false
        this.$store.commit('add_user_vitas', object)
      }
    }
  },
  mounted(){
    this.get_user_vita()
  },
  methods:{
    get_user_vita(){
      this.request_vita.params.user_id = this.$route.params.id
      for(let up_key in this.user_vitas){
        if( this.user_vitas[up_key].id === this.route_id ){
          this.request_vita.data = this.user_vitas[up_key]
          return
        }
      }
      this.request_vita.request = true
      this.test = true
    }
  }
}
</script>

<style scoped>

</style>
