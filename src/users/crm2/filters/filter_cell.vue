<template>
  <div class="filter_cell">
    <label>
      <input type="checkbox" class="checkbox" v-model="display">
      <span class="checkmark"></span>
    </label>
    <span v-if=" edit" class="paragraph_label" @click="display_dropdown = !display_dropdown">{{ name}}</span>
    <span v-if="! edit" class="paragraph_label">{{ name}}</span>
    <i class="material-icons">drag_handle</i>
    <div class="dropdown-content" v-if="display_dropdown">
      <text_filter  v-if=" type === 'text'" :table=" request_group" :name=" name"/>
      <range_filter v-if=" type === 'range'" :table=" request_group" :name=" name"/>
      <select_filter v-if=" type === 'select'" :table=" request_group" :name=" name" :options=" edit"/>
      <!-- <date_filter v-if=" type === 'date'" :table=" request_group" :name=" name"/> -->
    </div>
  </div>
</template>

<script>
import text_filter from './filter_types/text'
import select_filter from './filter_types/select'
import range_filter from './filter_types/range'
export default {
  name: "filter_cell",
  components:{
    text_filter,
    select_filter,
    range_filter
  },
  props:{
    name:{
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    request_group:{
      type: String,
      required: true
    },
    edit:{
      type: Boolean,
      required: true
    },
    display:{
      type: Boolean,
      required: true
    }
  },
  data(){
    return{
      display_dropdown: false

    }
  }
}

</script>

<style lang="scss" scoped>
.filter_cell{
  margin: 16px 0;
}
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
    top: 26px;
    left: 10px;
    height: 25px;
    width: 25px;
    background-color: #eee;
    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 9px;
      top: 5px;
      width: 7px;
      height: 12px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }
}
.paragraph_label{
  cursor: pointer;
  display: inline-block;
  padding: 0 0 0 35px;
  font-size: 16px;
}
.dropdown-content {
  margin-top: 20px;
  width: 100%;
  border-top: 1px solid  #e6e6e6;
  border-bottom: 1px solid  #e6e6e6;
  min-width: 160px;
  padding: 12px 16px;
}
i{
  font-size: 30px;
  position: relative;
  top: 0px;
  cursor: grab;
  width: 15%;
  float: right;
}
</style>
