<template>
  <div class="admin">
    <h6>VERWALTEN</h6>
    <div class="default_box">
      <ul>
        <li :class="{'active': active.menu === 'user'}" @click="active.menu = 'user'">Nutzer</li>
        <li :class="{'active': active.menu === 'contact'}" @click="active.menu = 'contact'">Kontakt</li>
        <li :class="{'active': active.menu === 'adress'}" @click="active.menu = 'adress'">Adresse</li>
        <li :class="{'active': active.menu === 'bank'}" @click="active.menu = 'bank'">Bankdaten</li>
        <li :class="{'active': active.menu === 'password'}" @click="active.menu = 'password'">Password ändern</li>
      </ul>
      <div class="content">
        <admin_user v-if="active.menu === 'user'"/>
        <admin_contact v-if="active.menu === 'contact'"/>
        <admin_adress v-if="active.menu === 'adress'"/>
        <admin_bank v-if="active.menu === 'bank'"/>
        <admin_password v-if="active.menu === 'password'"/>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import Admin_user from "./users/index";
  import Admin_contact from "./contact/index";
  import Admin_adress from "./adress/index";
  import Admin_bank from "./bank";
  import Admin_password from "./password";

  export default {
    name: "users_admin",
    components:{
      Admin_password,
      Admin_bank,
      Admin_adress,
      Admin_contact,
      Admin_user,
    },
    data(){
      return{
        active:{
          menu: 'user'
        },
        navigation:[
          {
            name: 'Nutzer',
            route: 'user'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .admin{
    margin-top: 42px;
  }

  .default_box{
    padding: 0 17px;
  }

  ul{
    width: 30%;
    padding-top: 27px;
    border-right: 1px solid #e6e6e6;
    float:left;

    li{
      margin-bottom: 27px;
      cursor: pointer;
      &.active{
        color: #3da0f5;
      }
    }
  }

  .content{
    width: 70%;
    padding: 27px 0 27px 17px;
    float:left
  }

</style>
