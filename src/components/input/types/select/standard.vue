<template>
  <div>
    <v-select
      :options="items"
      label="name"
      :placeholder="placeholder"
      v-model="item"/>
  </div>
</template>

<script>
  export default {
    name: "select_standard",
    props: {
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
        item: {
          value: this.cvalue,
          name: null
        }
      }
    },
    watch:{
      item: {
        handler: function (object) {

          let value = object === null
            ? null
            : object.value

          this.$emit('input', {
            value: value,
            event: 'Enter'
          })
        }, deep: true
      },
    },
    mounted () {
      if(this.citems !== null){
        this.items = this.citems
      }
      else {
        this.$$list.items(this.clist)
          .then((result) =>
            this.set_items(result)
          )
      }
    },
    methods:{
      set_items (items) {
        this.items = items
        this.set_item(items, this.cvalue)
      },
      set_item (items, value) {
        for(let item_key in items){
          if (items[item_key].value === value) {
            this.item = items[item_key]
          }
        }
      }
    }
  }
</script>
