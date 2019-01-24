<template>
  <div class="select_filter">
    <select v-model="text_filter.value"
    @change="update_filter(table, name, text_filter.value)">
      <option disabled value="">Please select one</option>
      <option v-for="option in options">{{option}}</option>
    </select>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: "select_filter",
  props:{
    table:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    options:{
      type: Array,
      required: true
    }
  },
  data(){
    return{
      active: '',
      text_filter: {
        table:'users',
        value_key: 'search->lastname',
        value:'ad'
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
.select_filter{
  width: 100%;
  text-align: center;
}
select{
  display: inline-block;
  height: 30px;
  width: 60%;
  margin: 15px 0;
  outline: none;
  border: none;
  color: #222;
  font-size: 16px;
  padding-left: 10px;
  background-color: #eee;
  text-align: center;
  option{
    font-size: 16px;
  }
}
</style>
