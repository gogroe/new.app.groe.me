export default {
  name: 'select_methods',
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


        if(this.type === 'select_indicator'){
          this.$store.commit('update_reload', {action: value, section: this.clist})
        }
      }, deep: true
    },
  },
  mounted () {
    this.set_citems()
  },
  methods:{
    set_citems () {
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
    set_items (items) {
      if(items )
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
