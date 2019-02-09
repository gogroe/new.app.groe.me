<template>
  <div>
    <div v-if="active_update === false">
      <add name="Steckbrief"
           :active="active.create"
           v-model="active.create"/>
      <create_section v-if="active.create"
                      class="create_user_description"
                      button_name="STECKBRIEF ERSTELLEN"
                      :create_inputs="create_user_description"
                      v-model="request_create_user_description"/>
    </div>
    <edit v-if="active_update === true"
          v-for="(input, key, i) in update_user_description.inputs"
          :key="i"
          :obj="fill_inputs_edit(key, update_user_description, request_get_user.data)"
          :reload="{action: 'reload', section: 'u_head'}"/>
  </div>
</template>

<script>
  import Custom_helper from "../../../../components/functions/custom_helper";
  import Load_request from "../../../../components/functions/load_request"
  import Add from "../../../../components/add/index";
  import Edit from "../../../../components/inputs/edit";
  import Create_section from "../../../../components/inputs/create";

  export default {
    name: "user_description",
    components: {Create_section, Edit, Add},
    props:{
      request_get_user:{
        required: true
      }
    },
    data(){
      return{
        active:{
          create: false
        },
        update_user_description:{
          url: 'https://newbackend.groe.me/users/update_user_description',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1
          },
          inputs:{
            description: {
              name: 'Steckbrief',
              type: 'textarea'
            },
          }
        },
        request_create_user_description:{},
        create_user_description: {
          url: 'https://newbackend.groe.me/users/create_user_description',
          input_class: 'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1,
          },
          inputs: {
            description: {
              name: 'Steckbrief',
              type: 'textarea',
              input: {
                value: null,
                event: null
              }
            }
          }
        }
      }
    },
    computed:{
      active_update(){
        return 'description' in this.request_get_user.data && this.request_get_user.data.description !== null
      },
      route_id(){
        return this.$route.params.id
      }
    },
    watch:{
      request_create_user_description: function (object) {
        if('create' in object){
          this.$emit('input', true)
        }
        this.create_update_reload(object, {action: 'reload', section: 'u_head'})
      },
      route_id: function(){
        this.set_inputs_user_id(this.update_user_description)
        this.set_inputs_user_id(this.create_user_description)
      }
    },
    mounted(){
      this.set_inputs_user_id(this.update_user_description)
      this.set_inputs_user_id(this.create_user_description)
    },
    mixins:[Custom_helper, Load_request]
  }
</script>

<style lang="scss" scoped>

  .create_user_description{
    padding-bottom: 27px;
  }

</style>
