<template>
  <div class="profile">
    <add class="add"
         :active="active.create"
         name="Vita"
         v-model="active.create"/>
    <create_article :type="list_relations.posts"
                    v-if="active.create"/>
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

  export default {
    name: "users_profile",
    components:{
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
