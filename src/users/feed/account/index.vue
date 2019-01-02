<template>
  <div class="accounts">
    <add name="Transaktion"
         :active="active.create"
         v-model="active.create"
         class="add_feed"/>
    <h6>TRANSAKTIONEN</h6>
    <ul class="default_box account_menu">
      <li @click="active.menu = i"
          :class="{'active': active.menu === i}"
          v-for="(item, i) in menu_items"
          :key="i">{{item.name}}
      </li>
    </ul>
    <all_accounts v-if="active.menu === 0"/>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import All_accounts from "./all_accounts";
  import Add from "../../../components/add/index";

  export default {
    name: "accounts",
    components:{
      Add,
      All_accounts,
    },
    data(){
      return {
        active:{
          menu: 0,
          create: false
        },
        menu_items:[
          { name: 'ALLE' },
          { name: 'EINGANG' },
          { name: 'AUSGANG' },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

  .u_head{
    margin-bottom: 17px;
  }

  ul{
    position: relative;
    width: 100%;
    text-align: center;
    padding: 0;
    height: 64px;


    li{
      display: inline-block;
      cursor: pointer;
      padding: 22px 0 18px 0;
      margin: 0 20px;
      font-size: 18px;
      line-height: 18px;
      color: #ddd;

      &.active{
        color: #ff3434;
        border-bottom: 4px solid #ff3434;
      }
    }
  }

</style>
