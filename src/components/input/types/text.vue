<template>
  <div class="input_wrapper">
    <input
      @blur="emitter({key: 'blur'})"
      @keyup="emitter"
      class="input"
      :type="type"
      :id="name"
      :name="name"
      :readonly="readonly"
      :placeholder="placeholder"
      v-model="value"/>
  </div>
</template>

<script>
  export default {
    name: "input_standard",
    props:{
      name:{
        type: String,
        required: true
      },
      cvalue:{
        required: true
      },
      type:{
        type: String,
        required: true
      },
      readonly:{
        type: Boolean,
        required: false
      },
      placeholder:{
        type: String,
        required: false
      }
    },
    data () {
      return {
        value: this.cvalue
      }
    },
    watch:{
      cvalue () {
        this.value = this.cvalue
      }
    },
    methods:{
      emitter(event){
        this.$emit('input', {
          value: this.value,
          event: event.key
        })
      }
    }
  }
</script>
