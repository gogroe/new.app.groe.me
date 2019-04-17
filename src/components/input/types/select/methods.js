export default {
  name: 'select_methods',
  data() {
    return {
      isLoaded: true
    }
  },
  watch:{
    item: {
      handler: function (object) {

        let value = object === null
          ? null
          : object.value

        if(this.isLoaded){
          this.$emit('input', {
            value: value,
            event: 'Enter'
          })

          if(object !== null && this.type === 'select_indicator'){
            let name = 'original' in object
              ? object.original
              : object.name

            this.$store.commit('update_reload', {action: name, section: this.clist})
          }
        }
      }, deep: true
    },
    cvalue: {
      handler: function () {
        this.set_citems()
      },deep: true
    },
    clist: function () {
      this.set_citems()
    }
  },
  mounted () {
    this.set_citems()
  },
  methods:{
    set_citems () {
      if(this.citems !== null){
        this.items = this.citems
        this.set_items(this.items)
      }
      else {
        this.$$list.items(this.clist)
          .then((result) =>
            this.set_items(result)
          )
      }
    },
    set_items (items) {
      if(items ){
        // items.map( this.translate(item) )

        this.items = items
        this.set_item(items, this.cvalue)
      }
    },
    translate (item) {
      console.log(item)
      item.original = item.name
      item.name = this.$$translation(item.name)
      return item
    },
    set_item (items, value) {
      this.isLoaded = false

      for(let item_key in items){
        if (items[item_key].value === value) {
          this.item = items[item_key]
        }
      }
      let that = this                                 
      setTimeout(() => that.isLoaded = true, 100)     
    }
  }
}
