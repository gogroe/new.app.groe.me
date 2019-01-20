<template>
  <div class="crm_table">
    <div class="table default_scrollbar">
      <div id="foo">
        <table><tr><td valign="top"
                       v-for="(column, col_i) in columns"
                       :key="col_i">
          <table class="inner_table">
            <thead>
            <tr>
              <th>
                <p class="head">
                  {{column.name}}
                </p>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, row_i) in column.rows"
                :key="row_i">
              <td :class="{'last_td': object_length(column.rows) -1 === row_i}">
                <table_cell class="row"
                            :cell="row"
                            :column="column"/>
              </td>
            </tr>
            </tbody>
          </table>
        </td></tr></table>
        <div style="clear: both;">&nbsp;</div>
      </div>
    </div>
    <div class="table_footer">

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
  import  custom_helper from '../../../components/functions/custom_helper'
  import Table_cell from "./cell";

  export default {
    name: "crm_table",
    components: {Table_cell},
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
        // columns:[
        //   {
        //     id: 'status',
        //     name: 'Status',
        //     request_group: 'status',
        //     rows:[
        //       'Aktiv',
        //       'Aktiv',
        //       '',
        //       'Aktiv',
        //       'Inaktiv',
        //       'Inaktiv',
        //       'Inaktiv',
        //       'Aktiv',
        //       'Aktiv',
        //       '',
        //       'Aktiv',
        //       'Inaktiv',
        //       'Inaktiv',
        //       'Inaktiv',
        //       'Aktiv',
        //       'Aktiv',
        //       '',
        //       'Aktiv',
        //       'Inaktiv',
        //       'Inaktiv',
        //       'Inaktiv'
        //     ]
        //   },
        //   {
        //     id: 'firstname',
        //     name: 'Vorname',
        //     group: 'users',
        //     rows:[
        //       'Mesa',
        //       'Dominik',
        //       '',
        //       'Jack',
        //       'Aaron',
        //       'Lea',
        //       'Mina',
        //       'Mesa',
        //       'Dominik',
        //       '',
        //       'Jack',
        //       'Aaron',
        //       'Lea',
        //       'Mina',
        //       'Mesa',
        //       'Dominik',
        //       '',
        //       'Jack',
        //       'Aaron',
        //       'Lea',
        //       'Mina'
        //     ]
        //   },
        //   {
        //     id: 'lastname',
        //     name: 'Nachname',
        //     group: 'users',
        //     rows:[
        //       'Sacirbegovic',
        //       'Geissler',
        //       '',
        //       'Schmidt',
        //       'Frank',
        //       'Nestripke',
        //       'Tutu',
        //       'Sacirbegovic',
        //       'Geissler',
        //       '',
        //       'Schmidt',
        //       'Frank',
        //       'Nestripke',
        //       'Tutu',
        //       'Sacirbegovic',
        //       'Geissler',
        //       '',
        //       'Schmidt',
        //       'Frank',
        //       'Nestripke',
        //       'Tutu'
        //     ]
        //   }
        //
        // ],
        columns: []
      }
    },
    watch:{
      request_data: function () {
        this.set_columns()
      }
    },
    methods:{
      set_columns(){
        if(
          Object.keys(this.request_data).length === 0 &&
          this.request_data.constructor === Object
        ){
          console.log('empty request_data in crm_table')
          return false
        }
        else {
          //set columns
          this.columns = this.columns_settings

          //set rows
          for(let request_data_key in this.request_data){
            let row = this.request_data[request_data_key]

            for(let row_key in row){
              let cell = row[row_key]

              if(row_key in this.columns){
                this.columns[row_key]['rows'].push(cell)
              }
            }
          }
        }
      }
    },
    mixins:[custom_helper]
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

    .row{
      height: 64px;
    }

    .head {
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
