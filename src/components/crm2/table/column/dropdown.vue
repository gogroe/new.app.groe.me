<template>
  <div class="crm_dropdown" v-click-outside="hide">
    <i
      class="material-icons dropdown_arrow"
      @click="active.dropdown = !active.dropdown">
      arrow_drop_down
    </i>
    <div
      v-if="active.dropdown"
      class="crm_dropdown_list">
      <a @click="$router.push({name: 'crm_admin'}); active.dropdown = false">Adminverwaltung</a>
      <a @click="$router.push({name: 'crm_user'}); active.dropdown = false">Nutzerverwaltung</a>
      <a  @click="$router.push({name: 'crm_company'}); active.dropdown = false">Firmenverwaltung</a>
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'

  export default {
    name: "crm_list",
    data() {
      return {
        active: {
          dropdown: false
        }
      }
    },
    methods:{
      hide() {
        this.active.dropdown = false
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

      a{
        display: inline-block;
        width: 100%;
        padding: 17px;
        text-align: center;
        cursor: pointer;
        color: #272d33;

        &:hover{
          background: #f1f3f4;
          color: #1a73e8;
        }
      }
    }
  }


</style>
