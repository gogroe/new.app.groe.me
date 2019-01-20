<template>
  <div class="table_cell"
       v-click-outside="hide"
       @click="active.edit = !active.edit">
    <div v-if="column.type === 'text' || column.type === 'select'">
      <p v-if="active.create" class="add"><i class="material-icons">add</i></p>
      <p v-if="active.edit && active.create === false">Editieren</p>
      <p v-if="active.edit === false && active.create === false">{{cell}}</p>
    </div>
    <div v-if="column.type === 'image'">
      <user_visual class="user_visual"
                   path=""
                   name=""
                   size="35"/>
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import User_visual from "../../../components/user_visual/index";

  export default {
    name: "table_cell",
    components: {User_visual},
    props:{
      column:{
        required: true
      },
      cell:{
        required: true
      }
    },
    data(){
      return{
        active:{
          edit: false,
          create: false,
        }
      }
    },
    mounted(){
      this.set_create()
    },
    methods:{
      set_create(){
        if(
          this.cell === '' ||
          this.cell === null
        ){
          this.active.create = true
        }
      },
      hide(){
        this.active.edit = false
      },
      build_input_object(){

      }
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>

  p{
    line-height: 13px;
    padding: 25.5px 47px 25.5px 17px;

    &.add{
      color: #3da0f5;
      padding: 18px 47px 25.5px 17px;
    }
  }

  i{
    font-weight: 700;
  }

  .user_visual{
    padding-top: 14.5px;
  }


</style>
