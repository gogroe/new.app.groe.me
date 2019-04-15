<template>
  <div v-if="is_create"
       class="add"
       @click="$emit('input', !active)"
       :class="{'inactive': active}">
       <div class="container">
         <p class="label">{{name}}</p>
         <p class="message">Mit einem Foto können Sie Ihr Konto personalisieren	</p>
       </div>
    </div>
    <p v-else>
      <i class="material-icons">close</i> schließen
    </p>
  </div>
</template>

<script>
  export default {
    name: "add",
    props:{
      name:{
        required: true
      },
      active:{
        required: true
      },
      create:{
        required: false
      }
    },
    computed: {
      is_create(){
        if(this.create){
          return this.$$permission.is_perm('create')
        }
        else {
          return true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .add{
    font-weight: 700;
    cursor: pointer;
  }

  .container{
    padding: 12.5px 0px;
    width: 100%;
    line-height: 41px;
    display: inline-block;

    .label{
      float: left;
      width: 100px;
      margin-right: 17px;
    }

    .message{
      float: left;
    }

    .user_image{
      float: right;
    }

    &:hover{
      cursor: pointer;
      background-color: #f8f8f8;
    }
  }
</style>
