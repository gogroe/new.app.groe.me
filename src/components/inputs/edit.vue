<template>
  <div>
    <inputs :obj="obj"
            :readonly="is_perm('update') === false"
            :request_data="send.data"
            v-model="inputs"/>
    <request :obj="send"
             v-model="send"/>
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
  //     required_params: '',
  //     error_class: ''
  // }

  import Permission from '../functions/permission'
  import load_request from '../functions/load_request'
  import Request from '../functions/request'
  import Inputs from './index'

  export default {
    name: "edit",
    components: {
      Inputs,
      Request
    },
    props:{
      obj:{
        type: Object,
        required: true,
      },
      reload:{
        type: Object,
        required: false,
      }
    },
    data(){
      return{
        send:{
          params: {},
          url: this.obj.url,
          data: {},
          request: false
        },
        cur_value: this.obj.value,
        old_value: '',
        inputs:{
          value: '',
          event: null
        }
      }
    },
    computed:{
      inputs_value(){
        return this.inputs.value
      },
      inputs_event(){
        return this.inputs.event
      },
      send_data(){
        return this.send.data
      }
    },
    watch:{
      send_data:function (object) {
        this.create_update_reload(object, this.reload)
      },
      inputs_event: function (event){
        this.cur_value = this.inputs_value
        if(
          event === 'blur' ||
          event === 'enter' ||
          event === 'change'
        ){
          this.send_check()
        }
        this.inputs.event = null
      },
      obj: {
        handler: function (object) {
          this.set_params()
        }, deep: true
      }
    },
    mounted(){
      this.set_params()
    },
    methods:{
      send_check(){
        if(this.cur_value !== this.old_value){
          this.send.params[this.obj.name] = this.cur_value
          this.send.request = true
        }
      },
      set_params(){
        this.cur_value = this.obj.value
        this.old_value = this.obj.value

        for(let key in this.obj.required_params){
          this.send.params[key] = this.obj.required_params[key]
        }
      }
    },
    mixins:[load_request,Permission]
  }
</script>

<style lang="scss" scoped>

</style>
