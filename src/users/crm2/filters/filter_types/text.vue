<template>
  <div class="text_filter">
      <input type="text" :name="name"
      v-model="text_filter.value"
      autofocus
      @keyup.enter="update_filter(table, name, text_filter.value)">
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: "text_filter",
  props:{
    table:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    id:{
      type: String,
      required: true
    },
  },
  data(){
    return{
      active: '',
      text_filter: {
        users:{                 //csolumns_settings.request_group
          conditions:{          //self
            // 'search->' + : value    //coulumn.id.substring(indexOf(request_group)
          }
        }
      }
    }
  },

  computed:{
    ...mapGetters([
      'users_filter',
    ])
  },
  // watch:{
  //   request_active_filter: function(){
  //       this.option.show = true
  //     var json = this.text_filter.users.conditions.key
  //     json.search = this.option.value
  //     json = JSON.stringify(json)
  //     json = json.replace("search", ("search->" + this.option.name))
  //     if (this.option.show) {
  //       console.log(json);
  //       this.$store.commit('update_users_filter', json)
  //     }
  //   }
  // },
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
.text_filter{
  width: 100%;
  text-align: center;
}
p{
  display: inline-block;
}
input{
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
</style>
