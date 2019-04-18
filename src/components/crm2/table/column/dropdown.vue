<template>
  <div class="crm_dropdown" v-click-outside="hide">
    <i
      class="material-icons dropdown_arrow"
      @click="active.dropdown = !active.dropdown">
      arrow_drop_down
    </i>
    <ul
      v-if="active.dropdown"
      class="crm_dropdown_list">
      <li :class="{'active': active.list === 'admin'}">
        <h3 @click="active.list = 'admin'">Adminverwaltung</h3>
        <span v-if="active.list === 'admin'">
          <a @click="$router.push({name: 'crm_admin_supervisor'}); active.dropdown = false">Supervisor</a>
          <a @click="$router.push({name: 'crm_admin_manager'}); active.dropdown = false">Manager</a>
          <a class="last" @click="$router.push({name: 'crm_admin_editor'}); active.dropdown = false">Editor</a>
        </span>
      </li>
      <li :class="{'active': active.list === 'user'}">
        <h3 @click="active.list = 'user'">Nutzerverwaltung</h3>
        <span v-if="active.list === 'user'">
          <a @click="$router.push({name: 'crm_user_lead'}); active.dropdown = false">Lead</a>
          <a @click="$router.push({name: 'crm_user_customer'}); active.dropdown = false">Kunde</a>
          <a @click="$router.push({name: 'crm_user_member'}); active.dropdown = false">Member</a>
          <a @click="$router.push({name: 'crm_user_leader'}); active.dropdown = false">Teamleiter</a>
          <a @click="$router.push({name: 'crm_user_stuff'}); active.dropdown = false">Leiter</a>
        </span>
      </li>
      <li
        class="last"
        :class="{'active': active.list === 'company'}">
        <h3 @click="active.list = 'company'">Firmenverwaltung</h3>
          <span v-if="active.list === 'company'">
            <a @click="$router.push({name: 'crm_company_lead'}); active.dropdown = false">Lead</a>
            <a @click="$router.push({name: 'crm_company_customer'}); active.dropdown = false">Kunde</a>
            <a @click="$router.push({name: 'crm_company_partner'}); active.dropdown = false">Member</a>
          </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'

  export default {
    name: "crm_list",
    data() {
      return {
        active: {
          dropdown: false,
          list: null
        }
      }
    },
    methods:{
      hide() {
        this.active.dropdown = false
        this.active.list = null
      },
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>

  .crm_dropdown{
    .dropdown_arrow{
      margin-left: 16px;
    }

    .crm_dropdown_list{
      z-index: 10;
      position: absolute;
      margin-top: 10px;
      width: 180px;
      padding: 10px 0;
      background: #fff;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.08);
      border: solid 1px #f1f3f4;

      &:after,
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: calc(50% - 10px);
        width: 0;
        height: 0;
        border-style: solid;
      }

      &:after {
        top: -18px;
        border-color:  transparent transparent #fff transparent ;
        border-width: 10px;
      }

      &:before {
        top: -20px;
        border-color: transparent  transparent #f1f3f4 transparent  ;
        border-width: 10px;
      }

      li{
        display: inline-block;
        width: 100%;
        padding: 16px 0;
        text-align: center;
        color: #272d33;
        border-bottom: 1px solid transparent;

        &.active{
          border-bottom: 1px solid #f1f3f4;

          h3{
            color: #edad00;
            margin-bottom: 16px;
          }
        }

        &.last{
          border-bottom: none;
        }

        h3{
          font-weight: 400;
          cursor: pointer;
          color: #95a4b4;
        }

        a{
          cursor: pointer;
          width: 100%;
          display: block;
          padding: 10px 10px;
          /*border-bottom: 1px solid #f1f3f4;*/

          &.last{
            border-bottom: none;
          }

          &:hover{
            background: #f1f3f4;
            color: #1a73e8;
          }
        }
      }
    }
  }


</style>
