<template>
  <div>
    <div class="like">
      <i class="material-icons"
         @click="$emit('input', !active)"
         v-if="active === false">favorite_border</i>
      <i class="material-icons active"
         @click="$emit('input', !active)"
         v-if="active">favorite</i>
      <span>460</span>
    </div>
    <!--<request :obj="request_likes" v-model="request_likes"/>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../functions/request";

  export default {
    name: "like",
    components: {Request},
    props:{
      active:{
        required: false
      },
      relation_id:{
        required: true
      },
      relation_type:{
        required: true
      }
    },
    data(){
      return{
        request_likes:{
          params: {
            relation_type: null,
            uid: this.$route.params.id
          },
          url: 'https://newbackend.groe.me/articles/create_article_like',
          data: {},
          request: false
        },
      }
    },
    computed:{
      ...mapGetters([
        'list_relations'
      ])
    },
    mounted(){
      this.request_likes.params.relation_type = this.list_relations[this.relation_type]
    }
  }
</script>

<style lang="scss" scoped>
  .like{
    padding-top: 2px;
    width: 70px;
    text-align: right;
  }

  i{
    vertical-align: middle;
    cursor:pointer;
    &.active{
      color: #ff3434;
    }
  }

  span{
    color: #bbbbbb;
    font-weight: 300;
  }

</style>
