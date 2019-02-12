<template>
  <div class="active_filter" v-if="active">
    <p class="section_name">AKTIVE FILTER</p>
    <ul v-for="(filter, filter_key, i) in filters"
        :key="i">
      <li @click="unset_filter(filter)">
        <i class="material-icons">delete_outline</i> <span>{{columns[build_key(filter)].name}}: {{translate_value(filter)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Custom_helper from '../../functions/custom_helper'
  import { mapGetters } from 'vuex'
  import List from "../../list/index";

  export default {
    name: "filters_actives",
    components: {List},
    props:{
      columns:{
        required: true
      }
    },
    data(){
      return{
        active: false,
        filters:[],
      }
    },
    computed:{
      ...mapGetters([
        'users_crm_filter',
        'reload',
        'lists'
      ])
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'filters_actives'){
          this.$store.commit('update_reload', {action: null, section: null})
          this.set_filters()
        }
      }
    },
    methods:{
      build_key(object){
        return object.table + '.' + object.column
      },
      translate_value(object){
        let column = this.columns[this.build_key(object)]
        if(column.type === 'select'){
          let list =  this.lists[column.select]

          for(let list_key in list){
            if(list[list_key].value == object.value){
              return list[list_key].name
            }
          }
        }
        else {
          return object.value
        }
      },
      unset_filter(filter){
        if( this.object_length(this.users_crm_filter[filter.table].conditions) > 1 ){

          this.$store.commit('unset_users_crm_filter_condition', filter)
          this.$store.commit('update_reload', {action: 'filter', section: 'users_crm'})
          this.set_filters()
        }
        else {
          this.$store.commit('unset_users_crm_filter_table', filter.table)
          this.$store.commit('update_reload', {action: 'filter', section: 'users_crm'})
          this.set_filters()
        }
      },
      set_filters(){
        this.filters = []

        for( let filter_key in this.users_crm_filter ){
          let filter = this.users_crm_filter[filter_key]

          if(typeof  filter === 'object' && 'conditions' in filter){
            for(let conditions_key in filter.conditions){
              let condition = filter.conditions[conditions_key]

              let item = {
                table: filter_key,
                method: conditions_key.indexOf('->') >= 0
                  ? conditions_key.substr( 0, conditions_key.indexOf('->'))
                  : null,
                conditions_key: conditions_key,
                column: conditions_key.indexOf('->') >= 0
                  ? conditions_key.substr( conditions_key.indexOf('->') + 2)
                  : conditions_key,
                value: condition,
              }

              this.filters.push(item)
            }
          }
        }
        this.active = this.filters.length !== 0
      }
    },
    mixins:[Custom_helper]
  }
</script>

<style lang="scss" scoped>
  .active_filter{
    padding: 17px 64px 17px 0;
    border-bottom: 1px solid #eee;
  }

  li{
    width: 100%;
    position: relative;
    margin-bottom: 17px;

    span{
      line-height: 24px;
      vertical-align: top;
    }

    i{
      cursor: pointer;
      margin-right: 17px;
    }
  }
</style>
