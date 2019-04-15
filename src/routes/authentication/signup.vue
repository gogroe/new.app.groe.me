<template>
  <div class="default_popup_background">
    <div class="inner_popup">
      <img src="../../../static/layout/logo.png">
      <h1>Registrierung</h1>
      <signup redirect="notification"/>
    </div>
    <mini_footer class="mini_footer inner_popup"/>
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
  /*on google they have:*/
  /*smaller buttons*/


  .default_popup_background{
    background: transparent;

    .inner_popup{
      padding: 47px 64px 47px 64px;
      text-align: center;
      margin-top: 25px; //what to do with mini_footer

      h1{
        margin-bottom: 41px;
        padding-left: 17px;
        font-size: 32px;
      }

      img{
        width: 64px;
      }

      .signup{
        text-align: center;

        button{
          width: calc(100% - 20px);
          padding: 10px 5px;
          height: 42px;
          background-color: #3da0f5;
          color: white;
          margin: 0 10px 17px 10px;

          &:hover{
            background-color: #2e7dbd;
            outline: none;
          }
        }
      }

      .create_input_label{
        display: none;
        width: 100px;
      }
      margin-right: 17px;
      color:#838688;
      line-height: 22px;
    }

    .mini_footer {

      &.inner_popup {
        margin-top: 0;
        background: transparent;
      }
    }

    input[type=text]{
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
  }
</style>
