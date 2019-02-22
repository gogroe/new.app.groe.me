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
          :obj="fill_inputs_edit(key, update_user_description, request_get_user)"
          :reload="{action: 'reload', section: 'users_admin'}"/>
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
          url: 'https://newbackend.groe.me/user_admin/description/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id
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
          url: 'https://newbackend.groe.me/user_admin/description/create',
          input_class: 'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
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
        return 'description' in this.request_get_user && this.request_get_user.description !== null
      },
      route_id(){
        return this.$route.params.id
      }
    },
    watch:{
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
