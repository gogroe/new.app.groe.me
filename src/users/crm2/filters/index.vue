<template>
  <div class="crm_filter">
    <filter_head/>
    <div class="filter_body">
      <draggable :list="sort_array"
                 :options="{handle:'.material-icons'}"
                 class="draggable">
        <div class="drag_item"
             v-for="(sort_item, i) in sort_array"
             :key="i">
          {{sort_item.name}}
          <i class="material-icons">drag_handle</i>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import filter_head from "./filter_head";
  import draggable from 'vuedraggable';

  export default {
    name: "crm_filter",
    components:{
      filter_head,
      draggable,
    },
    props:{
      columns:{
        type: Object,
        required: true
      }
    },
    data(){
      return {
        sort_array:[],
        order:[]
      }
    },
    mounted(){
      this.load_array()
    },
    watch:{
      sort_array: {
        handler:function(array){
          this.set_order(array)
        }, deep: true
      }
    },
    methods:{
      load_array: function(){
        for(let columns_key in this.columns){
          let column = this.columns[columns_key]


          let sort_item = {
            id: column.id,
            name: column.name,
            type: column.type,
            edit: column.edit,
          }

          this.sort_array.push(sort_item)
        }
      },
      set_order(array){
        this.order = []
        for(let key in array){
          let sort_item = array[key]

          this.order.push(sort_item.id)
        }
        this.$store.commit('update_users_crm_order', this.order)
      }
    },
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
    height: calc(100% - 64px);
    background: #fff;
    padding: 17px;
  }
</style>
