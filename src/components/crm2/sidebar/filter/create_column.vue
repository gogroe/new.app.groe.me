<template>
  <div
    v-click-outside="hide"
    class="create_column"
    :class="{'active': active.create}">
    <i
      class="material-icons add_plus"
      @click="active.create = !active.create; deactivate_create">
      add
    </i>
    <span
      v-if="!active.create"
      @click="active.create = true">
      Spalte
    </span>
    <cinput
      class="data_type"
      v-if="active.create"
      :type="dataType.type"
      :cvalue="dataType.value"
      :clist="dataType.list"
      :citems="dataType.items"
      :name="dataType.name"
      :placeholder="dataType.name"
      v-model="dataType.value"/>
    <cinput
      class="data_type"
      v-if="active.dependent"
      :type="dependent.type"
      :cvalue="dependent.value"
      :clist="dependent.list"
      :name="dependent.name"
      :placeholder="dependent.name"
      v-model="dependent.value"/>
    <edit_elements
      class="edit_elements"
      v-if="active.create && active.fieldName"
      :inputs="createTableField.inputs"
      :url="createTableField.url"
      method="create"
      :params="createTableField.params"
      :reload="{ action: 'reload', section: 'crm_created_field' }"/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import { mapGetters } from 'vuex'
  import Edit_elements from "../../../edit/elements";
  import Cinput from "../../../input/index";

  export default {
    name: "create_column",
    components: {Cinput, Edit_elements},
    props:{
      table:{
        type: String,
        requried: false
      },
      crmType:{
        type: String,
        required: true,
      },
    },
    data () {
      return {
        active: {
          create: false,
          dependent: false,
          fieldName: false
        },
        dataType:{
          name: 'Datentyp',
          type: 'select',
          value: null,
          list: 'field_types',
          items:[
            {
              name: 'Text',
              value: 'text'
            },
            {
              name: 'Datum',
              value: 'date'
            },
            {
              name: 'Label',
              value: 'status'
            },
            // {
            //   name: 'Label Indicator',
            //   value: 'status_indicator'
            // },
            // {
            //   name: 'Label Abhängikeit',
            //   value: 'status_dependent'
            // },
          ]
        },
        dependent:{
          name: 'Abhängiges Label',
          type: 'select',
          value: null,
          list: 'status_dependencys'
        },
        createTableField:{
          url: 'https://newbackend.groe.me/user_crm/custom_table_field/create',
          params: {
            table: 'users',
            type: null,
            dependent: null,
            crm_type: null
          },
          inputs:{
            name: {
              name: 'Feldname',
              type: 'text',
              value: null
            }
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      dataType_value(){
        return this.dataType.value
      },
      dependent_value(){
        return this.dependent.value
      }
    },
    watch:{
      dataType_value: function (object) {
        this.active.dependent = false
        this.createTableField.params.dependent = null
        this.active.fieldName = false
        this.createTableField.params.type = null
        this.handle_dataTypes(object)
      },
      dependent_value: function (object) {
        this.active.fieldName = false
        if('value' in object){
          this.createTableField.params.dependent = object.value
          this.active.fieldName = true
        }
      },
      reload: function (object) {
        if(object.section === 'crm_created_field'){
          this.active.create = false
          this.$store.commit('update_reload', { action: 'reload', section: 'crm_prepare' })
        }
      }
    },
    mounted () {
      this.createTableField.params.crm_type = this.crmType
      //this.createTableField.params.table = this.table
    },
    methods:{
      deactivate_create () {
        this.active.dependent = false
        this.active.fieldName = false
      },
      hide() {
        this.active.create = false
        this.deactivate_create()
      },
      handle_dataTypes (object) {
        if('value' in object){
          this.createTableField.params.type = object.value

          switch (object.value) {
            case 'status_dependent':
              this.active.dependent = true
              break
            default:
              this.active.fieldName = true
              break
          }
        }
      }
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss">

  .create_column{
    min-height: 62px;
    width: calc(100% - 32px);
    margin: 10px 16px;
    padding: 16px;
    border: 2px dashed #f1f3f4;
    border-radius: 5px;
    color: #a5adb3;

    &.active{
      border: 1px solid #f1f3f4;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.08);

      i.add_plus{
        margin-bottom: 16px;
        transform: rotate(45deg);
      }
    }

    i.add_plus{
      margin-right: 6px;
    }

    .data_type{
      margin-bottom: 10px;
    }

    .edit_elements, .data_type{
      padding-left: 41px;
    }

    .edit_elements.create .input, .edit_elements.create input {
      text-align: left;
    }

    .v-select.searchable .dropdown-toggle {
      width:100%;
      border-radius: 4px;
      border: solid 1px transparent;
      background: #f8f8f8;
      padding: 0;

      input, .form-control{
        border-color: transparent;
        background: #f8f8f8;
        padding: 6px 16px 6px 16px;

        &:hover,&:active{
          border-color: transparent;
        }
      }

      &.open{
        background: #f8f8f8;
      }
    }

    input{
      text-align: left;
    }
  }


</style>
