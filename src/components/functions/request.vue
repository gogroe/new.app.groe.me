<template>
  <div></div>
</template>

<script>
  // obj: {
  //   params: {},
  //   url: '',
  //   data: {},
  //   request: false
  // }

  import { mapGetters } from 'vuex'

  export default {
    name: "request",
    props:{
      obj:{
        type: Object,
        required: true,
      },
    },
    data(){
      return{
        request_token: '',
        object: null,
      }
    },
    computed: {
      ...mapGetters([
        'get_response',
      ]),
    },
    watch:{
      get_response: function (response) {
        if(response.request_token === this.request_token) {
          this.object.data = response.response
          this.$emit('input', this.object)
          this.request_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }
      },

      obj: {
        handler: function (obj) {
          this.setObject()
          if(obj.request) {
            this.request()
            this.obj.request = false
            this.$emit('input', this.obj)
          }
        },
        deep: true
      },
    },
    methods: {
      request(){
        const request = {
          uri: this.obj.url,
          request_token: this.request_token
        }

        for(let key in this.obj.params){
          request[key] = this.obj.params[key]
        }

        this.$store.dispatch('data_request', request)
      },

      setObject(){
        this.object = this.obj
      }
    },
    created(){
      this.setObject()
      this.request_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    },
  }
</script>
