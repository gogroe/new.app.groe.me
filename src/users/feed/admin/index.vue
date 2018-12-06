<template>
  <div class="profile">
    <u_head/>
    <h6>VERWALTEN</h6>
    <div class="default_box">
      <ul>
        <li class="active">Nutzer</li>
        <li>Kontakt</li>
        <li>Adresse</li>
        <li>Bankdaten</li>
        <li>Password ändern</li>
      </ul>
      <div class="content">
        <edit :obj="inputs.lastname"/>
      </div>
      <div class="clear"></div>
    </div>
    <pre>{{request_profile.data}}</pre>
    <request :obj="request_profile" v-model="request_profile"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request";
  import U_head from "../../../components/u_head/index";
  import Edit from "../../../components/inputs/edit";

  export default {
    name: "users_admin",
    components:{
      Edit,
      U_head,
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
        },
        inputs:{
          lastname:{
            url: 'https://newbackend.groe.me/users/update_user',
            label: 'Nachname',
            name: 'lastname',
            value: 'test',
            select:'',
            placeholder: 'Nachname',
            type: 'text',
            input_class:'',
            label_class: '',
            required_params: {
              user_id: this.$route.params.id,
              uid: 1
            }
          }
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
        // this.set_inputs()
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
      // this.set_inputs()
    },
    methods:{
      // set_inputs(){
      //   for(let key in this.request_profile.data){
      //     if(key in this[key]){
      //       this[key]['value'] = this.request_profile.data[key]
      //       this[key]['name'] = key
      //     }
      //   }
      // },
      get_user_profile(){
        this.request_profile.params.user_id = this.$route.params.id
        for(let up_key in this.user_profiles){
          if( this.user_profiles[up_key].id === this.route_id ){
            this.request_profile.data = this.user_profiles[up_key]
            return
          }
        }
        this.request_profile.request = true
      }
    }
  }
</script>

<style lang="scss" scoped>

  .default_box{
    padding: 0 17px;
  }

  ul{
    width: 30%;
    padding: 27px 0;
    border-right: 1px solid #e6e6e6;
    float:left;

    li{
      margin-bottom: 27px;
      &.active{
        color: #3da0f5;
      }
    }
  }

  .content{
    width: 70%;
    padding: 17px;
    float:left
  }

  .clear{
    clear: both;
  }
</style>
