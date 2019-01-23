<template>
  <div>
    <label :for="obj.name" :class="obj.label_class">{{obj.label}}</label>
    <input v-if="obj.type === 'text'"
           @blur="send_parrent('blur')"
           @keyup="send_parrent('keyup')"
           @keyup.enter="send_parrent('enter')"
           @keyup.tab="send_parrent('tab')"
           :type="obj.type"
           :title="obj.name"
           :id="obj.name"
           :name="obj.name"
           :placeholder="obj.placeholder"
           :class="obj.input_class"
           v-model="cur_value"/>
    <input v-if="obj.type === 'number'"
           @blur="send_parrent('blur')"
           @keyup="send_parrent('keyup')"
           @keyup.enter="send_parrent('enter')"
           @keyup.tab="send_parrent('tab')"
           :type="obj.type"
           :title="obj.name"
           :id="obj.name"
           :name="obj.name"
           :placeholder="obj.placeholder"
           :class="obj.input_class"
           v-model="cur_value"/>
    <input v-if="obj.type === 'date'"
           @blur="send_parrent('blur')"
           @keyup="send_parrent('keyup')"
           @keyup.enter="send_parrent('enter')"
           @keyup.tab="send_parrent('tab')"
           :type="obj.type"
           :title="obj.name"
           :id="obj.name"
           :name="obj.name"
           :placeholder="obj.placeholder"
           :class="obj.input_class"
           v-model="cur_value"/>
    <input v-if="obj.type === 'url'"
           @blur="send_parrent('blur')"
           @keyup="send_parrent('keyup')"
           @keyup.enter="send_parrent('enter')"
           @keyup.tab="send_parrent('tab')"
           :type="obj.type"
           :title="obj.name"
           :id="obj.name"
           :name="obj.name"
           :placeholder="obj.placeholder"
           :class="obj.input_class"
           v-model="cur_value"/>
    <input v-if="obj.type === 'password'"
           @blur="send_parrent('blur')"
           @keyup="send_parrent('keyup')"
           @keyup.enter="send_parrent('enter')"
           @keyup.tab="send_parrent('tab')"
           :type="obj.type"
           :title="obj.name"
           :id="obj.name"
           :name="obj.name"
           :placeholder="obj.placeholder"
           :class="obj.input_class"
           v-model="cur_value"/>
    <input v-if="obj.type === 'email'"
           @blur="send_parrent('blur')"
           @keyup="send_parrent('keyup')"
           @keyup.enter="send_parrent('enter')"
           @keyup.tab="send_parrent('tab')"
           :type="obj.type"
           :title="obj.name"
           :id="obj.name"
           :name="obj.name"
           :placeholder="obj.placeholder"
           :class="obj.input_class"
           v-model="cur_value"/>
    <textarea
      v-if="obj.type === 'textarea'"
      @blur="send_parrent('blur')"
      @keyup="send_parrent('keyup')"
      @keyup.enter="send_parrent('enter')"
      @keyup.tab="send_parrent('tab')"
      :title="obj.name"
      :id="obj.name"
      :name="obj.name"
      :placeholder="obj.placeholder"
      :class="obj.input_class"
      v-model="cur_value"/>
    <custom_select v-if="obj.type === 'select'"
                   :list_name="obj.select"
                   :id="obj.name"
                   :select_value="obj.value"
                   :placeholder="obj.placeholder"
                   :select_class="obj.input_class + '_select'"
                   v-model="sel_value"/>
    <errors :input_name="obj.name" :request_data="request_data" :error_class="error_class"/>
  </div>
</template>

<script>

  // obj:{
  //     label: '',
  //     name: '',
  //     value:'',
  //     select:'', === list_group name
  //     placeholder: '',
  //     type: '',
  //     input_class:'',
  //     label_class: '',
  //     error_class: '',
  // }

  import Errors from "../errors"
  import Custom_select from "./select";

  export default {
    name: "inputs",
    components: {Custom_select, Errors},
    props:{
      obj:{
        type: Object,
        required: true,
      },
      request_data:{
        required: true,
      }
    },
    data(){
      return{
        cur_value: '',
        sel_value: {
          event: null,
          value: null
        },
        error_class: 'input_error'
      }
    },
    watch:{
      obj: {
        handler: function(){
          this.set_params()
        }, deep: true
      },
      sel_value:{
        handler:function (object) {
          if(object.value !== this.obj.value){
            this.send_parrent_select(object.event, object.value)
          }
        }, deep:true
      }
    },
    mounted(){
      this.set_params()
    },
    methods:{
      set_params(){
        if('error_class' in this.obj){
          this.error_class =  this.obj.error_class
        }
        this.cur_value = this.obj.value
      },
      send_parrent(event){
        const inputs = {
          event: event,
          value: this.cur_value
        }
        this.$emit('input', inputs)
      },
      send_parrent_select(event, value){
        const inputs = {
          event: event,
          value: value
        }
        this.$emit('input', inputs)
      }
    }
  }
</script>

<style scoped>

  label{
    vertical-align: top;
  }

</style>
