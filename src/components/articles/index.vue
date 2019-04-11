<template>
  <div class="article"
       @mouseover="active.article = true"
       @mouseout="active.article = false">
    <div class="default box">
      <post v-if="search_relations(obj.type) === 'posts'"
            :obj="obj"
            :active_article="active.article"/>
      <vita v-if="search_relations(obj.type) === 'vita'"
            :obj="obj"
            :active_article="active.article"/>
      <article_comments :relation_id="obj.id"
                        :relation_type="search_relations(obj.type)"
                        v-if="search_relations(obj.type) !== 'vita'"
                        class="article_comments"/>
    </div>
  </div>
</template>

<script>
  // post object
  // obj:[
  //   {
  //     id: integer,
  //     state: integer,
  //     create_user_id: integer,
  //     create_date: timestamp,
  //     edit_user_id: integer,
  //     edit_date: timestamp,
  //     value: text,
  //     name: text,
  //     type: integer,
  //     medias: []
  //     firstname: string
  //     lastname: string
  //     image: string
  //     like_active: boolean
  //   }
  // ]

  // vita object
  // obj:[
  //   {
  //     id: integer,
  //     state: integer,
  //     create_user_id: integer,
  //     create_date: timestamp,
  //     edit_user_id: integer,
  //     edit_date: timestamp,
  //     value: text,
  //     name: text,
  //     type: integer,
  //     medias: []
  //     firstname: string
  //     lastname: string
  //     image: string
  //     like_active: boolean
  //   }
  // ]

  import helper from '../functions/custom_helper'
  import Article_comments from "../comments/index";
  import User_image from "../user_image/index";
  import User_name from "../user_name/index";
  import From_now from "../date/from_now";
  import Post from "./types/post";
  import Vita from "./types/vita/index";

  export default {
    name: "articles",
    components: {
      Vita,
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
          article: false,
          more: false
        }
      }
    },
    mixins:[helper]
  }
</script>

<style lang="scss" scoped>

  .default.box{
    width: 600px;
    display: block;
    margin: 25px auto;
  }

</style>
