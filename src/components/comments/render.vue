<template>
  <div>
    <div class="render_comments">
      <p class="details"
         :class="{'active': active.render}"
         v-if="comments.length > 0">
        {{count}}
        <span @click="active.render = true">
          KOMMENTAR<span v-if="comments.length > 1">E</span> ANZEIGEN
        </span>
      </p>
      <hr v-if="comments.length > 0">
      <ul v-if="active.render">
        <li v-for="(comment, i) in comments" :key="i">
          <user_image path=""
                      size="35"
                      class="user_image"/>
          <div class="comment_content">
            <user_name :name="comment.firstname + ' ' + comment.lastname"
            :id="comment.create_user_id"
            class="user_name"/>
            <from_now class="date" :timestamp="comment.create_date"/>
            <p>{{comment.value}}</p>
          </div>
          <div class="clear"></div>
        </li>
      </ul>
    </div>
    <request :obj="request_article_comments" v-model="request_article_comments"/>
  </div>
</template>

<script>
  import Request from "../functions/request";
  import User_image from "../user_image/index";
  import User_name from "../user_name/index";
  import moment from 'moment'
  import From_now from "../date/from_now";

  export default {
    name: "render_comments",
    components: {From_now, User_name, User_image, Request },
    props:{
      relation_type:{
        required: true
      },
      relation_id:{
        required: true
      },
      action:{
        required: true
      }
    },
    data(){
      return{
        request_article_comments: {
          params: {
            relation_type: this.relation_type,
            relation_id: this.relation_id
          },
          url: 'https://newbackend.groe.me/articles/get_article_comments',
          data: {},
          request: false
        },
        active:{
          render: false
        }
      }
    },
    computed:{
      comments(){
        return 'comments' in this.request_article_comments.data
          ? this.request_article_comments.data.comments
          : []
      },
      count(){
        return 'count' in this.request_article_comments.data
          ? this.request_article_comments.data.count
          : 0
      }
    },
    watch:{
      action: function (string) {
        if(string === 'reload'){
          this.request_article_comments.request = true
          this.$emit('input', null)
        }
      }
    },
    mounted(){
      this.request_article_comments.request = true
    }
  }
</script>

<style lang="scss" scoped>

  .details{
    height: 43px;
    padding: 12.5px 0;
    line-height: 18px;
    font-size: 18px;
    color: #3da0f5;
    cursor: pointer;

    &.active{
    color: #e6e6e6;

      span{
        cursor: default;
      }
    }
  }

  ul{
    padding-top: 17px;
    font-size: 13px;


    li{
      margin-bottom: 17px;

      .user_image{
        float:left;
        margin-right: 17px;
      }

      .comment_content{
        padding-top: 6px;
        float:left;

        .user_name{
          display: inline;
        }

        .date{
          display: inline;
        }
      }

      p{
        line-height: 18px;
        font-weight: 400;
      }
    }
  }

  hr{
    padding-bottom: 10px;
  }


</style>
