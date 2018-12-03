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
      }
    },
    watch:{
      u_profile_data: function(object) {
        this.$store.commit('update_user_profiles', object)
      }
    },
    mounted(){
      this.u_profile.params.id = this.$route.params.id //need another explanation of this whole monunted block, no idea what it does

      let load_profile_request = false
      for(let up_key in this.user_profiles){
        if( this.user_profiles[up_key].id === this.$route.params.id ){
          load_profile_request = true;
        }
      }

      if(load_profile_request){
        u_profile.data = this.user_profiles[this.params.id]
      }
      else {
        this.u_profile.request = true
      }
    }
  }
</script>

<style scoped>

</style>
