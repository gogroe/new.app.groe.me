<template>
  <div class="create_article">
    <h6>POST ERSTELLEN</h6>
    <div class="default_box articles">
      <inputs :obj="inputs_create_article.name"
              :request_data="request_articles_create.data"
              v-model="inputs.name"/>
      <inputs :obj="inputs_create_article.value"
              :request_data="request_articles_create.data"
              v-model="inputs.value"/>
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
            type: this.type, //posts
            relation_id: null,
            relation_type: 0, //relations
            name: '',
            value: ''
          },
          url: 'https://newbackend.groe.me/post/create',
          data: {},
          request: false
        },
        inputs_create_article:{
          name:{
            url: 'https://newbackend.groe.me/post/create',
            label: 'Überschrift',
            name: 'name',
            value:'',
            select:'',
            placeholder: 'Überschrift',
            type: 'text',
            input_class:'create_input',
            label_class: 'create_input_label',
            error_class: '',
          },
          value:{
            url: 'https://newbackend.groe.me/posts/create_post',
            label: 'Beitrag',
            name: 'value',
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
          name: { value: '' },
          value: { value: '' }
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
        this.request_articles_create.params.name = this.inputs.name.value
        this.request_articles_create.params.value = this.inputs.value.value
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
