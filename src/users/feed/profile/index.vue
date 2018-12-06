<template>
  <div class="profile">
    <div class="default_box">
      <div class="head"></div>

        <div class="text" v-if="!showFirstname">
          {{request_profile.data.firstname}}
        </div>
        <div class="text" v-if="showFirstname">
          <!-- <edit :type="" :url="" :name="" :value="" :placeholder="" :input_class="" :required=""/> -->
        </div>
        <div class="icon">
          <button class="material-icons" @click="showFirstname = true">border_color</button>
          <modal v-if="showFirstname">
            <button @click="showFirstname = false">post</button>
          </modal>
        </div>
<!--////////////////////////////////////////////////////////////////////// -->
      <div class="text" v-if="!showLastname">
        {{request_profile.data.lastname}}
      </div>
      <div class="text" v-if="showLastname">
        <!-- <edit :type="" :url="" :name="" :value="" :placeholder="" :input_class="" :required=""/> -->
      </div>
      <div class="icon">
        <button class="material-icons" @click="showLastname = true">border_color</button>
        <modal v-if="showLastname">
          <button @click="showLastname = false">post</button>
        </modal>
      </div>
<!--////////////////////////////////////////////////////////////////////// -->
      <div class="text" v-if="!showName">
        {{request_profile.data.name}}
      </div>
      <div class="text" v-if="showName">
        <!-- <edit :type="" :url="" :name="" :value="" :placeholder="" :input_class="" :required=""/> -->
      </div>
      <div class="icon">
        <button class="material-icons" @click="showName = true">border_color</button>
        <modal v-if="showName">
          <button @click="showName = false">post</button>
        </modal>
      </div>
<!--////////////////////////////////////////////////////////////////////// -->

    </div>
    <request :obj="request_profile" v-model="request_profile"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request";
  import Edit from "../../../components/inputs/edit";

  export default {
    name: "users_profile",
    components:{
      Request,
      Edit
    },
    data(){
      return{
        showFirstname: false,
        showLastname: false,
        showName: false,
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

.text{
  padding: 17px;
  width: 80%;
  margin: 0 10% 0 0;
  float:left;
}
.icon{
  padding: 17px;
  width: 10%;
  float:left;
}
.material-icons{
  float: left;
  font-size:20px;
}
</style>
