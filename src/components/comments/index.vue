<template>
  <div>
    <div class="comments">
      <div class="render">
        <render_comments :relation_type="list_relations['posts']"
                         :relation_id="articles_id"
                         :action="action"
                         v-model="action"/>
      </div>
      <div class="create">
        <user_image :path="get_header.image" size="35" class="user_image"/>
        <create_comment :relation_type="list_relations['posts']"
                        :relation_id="articles_id"
                        v-model="action"
                        class="create_comment"/>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Create_comment from "./create";
  import Render_comments from "./render";
  import User_image from "../user_image/index";

  export default {
    name: "comments",
    props:{
      articles_id:{
        required: true
      }
    },
    components: {User_image, Render_comments, Create_comment},
    data(){
      return{
        action: null
      }
    },
    computed:{
      ...mapGetters([
        'list_relations',
        'get_header'
      ])
    }
  }
</script>

<style lang="scss" scoped>

  .comments{
    width: 100%;
    padding: 17px;
  }

  .user_image{
    float: left;
    margin-right: 17px;
  }

  .create{
    margin-top: 10px;
  }

  .create_comment{
    width: calc(100% - 43px - 52px);
    float: left;
  }
</style>
