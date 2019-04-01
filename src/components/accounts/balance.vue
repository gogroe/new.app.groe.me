<template>
  <div class="account_balance default_box_two">
    <div class="container">
      <span class="description">Ihr aktueller Kontostand beträgt</span>
      <span class="balance">{{balance.replace('.',',')}} EUR</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "account_balance",
    props:{
      request_accounts_data: {
        required: true
      }
    },
    computed:{
      balance(){
        return 'balance' in this.request_accounts_data
          ? this.request_accounts_data.balance
          : '0,00'
      }
    }
  }
</script>

<style lang="scss" scoped>

  .default_box_two{
    text-align: center;

    .container{
      display: inline-block;

      .description {
        color: #737a80;
        float: left;
        padding-right: 16px;
        font-size: 18px;
      }

      .balance{
        color: #45494d;
        float: left;
        font-size: 18px;
      }
    }
  }

</style>
