<template>
  <div class="create_update" :class="name">
    <div v-if="active.update">
      <edit v-for="(input, key, i) in update_inputs.inputs"
            :key="i"
            :reload="reload"
            :obj="fill_inputs_edit(key, update_inputs, request_get_data)"/>
    </div>
    <add v-if="active.update === false"
         :create="true"
         :name="name.charAt(0).toUpperCase() + name.slice(1)"
         :active="active.create"
         v-model="active.create"
         class="add"/>
    <div v-if="active.create">
      <create_section :create_inputs="create_inputs"
                      :button_name="name.toUpperCase() + ' ERSTELLEN'"
                      v-model="request_create_inputs"/>
    </div>
  </div>
</template>

<script>
  import Load_request from "../functions/load_request"
  import Edit from "./edit"
  import Custom_helper from '../functions/custom_helper'
  import Add from "../add/index";
  import Create_section from "./create";

  export default {
    name: "create_update",
    components:{
      Create_section,
      Add,
      Edit,
    },
    props:{
      request_get_data:{
        required: true
      },
      create_inputs:{
        required: true
      },
      update_inputs:{
        required: true
      },
      reload:{
        required: true
      },
      name:{
        required: false
      }
    },
    data(){
      return{
        active:{
          create: false,
          update: false
        },
        request_create_inputs:{},
      }
    },
    watch:{
      request_get_data(){
        this.set_active_update()
      },
      request_create_inputs(object){
        this.create_update_reload(object, this.reload)
      }
    },
    mounted(){
      this.set_active_update()
    },
    methods:{
      set_active_update(){
        if(this.object_length(this.request_get_data) !== 0){
          this.active.update = true
          this.active.create = false
        }
      }
    },
    mixins:[Custom_helper, Load_request]
  }
</script>

<style lang="scss" scoped>
  .add{
    margin-bottom: 17px;
  }
</style>
