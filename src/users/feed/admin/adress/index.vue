<template>
  <div class="user_adress">
    <p class="section_name">NUTZER ADRESSE</p>
    <user_adress_shipping/>
  </div>
</template>

<script>
  import User_adress_shipping from "./shipping";

  export default {
    name: "user_adress",
    components: {User_adress_shipping},
  }
</script>
