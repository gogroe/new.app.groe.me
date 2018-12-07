<template>
    <div v-if="error.length > 0">
      <p :class="error_class">{{error}}</p>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "errors",
    props:{
      request_data:{
        required: true
      },
      input_name:{
        required: true
      },
      error_class:{
        required: false
      }
    },
    data(){
      return{
        error: ''
      }
    },
    computed:{
      ...mapGetters([
        'list_states'
      ])
    },
    watch:{
      request_data: function () {
        this.check_errors()
      }
    },
    mounted(){
      this.check_errors()
    },
    methods:{
      check_errors(){
        this.error = ''

        if('errors' in this.request_data){
          if((typeof this.request_data.errors) === 'object' ||
             (typeof this.request_data.errors) === 'array'){

            for(let key in this.request_data.errors){
              if(this.input_name === key){
                if('error' in this.request_data.errors[key]){
                  this.error = this.list_states[this.request_data.errors[key].error]
                }
              }
            }

          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
