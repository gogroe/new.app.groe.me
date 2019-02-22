<template>
  <div class="delete">
    <i class="material-icons"
       @click="request_delete.request = true"
       :style="{fontSize: size, color: color}">{{icon}}</i>
    <request :obj="request_delete" v-model="request_delete"/>
  </div>
</template>

<script>
  import Load_request from '../functions/load_request'
  import Request from "../functions/request";

  export default {
    name: "delete",
    components: {Request},
    props:{
      obj:{
        type: Object,
        required: true
      },
      icon:{
        type: String,
        required: true
      },
      reload:{
        type: Object,
        required: false
      },
      size:{
        type: String,
        required: false
      },
      color:{
        type: String,
        required: false
      }
    },
    data(){
      return{
        request_delete:{
          params: {},
          url: '',
          data: {},
          request: false
        }
      }
    },
    computed:{
      request_delete_data(){
        return this.request_delete.data
      }
    },
    watch:{
      request_delete_data:function (object) {
        this.create_update_reload(object, this.reload)
        this.$emit('input', object)
      },
      obj: function (object) {
        if(this.request_delete !== object){
          this.request_delete = object
        }
      }
    },
    mounted(){
      this.request_delete = this.obj
    },
    mixins:[Load_request]
  }
</script>

<style lang="scss" scoped>

  i{
    cursor: pointer;
    font-size: 24px;

    &:hover{
      color: #3da0f5;
    }
  }

</style>
