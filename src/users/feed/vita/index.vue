<template>
  <div class="profile">
    <add class="add"
         :active="active.create"
         name="Vita"
         v-model="active.create"/>
    <create_vita v-if="active.create" v-model="action"/>
    <h6>VITAS</h6>
    <posts v-for="(article, i) in request_vitas_data"
           :key="i"
           :obj="article"/>
    <request :obj="request_vitas" v-model="request_vitas"/>
  </div>
</template>

<script>
  import Load_request from '../../../components/functions/load_request'
  import Request from "../../../components/functions/request";
  import Edit from "../../../components/inputs/edit";
  import Posts from "../../../components/articles/index";
  import Create_article from "../../../components/articles/create";
  import Add from "../../../components/add/index";
  import Create_vita from "./create";

  export default {
    name: "users_profile",
    components:{
      Create_vita,
      Add,
      Create_article,
      Posts,
      Edit,
      Request,
    },
    data(){
      return{
        active:{
          create: false
        },
        action: null,
        request_vitas: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/users/get_user_vitas',
          data: {},
          request: false
        }
      }
    },
    computed:{
      request_vitas_data(){
        return this.request_vitas.data
      },
      route_id(){
        return this.$route.params.id
      }
    },
    watch:{
      route_id: function () {
        this.get_user_request(this.request_vitas)
      },
      action: function (string) {
        if(string === 'reload'){
          this.request_vitas.request = true
          this.action = null
        }
      }
    },
    mounted(){
      this.get_user_request(this.request_vitas)
    },
    mixins:[Load_request]
  }
</script>

<style lang="scss" scoped>

  .add{
    text-align: right;
  }

</style>
