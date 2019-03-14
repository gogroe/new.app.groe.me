<template>
  <div
    class="delete"
    v-if="is_perm('delete')"
    @click="send">
    <i v-if="icon !== undefined"
       class="material-icons"
       :style="{fontSize: icon_size, color: color}">
      {{icon}}
    </i>
    <span
      v-if="name !== undefined"
      :style="{fontSize: font_size, color: color}">
      {{name}}
    </span>
  </div>
</template>

<script>
  export default {
    name: "edit_delete",
    props:{
      url:{
        type: String,
        required: true
      },
      params:{
        type: Object,
        required: false,
        default: {}
      },
      icon:{
        type: String,
        required: false
      },
      name:{
        type: String,
        required: false
      },
      reload:{
        type: Object,
        required: false
      },
      icon_size:{
        type: String,
        required: false
      },
      font_size:{
        type: String,
        required: false
      },
      color:{
        type: String,
        required: false
      }
    },
    methods:{
      send () {
        this.$$request.post.data(this.url, this.params)
          .then((response) => this.$emit('input', response))
      }
    }
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
