<template>
  <div class="posts">
    <div class="default_box">
      <div class="head">
        <h2>{{obj.subject}}</h2>
        <likes :articles_id="obj.id"/>
      </div>
      <div class="content">
        <p>{{obj.content}}</p>
      </div>
      <article_comments :articles_id="obj.id"/>
    </div>
  </div>
</template>

<script>

  // obj:[
  //   {
  //     "id": "integer",
  //     "state": "integer",
  //     "create_user_id": "integer",
  //     "create_date": "timestamp",
  //     "edit_user_id": "integer",
  //     "edit_date": "timestamp",
  //     "content": "text",
  //     "subject": "text",
  //     "type": "integer",
  //     "comments": [],
  //     "likes": [],
  //     "tags": [],
  //     "medias": []
  //   }
  // ]

  import Likes from "../likes/index";
  import Article_comments from "../comments/article_comments";
  export default {
    name: "posts",
    components: {
      Article_comments,
      Likes
    },
    props:{
      obj:{
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .default_box{
    margin-bottom: 8px;
  }
</style>
