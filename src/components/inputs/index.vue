<template>
  <div>
    <label :for="obj.name" :class="obj.label_class">{{obj.label}}</label>
    <input v-if="obj.type === 'text'" @blur="send_parrent('blur')" @keyup="send_parrent('keyup')" @keyup.enter="send_parrent('enter')" @keyup.tab="send_parrent('tab')" :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>
    <input v-if="obj.type === 'number'" @blur="send_parrent('blur')" @keyup="send_parrent('keyup')"  @keyup.enter="send_parrent('enter')" @keyup.tab="send_parrent('tab')"  :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>
    <input v-if="obj.type === 'date'" @blur="send_parrent('blur')" @keyup="send_parrent('keyup')" @keyup.enter="send_parrent('enter')" @keyup.tab="send_parrent('tab')"  :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>
    <input v-if="obj.type === 'url'" @blur="send_parrent('blur')" @keyup="send_parrent('keyup')"  @keyup.enter="send_parrent('enter')" @keyup.tab="send_parrent('tab')"  :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>
    <input v-if="obj.type === 'password'" @blur="send_parrent('blur')" @keyup="send_parrent('keyup')"  @keyup.enter="send_parrent('enter')" @keyup.tab="send_parrent('tab')"  :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>
    <input v-if="obj.type === 'email'" @blur="send_parrent('blur')" @keyup="send_parrent('keyup')"  @keyup.enter="send_parrent('enter')" @keyup.tab="send_parrent('tab')"  :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>
    <textarea v-if="obj.type === 'textarea'" @blur="send_parrent('blur')" @keyup="send_parrent('keyup')"  @keyup.enter="send_parrent('enter')" @keyup.tab="send_parrent('tab')" :title="obj.name" :id="obj.name" :name="obj.name" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>
    <select v-if="obj.type === 'select'" @blur="send_parrent('blur')" @keyup="send_parrent('keyup')"  @keyup.enter="send_parrent('enter')" @keyup.tab="send_parrent('tab')" @change="send_parrent('change')" :id="obj.name" :name="obj.name" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"><!--get id of first option-->
      <option v-for="(cycle) in obj.select.response ">{{cycle.name}}</option>
    </select>
    <errors :input_name="obj.name" :request_data="request_data" :error_class="error_class"/>
  </div>
</template>

<script>

  // obj:{
  //   url: '',
  //     label: '',
  //     name: '',
  //     value:'',
  //     select:'',
  //     placeholder: '',
  //     type: '',
  //     input_class:'',
  //     label_class: '',
  //     error_class: '',
  // }

  import Errors from "../errors"

  export default {
    name: "inputs",
    components: {Errors},
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
        error_class: 'input_error'
      }
    },
    watch:{
      obj: {
        handler: function(){
          this.set_params()
        }, deep: true
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
        switch (this.obj.type) {
          case 'select':
            this.cur_value = this.obj.select[0].name
            break;
          default:
            this.cur_value = this.obj.value
            break;
        }
      },
      send_parrent(event){
        const inputs = {
          event: event,
          value: this.cur_value
        }
        this.$emit('input', inputs)
      }
    }
  }
</script>

<style scoped>

</style>
