<template>
  <div>
    <request :obj="request_get_list" v-model="request_get_list"/>
  </div>
</template>

<script>
  import Custom_helper from "../functions/custom_helper"
  import Request from "../functions/request";
  import { mapGetters } from 'vuex'

  export default {
    name: "list",
    props:{
      list_name:{
        required: true
      },
      use_store:{
        required: false
      }
    },
    components: {Request},
    data(){
      return{
        request_get_list:{
          params: {
            list_group: this.list_name
          },
          url: 'https://newbackend.groe.me/list/get_one',
          data: {},
          request: false
        }
      }
    },
    computed:{
      ...mapGetters([
        'lists'
      ]),
      request_get_list_data(){
        return this.request_get_list.data
      }
    },
    watch:{
      list_name: function(){
        this.get_list()
      },
      request_get_list_data: function (array) {
        let list = array

        for(let list_key in list){
          list[list_key].name = this.translate( list[list_key].name )
        }

        this.update_list(list)
        this.$emit('input', list)
      }
    },
    mounted(){
      this.get_list()
    },
    methods:{
      update_list(array){
        if(array.length > 0 ){
          this.options = array

          const list = {
            list_group: this.list_name,
            list: array
          }
          this.$store.commit('update_lists', list)
        }
      },
      get_list(){
        if(this.use_store === undefined || this.use_store === false || this.use_store ===  null){
          if(this.list_name in this.lists){
            this.$emit('input', this.lists[this.list_name])
          }
          else {
            this.request_get_list.params.list_group = this.list_name
            this.request_get_list.request = true
          }
        }
      }
    },
    mixins:[Custom_helper]
  }
</script>
