<template>
    <div class="crm">
      <crm_table
        class="crm_table"
        :class="{'active': active.sidebar}"
        :columns="columns"
        :cLoad="cLoad.data"/>
      <crm_sidebar
        class="crm_sidebar"
        :class="{'active': active.sidebar}"
        :columns="columns"/>
      <div class="clear"></div>
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
      cBaseColumns:{
        type:Array,
        required:false,
        default: null
      }
    },
    data(){
      return {
        active:{
          sidebar: true,
        },
        cLoad: {
          url: '',
          params: {},
          data: {},
          firstload: false
        },
        columns: [],
        baseColumns: [
          {
            table: 'users',
            active: true,
            type: 'indicator',
            params: {
              firstname : 'get_users.firstname',
              lastname: 'get_users.lastname',
              image: 'get_users.image',
              user_id: 'get_users.id'
            },
            rows: []
          },
          {
            active: true,
            id: 'users.firstname',
            name: 'Vorname',
            type: 'text',
            params: { user_id:'get_users.id' },
            create_url: 'https://newbackend.groe.me/user_crm/user/create',
            update_url: 'https://newbackend.groe.me/user_crm/user/update',
            rows: []
          },
          {
            active: true,
            id: 'users.lastname',
            name: 'Nachname',
            type: 'text',
            params: { user_id:'get_users.id' },
            create_url: 'https://newbackend.groe.me/user_crm/user/create',
            update_url: 'https://newbackend.groe.me/user_crm/user/update',
            rows: []
          },
        ]
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ])
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
      }
    },
    mounted () {
      this.set_baseColumns()
      this.cLoad.url = this.url
      this.get_cLoad()
    },
    methods:{
      set_baseColumns () {
        let columns = this.cBaseColumns
        if(columns !== null){
          for(let key in columns){
            this.columns.push(columns[key])
          }
        }
      },
      get_cLoad () {
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
