<template>
  <div>
    <label :for="obj.name" :class="obj.label_class">{{obj.label}}</label>
    <input v-if="obj.type === 'text'"
           :readonly="readonly"
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
           :readonly="readonly"
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
           :readonly="readonly"
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
           :readonly="readonly"
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
           :readonly="readonly"
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
      :readonly="readonly"
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
    <datepicker v-if="obj.type === 'date' && readonly !== true"
                :class="obj.input_class"
                :placeholder="obj.placeholder"
                :language="languages['de']"
                v-model="cur_value"></datepicker>
    <custom_select v-if="obj.type === 'select'  && readonly !== true"
                   :list_name="obj.select"
                   :id="obj.name"
                   :select_value="obj.value"
                   :placeholder="obj.placeholder"
                   :select_class="obj.input_class + '_select'"
                   v-model="sel_value"/>
    <input v-if="is_readonly_custom(obj.type) && readonly"
           readonly
           type="text"
           :title="obj.name"
           :id="obj.name"
           :name="obj.name"
           :placeholder="obj.placeholder"
           :class="obj.input_class"
           v-model="cur_value"/>
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
  import Datepicker from 'vuejs-datepicker';
  import * as lang from "vuejs-datepicker/src/locale";
  import moment from 'moment'

  export default {
    name: "inputs",
    components: {Custom_select, Errors, Datepicker},
    props:{
      obj:{
        type: Object,
        required: true,
      },
      request_data:{
        required: false,
      },
      clear_value:{
        required: false,
      },
      readonly:{
        required: false,
      },
    },
    data(){
      return{
        cur_value: '',
        sel_value: {
          event: null,
          value: null
        },
        error_class: 'input_error',
        languages: lang,
      }
    },
    watch:{
      clear_value: function(boolean){
        if(boolean){
          this.cur_value =  '',
            this.sel_value = {
              event: null,
              value: null
            }
        }
      },
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
      },
      cur_value:function () {
        if(this.obj.type === 'date'){
          this.send_parrent('enter')
        }
      }
    },
    mounted(){
      this.set_params()
    },
    methods:{
      is_readonly_custom(type){
        switch (type) {
          case 'date':
          case 'select':
            return true
          default:
            return false
        }
      },
      set_params(){
        if('error_class' in this.obj){
          this.error_class =  this.obj.error_class
        }
        if(this.obj.type === 'date'){
          if(this.obj.value !== null){
            this.cur_value = moment(this.obj.value * 1000).locale("de").format()
          }
        }
        else{
          this.cur_value = this.obj.value
        }
      },
      send_parrent(event){
        const inputs = {
          event: event,
          value: this.cur_value
        }
        if(this.obj.type === 'date'){
          inputs.value = moment(this.cur_value).format("X")
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

  .date_picker{
    display: inline;
  }

</style>
