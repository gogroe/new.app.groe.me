<template>
  <div class="draggable">
    <draggable :list="columns"
    :options="{handle:'.material-icons'}"
    class="draggable">
      <div class="checkbox_container" v-for="element, index in columns"
      :key="element.no">
        <label>
          <input type="checkbox" v-model="element.show" class="checkbox" :disabled="element.name === 'name_lastname' ? true : false">
          <span class="checkmark"></span>
        </label>
        <span class="paragraph_label" v-if="!element.show2" @click="element.show2 = true">{{ element.placeholder}}</span>
        <span class="paragraph_label" v-if="element.show2" @click="element.show2 = false">{{ element.placeholder}}</span>
        <i class="material-icons">drag_handle</i>
        <div class="dropdown-content" :style="element.show2 ? 'display: block;' : ''">
          <div class="checkbox_container" v-for="option in element.options">
            <text_filter v-if="option.filter === 'text'" :option="option"/>
            <range_filter v-if="option.filter === 'range'" :option="option"/>
            <date_filter v-if="option.filter === 'date'" :option="option"/>
          </div>
        </div>
    </div>
    </draggable>
  </div>
</template>

<script>
// columns:[
//   {
//     no: 1,
//     placeholder: 'Image',
//     name: 'image',
//     show: true,
//     show2: false,
//     data: [],
//     onclick: false,
//     options: [
//       {
//       name: 'one',
//       filter: 'range',
//       value: 100,
//       show: true
//       },
//     ],
//   },
// ]
import draggable from 'vuedraggable';
import text_filter from './text_filter';
import date_filter from './date_filter';
import range_filter from './range_filter';

  export default {
    name: "userCRM",
    components:{
      draggable,
      text_filter,
      date_filter,
      range_filter,
    },
    props:{
      columns:{
        type: Array,
        required: true
      }
    },
    data(){
      return {

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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dragArea{
    width: 15%;
    position: fixed;
    top:90px;
    right:0;
    border-left: 1px solid #e6e6e6;
    padding: 20px 0 0 15px;
    .draggable{
      height: calc(100vh - 250px);
      overflow: auto;
      .checkbox_container{
        display: block;
        position: relative;
        margin-bottom: 12px;
        padding-top: 13px;
        label{
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          .checkmark{
            z-index: 2;
          }
          .checkbox{
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
            &:checked ~ .checkmark {
              background-color: #0237cf;
            }
            &:checked ~ #checkmark {
              background-color: #4f7dff;
            }
            &:checked ~ .checkmark:after {
              display: block;
            }
          }
          span {
            position: absolute;
            top: 10px;
            left: 10px;
            height: 22px;
            width: 22px;
            background-color: #eee;
            &:after {
              content: "";
              position: absolute;
              display: none;
              left: 9px;
              top: 5px;
              width: 5px;
              height: 10px;
              border: solid white;
              border-width: 0 3px 3px 0;
              -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
            }
          } //redesigned checkbox

          &:hover input ~ .checkmark {
            background-color: #ccc;
          }
        }
        .paragraph_label{
          cursor: pointer;
          display: inline-block;
          padding: 0 0 0 35px;
        }
        .dropdown-content {
          margin-top: 20px;
          display: none;
          width: 100%;
          border-top: 1px solid  #e6e6e6;
          border-bottom: 1px solid  #e6e6e6;
          min-width: 160px;
          padding: 12px 16px;
        }
        i{
          position: relative;
          top: 0px;
          cursor: grab;
          margin-right: 10%;
          width: 10%;
          float: right;
        }
      }
    }
  }
</style>
