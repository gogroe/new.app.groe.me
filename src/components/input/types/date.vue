<template>
  <div class="input_wrapper">
    <input
      v-if="readonly"
      readonly
      class="input"
      type="text"
      :placeholder="placeholder"
      v-model="$$date.ddmmyy(value)">
    <datetime
      input-id="startDate"
      :type="type"
      moment-locale="de"
      :placeholder="placeholder"
      monday-first
      :i18n="{ok:'WÄHLEN', cancel:'ABBRECHEN'}"
      v-model="value"/>
  </div>
</template>

<script>
  import { Datetime } from 'vue-datetime';
  import 'vue-datetime/dist/vue-datetime.css'

  export default {
    name: "input_date",
    components: {
      datetime: Datetime
    },
    props:{
      cvalue:{
        required: true
      },
      type:{
        type: String,
        required: false,
        default: 'date'
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
    data(){
      return{
        value: null
      }
    },
    watch:{
      cvalue: function () {
        this.set_value()
      },
      value:function () {
        this.$emit('input', {
          value: this.$$date.timestamp( this.value ),
          event: 'Enter'
        })
      }
    },
    mounted () {
      this.set_value()
    },
    methods: {
      set_value () {
        this.value = this.cvalue === null
          ? null
          : this.$$date.iso8601( this.cvalue )
      }
    }
  }
</script>

<style lang="scss">
  /*.vdatetime-overlay{*/
    /*display: none;*/
  /*}*/

  /*.vdatetime-popup{*/
    /*margin: 17px auto;*/
    /*position: static;*/
    /*-webkit-transform: none;*/
    /*transform: none;*/
  /*}*/
</style>
