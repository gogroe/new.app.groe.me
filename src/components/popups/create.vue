<template>
  <div class="create_popup inner_popup">
    <p class="section_name">{{create_name}} HINZUFÜGEN</p>
    <inputs v-for="(input, key, i) in create_inputs.inputs"
            :key="i"
            :obj="fill_inputs(key, create_inputs)"
            :request_data="request_create.data"
            v-model="create_inputs.inputs[key].input"/>
    <button @click="send_create_inputs">{{create_name}} HINZUFÜGEN</button>
    <request :obj="request_create" v-model="request_create"/>
  </div>
</template>

<script>
  import Load_request from "../functions/load_request"
  import Custom_helper from '../functions/custom_helper'
  import Inputs from "../inputs/index"
  import Request from "../functions/request"

  export default {
    name: "create_popup",
    components: {Request, Inputs},
    props:{
      create_name:{
        // type: 'String',
        required: true
      },
      create_inputs:{
        // type: 'Object',
        required: true
      },
      reload:{
        type: Object,
        required: false,
      }
    },
    data(){
      return{
        active: false,
        request_create: {
          params: {
            uid: 1 //todo auth uid
          },
          url: '',
          data: {},
          request: false
        }
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
      }
    },
    mounted (){
      this.request_create.url = this.create_inputs.url
      this.set_required_params()
    },
    methods:{
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
      },
    },
    mixins:[Custom_helper, Load_request]
  }
</script>

<style lang="scss" scoped>

</style>
