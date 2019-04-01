<template>
  <div class="user_crm">
    <crm url="https://newbackend.groe.me/user_crm/get_all"/>
  </div>
</template>

<script>
  import Crm from "../../components/crm2";

  export default {
    name: "user_crm",
    components: {Crm},
    data(){
      return {
        crms:[
          {
            name: 'Adminverwaltung',
            url: 'https://newbackend.groe.me/user_crm/get_all'
          },
          {
            name: 'Nutzerverwaltung',
            url: 'https://newbackend.groe.me/user_crm/get_all'
          },
          {
            name: 'Firmenverwaltung',
            url: 'https://newbackend.groe.me/user_crm/get_all'
          },
        ]
      }
    }
  }
</script>
