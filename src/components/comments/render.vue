<template>
  <div>
    <div class="render_comments">
      <p class="details" v-if="request_article_comments.data.length > 0">8 Kommentare</p>
      <ul :class="{'active': request_article_comments.data.length > 0}">
        <li v-for="(comment, i) in request_article_comments.data" :key="i">
          <user_image path=""
                      size="27"
                      image_class="posts_user_image"/>
          <a @click="$router.push('/users/' + comment.create_user_id + '/profile')">Nutzer Name</a>
          <p>{{comment.value}}</p>
        </li>
      </ul>
    </div>
    <request :obj="request_article_comments" v-model="request_article_comments"/>
  </div>
</template>

<script>
  import Request from "../functions/request";
  import User_image from "../user_image/index";
  export default {
    name: "render_comments",
    components: {User_image, Request},
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
        }
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
    margin-top: 27px;
    margin-bottom: 8px;
    font-size: 13px;
    color: #e6e6e6;
  }

  ul{
    font-size: 13px;

    &.active{
      padding-top: 10px;
    }
    li{
      margin-bottom: 17px;

      p{
        font-weight: 400;
      }
    }
  }


</style>
