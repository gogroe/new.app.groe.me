<template>
  <div>
    <status
      :type="type"
      :clist="clist"
      :options="items"
      label="name"
      :placeholder="placeholder"
      :cvalue="item"
      v-model="item"/>
  </div>
</template>

<script>
  import status_methods from './methods'
  import Status from "../../../status/index";

  export default {
    name: "status_standard",
    components: {Status},
    props: {
      type: {
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
      placeholder:{
        type: String,
        required: false
      },
      citems:{
        type: Array,
        required: false,
        default: null
      },
    },
    data () {
      return {
        items: [],
        item: null
      }
    },
    mixins:[status_methods]
  }
</script>
