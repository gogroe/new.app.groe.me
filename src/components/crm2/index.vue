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
  import bColumns from './table/build_columns'
  import bFields from './table/build_fields'
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
    },
    data(){
      return {
        active:{
          sidebar: true
        },
        cLoad: {
          url: '',
          params: {},
          data: {},
        },
        columns: {
          indicator:{
            type: 'indicator',
            params: {
              firstname : 'get_users.firstname',
              lastname: 'get_users.lastname',
              image: 'get_users.image',
              user_id: 'get_users.id'
            },
            rows: []
          },
          'users.firstname':{
            id: 'users.firstname',
            name: 'Vorname',
            type: 'text',
            params: { user_id:'get_users.id' },
            create_url: 'https://newbackend.groe.me/user_crm/user/create',
            update_url: 'https://newbackend.groe.me/user_crm/user/update',
            rows: []
          },
          'users.lastname':{
            id: 'users.lastname',
            name: 'Nachname',
            type: 'text',
            params: { user_id:'get_users.id' },
            create_url: 'https://newbackend.groe.me/user_crm/user/create',
            update_url: 'https://newbackend.groe.me/user_crm/user/update',
            rows: []
          },
        }
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
      }
    },
    mounted () {
      this.cLoad.url = this.url
      this.get_cLoad()
    },
    methods:{
      get_cLoad () {
        this.$$request.post.data(this.cLoad.url, this.cLoad.params)
          .then((response) => this.set_cLoad (response))
      },
      set_cLoad (response) {
        this.cLoad.data = response
        Object.assign(this.columns, bFields(response.fields));
        this.columns = bColumns(response, this.columns)
      },
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
