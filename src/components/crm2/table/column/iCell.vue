<template>
  <div class="icell">
    <p @click="$router.push({name: 'users_vita', params: { id: row.user_id } })"><span>{{name}}</span></p>
    <!-- there was wrong rouer name ontered, just shanged user to users -->
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
    },
    computed:{
      name () {
        let name = ''

        if('firstname' in this.row && 'lastname' in this.row){
          name = this.row.firstname + ' ' + this.row.lastname
        }
        else if('name' in this.row){
          name = this.row.name
        }

        if(name.length > 10){
          name = name.substring(0,10) + '...'
        }

        return name
      }
    }
  }
</script>

<style lang="scss" scoped>

  .icell{
    position: relative;
    height: 28px;
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
