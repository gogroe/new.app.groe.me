<template>
  <div>
    <inputs :obj="inputs_create_comment.value"
            :request_data="request_comments_create.data"
            v-model="inputs.subject"/>
    <button @click="create_comment">Senden</button>
    <div class="clear"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Inputs from "../inputs/index";

  export default {
    name: "create_comment",
    components: {Inputs},
    props:{
      relation_type:{
        required: true
      }
    },
    data(){
      return{
        request_comments_create: {
          params: {
            uid: null,
            relation_id: null,
            relation_type: this.relation_type,
            value: '',
          },
          url: 'http://newbackend.groe.me/articles/create_comment',
          data: {},
          request: false
        },
        inputs_create_comment:{
          value:{
            url: '',
            label: 'Kommentar',
            name: 'subject',
            value:'',
            select:'',
            placeholder: 'Kommentar schreiben',
            type: 'textarea',
            input_class:'create_input',
            label_class: 'create_input_label',
            error_class: '',
          }
        },
        inputs:{
          value: { value: '' },
        }
      }
    },
    computed:{
      ...mapGetters([
        'list_relations'
      ])
    },
    methods:{
      create_comment(){

      }
    }
  }
</script>

<style scoped>

</style>
