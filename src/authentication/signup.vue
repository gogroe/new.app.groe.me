<template>
  <div class="default_popup_background">
    <div class="inner_popup">
      <h1>Registrierung</h1>
      <signup redirect="notification"/>
    </div>
    <mini_footer class="mini_footer inner_popup"/>
  </div>
</template>

<script>
  import Signup from "../components/authentication/signup";
  import Mini_footer from "../components/mini_footer/index";

  export default {
    name: "main_signup",
    components: {Mini_footer, Signup},
    mounted() {
      this.set_notification()
    },
    set_notification(){
      const note = {
        header: 'Ihre Registrierung war erfolgreich, bitte überprüfen Sie Ihr Email Postfach.',
        content: 'Ums die Registrierung abzuschließen folgen Sie den Anweisungen in der Email.'
      }
      this.$store.commit('update_notification', note)
    }
  }
</script>

<style lang="scss" scoped>

  .default_popup_background{
    background: transparent;
  }

  h1{
    margin-bottom: 27px;
    padding-left: 17px;
  }

  .inner_popup{
    padding: 47px 64px 47px 64px;
  }

  .mini_footer {
    &.inner_popup {
      margin-top: 0;
      background: transparent;
    }
  }

</style>
