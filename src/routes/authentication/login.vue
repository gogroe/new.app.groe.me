<template>
  <div class="main_login default popup white">
    <div class="inner auth">
      <img src="../../../static/layout/logo.png">
      <h1>Anmeldung</h1>
      <p>Mit GROE-Konto anmelden.</p>
      <login redirect="user_vita"/>
    </div>
    <mini_footer class="mini_footer"/>
  </div>
</template>

<script>
  import Login from "../../components/authentication/login";
  import Mini_footer from "../../components/mini_footer/index";

  export default {
    name: "main_login",
    components: {Mini_footer, Login},
  }
</script>

<style lang="scss">

  .main_login{
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
