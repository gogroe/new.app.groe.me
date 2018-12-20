<template>
  <div class="posts"
       @mouseover="active.post = true"
       @mouseout="active.post = false">
    <div class="default_box">
      <div class="head">
        <user_image :path="obj.image"
                    size="43"
                    class="user_image"/>
        <user_name :name="obj.firstname + ' ' + obj.lastname" :id="obj.create_user_id"
                   class="user_name"/>
        <div class="clear"></div>
        <div class="options">
          <p class="option"
             v-if="active.post"><i class="material-icons">more_horiz</i></p>
          <from_now v-else
                    :timestamp="obj.create_date"
                    class="date"/>
        </div>
      </div>
      <div class="content">
        <p class="subject">{{obj.subject}}</p>
        <div v-if="obj.content.length > 200"
             class="post_content">
          <p v-if="active.more">
            {{obj.content}}
            <span @click="active.more = false">weniger...</span>
          </p>
          <p v-else>
            {{obj.content.substring(0,200)}}
            <span @click="active.more = true">mehr...</span>
          </p>
        </div>
        <div v-else
             class="post_content">
          <p> {{obj.content}} </p>
        </div>
      </div>
      <div class="image_wrapper">
        <img src="/static/layout/reichstag.jpg"/>
      </div>
      <article_comments :relation_id="obj.id" relation_type="post" class="article_comments"/>
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
  //     "medias": []
  //     "firstname": string
  //     "lastname": string
  //     "image": string
  //   }
  // ]

  import Article_comments from "../comments/index";
  import User_image from "../user_image/index";
  import User_name from "../user_name/index";
  import From_now from "../date/from_now";

  export default {
    name: "posts",
    components: {
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
    }
  }
</script>

<style lang="scss" scoped>
  .default_box{
    padding: 0;
    margin-bottom: 8px;
  }

  .head{
    padding: 17px 17px 27px 17px;
    position: relative;

    .user_image{
      float: left;
      margin-right: 17px;
    }

    .user_name{
      float: left;
      padding-top: 14px;
    }

    .options{
      position: absolute;
      right: 17px;
      top: calc( 17px + 12px);

      .option{
        i{
          margin-top: -5px;
        }
      }
    }
  }

  .content{
    line-height: 18px;
    padding: 17px 17px 27px 17px;

    .subject{
      font-weight: 700;
    }

    .post_content{
      span{
        display: inline-block;
        margin-left: 10px;
        color: #3da0f5;
        cursor: pointer;
      }
    }
  }

  .image_wrapper{
    position: relative;
    width: 100%;
    overflow: hidden;
    background-size: cover;

    img{
      width: 100%;
    }
  }


</style>
