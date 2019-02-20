<template>
    <div class="navigation">
      <div class="autohorization" @click="">
        <p v-for="(key, i) in navigation_options">{{key.name}}</p>
      </div>
      <div class="table" @click="">

      </div>
      <div class="list" @click="">

      </div>
      <table_of_contents :content="content"/>
    </div>
</template>


<script>
import table_of_contents from "./table_of_contents";
  export default {
    name: "navigation",
    components:{
      table_of_contents
    },
    props:{
      content:{
        required: true
      }
    },
    data(){
      return{
        navigation_options:{
          privileges:{
            name: 'Nutzerrechte',
          },
          table:{
            name: 'Tabllen',
          },
          lists:{
            name: 'Listen',
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.navigation{
  display: block;

  .autohorization{
    width: 50%;
    border-right: 1px solid black;

    p{
      margin: 17px;
    }
  }
}
</style>
