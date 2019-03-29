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
    <status_dependent
      v-else-if="type === 'status_dependent'"
      :type="type"
      :clist="clist"
      :citems="citems"
      :cvalue="cvalue"
      :placeholder="placeholder"
      v-model="item"/>
    <Status_standard
      v-else
      :type="type"
      :clist="clist"
      :cvalue="cvalue"
      :citems="citems"
      :placeholder="placeholder"
      v-model="item"/>
  </div>
</template>

<script>
  import Status_dependent from "./dependent";
  import Status_standard from "./standard";

  export default {
    name: "input_status",
    components: {Status_standard, Status_dependent},
    props: {
      type:{
        type: String,
        required: true,
      },
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
