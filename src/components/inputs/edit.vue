<template>
  <div>
    <label :for="obj.name" :class="obj.label_class">{{obj.label}}</label>
    <input v-if="obj.type === 'text'" @keyup.enter="send_check(cur_value, old_value)" v-on:blur="send_check(cur_value, old_value)" :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :value="obj.value" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>
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
          url: this.obj.url,
          data: {},
          request: false
        },
        cur_value: this.obj.value,
        old_value: '',
      }
    },
    computed: {
      ...mapGetters([
        'list_states'
      ]),
    },
    watch:{},
    mounted(){
      this.old_value = this.obj.value
      for(let key in this.obj.required_params){
        this.send.params[key] = this.obj.required_params[key]
      }
    },
    methods:{
      send_check(new_val, old_val){
        if(new_val !== old_val){
          this.send.params[this.obj.name] = new_val
          this.send.request = true
        }
        console.log(this.send)
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
