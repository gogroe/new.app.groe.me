<template>
  <div>
    <status
      :options="dependentItems"
      label="name"
      :placeholder="placeholder"
      :dependent="indicatorValue"
      :cvalue="item"
      :clist="clist"
      :type="type"
      v-model="item"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import select_methods from './methods'
  import Status from "../../../status/index";

  export default {
    name: "select_dependent",
    components: {Status},
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
      dependentItems () {
        let items = []
        for(let key in this.items){
          if('relation' in this.items[key] && this.items[key].relation === this.indicatorValue){
            items.push(this.items[key])
          }
        }
        return items
      }
    },
    watch:{
      reload: {
        handler: function (object) {
          let cListIndicator = this.clist.substring(0, this.clist.indexOf('$'))

          if(object.section === cListIndicator){
            this.item = null
            this.indicatorValue = object.action
            this.$store.commit('update_reload', {action: null, section:null})
          }
        }, deep: true
      }
    },
    mixins:[select_methods]
  }
</script>
