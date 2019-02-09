<template>
  <div class="default_popup_background">
    <div class="inner_popup">
      <h1>Passwort</h1>
      <verification/>
    </div>
  </div>
</template>

<script>
  import Verification from "../components/authentication/verification";

  export default {
    name: "main_verification",
    components: {Verification},
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
