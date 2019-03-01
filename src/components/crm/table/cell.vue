<template>
  <div class="table_cell"
       v-click-outside="hide">
    <div v-if="column.type === 'text' || column.type === 'select' || column.type === 'date'">
      <div v-if="active.create">
        <edit v-if="active.creating && column.indicator === false"
              class="edit"
              :obj="edit_obj" :reload="{action: 'reload', section:'users_crm'}"/>
        <edit v-if="active.creating && column.indicator === true"
              class="edit"
              :obj="edit_obj" :reload="{action: 'reload', section:'users_crm'}"/>
        <i class="material-icons add"
           v-if="active.creating === false && is_perm('create')" @click="active.creating = true">
          add
        </i>
      </div>
      <edit v-if="active.edit && active.create === false"
            class="edit"
            :obj="edit_obj" :reload="{action: 'reload', section:'users_crm'}"/>
      <div v-if="active.edit === false && active.create === false"
         @click="active.edit = !active.edit">
        <p v-if="column.type === 'select'">{{list_value}}</p>
        <p v-else-if="column.type === 'date'"><ddmmmyy :timestamp="cell.name" color="#333333"/> </p>
        <p v-else>{{cell.name}}</p>
      </div>
    </div>
    <div v-if="column.type === 'image'">
      <user_visual class="user_visual"
                   :path="cell.name.path"
                   :name="cell.name.name"
                   size="35"/>
    </div>
    <div v-if="column.type === 'link'" @click="$router.push({ path: set_path(cell.name) })">
        <i class="material-icons link">open_in_new</i>
    </div>
    <div v-if="column.type === 'select'">
      <list :list_name="column.select" v-model="list"/>
    </div>
    <request :obj="request_create" v-model="request_create"/>
  </div>
</template>

<script>
  import Permission from '../../../components/functions/permission'
  import Custom_heler from '../../../components/functions/custom_helper'
  import ClickOutside from 'vue-click-outside'
  import User_visual from "../../../components/user_visual/index";
  import Edit from "../../../components/inputs/edit";
  import Request from "../../../components/functions/request";
  import Inputs from "../../../components/inputs/index";
  import List from "../../../components/list/index";
  import Ddmmmyy from "../../date/ddmmmyy";

  export default {
    name: "table_cell",
    components: {Ddmmmyy, List, Inputs, Request, Edit, User_visual},
    props:{
      column:{
        required: true
      },
      cell:{
        required: true
      }
    },
    data(){
      return{
        active:{
          edit: false,
          create: false,
          creating: false
        },
        request_create:{
          params: {},
          url: '',
          data: {},
          request: false
        },
        edit_obj:{
          url: '',
          label: '',
          name: '',
          value:'',
          select:'',
          placeholder: '',
          type: '',
          input_class:'crm_input',
          label_class: 'crm_label',
          required_params: {},
          error_class: 'input_error'
        },
        list:[],
        list_value: null,
      }
    },
    mounted(){
      this.set_create()
      this.build_input_object()
    },
    watch:{
      list:{
        handler: function (array) {
         this.set_list_value()
        }, deep:true
      },
      cell:{
        handler:function () {
          this.set_create()
          this.build_input_object()
          if(this.column.type === 'select'){
            this.set_list_value()
          }
        }, deep: true
      }
    },
    methods:{
      set_path(path){
        if(typeof path === 'string'){
          let id = path.substr(path.indexOf(':'))
          id = id.substr(1, id.indexOf('/') - 1)

          if(id in this.cell){
            //console.log(path.replace(':'+id, this.cell[id]))
            return path.replace(':'+id, this.cell[id])
          }
        }
      },
      set_list_value(){
        for(let list_key in this.list){
          if('value' in this.list[list_key] && this.list[list_key].value === this.cell.name){
            this.list_value = this.list[list_key].name
          }
        }
        if(this.list_value === null){
          this.active.create = true
        }
      },
      set_create(){
        if(
          this.cell.name === '' ||
          this.cell.name === null
        ){
          this.active.create = true
        }
        else {
          this.active.create = false
        }
      },
      hide(){
        this.active.edit = false
        this.active.creating = false
      },
      build_input_object(type){
        if(this.object_length(this.column) > 0){
          let obj =  'edit_obj'
          this[obj].label = this.column.name
          this[obj].value = this.cell.name
          this[obj].select = 'select' in this.column
            ? this.column.select
            : null
          //this[obj].use_store = true
          this[obj].placeholder = this.column.name
          this[obj].type = this.column.type
          this[obj].name = this.column.id.substring(this.column.id.indexOf('.') + 1)

          if(this.active.create && this.column.indicator === false){
            this[obj].url = this.column.create_url
          }
          else{
            this[obj].url = this.column.edit_url
          }


          for(let required_params_key in this.column.required_params){
            this[obj].required_params[required_params_key] = this.column.required_params[required_params_key]
          }

          for(let cell_key in this.cell){
            if(cell_key !== 'name'){
              this[obj].required_params[cell_key] = this.cell[cell_key]
            }
          }
        }
      }
    },
    directives: {
      ClickOutside
    },
    mixins:[Custom_heler, Permission]
  }
</script>

<style lang="scss" scoped>
  .table_cell{
    cursor: pointer;
    min-width: 164px;
  }

  p{
    line-height: 13px;
    padding: 25.5px 47px 25.5px 17px;
  }

  i{
    font-weight: 700;
  }

  .link{
    padding: 18.5px 47px 18.5px 17px;
    font-size: 27px;
    color: #bbbbbb;

    &:hover{
      color: #3da0f5;
    }
  }

  .user_visual{
    padding: 14.5px 47px 14.5px 17px;
  }

  .add{
    color: #3da0f5;
    padding: 19px 47px 25.5px 17px;
  }


</style>
