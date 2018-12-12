<template>
  <div class="admin">
    <u_head/>
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
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import U_head from "../../../components/u_head/index";
  import Edit from "../../../components/inputs/edit";
  import Admin_user from "./user";

  export default {
    name: "users_admin",
    components:{
      Admin_user,
      Edit,
      U_head,
    },
    data(){
      return{
        active:{
          menu: 'user'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .default_box{
    padding: 0 17px;
  }

  ul{
    width: 30%;
    padding: 27px 0;
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
    padding: 17px 0 17px 17px;
    float:left
  }

  .clear{
    clear: both;
  }
</style>
