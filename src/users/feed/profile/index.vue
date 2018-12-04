<template>
  <div>
      <p>profile</p>
      <pre>{{u_profile.data}}</pre>

      <request :obj="u_profile" v-model="u_profile"/>
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
        u_profile: {
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
      u_profile_data(){
        return this.u_profile.data
      },
      route_id(){
        return this.$route.params.id
      }
    },
    watch:{
      u_profile_data: function(object) {
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
        this.u_profile.params.user_id = this.$route.params.id

        //check if profile ist already loaded
        let load_profile_request = false
        for(let up_key in this.user_profiles){
          if( this.user_profiles[up_key].id === this.$route.params.id ){
            load_profile_request = true;
            this.u_profile.data = this.user_profiles[up_key]
            break
          }
        }

        //request profile if not existing
        if(load_profile_request === false){
          this.u_profile.request = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
