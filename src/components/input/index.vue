<template>
  <div class="cinput">
    <label
      class="input_label"
      v-if="type.indexOf('auth') === -1"
      :for="name">
      {{name}}
    </label>
    <input_standard
      v-if="is_standard_input"
      :name="name"
      :type="type"
      :cvalue="cvalue"
      :readonly="readonly"
      :placeholder="placeholder"
      v-model="item"/>
    <input_date
      v-if="is_date_input"
      :type="type"
      :cvalue="cvalue"
      :readonly="readonly"
      :placeholder="placeholder"
      v-model="item"/>
    <input_select
      v-if="type.indexOf('select') !== -1"
      :type="type"
      :clist="clist"
      :cvalue="cvalue"
      :readonly="readonly"
      :placeholder="placeholder"
      :citems="citems"
      v-model="item"/>
    <input_status
      v-if="type.indexOf('status') !== -1"
      :type="type"
      :clist="clist"
      :cvalue="cvalue"
      :readonly="readonly"
      :placeholder="placeholder"
      :citems="citems"
      v-model="item"/>
    <input_auth
      v-if="type.indexOf('auth') !== -1"
      :name="name"
      :type="type"
      :cvalue="cvalue"
      :readonly="readonly"
      :placeholder="placeholder"
      v-model="item"/>
  </div>
</template>

<script>
  import input_auth from './types/auth'
  import input_standard from './types/text'
  import Input_date from "./types/date";
  import Input_select from "./types/select/index";
  import Input_status from "./types/status/index";

  export default {
    name: "cinput",
    components: {Input_status, Input_select, Input_date, input_standard, input_auth},
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
      indicator:{
        type: String,
        required: false,
        default: null
      },
      readonly:{
        type: Boolean,
        required: false,
        default: false
      },
      placeholder:{
        type: String,
        required: false,
        default: this.name
      },
      clist:{
        type: String,
        required: false,
        default: null
      },
      citems:{
        type: Array,
        required: false,
        default: null
      },
    },
    data () {
      return {
        item:{
          value: null,
          event: null
        }
      }
    },
    computed:{
      is_standard_input () {
        let type = this.type
        return  type === 'text' ||
          type === 'textarea' ||
          type === 'number' ||
          type === 'url' ||
          type === 'password' ||
          type === 'email'
      },
      is_date_input () {
        let type = this.type
        return type === 'date' ||
          type === 'datetime' ||
          type === 'time'
      }
    },
    watch:{
      item: {
        handler: function (object) {
          let emitter = {
            value: object.value,
            event: object.event
          }

          if(this.indicator !== null){
            emitter.indicator = this.indicator
          }

          this.$emit('input', emitter)
        }, deep:true
      }
    }
  }
</script>


<style lang="scss">

    .input_label{
      width: 100px;
      margin-right: 17px;
    }

    input{
      width: 180px;
      padding: 5px 20px 5px 5px;
      background: transparent;
      border: solid 1px transparent;

      &:hover{
        border: dashed 1px #bbbbbb;
      }

      &:focus, &:active{
        border: solid 1px #3da0f5;
        background: #ffffff;
      }
    }

    .v-select {
      input[type=search]{
        border-color: transparent;
      }

      &.open{
        .dropdown-toggle {
          border: solid 1px #3da0f5;
          border-bottom: 1px solid transparent;
          background: #ffffff;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;

          &:hover{
            border-bottom: 1px solid transparent;
          }
        }
      }

      .dropdown-toggle {
        width: 180px;
        border-radius: 4px;
        border: solid 1px transparent;

        &:hover{
          border: dashed 1px #bbbbbb;
        }

        .clear {
          margin: 0 6px;
        }
      }
    }

  

</style>
