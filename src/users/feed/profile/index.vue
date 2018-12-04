<template>
  <div class="profile">
    <div class="box">
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
      request_profile_data: function(object) {
        //check if id is not in user_profiles
        for(let up_key in this.user_profiles){
          if( this.user_profiles[up_key].id === this.$route.params.id ){

          }
        }

        //if not then commit to store
        this.$store.commit('update_user_profiles', object)
      },
      route_id: function(){
        console.log('test')
        this.get_user_profile()
      }
    },
    mounted(){
      this.get_user_profile()
    },
    methods:{
      get_user_profile(){
        this.request_profile.params.user_id = this.$route.params.id

        //check if profile ist already loaded
        let load_profile_request = false
        for(let up_key in this.user_profiles){
          if( this.user_profiles[up_key].id === this.$route.params.id ){
            load_profile_request = true;
            this.request_profile.data = this.user_profiles[up_key]
            break
          }
        }

        //request profile if not existing
        if(load_profile_request === false){
          this.request_profile.request = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
