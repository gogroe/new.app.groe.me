<template>
  <div class="range_filter">
    <label>
      <input type="checkbox" v-model="option.show" class="checkbox">
      <span class="checkmark"></span>
      <p class="paragraph_label">{{ option.name}}</p>
      <input class="slider" type="range" :name="option.name" v-model="option.value">
      <p style="display: inline-block; margin-top: -10px;">{{option.value}}</p>
    </label>
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
import { mapGetters } from 'vuex'
export default {
  name: "range_filter",
  props:{
    option:{
      type: Object,
      required: true
    }
  },
  data(){
    return{
      active: ''
    }
  },

  computed:{
    ...mapGetters([
      'users_filter',
    ]),
    // value_change(){
    //
    // },
    request_active_filter(){
      return this.option.value
    }
  },
  watch:{
    request_active_filter: function(object){
      this.$store.commit('update_users_filter', this.option.name)
      this.option.show = true
      //is it possible to implement a watcher on a store component
    }
  },
  methods: {
    filter_func: function(obj){
      return parseInt(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
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
  input{
  width: 70%;
  margin: 30px auto;
  }
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  background: #d6d6d6;
  border: none;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #888;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #555;
  cursor: pointer;
}
</style>
