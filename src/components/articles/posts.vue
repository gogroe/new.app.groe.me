<template>
  <div class="posts"
       @mouseover="active.post = true"
       @mouseout="active.post = false">
    <div class="default_box">
      <div class="head">
        <user_image path=""
                    size="43"
                    class="user_image"/>
        <user_name name="Jack Schmidt" :id="obj.create_user_id"
                   class="user_name"/>
        <div class="clear"></div>
        <div class="options">
          <p class="option" v-if="active.post"><i class="material-icons">more_horiz</i></p>
          <p class="date" v-else>{{timestamp_to_date(obj.create_date)}}</p>
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
  import Article_comments from "../comments/index";
  import User_image from "../user_image/index";
  import User_name from "../user_name/index";
  import moment from 'moment'

  export default {
    name: "posts",
    components: {
      User_name,
      User_image,
      Article_comments,
      Likes
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
    methods:{
      timestamp_to_date(timestamp){
        return moment.unix(timestamp).lang("de").startOf('day').fromNow()
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

      .date{
        color: #bbbbbb;
      }

      .option{
        i{
          vertical-align: middle;
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
