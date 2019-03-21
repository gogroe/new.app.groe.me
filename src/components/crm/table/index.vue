<template>
  <div class="crm_table">
    <div class="table default_scrollbar">
      <div id="foo">
        <table>
          <tr>
            <td
              valign="top"
              v-for="(column, col_i, i) in columns"
              :key="col_i">
          <table class="inner_table">
            <thead>
            <tr>
              <th :class="{'first_column': i === 0}">
                <p class="head">
                  <table_sorting :column="column"/>
                </p>
              </th>
            </tr>
            </thead>
            <tbody v-if="active.table">
            <tr v-for="(row, row_i) in column.rows"
                :key="row_i">
              <td :class="[{'last_td': object_length(column.rows) -1 === row_i}, {'first_column': i === 0}]">
                <table_cell class="row"
                            :cell="row"
                            :column="column"/>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
        </tr>
      </table>
        <div style="clear: both;">&nbsp;</div>
      </div>
      <placeholders v-if="!active.table"
                    request_get_data="columns"
                    placeholder_type="table"/>
    </div>
    <div class="table_footer">
      <table_limit_offset :request_data="request_data"/>
    </div>
  </div>
</template>

<script>
  //Props pattern description
  // let request_data = [
  //   {
  //     id: '1',
  //     column1: '', //Name
  //     column2: '', //Status
  //   },
  //   {
  //     id: '2',
  //     column1: '', //Name
  //     column2: '', //Status
  //   },
  //   {
  //     id: '3',
  //     column1: '', //Name
  //     column2: '', //Status
  //   }
  // ]
  //
  // let columns_settings = {
  //   column1:{
  //     name: 'Name',
  //     type: 'text',
  //     required_params: {
  //       user_id: '1'
  //     },
  //     create_url: 'http...',
  //     edit_url: 'http...',
  //   },
  //   column2:{
  //     name: 'Status',
  //     type: 'select',
  //
  //   }
  // }
  // let request_group = {
  //   users: {
  //     required_params: {
  //             user_id: '1'
  //           },
  //     create_url: 'http...',
  //     edit_url: 'http...',
  //   },
  //   status: {
  //     required_params: {
  //       user_id: '1'
  //     },
  //     create_url: 'http...',
  //     edit_url: 'http...',
  //   }
  // }

  import $ from 'jquery'
  import preload from '../../../components/functions/preload'
  import placeholders from '../../../components/gray_placeholders'
  import custom_helper from '../../../components/functions/custom_helper'
  import Table_cell from "./cell";
  import Table_limit_offset from "./limit_offset";
  import Table_sorting from "./sorting";

  export default {
    name: "crm_table",
    components: {Table_sorting, Table_limit_offset, Table_cell, placeholders},
    props:{
      request_data:{
        //type: 'Array',
        required: true
      },
      columns_settings:{
        //type: 'Object',
        required: true
      },
      request_groups:{
        //type: 'Object',
        required: true
      },
    },
    data(){
      return{
        columns: [],
        stored_request_data:[],
        active:{
          table: true
        }
      }
    },
    watch:{
      request_data:function () {
        this.stored_request_data = this.request_data.rows
        this.set_columns()
      },
      columns_settings:function () {
        if(this.columns !== this.columns_settings){
          this.set_columns()
          this.set_column_with()
        }
      }
    },
    updated: function(){
      this.set_column_with()
    },
    created(){
      // this.preload_lists()
    },
    methods:{
      // preload_lists(){
      //   let lists = []
      //
      //   for(let columns_key in this.columns_settings){
      //     let column = this.columns_settings[columns_key]
      //
      //     if('select' in column){
      //       lists.push(column.select)
      //     }
      //   }
      //
      //   let request = {
      //     name: 'lists',
      //     uri: 'https://newbackend.groe.me/list/get_all',
      //     list_groups: lists
      //   }
      //
      //   this.request_preload(request)
      // },

      //jquery
      set_column_with(){
        let table_width = $( '.table_footer' ).width()
        let columns_count = this.object_length(this.columns_settings)
        let columns_width = 0

        let inner_tables = $( '.inner_table' )

        inner_tables.each( function () {
          columns_width += parseInt($( this ).width())
        })

        if(table_width > columns_width){
          let new_column_width = table_width / columns_count

          inner_tables.each( function () {
            $( this ).width(new_column_width)
          })
        }
        else{
          inner_tables.each( function () {
            $( this ).css('width', 'auto')
          })
        }
      },

      //table methods
      set_columns(){
        if(this.object_length(this.stored_request_data) !== 0){
          this.active.table = true
          this.columns = this.columns_settings
          this.set_request_groups()
          this.set_rows_empty()
          this.set_rows()
        }
        else {
          this.columns = this.columns_settings
          this.active.table = false
        }
      },
      set_request_groups(){
        for(let columns_key in this.columns){
          if(this.columns[columns_key].request_group in this.request_groups){
            for(let request_groups_key in this.request_groups[this.columns[columns_key].request_group]){
              this.columns[columns_key][request_groups_key] = this.request_groups[this.columns[columns_key].request_group][request_groups_key]
            }
          }
        }
      },
      set_rows_empty(){
        for(let columns_key in this.columns){
          this.columns[columns_key].rows = []
        }
      },
      set_rows(){
        for(let request_data_key in this.stored_request_data){
          let row = this.stored_request_data[request_data_key]

          for(let row_key in row){
            let cell = row[row_key]

            if(row_key in this.columns){
              let row_object = { name:cell }

              let ids = this.get_ids(row_key, request_data_key)
              for(let id_key in ids){
                row_object[id_key] = ids[id_key]
              }

              this.columns[row_key]['rows'].push(row_object)
            }
          }
        }
      },
      get_ids(column_key, row_index){
        let ids_object = {}

        for(let param_key in this.columns[column_key].required_params){
          let param = this.columns[column_key].required_params[param_key]

          if(typeof param === 'string' && param.indexOf('get_') !== -1){
            let search_id = param.substring(4)

            if(search_id in this.stored_request_data[row_index]){
              ids_object[param_key] = this.stored_request_data[row_index][search_id]
            }
          }
        }

       return ids_object
      }
    },
    mixins:[custom_helper, preload]
  }
</script>

<style lang="scss" scoped>
  .crm_table{
    position: relative;
    width: calc(100% - 450px);
    height: 100%;
    overflow: auto;
  }

  .table {
    position: relative;
    width: 100%;
    height: calc(100% - 64px);
    background: #fff;
    border: 1px solid #e6e6e6;
    padding: 0 17px 0px 17px ;
    overflow: auto;

    table, th, td, tr {
      padding: 0;
      border-spacing: 0;
    }

    .inner_table {
      width: auto;
      float: left;
      position: relative;
      border: none;

      thead {
        tr {
          th {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: white;
            border-bottom: 1px solid #e6e6e6;
          }
        }
      }

      tbody {
        tr {
          td {
            border-bottom: 1px solid #e6e6e6;

            &.last_td{
              border-bottom: none;
            }
          }
        }
      }
    }

    .first_column{
      padding-left: 47px;
    }

    .row{
      height: 64px;
    }

    .head {
        text-align: left;
        padding: 34px 47px 15px 17px;
        line-height: 13px;
        height: 62px;
        color: #bbbbbb;
        white-space:nowrap;
    }
  }


  .table_footer{
    position: relative;
    height: 64px;
    width: 100%;
    background: #fff;
    padding:17px;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
  }
</style>
