<template>
  <div class="range_filter">
    <input class="slider" type="range" :name="name" v-model="text_filter.value">
    <input class="number" type="Number" :name="name" v-model="text_filter.value">
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: "range_filter",
  props:{
    table:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    }
  },
  data(){
    return{
      active: '',
      text_filter: {
        table:'users',
        value_key: 'search->lastname',
        value:0
      }
    }
  },

  computed:{
    ...mapGetters([
      'users_filter',
    ])
  },
  methods:{
    update_filter(table, value_key, value){
      const update_object = {
        table : table,
        value_key : value_key,
        value : value
      }
      console.log(update_object);
      this.$store.commit('update_users_filter', update_object)
    }
  }
}
</script>

<style lang="scss" scoped>
.range_filter{
  width: 100%;
  text-align: center;
}
.slider {
  -webkit-appearance: none;
  width: 60%;
  height: 10px;
  background: #d6d6d6;
  border: none;
  -webkit-transition: .2s;
  transition: opacity .2s;
}
.number{
  display: inline-block;
  height: 30px;
  width: 60%;
  margin: 15px 0;
  outline: none;
  color: #222;
  padding-left: 10px;
  background-color: #eee;
  text-align: center;
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
