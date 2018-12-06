<template>
  <div>
    <input v-if="type === 'text'" :type="type" :name="name" :value="value" :placeholder="placeholder" :class="input_class" v-model=""/>
    <input v-if="type === 'number'" :type="type" :name="name" :value="value" :placeholder="placeholder" :class="input_class" v-model=""/>
    <input v-if="type === 'textarea'" :type="type" :name="name" :value="value" :placeholder="placeholder" :class="input_class" v-model=""/>
    <input v-if="type === 'password'" :type="type" :name="name" :value="value" :placeholder="placeholder" :class="input_class" v-model=""/>
    <input v-if="type === 'number'" :type="type" :name="name" :value="value" :placeholder="placeholder" :class="input_class" v-model=""/>
    <select v-if="type === 'select'" v-model="">
      <option >{{option}}</option>
    </select>
    <request :obj="send" v-model="send"/>
  </div>
</template>

<script>
  import Request from "../functions/request";
  export default {
    name: "edit",
    components: {Request},
    props:{
      url:{
        type: String,
        required: true,
      },
      name:{
        type: String,
        required: true,
      },
      value:{
        type: String,
        required: false,
      },
      select:{
        type: Object,
        required: false,
      },
      placeholder:{
        type: String,
        required: false,
      },
      type:{
        type: String,
        required: true,
      },
      input_class:{
        type: String,
        required: true,
      },
      required:{
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
        }
      }
    },
    computed: {
      ...mapGetters([
        'get_response',
      ]),
      if_loaded: function(){
        return this.send.data
      }
    },
    watch:{
      if_loaded: function(object) {
        this.send.request=true
      }
    },
  }
</script>

<style scoped>

</style>
