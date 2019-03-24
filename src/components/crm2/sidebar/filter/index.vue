<template>
  <div class="crm_filter">
    <h2>FILTER</h2>
    <draggable
      :list="xColumns"
      class="filter_wrapper"
      :options="{ handle:'.material-icons.drag'}">
      <crm_item
        v-for="(column, i) in xColumns"
        :key="i"
        v-if="column.type !== 'indicator'"
        :column="column"
        v-model="action"/>
    </draggable>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import draggable from 'vuedraggable';
  import Crm_item from "./item/index";
  import handle_params from "./handle_params";

  export default {
    name: "crm_filter",
    components: {
      Crm_item,
      draggable
    },
    props:{
      columns:{
        type: Array,
        required: true,
      }
    },
    data(){
      return {
        action: null,
        params: {},
        xColumns: []
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ])
    },
    watch:{
      columns: function(){
        this.xColumns = this.columns
      },
      reload: function (object) {
        if(object.section === 'crm_prepare'){
          this.$store.commit('update_reload', {section: 'crm' ,action: this.params})
        }
      },
      action: function (object) {
        if(object !== null){
          //handle request methods
          if(object.method === 'add_params') {
            this.add_params(object)
          }
          else if(object.method === 'remove_params'){
            this.remove_params(object)
          }
          this.$store.commit('update_reload', {section: 'crm' ,action: this.params})

          //handle field and orders
          if(object.method === 'update_field') {

          }
          this.action = null
        }
      }
    },
    mixins:[handle_params]
  }
</script>

<style lang="scss">

  .crm_filter{

    h2{
      height: calc(62px - 16px);
      margin-top: 16px;
      margin-left: 16px;
      margin-bottom: 62px;
      padding-bottom: 16px;
      padding-right: 16px;
      font-size: 20px;
      color: #edad00;
      border-bottom: 1px solid #fff9e5;
    }

    .filter_wrapper{
      padding: 16px;
    }
  }

</style>
