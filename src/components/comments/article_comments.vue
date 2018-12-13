<template>
  <div>
    <div class="article_comments">
      <render_comments :relation_type="list_relations['posts']"
                       :relation_id="articles_id"
                       :action="action"
                       v-model="action"/>
      <create_comment :relation_type="list_relations['posts']"
                      :relation_id="articles_id"
                      v-model="action"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Create_comment from "./create";
  import Render_comments from "./render";

  export default {
    name: "article_comments",
    props:{
      articles_id:{
        required: true
      }
    },
    components: {Render_comments, Create_comment},
    data(){
      return{
        action: null
      }
    },
    computed:{
      ...mapGetters([
        'list_relations'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .article_comments{
    width: 100%;
    margin-top: 17px;
  }
</style>
