<template>
  <div
    class="filter_item"
    :class="{'active': active.item}"
    v-click-outside="hide"
    @mouseover="active.option = true"
    @mouseout="active.option = active.item ? true : false">
    <fitem_head
      :active="active"
      :field="column.active"
      :condition="condition"
      :asc="asc"
      :desc="desc"
      :column="column"
      :colInfo="colInfo"
      v-model="actionHead"/>
    <fitem_body
      :active="active"
      :condition="condition"
      :asc="asc"
      :desc="desc"
      :column="column"
      v-model="actionBody"/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Custom_checkbox from "../../../../checkbox/index";
  import Cinput from "../../../../input/index";
  import Fitem_head from "./head/index";
  import Fitem_body from "./body";

  export default {
    name: "filter_item",
    components: {Fitem_body, Fitem_head, Cinput, Custom_checkbox},
    props:{
      column:{
        type: Object,
        required: true,
      }
    },
    data () {
      return {
        actionHead: null,
        actionBody: null,
        active:{
          item: false,
          option: false,
        },
        
        //params
        asc: false,
        desc: false,
        condition: {
          value: null,
          event: null
        }
      }
    },
    computed: {
      colInfo() {
        if ('id' in this.column) {
          let getter = this.column.id.indexOf('.')
          return {
            table: this.column.id.substring(0, getter),
            field: this.column.id.substring(getter + 1)
          }
        }
      }
    },
    watch:{
      actionHead: function (object) {
        this[object.section] = object.action

        if(object.section === 'condition' || object.section === 'asc' || object.section === 'desc'){
          this.$emit('input', this.emit_params('remove_params'))
        }
      },
      actionBody: function (object) {
        this.asc = object.asc
        this.desc = object.desc
        this.condition = object.condition
        
        this.$emit('input', this.emit_params('add_params'))
      },
    },
    methods: {
      emit_params (method) {
        return {
          method: method,
          tableName: this.colInfo.table,
          fieldName: this.colInfo.field,
          fieldType: this.column.type,
          asc: this.asc,
          desc: this.desc,
          condition: this.condition.value
        }
      },
      hide() {
        this.active.item = false
        this.active.option = false
      },
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss">

  .filter_item{
    width: 100%;
    min-height: 62px;
    position: relative;
    border-radius: 5px;
    margin-bottom: 4px;

    &.active{
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.08);
    }

    &.active, &:hover{
      background: #f1f3f4;
    }

    i{
      &.up{
        transform: rotate(-90deg);
      }

      &.down{
        transform: rotate(90deg);
      }
    }
  }
</style>
