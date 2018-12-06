<template>
  <div>
    <label :for="obj.name" :class="obj.label_class">{{obj.label}}</label>
    <input v-if="obj.type === 'text'" :type="obj.type" :name="obj.name" :value="obj.value" :placeholder="obj.placeholder" :class="obj.input_class" v-model="send.params.value"/>
    <input v-if="obj.type === 'text'" :type="obj.type" :name="obj.name" :value="obj.value" :placeholder="obj.placeholder" :class="obj.input_class" v-model="send.params.value"/>
    <input v-if="obj.type === 'text'" :type="obj.type" :name="obj.name" :value="obj.value" :placeholder="obj.placeholder" :class="obj.input_class" v-model="send.params.value"/>
    <textarea v-if="obj.type === 'text'" :name="obj.name" :value="obj.value" :placeholder="obj.placeholder" :class="obj.input_class" v-model="send.params.value"/>
    <!--<select v-if="type === 'select'" v-model="">-->
      <!-- <div v-for="">
        <option >{{option}}</option>
      </div>  -->

      <!-- {variable} -->

    <!--</select>-->
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
        type: String,
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
        //if value is different
        //then = get the required key and pus object(key (name) = value) to send.params
      },
      send_check(e){
        //if event unfocus
        //check if value is different form old_value
        //if true send request
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
