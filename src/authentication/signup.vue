<template>
  <div class="default_popup_background">
    <div class="inner_popup">
      <h1>Registrierung</h1>
      <signup/>
    </div>
  </div>
</template>

<script>
  import Signup from "../components/authentication/signup";

  export default {
    name: "main_signup",
    components: {Signup},
  }
</script>

<style lang="scss" scoped>

  .default_popup_background{
    background: transparent;
  }

  .inner_popup{
    padding-top: 47px;
    padding-bottom: 27px;
  }

</style>
