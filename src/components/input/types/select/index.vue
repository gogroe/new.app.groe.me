<template>
  <div
    v-if="is_active"
    class="input_wrapper">
    <input
      v-if="readonly"
      readonly
      class="input"
      type="text"
      :placeholder="placeholder"
      v-model="rvalue">
    <select_dependent
      v-else-if="is_dependent"
      :clist="clist"
      :cvalue="cvalue"
      :placeholder="placeholder"
      v-model="item"/>
    <select_indicator
      v-else-if="is_indicator"
      :clist="clist"
      :cvalue="cvalue"
      :placeholder="placeholder"
      v-model="item"/>
    <select_standard
      v-else
      :clist="clist"
      :cvalue="cvalue"
      :placeholder="placeholder"
      v-model="item"/>
  </div>
</template>

<script>
  import Select_dependent from "./dependent";
  import Select_indicator from "./indicator";
  import Select_standard from "./standard";
  export default {
    name: "input_select",
    components: {Select_standard, Select_indicator, Select_dependent},
    props: {
      clist:{
        type: String,
        required: true,
        default: null
      },
      cvalue:{
        required: true
      },
      readonly:{
        type: Boolean,
        required: false
      },
      placeholder:{
        type: String,
        required: false
      },
      citems:{
        type: Array,
        required: false,
        default: null
      }
    },
    data () {
      return {
        item: {
          value: null,
          event: null
        },
        rvalue: null
      }
    },
    computed:{
      is_active () {
        return this.clist !== null
      },
      is_indicator () {
        return this.clist.indexOf('$') === 0
      },
      is_dependent () {
        return this.clist.lastIndexOf('$') >= 1
      },
    },
    watch:{
      item: {
        handler: function () {
          this.$emit('input', this.item)
        }, deep: true
      },
    },
    mounted () {
      if(this.readonly){
        this.$$list.item(this.clist, this.cvalue)
          .then((result) => this.rvalue = result)
      }
    }
  }
</script>
