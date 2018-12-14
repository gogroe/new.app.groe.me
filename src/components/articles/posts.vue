<template>
  <div class="posts">
    <div class="default_box">
      <div class="head">
        <p>
          <user_image path=""
                      size="35"
                      image_class="posts_user_image"/>
          {{obj.subject}}
          <span><br/>Nutzername</span>
          <span class="clear">
          </span>
        </p>
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
  import User_image from "../user_image/index";
  export default {
    name: "posts",
    components: {
      User_image,
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

  p{
    line-height: 18px;
    font-weight: 700;

    span{
      font-size: 14px;
      font-weight: 400;
      color: #cdcdcd;
    }
  }
</style>
