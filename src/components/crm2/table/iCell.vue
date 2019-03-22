<template>
  <div class="icell">
    <p @click="$router.push({name: 'user_vita', params: { id: row.user_id } })"><span>{{row.firstname}} {{row.lastname}}</span></p>
    <i class="material-icons">comment</i>
  </div>
</template>

<script>
  export default {
    name: "crm_icell",
    props:{
      row:{
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

  .icell{
    position: relative;
    height: 29px;
    width: 180px;

    p{
      position: relative;
      cursor: pointer;
      display: inline;

      span{
        display: inline-block;
        padding: 5px 0;
      }

      &:hover{
        color: #1a73e8;
      }
    }

    i{
      float: right;
      margin-left: 17px;
      cursor: pointer;
      vertical-align: middle;
      color: #bbc6cc;

      &:hover{
        color: #1a73e8;
      }
    }
  }
</style>
