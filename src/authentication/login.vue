<template>
  <div class="default_popup_background">
    <div class="inner_popup">
      <h1>Anmeldung</h1>
      <login/>
    </div>
  </div>
</template>

<script>
  import Login from "../components/authentication/login";

  export default {
    name: "main_login",
    components: {Login},
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
