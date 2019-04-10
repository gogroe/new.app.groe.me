<template>
  <div
    v-if="active.item"
    class="item_body">
    <div class="sort ">
      <i class="material-icons">sort</i>
      <span
        @click="xSort = 'asc'"
        :class="{'active': xSort === 'asc'}">
          aufsteigend
          <i class="material-icons up">
            arrow_right_alt
          </i>
        </span>
      <span
        @click="xSort = 'desc'"
        :class="{'active': xSort === 'desc'}">
          absteigend
          <i class="material-icons down">
            arrow_right_alt
          </i>
        </span>
        <i
          class="material-icons delete"
          @click="xSort = null">
          delete
        </i>
    </div>
    <div class="condition">
      <i class="material-icons">search</i>
      <cinput
        class="condition_input"
        :name="column.name"
        :cvalue="condition.value"
        :clist="list"
        :type="column.type"
        placeholder="suchen"
        v-model="xCondition"
      />
      <button
        class="filled"
        @click="$emit('input', {
          asc: xSort === 'asc',
          desc: xSort ==='desc',
          condition: xCondition
        })">
        ANWENDEN
      </button>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import Cinput from "../../../../input/index";

  export default {
    name: "fitem_body",
    components: {Cinput},
    props:{
      condition:{
        required: true
      },
      active:{
        type: Object,
        required: true
      },
      column:{
        type: Object,
        required: true
      }
    },
    data () {
      return {
        xSort: null,
        xCondition:{
          value: null,
          event: null
        }
      }
    },
    computed:{
      list () {
        return 'list' in this.column
          ? this.column.list
          : this.column.name
      }
    }
  }
</script>

<style lang="scss">

  .item_body{
    width: 100%;
    padding: 41px 16px 16px 62px;
    background: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    i{
      color: #bec6cc;
      vertical-align: middle;
      margin-right: 10px;
    }

    .sort, .condition{
      margin-bottom: 10px;
    }

    .sort{
      display: inline-block;

      span{
        cursor: pointer;
        display: inline-block;
        padding: 4px 4px 4px 10px;
        color: #1a73e8;
        background: #f1f3f4;
        border-radius: 5px;

        &:hover{
          background: #eceeef;
        }

        &.active{
          color: #fff;
          background: #1a73e8;
        }
      }
      
      .delete{
        cursor: pointer;
        display: inline;
      }
    }

    .condition_input{
      display: inline-block;
      width: calc(100% - 41px);

      input{
        width: 255px;
        text-align: left;
      }
    }

    button{
      margin-top: 25px;
      float: right;
    }
  }

</style>
