<template>
  <div class="create_item">
    <Edit_elements
      v-if="active.edit_elements"
      method="update"
      :url="createStatusItem.url"
      :inputs="createStatusItem.inputs"
      :cload="{}"
      :params="createStatusItem.params"
      :reload="createStatusItem.reload"/>
  </div>
</template>

<script>
  export default {
    name: "create_status_item",
    components: {
      Edit_elements: () => import('../../edit/elements')
    },
    props:{
      options:{
        type: Array,
        required: true,
        default: function () { return [] }
      },
      clist:{
        type: String,
        // required: true,
        default: null
      },
      type:{
        type: String,
        // required: true,
        default: null
      }
    },
    data() {
      return {
        active:{
          edit_elements: false
        },
        createStatusItem: {
          url: 'https://newbackend.groe.me/list/create',
          inputs:{
            name: {
              type: 'text',
              name: 'Neu',
              value: null,
              placeholder: 'Neu'
            }
          },
          params: {
            value: null,
            list_group: null,
            relation: null
          },
          reload: {section: 'admin_edit', action: null}
        }
      }
    },
    watch:{
      options: function (array) {
        this.set_data(array)
      }
    },
    mounted () {
      this.set_data(this.options)
    },
    methods: {
      set_data (array) {
        this.active.edit_elements = false
        if(array.length > 0){
          this.set_value()
        }
        else {
          this.createStatusItem.params.value = 0
        }
        this.createStatusItem.reload.action = this.clist
        this.createStatusItem.params.list_group = this.clist
        this.active.edit_elements = true
      },
      set_value () {
        let value = 0

        for(let key in this.options){
          if(this.options[key].value >= value){
            value = this.options[key].value
          }
        }

        this.createStatusItem.params.value = parseInt(value, 10) + 1
      },
    }
  }
</script>

<style lang="scss">

  .create_item{
    cursor: pointer;
    margin: 5px;
    border: 2px dashed #f1f3f4;
    background: transparent;

    .input_label{
      display: none;
    }

    input{
      cursor: pointer;
      width: 149px;
      background: transparent;

      &:hover, &:focus, &:active{
        outline:none;
        background: transparent;
      }
    }
  }

</style>
