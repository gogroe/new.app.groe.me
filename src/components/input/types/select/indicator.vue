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
    name: "select_indicator",
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

          this.$store.commit('update_reload', {action: value, section: this.clist})

        }, deep: true
      },
    },
    mounted () {
      this.$$list.items(this.clist)
        .then((result) =>
          this.set_items(result)
        )
    },
    methods:{
      set_items (items) {
        this.items = items
        this.set_item(items, this.cvalue)
        this.$store.commit('update_reload', {action: this.item.value, section: this.clist})
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
