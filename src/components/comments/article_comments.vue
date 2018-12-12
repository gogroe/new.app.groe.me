<template>
  <div>
    <div class="article_comments">
      <create_comment/>

    </div>
  </div>
</template>

<script>
  import Create_comment from "./create";
  export default {
    name: "article_comments",
    props:{
      articles_id:{
        required: true
      }
    },
    components: {Create_comment}
  }
</script>

<style lang="scss" scoped>
  .article_comments{
    width: 100%;
    margin-top: 17px;
  }
</style>
