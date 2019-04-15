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
  import select_methods from './methods'

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
      citems:{
        type: Array,
        required: false,
        default: null
      },
    },
    data () {
      return {
        indicatorValue: null,
        items: [],
        item: null
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
    },
    watch:{
      reload: {
        handler: function (object) {
          this.items = []
          this.item = null

          let cListIndicator = this.clist.substring(0, this.clist.indexOf('$'))
          let cList = this.clist.substring(this.clist.indexOf('$') +1)

          if(object.section === cListIndicator){
            this.indicatorValue = object.action + cList
            this.$store.commit('update_reload', {action: null, section:null})
            this.set_dependent_citems()
          }
        }, deep: true
      }
    },
    methods:{
      set_dependent_citems () {
        this.$$list.items(this.indicatorValue)
          .then((result) =>
            this.set_items(result)
          )
      },
    },
    mixins:[select_methods]
  }
</script>
