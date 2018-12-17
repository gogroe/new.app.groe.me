<template>
  <div>
    <i class="material-icons"
       @click="$emit('input', !active)"
       v-if="active === false">favorite_border</i>
    <i class="material-icons"
       @click="$emit('input', !active)"
       v-if="active">favorite</i>
    <request :obj="request_likes" v-model="request_likes"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../functions/request";

  export default {
    name: "likes",
    components: {Request},
    props:{
      active:{
        required: true
      }
    },
    data(){
      return{
        request_likes:{
          params: {
            relation_type: this.list_relations.posts,
            relation_id: this.$route.params.id,
            uid: this.$route.params.id
          },
          url: 'https://newbackend.groe.me/articles/create_article_like',
          data: {},
          request: false
        },
      }
    },
    computed:{
      ...mapGetters([
        'list_relations'
      ])
    }
  }
</script>

<style scoped>
  i{
    cursor:pointer;
  }
</style>
