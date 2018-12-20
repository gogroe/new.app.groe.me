<template>
  <div>
    <div class="comments">
      <div class="render">
        <render_comments :relation_type="list_relations['posts']"
                         :relation_id="relation_id"
                         :action="action"
                         v-model="action"/>
      </div>
      <div class="create">
        <user_image :path="get_header.image" size="35" class="user_image"/>
        <create_comment :relation_type="list_relations[relation_type]"
                        :relation_id="relation_id"
                        v-model="action"
                        class="create_comment"/>
        <like :relation_type="relation_type" :relation_id="relation_id" class="like"/>
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
  import Like from "../like/index";

  export default {
    name: "comments",
    props:{
      relation_id:{
        required: true
      },
      relation_type:{
        required: true
      }
    },
    components: {Like, User_image, Render_comments, Create_comment},
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
    padding: 0 17px 17px 17px;
  }

  .user_image{
    float: left;
    margin-right: 17px;
  }

  .create{
    margin-top: 10px;
  }

  .create_comment{
    width: calc(100% - 70px - 52px);
    float: left;
  }

  .like{
    float: left;
  }
</style>
