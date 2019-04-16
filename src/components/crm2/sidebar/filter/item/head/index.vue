<template>
  <div class="item_head">
    <custom_checkbox
      class="c_checkbox"
      :active="field"
      v-model="xField"
      size="20"/>
    <div class="inliner">
      <i
        class="material-icons dropdown_arrow"
        v-if="active.option"
        @click="$emit('input', {action: {item: !active.item, option: active.option}, section: 'active'})">
        arrow_drop_down
      </i>
      <span
        v-if="editCustomField === false">
         {{column.name}}
      </span>
      <update_column
        v-if="$$permission.is_perm('admin_write')"
        :column="column"
        :active-option="active.option"
        v-model="editCustomField"/>
      <span
        class="selection"
        v-if="asc && editCustomField === false">
        <i class="material-icons up">arrow_right_alt</i>
        <i
          class="material-icons close"
          @click="$emit('input', {action: false, section: 'asc'})">
          close
        </i>
        </span>
      <span
        class="selection"
        v-if="desc && editCustomField === false">
        <i class="material-icons down">arrow_right_alt</i>
        <i
          class="material-icons close"
          @click="$emit('input', {action: false, section: 'desc'})">
          close
        </i>
        </span>
      <span
        v-if="condition.value !== null && editCustomField === false"
        class="selection condition_value">
        {{sValue(condition.value)}}
        <i
          class="material-icons close"
          @click="$emit('input', {action: {event:null, value:null}, section: 'condition'})">
          close
        </i>
      </span>
    </div>
    <i class="material-icons drag">drag_indicator</i>
  </div>
</template>

<script>
  import Custom_checkbox from "../../../../../checkbox/index";
  import Edit_elements from "../../../../../edit/elements";
  import Update_column from "./update_column";

  export default {
    name: "fitem_head",
    components: {Update_column, Edit_elements, Custom_checkbox},
    props:{
      asc:{
        required: true,
      },
      desc:{
        required: true,
      },
      condition:{
        required: true
      },
      field:{
        required: true
      },
      active:{
        type: Object,
        required: true
      },
      column:{
        type: Object,
        required: true
      }
    },
    data () {
      return {
        xField: null,
        editCustomField: false,
        cValue: null
      }
    },
    methods:{
      //todo this
      sValue (svalue) {
        if(this.column.type === 'select' || this.column.type === 'label'){
          this.get_list_item()
          return this.$$translation(this.cValue)
        }
        else {
          this.cValue = this.$$translation(svalue)
        }
      },
      get_list_item(){
        this.$$list.item( this.column.list, this.condition.value )
          .then((result) =>  this.cValue = result)
      }
    },
    watch:{
      xField: function (boolean) {
        this.$store.commit('update_reload', {section: 'crm_state_column' ,action: {id: this.column.id, state: boolean}})
      }
    },
  }
</script>

<style lang="scss" scoped>

  .item_head{
    padding: 20.5px 16px;

    .c_checkbox{
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }

    .inliner{
      display: inline-block;
      width: calc(100% - 24px - 44px);

      .dropdown_arrow{
        font-size: 20px;
        cursor: pointer;
        background: #fff;
        margin-right: 6px;

        &:hover{
          background: #e6e8e9;
        }
      }

      .selection{
        cursor: pointer;
        display: inline-block;
        color: #1a73e8;
        background: #f1f3f4;
        border-radius: 5px;
        vertical-align: text-top;

        i{
          font-size: 20px;
          vertical-align: text-bottom;
        }

        &:hover{
          background: #eceeef;
        }

        &.condition_value{
          padding: 2px 6px;
        }

        .close{
          font-weight: 700;
          font-size: 14px;
          vertical-align: middle;
          color: #bfc6cc;
        }
      }
    }

    .drag{
      vertical-align: bottom;
      cursor: pointer;
      display: inline-block;
      transform: rotate(90deg);
      color: #bfc6cc;
    ;
    }
  }

</style>
