<template>
  <div class="filter_body">
    <button type="button" name="button" class="filter_button" @click="submit_filters()">submit filter</button>
    <div class="button_description">
      when you click this button you will post your filters
    </div>
    <draggable :list="array"
    :options="{handle:'.material-icons'}"
    class="draggable">
      <div class="checkbox_container" v-for="element, index in columns"
      :key="index">
      <filter_cell v-if="element.name != ''"
      :name = 'element.name'
      :type = 'element.type'
      :edit = 'element.edit'
      :display = 'element.display'
      :request_group = 'element.request_group'/>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import filter_cell from './filter_cell';

export default {
  name: "filter_body",
  components:{
    draggable,
    filter_cell
  },
  props:{
    columns:{
      type: Object,
      required: true
    },
    params:{
      type: Object,
      required: true
    },
    array:{
      type: Array,
      required: true
    },
  },
  data(){
    return {
      name:'',
    }
  },

  computed:{
    request_sorting(){
      return this.columns.data
    }
  },

  watch:{
    request_sorting(obj){
      this.sorting(obj)
    },
  },

  methods:{
    value_change: function(){
    },

    sorting: function(index){
    },

    onEnd: function(evt){
    },
    submit_filters(){
      // code for filterin the table,
      //linked to the button
      alert("submit successful");
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter_body{
    width: 100%;
    height: calc(100% - 64px);
    background: #fff;
    .button_description{
      display: none;
      position: absolute;
      border: 1px solid lightgray;
      border-radius: 10px;
      padding: 15px;
      width: 50%;
      background-color: lightyellow;
      z-index: 3;
      right: 25%;
      top: 130px;
      color: gray;
    }
    button{
      width: 50%;
      height: 34px;
      background-color: #eee;
      color: #777;
      font-weight: bold;
      margin: 15px 0 0 25%;
    }
    // &:hover .filter_button ~ .button_description{
    //   display: block;
    // }
  }

  .draggable{
    height: calc(100vh - 250px);
    overflow: auto;
    .checkbox_container{
      display: block;
      position: relative;
      margin-bottom: 12px;
      padding-top: 13px;
    }
  }
  </style>
