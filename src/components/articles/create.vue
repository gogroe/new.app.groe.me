<template>
  <div class="create_article">
    <h6>POST ERSTELLEN</h6>
    <div class="default_box articles">
      <inputs :obj="inputs_create_article.subject"
              :request_data="request_articles_create.data"
              v-model="inputs.subject"/>
      <inputs :obj="inputs_create_article.content"
              :request_data="request_articles_create.data"
              v-model="inputs.content"/>
      <button @click="create_article">SENDEN</button>
      <div class="clear"></div>
    </div>
    <request :obj="request_articles_create"/>
  </div>
</template>

<script>
  import Inputs from "../inputs/index";
  import Request from "../functions/request";
  import { mapGetters } from 'vuex'

  export default {
    name: "create_article",
    components: {
      Request,
      Inputs
    },
    props:{
      type:{
        required: true
      }
    },
    data(){
      return{
        request_articles_create: {
          params: {
            uid: null,
            type: this.type, //posts
            relation_id: null,
            relation_type: 0, //relations
            subject: '',
            content: ''
          },
          url: 'http://newbackend.groe.me/articles/create_article',
          data: {},
          request: false
        },
        inputs_create_article:{
          subject:{
            url: 'http://newbackend.groe.me/articles/create_article',
            label: 'Überschrift',
            name: 'subject',
            value:'',
            select:'',
            placeholder: 'Überschrift',
            type: 'text',
            input_class:'create_input',
            label_class: 'create_input_label',
            error_class: '',
          },
          content:{
            url: 'http://newbackend.groe.me/articles/create_article',
            label: 'Beitrag',
            name: 'content',
            value:'',
            select:'',
            placeholder: 'Beitrag',
            type: 'textarea',
            input_class:'create_input',
            label_class: 'create_input_label',
            error_class: '',
          }
        },
        inputs:{
          subject: { value: '' },
          content: { value: '' }
        }
      }
    },
    computed:{
      ...mapGetters([
        'list_relations'
      ])
    },
    methods:{
      create_article(){
        this.request_articles_create.params.subject = this.inputs.subject.value
        this.request_articles_create.params.content = this.inputs.content.value
        this.request_articles_create.params.uid = this.$route.params.id
        this.request_articles_create.params.relation_id = this.$route.params.id
        this.request_articles_create.request = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .default_box{
    margin-bottom: 17px;
  }

  button{
    float:right;
  }
</style>
