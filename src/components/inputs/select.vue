<template>
  <div :class="select_class">
    <v-select :options="options"
              label="name"
              :placeholder="placeholder"
              v-model="cur_value"/>
    <list :list_name="list_name" v-model="options"/>
  </div>
</template>

<script>
  import Request from "../functions/request"
  import List from "../list/index"

  export default {
    name: "custom_select",
    components: {List, Request},
    props:{
      list_name:{
        required: true
      },
      select_class:{
        required: false
      },
      placeholder:{
        required: false
      },
      select_value:{
        required: false
      },
    },
    data(){
      return{
        options:[],
        cur_value: null,
      }
    },
    computed:{
      cur_value_value(){
        if(this.cur_value !== null && 'value' in this.cur_value){
          return this.cur_value.value
        }
        else {
          return null
        }
      }
    },
    watch:{
      select_value: function(){
        this.set_cur_value()
      },
      cur_value_value: function(string){
        if(string !== null){
          this.send_parrent()
        }
      },
      options:{
        handler: function (array) {
          this.set_cur_value()
        }, deep: true
      }
    },
    methods:{
      send_parrent(){
        if(this.cur_value.value !== this.value){
          const inputs = {
            event: 'change',
            value: this.cur_value.value
          }
          this.$emit('input', inputs)
        }
      },
      set_cur_value(){
        for(let option_key in this.options){
          let option = this.options[option_key]

          if(option.value === this.select_value){
            this.cur_value = {}
            this.cur_value.name = option.name
            this.cur_value.value = option.value
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
