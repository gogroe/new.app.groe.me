<template>
  <div
    class="dropdown_item"
    @click="$emit('input', option)">
    <Edit_elements
      v-if="active.edit_elements"
      :class="{'inactive': activeEdit === false}"
      v-click-outside="hide"
      :readonly="activeEdit === false"
      method="update"
      :url="updateStatusItem.url"
      :inputs="updateStatusItem.inputs"
      :cload="option"
      :params="updateStatusItem.params"
      :reload="updateStatusItem.reload"/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'

  export default {
    name: "dropdown_item",
    components: {
      Edit_elements: () => import('../../edit/elements')
    },
    props:{
      option:{
        type: Object,
        required: true,
        default: null
      },
      activeEdit:{
        type: Boolean,
        required: true,
      },
      clist:{
        type: String,
        required: true,
      },
    },
    data() {
      return {
        active:{
          edit_elements: false,
        },
        color: undefined,
        updateStatusItem: {
          url: 'https://newbackend.groe.me/list/update',
          inputs:{
            name: {
              type: 'text',
              name: '',
              value: null
            }
          },
          params: {
            id: 'get->id'
          },
          reload: {section: 'admin_edit', action: this.clist}
        }
      }
    },
    watch:{
      option: function (object) {
        this.set_data(object)
      }
    },
    mounted () {
      this.set_data(this.option)
    },
    methods: {
      set_data (object) {
        this.active.edit_elements = false
        if(typeof object === 'object'){
          this.updateStatusItem.inputs.name.name = object.name
          this.updateStatusItem.inputs.name.value = object.name
          this.color = object.color
          this.active.edit_elements = true
        }
      },
      hide() {
        this.active.dropdown = false
      },
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss">

  .dropdown_item{
    cursor: pointer;
    margin: 5px;
    background: #f1f3f4;

    .input_label{
      display: none;
    }

    input{
      cursor: pointer;
      width: 149px;
    }

    .inactive{
      input{
        width: 149px;
        font-weight: 500;
        text-align: center;
        color: #1a73e8;
        border: transparent;

        &:hover, &:focus, &:active{
          outline:none;
          background: transparent;
        }
      }
    }
  }

</style>
