<template>
  <div class="profile">
    <u_head/>
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
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request";
  import U_head from "../../../components/u_head/index";
  import Edit from "../../../components/inputs/edit";
  import Posts from "../../../components/articles/posts";
  import Create_article from "../../../components/articles/create";
  import Add from "../../../components/add/index";

  export default {
    name: "users_profile",
    components:{
      Add,
      Create_article,
      Posts,
      Edit,
      U_head,
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
        'list_relations'
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
        this.get_user_profile()
      }
    },
    mounted(){
      this.get_user_profile()
    },
    methods:{
      get_user_profile(){
        this.request_profile.params.user_id = this.$route.params.id
        this.request_profile.request = true
      }
    }
  }
</script>

<style lang="scss" scoped>

  .add{
    text-align: right;
  }

</style>
