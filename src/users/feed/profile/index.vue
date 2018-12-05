<template>
  <div class="profile">
    <div class="default_box">
      <div class="head"></div>
      <div class="content">
        <pre>{{request_profile.data}}</pre>
      </div>
    </div>
    <request :obj="request_profile" v-model="request_profile"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request";

  export default {
    name: "users_profile",
    components:{
      Request,
    },
    data(){
      return{
        test:false,
        request_profile: {
            params: {
              user_id: null
            },
            url: 'https://newbackend.groe.me/users/get_user_profile',
            data: {},
            request: false
          }
      }
    },
    computed:{
      ...mapGetters([
        'user_profiles'
      ]),
      request_profile_data(){
        return this.request_profile.data
      },
      route_id(){
        return this.$route.params.id
      }
    },

    watch:{
      route_id: function(){
        this.get_user_profile()
      },
      request_profile_data: function(object) {
        if (this.test){
          this.test = false
          this.$store.commit('update_user_profiles', object)
        }
      }
    },
    mounted(){
      this.get_user_profile()
    },
    methods:{
      get_user_profile(){
        this.request_profile.params.user_id = this.$route.params.id
        for(let up_key in this.user_profiles){
          if( this.user_profiles[up_key].id === this.route_id ){
            this.request_profile.data = this.user_profiles[up_key]
            return
          }
        }
        this.request_profile.request = true
        this.test = true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
