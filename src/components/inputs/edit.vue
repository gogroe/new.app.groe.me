<template>
  <div>
    <label :for="obj.name" :class="obj.label_class">{{obj.label}}</label>
    <input v-if="obj.type === 'text'" v-on:blur="value_check(value, old_value)" :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :value="obj.value" :placeholder="obj.placeholder" :class="obj.input_class" v-model="send.params.value"/>
    <request :obj="send" v-model="send"/>
  </div>
</template>

<script>
  //if value is changeing and unfocus or not active anymore, then send request

  // obj:{
  //   url: '',
  //     lable: '',
  //     name: '',
  //     value:'',
  //     select:'',
  //     placeholder: '',
  //     type: '',
  //     input_class:'',
  //     label_class: '',
  //     required_params: ''
  // }

  import { mapGetters } from 'vuex'
  import Request from '../functions/request'

  export default {
    name: "edit",
    components: {Request},
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
          url: this.url,
          data: {},
          request: false
        },
        value: null,
        old_value: null,
      }
    },
    computed: {
      ...mapGetters([
        'list_states'
      ]),
      send_data: function(){
        return this.send.data
      }
    },
    watch:{
      send_data: function(object) {
        this.error_check(object)
      },
      value: function (new_val, old_val) {
        this.value_check(new_val, old_val)
      }
    },
    mounted(){
      this.old_value = this.obj.value
      for(let key in this.obj.required_params){
        this.send.request.params[key] = this.obj.required_params[key]
      }
      console.log(this.obj)
    },
    methods:{
      error_check(object){
        if('errors' in  object){
          if((typeof object.errors) === number || (typeof object.errors) === string ){
            console.log(this.list_states[object.errors])
          }
        }
      },
      value_check(new_val, old_val){

        if(new_val != old_val){
          this.send.params[this.obj.name] = new_val
          this.send.request = true
        }
        console.log(this.send)
        //if value is different
        //then = get the required key and pus object(key (name) = value) to send.params
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
