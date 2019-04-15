<template>
  <div class="delete"
       v-if="is_perm('delete')"
       @click="delete_request">
    <i class="material-icons"
       :style="{fontSize: size, color: color}">
      {{icon}}
    </i>
    <span
      v-if="name !== undefined"
      :style="{color: color}">
      {{name}}
    </span>
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
        response: []
      }
    },
    computed:{
      request_delete_data(){
        return this.request_delete.data
      }
    },
    methods:{
      delete_request () {
        this.$$request.post.data(this.obj.url, this.obj.params)
          .then((response) => this.handle_response(response))
      },
      handle_response (response) {
        this.response = response

        if('update' in response){
          this.$store.commit('update_reload', this.reload)
        }

        this.$emit('input', response)
      }
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
