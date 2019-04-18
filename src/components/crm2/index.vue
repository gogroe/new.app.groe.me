<template>
    <div class="crm">
      <crm_table
        class="crm_table"
        :class="{'active': active.sidebar}"
        :columns="columns"
        :crmName="crm.name"
        :cReload="active.reload"
        :counts="counts"
        :cLoad="cLoad.data"/>
      <crm_sidebar
        class="crm_sidebar"
        :class="{'active': active.sidebar}"
        :columns="columns"
        :crmType="crm.id"/>
      <div class="clear"></div>
      <i
        @click="active.sidebar = !active.sidebar"
        :class="{'active': active.sidebar}"
        class="material-icons sidebar_toggle m_over blue">
        {{sidbar_icon}}
      </i>
    </div>
</template>

<script>
  //the index is only careing about loading the content
  //and building up the columns from loaded data

  import { mapGetters } from 'vuex'
  import bColumns from './build_columns'
  import bFields from './build_fields'
  import Crm_table from "./table/index";
  import Crm_sidebar from "./sidebar/index";

  export default {
    name: "crm",
    components: {
      Crm_sidebar,
      Crm_table
    },
    props:{
      url:{
        type: String,
        required: true
      },
      crm:{
        type: Object,
        required: true
      }
    },
    data(){
      return {
        active:{
          sidebar: true,
          reload: false
        },
        cLoad: {
          url: '',
          params: {},
          data: {},
          firstload: false
        },
        columns: [],
        baseColumns: []
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      counts () {
        return 'count' in this.cLoad.data && 'rows' in this.cLoad.data
          ? {count: this.cLoad.data.count, rows: this.cLoad.data.rows.length}
          : {}
      },
      sidbar_icon () {
        return this.active.sidebar
          ? 'keyboard_arrow_right'
          : 'keyboard_arrow_left'
      },
      crm_id (){
        return this.crm.id
      }
    },
    watch:{
      reload: function (object) {
        if(object.section === 'crm' && typeof object.action === 'object'){
          this.cLoad.params = object.action
          this.get_cLoad()
          this.$store.commit('update_reload', {section: null, action: null})
        }
        if(object.section === 'crm_state_column'){
          this.set_column_state(object.action.id, object.action.state)
          this.$store.commit('update_reload', {section: null, action: null})
        }
      },
      crm_id: function () {
        this.load_crm()
      }
    },
    mounted () {
      this.load_crm()
    },
    methods:{
      load_crm () {
        this.firstload = false
        this.columns = []
        this.cLoad.url = this.url
        this.baseColumns = this.crm.baseColumns
        this.set_baseColumns()
        this.get_cLoad()
      },
      set_baseColumns () {
        let columns = this.baseColumns
        if(columns !== null){
          for(let key in columns){
            this.columns.push(columns[key])
          }
        }
      },
      get_cLoad () {
        this.cLoad.params.crm_type = this.crm.id
        this.$$request.post.data(this.cLoad.url, this.cLoad.params)
          .then((response) => this.set_cLoad (response))
      },
      set_cLoad (response) {
        this.cLoad.data = response
        this.columns = bFields(response.fields, this.baseColumns);
        this.active.columns = bColumns(response, this.columns)
      },
      set_column_state(id, state){
        for(let index in this.columns){
          if('id' in this.columns[index] && this.columns[index].id === id){
            this.columns[index].active = state
            break
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .crm {
    overflow-y: hidden;
    height: calc(100vh - 64px);
    width: 100%;
  }

  .sidebar_toggle{
    cursor: pointer;
    font-size: 22px;
    position: fixed;
    bottom: 53px;
    right: 10px;
    width: 25px;
    height: 25px;
    color: #b4b4b4;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    background: #fff;

    &.active{
      right: 438px;
    }
  }

  .crm_table {
    height: 100%;
    width: 100%;

    &.active{
      width: calc(100% - 450px);
      float: left;
    }
  }

  .crm_sidebar {
    height: 100%;
    display: none;
    border-left: 1px solid #e6e6e6;

    &.active{
      width: 450px;
      display: inline-block;
      float: left;
    }
  }
</style>
