<template>
  <div class="input_auth_wrapper">
    <label
      class="input_auth_label"
      :class="[
        {'active': active.mover || noValue === false},
        {'mover': active.mover}
      ]"
      @mouseover="active.mover = true"
      @mouseout="active.mover = false"
      :for="name">
      {{name}}
    </label>
    <input
      @blur="emitter({key: 'blur'})"
      @keyup="emitter"
      @mouseover="active.mover = true"
      @mouseout="active.mover = false"
      class="input_auth"
      :type="cType"
      :id="name"
      :name="name"
      :readonly="readonly"
      v-model="value"/>
  </div>
</template>

<script>
  export default {
    name: "input_auth",
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
    },
    data () {
      return {
        active: {
          field: true,
          mover: false
        },
        value: this.cvalue
      }
    },
    watch:{
      cvalue () {
        this.value = this.cvalue
      }
    },
    computed:{
      noValue () {
        return this.value === null || this.value === ''
      },
      cType () {
        if(this.type === 'auth_text'){
          return 'text'
        }
        if(this.type === 'auth_email'){
          return 'email'
        }
        if(this.type === 'auth_password'){
          return 'password'
        }
        else{
          console.warn('type error in input_auth')
        }
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

<style lang="scss">

  .input_auth_wrapper{
    position: relative;
    display: inline-block;
    width: 100%;
    line-height: 50px;
    text-align: center;

    .input_auth_label{
      position: absolute;
      padding-left: 16px;
      color: #bbb;
      font-size: 16px;

      &.active{
        -webkit-transition-property: font-size, line-height, background-color, color; /* Safari */
        -webkit-transition-duration: 1s; /* Safari */
        transition-property: font-size, line-height, background-color, color;
        transition-duration: 0.3s;
        left: 10px;
        top: -6px;
        padding: 1px 6px;
        font-size: 12px;
        line-height: 12px;
        background-color: white;
        border-radius: 2px;
      }

      &.mover{
        color:#3da0f5;
      }
    }

    .input_auth{
      width: 100%;
      font-size: 14px;
      padding: 16px;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      &:hover, &:focus{
        outline:none;
        border-color: #3da0f5;
        background: #f1f3f4;
      }
    }
  }

</style>
