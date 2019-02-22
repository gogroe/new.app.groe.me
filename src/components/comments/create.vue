<template>
  <div>
    <inputs :obj="fill_inputs('value', create_article_comment)"
            :request_data="request_create_comments.data"
            v-model="create_article_comment.inputs.value.input"/>
    <div class="clear"></div>
    <request :obj="request_create_comments" v-model="request_create_comments"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Inputs from "../inputs/index";
  import Request from "../../components/functions/request"
  import Load_request from "../../components/functions/load_request"
  import Custom_helper from "../../components/functions/custom_helper"

  export default {
    name: "create_comment",
    components: {
      Inputs,
      Request
    },
    props:{
      relation_type:{
        required: true
      },
      relation_id:{
        required: true
      }
    },
    data(){
      return{
        request_create_comments: {
          params: {
            comment: '',
            relation_type: this.relation_type,
            relation_id: this.relation_id
          },
          url: 'https://newbackend.groe.me/comment/create',
          data: {},
          request: false
        },
        create_article_comment:{
          url: 'https://newbackend.groe.me/comment/create',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          inputs:{
            value: {
              name: 'Kommentar schreiben...',
              type: 'text',
              input:{
                value: '',
                event: null
              }
            },
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'list_relations'
      ]),
      comment_event(){
        return this.create_article_comment.inputs.value.input.event
      },
      request_create_comments_data(){
        return this.request_create_comments.data
      }
    },
    watch:{
      comment_event: function (event) {
        if(event === 'enter'){
          this.send()
        }
      },
      request_create_comments_data: function (object) {
        if('create' in object){
          this.create_article_comment.inputs.value.input.value = ''
          this.$emit('input', 'reload')
        }
      }
    },
    methods:{
      send(){
        if(this.create_article_comment.inputs.value.input.value.length > 0){
          this.request_create_comments.params.comment = this.create_article_comment.inputs.value.input.value
          this.request_create_comments.request = true
        }
      }
    },
    mixins:[Custom_helper, Load_request]
  }
</script>

<style scoped>

</style>
