<template>
  <div class="account_balance default_box">
    <span class="description">Aktueller Kontostand:</span>
    <span class="balance">{{balance.replace('.',',')}} EUR</span>
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

  .default_box{
    &.active, &:hover{
      box-shadow: none;
    }
  }

  .description {
   color: #bbbbbb;
  }

  .balance{
    float: right;
    font-size: 14px;
  }

</style>
