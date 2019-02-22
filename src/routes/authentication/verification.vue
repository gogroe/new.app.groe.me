<template>
  <div class="default_popup_background">
    <div class="inner_popup">
      <h1>Passwort</h1>
      <verification redirect="login"/>
    </div>
    <mini_footer class="mini_footer inner_popup"/>
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
