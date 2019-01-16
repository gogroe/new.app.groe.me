<template>
  <div class="user_contact">
    <p class="section_name">NUTZER KONTAKT</p>
    <user_contact_phone/>
    <user_contact_email/>
    <user_contact_skype/>
    <user_contact_discord/>
    <user_contact_facebook/>
  </div>
</template>

<script>


  import User_contact_phone from "./phone";
  import User_contact_email from "./email";
  import User_contact_skype from "./skype";
  import User_contact_discord from "./discord";
  import User_contact_facebook from "./facebook";
  export default {
    name: "user_contact",
    components: {User_contact_facebook, User_contact_discord, User_contact_skype, User_contact_email, User_contact_phone},
  }
</script>
