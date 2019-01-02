<template>
  <div class="profile">
    <add class="add"
         :active="active.create"
         name="Beitrag"
         v-model="active.create"/>
    <create_article :type="list_relations.posts"
                    v-if="active.create"/>
    <h6>BEITRÄGE</h6>
    <posts v-for="(article, i) in request_profile_data"
           :key="i"
           v-if="article.type == list_relations.posts"
           :obj="article"/>
    <request :obj="request_profile" v-model="request_profile"/>
  </div>
</template>

<script>
  import Load_request from '../../../components/functions/load_request'
  import { mapGetters } from 'vuex'
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
        'list_relations',
      ]),
      request_profile_data(){
        return this.request_profile.data
      },
      route_id(){
        return this.$route.params.id
      }
    },
    watch:{
      route_id: function () {
        this.get_user_request(this.request_profile)
      }
    },
    mounted(){
      this.get_user_request(this.request_profile)
    },
    mixins:[Load_request]
  }
</script>

<style lang="scss" scoped>

  .add{
    text-align: right;
  }

</style>
