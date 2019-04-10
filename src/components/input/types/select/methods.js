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
          console.log(this.isLoaded)

          this.$emit('input', {
            value: value,
            event: 'Enter'
          })

          if(this.type === 'select_indicator'){
            this.$store.commit('update_reload', {action: value, section: this.clist})
          }
        }
      }, deep: true
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
        this.items = items
        this.set_item(items, this.cvalue)
      }
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
