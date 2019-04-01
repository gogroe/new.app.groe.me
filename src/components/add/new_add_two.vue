<template>
  <div v-if="is_create"
       class="add"
       @click="$emit('input', !active)"
       :class="{'inactive': active}">
    <p v-if="active === false">
      <i class="material-icons">add</i> {{name}} hinzufügen
    </p>

      <p class="label">{{name}}</p>
      <p class="message">Mit einem Foto können Sie Ihr Konto personalisieren	</p>
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
    padding: 6.5px 0 11.5px 0;
  }

  i{
    margin-left: 17px;
    vertical-align: -7px;
    font-weight: 700;
  }

  p{
    color: #3da0f5;
    line-height: 17px;
  }

  .inactive p{
    color: #bbbbbb;
  }


  .container{
    color: #45494d;
    line-height: 64px;
    padding: 17px;
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid gray;

    .label{
      float: left;
      width: 100px;
      margin-right: 17px;
    }

    .message{
      float: left;
      padding: 5px 20px 5px 5px;
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
