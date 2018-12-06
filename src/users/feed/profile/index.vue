<template>
  <div class="profile">
    <!--<u_head/>-->
    <div class="default_box">
      <div class="content">
        <edit :obj="lastname"/>
        <pre>{{request_profile.data}}</pre>
      </div>
    </div>
    <request :obj="request_profile" v-model="request_profile"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request";
  import U_head from "../../../components/u_head/index";
  import Edit from "../../../components/inputs/edit";

  export default {
    name: "users_profile",
    components:{
      Edit,
      U_head,
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
        },
        lastname:{
          url: 'https://newbackend.groe.me/users/update_user',
          lable: 'lastname',
          name: 'lastname',
          value: this.user_lastname,
          select:'',
          placeholder: 'lastname',
          type: 'text',
          input_class:'',
          label_class: '',
          required_params: {
            user_id: ''
          }
        }
      }
    },
    computed:{
      user_lastname(){
        if('lastname' in this.request_profile.data){
          return this.request_profile.data.lastname
        }
        else {
          return ''
        }
      },
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
      this.lastname.required_params.user_id = this.$route.params.id
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
