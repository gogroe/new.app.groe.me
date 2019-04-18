<template>
  <div class="main_signup default popup white">
    <div class="inner auth">
      <img src="../../../static/layout/logo.png">
      <h1>Registrierung</h1>
      <p>Ihr neues GROE-Konto registrieren.</p>
      <signup redirect="notification"/>
    </div>
    <mini_footer class="mini_footer"/>
  </div>
</template>

<script>
  import Signup from "../../components/authentication/signup";
  import Mini_footer from "../../components/mini_footer/index";

  export default {
    name: "main_signup",
    components: {Mini_footer, Signup},
    mounted() {
      this.set_notification()
    },
    methods:{
      set_notification(){
        const note = {
          header: 'Ihre Registrierung war erfolgreich, bitte überprüfen Sie Ihr Email Postfach.',
          content: 'Ums die Registrierung abzuschließen folgen Sie den Anweisungen in der Email.'
        }
        this.$store.commit('update_notification', note)
      }
    }
  }
</script>

<style lang="scss">
  .main_signup{
    background: white;
  }

  .inner{

    h1{
      font-size: 22px;
      font-weight: 400;
      margin-bottom: 10px;
    }

    p{
      font-size: 16px;
      margin-bottom: 41px;
    }

    img{
      width: 41px;
      margin-bottom: 25px;
    }
  }

  .mini_footer{
    margin-top: 25px;
  }
</style>
