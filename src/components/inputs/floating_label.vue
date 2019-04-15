<template>
  <div class="floating_label" :class="section_class" v-click-outside="active = -1">
    <div class="floating_label_scope"
      v-for="(input, key, i) in create_inputs.inputs"
      :key="i">
      <div @click="active = i">
        <inputs
          :obj="without_placeholder(key, create_inputs, true)"
          :request_data="request_create.data"
          v-model="create_inputs.inputs[key].input"/>
      </div>
    </div>
    <button @click="send_create_inputs">{{button_name}}</button>
    <request :obj="request_create" v-model="request_create"/>
  </div>

</template>

<script>

  import Load_request from "../functions/load_request"
  import ClickOutside from 'vue-click-outside'
  import Custom_helper from '../functions/custom_helper'
  import Inputs from "./index"
  import Request from "../functions/request"
export default {
  name: 'floating_label',
  components: {Request, Inputs},
  props:{
    create_name:{
      // type: 'String',
      required: false
    },
    button_name:{
      // type: 'String',
      required: false
    },
    create_inputs:{
      // type: 'Object',
      required: true
    },
    reload:{
      type: Object,
      required: false,
    },
    section_class:{
      // type: 'String',
      required: false,
    }
  },
  data(){
    return{
      request_create: {
        params: {},
        url: '',
        data: {},
        request: false
      },
      active : -1
    }
  },
  computed:{
    request_create_data(){
      return this.request_create.data
    }
  },
  watch:{
    active: function(obj){
      for(let x in Object.keys(this.create_inputs.inputs)){
        if(parseInt(x) === obj){
          console.log(document.body.querySelectorAll('label')[x].className += " active")
        }
        else{
          document.body.querySelectorAll('label')[x].className -= " active"
        }
      }
    },
    request_create_data(object){
      this.create_update_reload(object, this.reload)
      this.set_values_null()
      this.$emit('input', object)
    }
  },
  mounted (){
    this.request_create.url = this.create_inputs.url
    this.set_required_params()
  },
  methods:{
    without_placeholder(key, create_inputs, bool){
      let a = this.fill_inputs(key, create_inputs)
      if (bool)
        a.placeholder = ''
      else
        return a.placeholder
      return a
    },
    isActive(key, create_inputs, i){
      let a = this.fill_inputs(key, create_inputs)
      return a.value !== null || this.active === i
    },
    set_required_params(){
      if(this.object_length(this.create_inputs.required_params) !== 0){
        for(let param_key in this.create_inputs.required_params){
          this.request_create.params[param_key] = this.create_inputs.required_params[param_key]
        }
      }
    },
    set_values_null(){
      for(let value_key in this.create_inputs.inputs){
        this.create_inputs.inputs[value_key].input.value = null
      }
    },
    send_create_inputs(){
      for(let value_key in this.create_inputs.inputs){
        this.request_create.params[value_key] = this.create_inputs.inputs[value_key].input.value
      }

      this.request_create.request = true
    }
  },
  directives: {
    ClickOutside
  },
  mixins:[Custom_helper, Load_request]
}
</script>

<style lang="scss">
.floating_label{
  position: relative;
  display: inline-block;
  width: 100%;
  line-height: 50px;
  text-align: center;

  label{
    position: absolute;
    padding: 0 16px;
    left: 0;
    color: #bbb;
    line-height: 50px;
    margin-left: 16px;
    font-size: 20px;
    width: auto;
    cursor: text;

    &.active{
      -webkit-transition-property: font-size, line-height, background-color, color; /* Safari */
      -webkit-transition-duration: 1s; /* Safari */
      transition-property: font-size, line-height, background-color, color;
      transition-duration: 1s;
      font-size: 12px;
      line-height: 12px;
      background-color: white;
      color: #3da0f5;
    }
  }

  .placeholder{
    position: absolute;
    left: 0;
    color: #bbb;
    line-height: 50px;
    padding: 0 16px;
    margin-left: 16px;
    font-size: 20px;


    &.active{
      -webkit-transition-property: font-size, line-height, background-color, color; /* Safari */
      -webkit-transition-duration: 1s; /* Safari */
      transition-property: font-size, line-height, background-color, color;
      transition-duration: 1s;
      font-size: 12px;
      line-height: 12px;
      background-color: white;
      color: #3da0f5;
    }
  }

  input{
    margin-bottom: 16px;
    line-height: 41px !important;
  }
}
</style>
