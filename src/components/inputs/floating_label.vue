<template>
  <div class="floating_label" :class="section_class">
    <div class="floating_label_scope"
      v-for="(input, key, i) in create_inputs.inputs"
      :key="i">
      <div @click="select_inputs(i)">
        <label class="placeholder"
          :class="{'active' : isActive(key, create_inputs, i)}">
          {{without_placeholder(key, create_inputs, false)}}</label>
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
    select_inputs(i){
      this.active = i
      let a = document.getElementsByClassName('floating_label_scope')[i].querySelectorAll('input')[0]
      a.addEventListener('focusout', function cb() {
        event.currentTarget.removeEventListener(event.type, cb)
      })
    },
    isActive(key, create_inputs, i){
      let a = this.fill_inputs(key, create_inputs)
      return a.value !== null || this.active === i
    },
    without_placeholder(key, create_inputs, bool){
      let a = this.fill_inputs(key, create_inputs)
      if (bool)
        a.placeholder = ''
      else
        return a.placeholder
      return a
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

  .placeholder{
    position: absolute;
    left: 0;
    color: #bbb;
    line-height: 50px;
    padding: 0 16px;
    margin-left: 16px;
    font-size: 20px;
    
    &:hover{
      cursor: text;
    }

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
