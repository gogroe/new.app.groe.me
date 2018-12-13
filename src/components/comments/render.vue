<template>
  <div>
    <div class="render_comments">
      <ul :class="{'active': request_article_comments.data.length > 0}">
        <li v-for="(comment, i) in request_article_comments.data" :key="i">
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
  export default {
    name: "render_comments",
    components: {Request},
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

  ul{
    &.active{
      margin-top: 27px;
    }
    li{
      margin-bottom: 17px;
    }
  }


</style>
