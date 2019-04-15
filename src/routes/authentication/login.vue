<template>
  <div class="default_popup_background">
    <div class="inner_popup">
      <img src="../../../static/layout/logo.png">
      <h1>Anmeldung</h1>
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

  .default_popup_background{
    background: transparent;
  }

  .inner_popup{
    text-align: center;

    h1{
      margin-bottom: 41px;
      font-size: 24px;
      font-weight: normal;
    }

    img{
      width: 64px;
    }

    .create_section{
      text-align: center;

      div{
        margin-bottom: 25px;
      }
    }
    input[type=text],input[type=password]{
      // width: calc(100% - 150px);
      width: 100%;
      line-height: 30px;
      padding: 0px 20px;
      display: inline-block;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;

      &:hover{
        border: 1px solid #bbb;
        border-radius: 4px;
        box-sizing: border-box;
      }
    }

    button{
      background-color: #3da0f5;
      color: white;
      height: 42px;
      padding: 10px 41px;

      &:hover{
        background-color: #2e7dbd;
        outline: none;
      }
    }
  }

</style>
