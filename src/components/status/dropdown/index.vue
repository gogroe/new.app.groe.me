<template>
  <div
    class="status_dropdown"
    :class="status_dropdown_classes">
    <dropdown_item
      class="dropdown_item_outline"
      v-for="(option, i) in options"
      :key="i"
      :option="option"
      :activeEdit="active.edit"
      :clist="clist"
      v-model="xValue"/>
    <create_status_item
      class="dropdown_item_outline"
      v-if="active.edit && $$permission.is_perm('admin_write')"
      :clist="clist"
      :type="type"
      :dependent="dependent"
      :options="options"/>
    <div
      v-if="$$permission.is_perm('admin_write')"
      class="status_edit">
      <span
        v-if="active.edit === false"
        @click="active.edit = true">
        <i class="material-icons dropdown_arrow">
          edit
        </i>
        bearbeiten
      </span>
      <span
        v-else
        @click="active.edit = false">
        <i class="material-icons dropdown_arrow">
          close
        </i>
        schließen
      </span>
    </div>
  </div>
</template>

<script>
  import Dropdown_item from "./item";
  import Create_status_item from "./create";

  export default {
    name: "status_dropdown",
    components: {Create_status_item, Dropdown_item},
    props:{
      options:{
        type: Array,
        required: true
      },
      clist:{
        type: String,
        required: true,
      },
      type:{
        type: String,
        required: true,
      },
      dependent:{
        required: false,
        default: null
      },
    },
    data() {
      return {
        active:{
          edit: false
        },
        xValue: null
      }
    },
    computed:{
      status_dropdown_classes () {
        return [
          {'expand': this.options.length > 4},
          ]
      },
      activeEditButton () {
        if(this.type === 'status_dependent'){
          if(this.dependent !== null){
            return true
          }
        }
        else {
          return true
        }
      }
    },
    watch:{
      xValue: function () {
        this.$emit('input', this.xValue)
      }
    }
  }
</script>

<style lang="scss">

  .status_dropdown{
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

    .option_item{
      width: 100%;
      display: block;
      margin: 5px 0;
    }

    &.expand {
      width: 360px;
      margin-left: calc(-90px);

      .option_item{
        width: calc(50% - 10px);
        display: inline-block;
        margin: 5px;
      }
    }

    .status_edit{
      border-top: 1px solid #e6e6e6;
      margin: 5px 5px 0 5px;
      padding: 10px;
      text-align: center;

      span{
        cursor: pointer;
        color: #a5adb3
      }
    }

    .dropdown_item_outline{
      display: inline-block;
    }
  }

</style>
