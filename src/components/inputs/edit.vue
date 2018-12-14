<template>
  <div>
    <div class="add_stuff" v-if="obj.value===undefined && !tmp" @click="tmp = true" style="cursor: pointer;">
      <div>
        <p>einreichen {{obj.name}}</p>
      </div>
      <div>
        <p style="font-size: 20px;">+</p>
      </div>
    </div>
    <inputs v-else :obj="obj" :request_data="send.data" v-model="inputs"/>
    <request :obj="send" v-model="send"/>
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
        },
        tmp: false
      }
    },
    computed:{
      inputs_value(){
        return this.inputs.value
      },
      inputs_event(){
        return this.inputs.event
      }
    },
    watch:{
      inputs_event: function (event){
        this.cur_value = this.inputs_value
        if(
          event === 'blur' ||
          event === 'enter' ||
          event === 'change'
        ){
          this.send_check()
        }
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
          this.$store.commit('update_reload', true)
        }
      },
      set_params(){
        this.cur_value = this.obj.value
        this.old_value = this.obj.value

        for(let key in this.obj.required_params){
          this.send.params[key] = this.obj.required_params[key]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add_stuff{
    div{
      width: 60%;
      padding: 10px;
      margin: 0px;
      float: left;
      p{
        color: #3da0f5;
        float: right;
      }
    }
    div:last-child{
      width: 40%;
      p{
        font-size: 20px;
        float: left;
        font-weight: bold;
      }
    }
  }
</style>
