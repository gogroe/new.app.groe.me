<template>
  <div class="accounts_table">
    <table class="default_box">
      <tr>
        <th>Datum</th>
        <th>Verwendungszweck</th>
        <th>Betrag</th>
        <th></th>
      </tr>
      <tr v-for="(account, i) in request_accounts"
          :key="i"
          :class="{'last_row': i+1 === request_accounts.length }">
        <td>
          <ddmmmyy :timestamp="account.date"
                   color="#333333"/>
        </td>
        <td>{{account.description}}</td>
        <td>{{account.value + ' ' + account.currency}}</td>
        <td><i class="material-icons">more_horiz</i></td>
      </tr>
    </table>
  </div>
</template>
<script>
  import Ddmmmyy from "../date/ddmmmyy";

  export default {
    name: "accounts_table",
    components:{
      Ddmmmyy
    },
    props:{
      request_accounts:{
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>

  table{
    width: 100%;
    position:relative;
    padding: 0 18px 18px 18px;
    margin-left: calc(50% - 400px + 100px);
    border-spacing: 0;
    tr{
      &.last_row td{
        border-bottom: none;
      }
      th{
        text-align: left;
        color: #bbbbbb;
        font-weight: bold;
        padding: 13.5px 5px;
        border-bottom: 1px solid #e9e9e9;
      }
      td{
        font-size: 14px;
        border-bottom: 1px solid #e9e9e9;
        padding: 17.5px 5px;
      }
    }
  }
</style>
