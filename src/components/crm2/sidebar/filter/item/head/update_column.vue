<template>
  <div
    class="update_column"
    v-if="isCustomField && activeOption">
    <div>
      <i
        v-if="!active.edit"
        class="material-icons edit"
        @click="active.edit = !active.edit; $emit('input', active.edit)">
        edit
      </i>
      <edit_elements
        class="edit_elements"
        v-click-outside="hide"
        v-if="active.edit"
        method="update"
        :cload="{}"
        url="https://newbackend.groe.me/user_crm/custom_table_field/update"
        :inputs="{
          name: {
            name: column.name,
            value: column.name,
            type: 'text'
          }
        }"
        :params="{
          id: column.fieldId
        }"
        :reload="{ action: 'reload', section: 'crm_prepare' }"/>
      <i
        class="material-icons delete"
        @click="active.delete = !active.delete">
        delete
      </i>
      <popup_white
        :active="active.delete"
        v-model="active.delete">
        <div class="wide">
          <h1>Spalte "{{column.name}}" wirklich löschen?</h1>
          <button
            class="filled"
            @click="delete_column">
            LÖSCHEN
          </button>
        </div>

      </popup_white>
    </div>
  </div>
</template>

<script>
  import Edit_elements from "../../../../../edit/elements";
  import Close_popup from "../../../../../close_button/popup";
  import Popup_white from "../../../../../popup/white";

  export default {
    name: "update_column",
    components: {Popup_white, Close_popup, Edit_elements},
    props:{
      column:{
        type: Object,
        required: true
      },
      activeOption: {
        type:Boolean,
        required: true
      }
    },
    data () {
      return {
        active:{
          edit: false,
          delete: false
        }
      }
    },
    computed:{
      isCustomField () {
        return 'fieldId' in this.column
      },
      fieldName () {
        let getter = this.column.id.indexOf('.')
        return this.column.id.substring(0, getter)
      }
    },
    methods:{
      hide() {
        this.active.edit = false
        this.active.delete = false
        this.$emit('input', false)
      },
      delete_column () {
        this.$$request.post.data('https://newbackend.groe.me/user_crm/custom_table_field/delete', {
          id: this.column.fieldId
        }).then((response) => this.reload_delete(response))
        this.active.delete = false
      },
      reload_delete (response) {
        if('update' in response){
          this.$store.commit('update_reload', { action: 'reload', section: 'crm_prepare' })
        }
      }
    }
  }
</script>

<style lang="scss">

  .update_column{
    display: inline-block;

    .edit, .delete{
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
      color:#bfc6cc;
      left: 6px;
      vertical-align: text-top;
    }

    .edit_elements{
      display: inline-block;
    }

    .edit_elements.update .input, .edit_elements.create input {
      text-align: left;
    }
  }

</style>
