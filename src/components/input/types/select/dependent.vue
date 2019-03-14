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
  import { mapGetters } from 'vuex'

  export default {
    name: "select_dependent",
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
        depend: {
          value: null,
          is_value: false,
          items: [],
          is_items: false,
        },
        items: [],
        item: {
          value: null,
          name: null
        },
        is_created: false
      }
    },
    computed:{
      ...mapGetters([
        'reload',
      ]),
    },
    watch: {
      reload: function (object) {
        if (object.section === '$' + this.clist.substring(0, this.clist.lastIndexOf('$'))) {

          //check if value changed then empty
          if(this.is_created){
            this.item = null
          }

          //set new dpenden value
          if(this.depend.is_value || this.depend.is_items){
            this.set_depend_value(object.action)
          }
          else {
            this.set_depend_value(object.action)
          }

          this.$store.commit('update_reload', {action: null, section: null})
        }
      },
      depend: {
        handler: function (object) {
          if(object.is_value || object.is_items){
            this.set_items()
            this.set_item()
            this.is_created = true
          }
        }, deep:true
      },
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
    created () {
      this.$$list.items(this.clist)
        .then((result) => this.set_depend_items(result))
    },
    methods:{
      set_depend_value (value) {
        this.depend.value = value
        this.depend.is_value = true
      },
      set_depend_items (items) {
        this.depend.items = items
        this.depend.is_items = true
      },

      //build select
      set_items () {
        let items = []
        let ditems = this.depend.items

        for(let key in ditems){
          if(ditems[key].relation === this.depend.value){
            items[key] = ditems[key]
          }
        }

        this.items = items
      },
      set_item () {
        if(this.item !== null){
          for(let key in this.items){
            if (this.items[key].value === this.depend.value) {
              this.item = this.items[key]
            }
          }
        }
      }
    }
  }
</script>
