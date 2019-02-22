<template>
  <div>
    <div class="like">
      <i class="material-icons"
         :style="{ fontSize: size + 'px', color: color}"
         @click="set"
         v-if="active === false">favorite_border</i>
      <i class="material-icons active"
         :style="{ fontSize: size + 'px'}"
         @click="set"
         v-if="active">favorite</i>
      <span>{{count}}</span>
    </div>
    <request :obj="request_set_article_like" v-model="request_set_article_like"/>
    <request :obj="request_get_article_likes" v-model="request_get_article_likes"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../functions/request";

  export default {
    name: "like",
    components: {Request},
    props:{
      relation_id:{
        required: true
      },
      relation_type:{
        required: true
      },
      size: {
        required: false
      },
      color: {
        required: false
      }
    },
    data(){
      return{
        request_set_article_like:{
          params: {
            state: 0,
            relation_id: this.relation_id,
            relation_type: '',
          },
          url: 'https://newbackend.groe.me/like/update',
          data: {},
          request: false
        },
        request_get_article_likes:{
          params: {
            relation_id: this.relation_id,
            relation_type: '',
            user_id: this.$route.params.id
          },
          url: 'https://newbackend.groe.me/like/get_all',
          data: {},
          request: false
        },
        active: false
      }
    },
    computed:{
      ...mapGetters([
        'list_relations'
      ]),
      request_set_article_like_data(){
        return this.request_set_article_like.data
      },
      request_get_article_likes_data(){
        return this.request_get_article_likes.data
      },
      count(){
        return 'count' in this.request_get_article_likes.data
          ? this.request_get_article_likes.data.count
          : 0
      },
      like_active(){
        return 'active' in this.request_get_article_likes.data
          ? this.request_get_article_likes.data.active
          : false
      },
    },
    watch:{
      request_set_article_like_data(object){
        if('update_state' in object){
          this.request_get_article_likes.request = true
        }
        if('create' in object){
          this.request_get_article_likes.request = true
        }

      },
      request_get_article_likes_data(object){
        if('active' in object){
          this.active = object.active
        }
      }
    },
    mounted(){
      this.request_set_article_like.params.relation_type = this.list_relations[this.relation_type]
      this.request_get_article_likes.params.relation_type = this.list_relations[this.relation_type]
      this.request_get_article_likes.request = true
    },
    methods:{
      set(){
        this.active = !this.active
        this.request_set_article_like.params.state = this.active === true ? 1 : 0
        this.request_set_article_like.request = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .like{
    padding-top: 2px;
    width: 70px;
    text-align: right;
  }

  i{
    vertical-align: middle;
    cursor:pointer;
    &.active{
      color: #ff3434;
    }
  }

  span{
    color: #bbbbbb;
    font-weight: 300;
  }

</style>
