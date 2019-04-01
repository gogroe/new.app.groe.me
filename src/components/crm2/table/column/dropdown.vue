<template>
  <div>
    <i
      class="material-icons dropdown_arrow"
      @click="active.dropdown = !active.dropdown">
      arrow_drop_down
    </i>
    <div
      v-if="active.dropdown"
      class="crm_dropdown_list">
        Adminverwaltung
        Nutzerverwaltung
        Firmenverwaltung
    </div>
  </div>
</template>

<script>
  export default {
    name: "crm_list",
    data() {
      return {
        active: {
          dropdown: false
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

  .crm_dropdown_list{
    z-index: 10;
    position: absolute;
    margin-top: 10px;
    width: 180px;
    padding: 10px;
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
  }

</style>
