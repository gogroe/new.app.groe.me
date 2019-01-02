<template>
  <div class="article"
       @mouseover="active.post = true"
       @mouseout="active.post = false">
    <div class="default_box">
      <post v-if="search_relations(obj.type) === 'posts'"
            :obj="obj"
            :active_article="active"/>
      <article_comments :relation_id="obj.id"
                        :relation_type="search_relations(obj.type)"
                        class="article_comments"/>
    </div>
  </div>
</template>

<script>

  // obj:[
  //   {
  //     id: integer,
  //     state: integer,
  //     create_user_id: integer,
  //     create_date: timestamp,
  //     edit_user_id: integer,
  //     edit_date: timestamp,
  //     content: text,
  //     subject: text,
  //     type: integer,
  //     medias: []
  //     firstname: string
  //     lastname: string
  //     image: string
  //     like_active: boolean
  //   }
  // ]

  import { mapGetters } from 'vuex'
  import Article_comments from "../comments/index";
  import User_image from "../user_image/index";
  import User_name from "../user_name/index";
  import From_now from "../date/from_now";
  import Post from "./types/post";

  export default {
    name: "articles",
    components: {
      Post,
      From_now,
      User_name,
      User_image,
      Article_comments,
    },
    props:{
      obj:{
        type: Object,
        required: true
      }
    },
    data(){
      return{
        active: {
          post: false,
          more: false
        }
      }
    },
    computed:{
      ...mapGetters([
        'list_relations'
      ])
    },
    methods:{
      search_relations(value){
        for (let key in this.list_relations){
          if (this.list_relations[key] == value){
            return key
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .default_box{
    padding: 0;
    margin-bottom: 8px;
  }

</style>
