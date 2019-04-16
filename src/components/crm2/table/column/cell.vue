<template>
  <div>
    <edit_elements
      :readonly="active.cell"
      v-click-outside="hide"
      method="update"
      :url="url"
      :inputs="inputs"
      :cload="row"
      :params="cParams"
      :reload="reload"/>
  </div>
</template>

<script>
  import Edit_elements from "../../../edit/elements";
  import ClickOutside from 'vue-click-outside'

  export default {
    name: "crm_cell",
    components: {Edit_elements},
    props:{
      row:{
        type: Object,
        required: true
      },
      create_url: {
        type: String,
        required: true
      },
      update_url: {
        type: String,
        required: true
      },
      params: {
        type: Object,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      list: {
        type: String,
        required: false,
        default: null
      },
    },
    data () {
      return {
        active:{
          cell: false
        },
        reload: { action: 'reload', section: 'crm_prepare' },
      }
    },
    computed:{
      url () {
        return this.row.value === null
          ? this.create_url
          : this.update_url
      },
      clist () {
        return this.list === null
          ? this.name
          : this.list
      },
      inputs () {
        let inputName = this.id.substring(this.id.indexOf('.') +1)
        return  {[ inputName]: {
          name: this.name,
          type: this.type,
          value: this.row.value,
          list: this.clist,
          placeholder: ''
        }}
      },
      cParams () {
        let params = {}
        for(let key in this.params){
          params[key] = this.params[key]
        }
        for(let key in this.row.params){
          params[key] = this.row.params[key]
        }
        return params
      }
    },
    methods:{
      hide(){
        this.active.cell = false
      },
    },
    directives: {
      ClickOutside
    }
  }
</script>
