<template>
    <div class="crm">
      <crm_table
        class="crm_table"
        :class="{'active': active.sidebar}"
        :cLoad="cLoad"
        :request_groups="request_groups"
        :columns_settings="columns_settings"/>
      <crm_sidebar
        class="crm_sidebar"
        :class="{'active': active.sidebar}"
        :cLoad="cLoad"
        :request_groups="request_groups"
        :columns_settings="columns_settings"/>
      <div class="clear"></div>
    </div>
</template>

<script>
  //the index is only careing about loading the content

  import { mapGetters } from 'vuex'
  import Crm_table from "./table/index";
  import Crm_sidebar from "./sidebar/index";

  export default {
    name: "crm",
    components: {
      Crm_sidebar,
      Crm_table
    },
    props:{
      get_crm:{
        type: Object,
        required: true,
        default: null
      },
      request_groups:{
        type: Object,
        required: true,
        default: null
      },
      columns_settings:{
        type: Object,
        required: true,
        default: null
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
          loaded: false
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
        }
      }
    },
    mounted () {
      this.cLoad = this.get_crm
      this.get_cLoad()
    },
    methods:{
      get_cLoad () {
        this.cLoad.loaded = false
        this.$$request.post.data(this.cLoad.url, this.cLoad.params)
          .then((response) => this.set_cLoad (response))
      },
      set_cLoad (response) {
        this.cLoad.data = response
        this.cLoad.loaded = true
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
