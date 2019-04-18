<template>
  <div class="main_forgot default popup white">
    <div class="inner auth">
      <img src="../../../static/layout/logo.png">
      <h1>Passwort vergessen</h1>
      <p>Wir senden Ihnen eine Email mit weiteren Anweisungen zum zurücksetzten des Passworts.</p>
      <forgot redirect="notification"/>
    </div>
    <mini_footer class="mini_footer"/>
  </div>
</template>

<script>
  import Mini_footer from "../../components/mini_footer/index";
  import Forgot from "../../components/authentication/forgot";

  export default {
    name: "main_forgot",
    components: {Forgot, Mini_footer},
    mounted() {
      this.set_notification()
    },
    methods:{
      set_notification(){
        const note = {
          header: 'Zurücksetzten des Passworts war erfolgreich, bitte überprüfen Sie Ihr Email Postfach.',
          content: 'Ums den Prozess abzuschließen folgen Sie den Anweisungen in der Email.'
        }
        this.$store.commit('update_notification', note)
      }
    }
  }
</script>

<style lang="scss">

  .main_forgot{
    background: white;


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
  }


</style>
