<template>
   <div
     v-if="active"
     class="input_error">
     <p>{{error}}</p>
   </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "edit_errors",
    props: {
      indicator: {
        type: String,
        required: true,
        default: ''
      },
      response: {
        type: Object,
        required: true,
        default: null
      },
    },
    data () {
      return {
        active: false,
        error: null,
        detail: null
      }
    },
    computed:{
      ...mapGetters([
        'list_states'
      ])
    },
    watch:{
      response: {
        handler: function (object) {
          this.active = false
          this.error = null

          if('errors' in object) {
            if(typeof object.errors === 'object' || Array.isArray(object.errors)) {

              for(let key in object.errors) {
                if(this.indicator === key){
                  this.active = true
                  this.error = 'error' in object.errors[key]
                    ? this.list_states[object.errors[key].error]
                    : null
                  this.detail = 'detail' in object.errors[key]
                    ? this.list_states[object.errors[key].detail]
                    : null
                }
              }
            }
          }
        }
      }
    }
  }
</script>

