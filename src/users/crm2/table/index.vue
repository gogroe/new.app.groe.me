<template>
  <div class="crm_table">
    <div class="table default_scrollbar">
      <table v-for="(column, col_i) in columns"
             :key="col_i">
        <thead>
        <tr>
          <th>
            <p class="row head">{{column.name}}</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, row_i) in column.rows"
            :key="row_i">
          <td>
            <p class="row">{{row}}</p>
          </td>
        </tr>
        </tbody>
      </table>
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
  //     required_params: {
  //       user_id: '1'
  //     },
  //     create_url: 'http...',
  //     edit_url: 'http...',
  //   }
  // }

  export default {
    name: "crm_table",
    props:{
      request_data:{
        type: 'Array',
        required: true
      },
      columns_settings:{
        type: 'Object',
        required: true
      },
    },
    data(){
      return{
        columns:[
          {
            id: 'status',
            name: 'Status',
            group: 'status',
            rows:[
              'Aktiv',
              'Aktiv',
              '',
              'Aktiv',
              'Inaktiv',
              'Inaktiv',
              'Inaktiv',
              'Aktiv',
              'Aktiv',
              '',
              'Aktiv',
              'Inaktiv',
              'Inaktiv',
              'Inaktiv',
              'Aktiv',
              'Aktiv',
              '',
              'Aktiv',
              'Inaktiv',
              'Inaktiv',
              'Inaktiv'
            ]
          },
          {
            id: 'firstname',
            name: 'Vorname',
            group: 'users',
            rows:[
              'Mesa',
              'Dominik',
              '',
              'Jack',
              'Aaron',
              'Lea',
              'Mina',
              'Mesa',
              'Dominik',
              '',
              'Jack',
              'Aaron',
              'Lea',
              'Mina',
              'Mesa',
              'Dominik',
              '',
              'Jack',
              'Aaron',
              'Lea',
              'Mina'
            ]
          },
          {
            id: 'lastname',
            name: 'Nachname',
            group: 'users',
            rows:[
              'Sacirbegovic',
              'Geissler',
              '',
              'Schmidt',
              'Frank',
              'Nestripke',
              'Tutu',
              'Sacirbegovic',
              'Geissler',
              '',
              'Schmidt',
              'Frank',
              'Nestripke',
              'Tutu',
              'Sacirbegovic',
              'Geissler',
              '',
              'Schmidt',
              'Frank',
              'Nestripke',
              'Tutu'
            ]
          }

        ]
      }
    },
    methods:{

    }
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
    padding: 0 17px 17px 17px ;
    overflow: auto;

    table {
      float: left;
      display: inline;
      border: none;
      border-spacing: 0;

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
          }
        }
      }
    }

    .row {
      line-height: 13px;
      padding: 25.5px 47px 25.5px 17px;
      height: 64px;

      &.head {
        padding-top: 34px;
        padding-bottom: 17px;
        color: #bbbbbb;
      }
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
