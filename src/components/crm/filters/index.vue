<template>
  <div class="crm_filter">
    <filter_head/>
    <div class="filter_body">
      <filters_actives :columns="stored_columns"/>
      <draggable :list="sort_array"
                 :options="{handle:'.material-icons'}"
                 class="draggable default_scrollbar">
          <filter_cell v-for="(column, i, key) in sort_array"
                        :key = "i"
                        :class="{'first_item': i === 0}"
                        :column="stored_columns[column.id]"
                        v-model="unset"/>
      </draggable>
    </div>
    <div class="option_wrapper">
      <button @click="$store.commit('update_reload', {action: 'filter', section:'users_crm'})">FILTER ANWENDEN</button>
    </div>
  </div>
</template>

<script>
  import custom_helper from '../../../components/functions/custom_helper'
  import filter_cell from "./cell";
  import filter_head from "./head";
  import draggable from 'vuedraggable';
  import Filters_actives from "./actives";

  export default {
    name: "crm_filter",
    components:{
      Filters_actives,
      filter_head,
      filter_cell,
      draggable,
    },
    props:{
      columns:{
        type: Object,
        required: true
      },
      store_columns:{
        type: Object,
        required: true
      }
    },
    data(){
      return {
        unset:{
          id: null,
          active: null
        },
        unsets:{},
        sort_array:[],
        order:[],
        stored_columns:{}
      }
    },
    // mounted(){
    //   this.stored_columns = this.columns
    //   this.load_array()
    // },
    watch:{
      store_columns: function(){
        this.stored_columns = this.store_columns
        this.load_array()
      },
      sort_array: {
        handler:function(array){
          this.set_order(array)
        }, deep: true
      },
      unset:{
        handler:function(object){
          this.unsets[object.id] = object.active
          this.set_order(this.sort_array)
        }, deep: true
      },
      order:function(){
        this.set_unsets()
      }
    },
    methods:{
      set_unsets(){
        if(this.object_length(this.unsets) === 0){
          for(let order_key in this.order){
            this.unsets[this.order[order_key]] = true
          }
        }
      },
      load_array: function(){
        this.sort_array = []

        for(let columns_key in this.stored_columns){
          let column = this.stored_columns[columns_key]

          let sort_item = {
            id: column.id,
          }

          this.sort_array.push(sort_item)
        }
      },
      set_order(array){
        this.order = []
        for(let key in array){
          let sort_item = array[key]

          if(this.object_length(this.unsets) === 0){
            this.order.push(sort_item.id)
          }
          else if(this.unsets[sort_item.id]){
              this.order.push(sort_item.id)
          }
          else if((sort_item.id in this.unsets) === false){
            this.order.push(sort_item.id)
          }
        }
        this.$store.commit('update_users_crm_order', this.order)
      }
    },
    mixins:[custom_helper]
  }
</script>

<style lang="scss" scoped>
  .drag_item{
    width: 100%;
    padding: 17px;

    i {
      display: inline-block;
      margin-left: 17px;
    }
  }
  .crm_filter{
    position: relative;
    width: 450px;
    height: calc(100%);
  }

  .filter_head{
    width: 100%;
    height: 64px;
    background: #fff;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  .filter_body{
    width: 100%;
    height: calc(100% - 64px - 64px);
    background: #fff;
    padding: 0 0 17px 17px;

    .button_description{
      display: none;
      position: absolute;
      border: 1px solid lightgray;
      border-radius: 10px;
      padding: 15px 0;
      width: 50%;
      background-color: lightyellow;
      z-index: 3;
      right: 25%;
      top: 130px;
      color: gray;
    }
    button{
      width: 50%;
      height: 35px;
      background-color: #eee;
      color: #777;
      font-weight: bold;
      margin: 20px 0 0 25%;
    }
    // &:hover .filter_button ~ .button_description{
    //   display: block;
    // }
  }

  .option_wrapper{
    height: 64px;
    width: 100%;
    background-color: #fff;
  }

  .draggable{
    height: calc(100vh - 250px);
    overflow: auto;

    .first_item{
      padding-top: 27px;
    }

    .checkbox_container{
      display: block;
      position: relative;
      margin-bottom: 12px;
      padding-top: 13px;
    }
  }
</style>
