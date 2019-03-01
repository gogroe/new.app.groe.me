<template>
  <div class="delete" v-if="is_perm('delete')"  @click="request_delete.request = true">
    <i class="material-icons"
       :style="{fontSize: size, color: color}">{{icon}}</i> <span v-if="name !== undefined"  :style="{color: color}">{{name}}</span>
    <request :obj="request_delete" v-model="request_delete"/>
  </div>
</template>

<script>
  import Permission from '../functions/permission'
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
      name:{
        type: String,
        required: false
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
    mixins:[Load_request, Permission]
  }
</script>

<style lang="scss" scoped>

  .delete{
    cursor: pointer;

    &:hover{
      color: #3da0f5;
    }
  }

  i{
    font-size: 24px;
    vertical-align: middle;
  }

  span{
    margin-left: 17px;
  }


</style>
