<template>
  <div class="main_reset_password default popup white">
    <div class="inner auth">
      <img src="../../../static/layout/logo.png">
      <h1>Passwort</h1>
      <p>Wählen Sie Ihr neues Passwort.</p>
      <verification redirect="login"/>
    </div>
    <mini_footer class="mini_footer"/>
  </div>
</template>

<script>
  import Verification from "../../components/authentication/verification";
  import Mini_footer from "../../components/mini_footer/index";

  export default {
    name: "main_verification",
    components: {Mini_footer, Verification},
  }
</script>

<style lang="scss">

  .main_reset_password{
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
