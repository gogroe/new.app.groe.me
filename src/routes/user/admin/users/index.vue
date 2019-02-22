<template>
  <div class="user">
    <p class="section_name">NUTZER DETAILS</p>
    <upload_user_image :request_get_user="request_get_user"/>
    <user_description :request_get_user="request_get_user"/>
    <edit v-for="(input, key, i) in update_user.inputs"
          :key="key"
          :obj="fill_inputs_edit(key, update_user, request_get_user)"
          :reload="{action: 'reload', section:'users_admin'}"/>
    <edit v-for="(input, key, i) in update_user_gender.inputs"
          :key="key"
          :obj="fill_inputs_edit(key, update_user_gender, request_get_user)"
          :reload="{action: 'reload', section:'users_admin'}"/>
  </div>
</template>

<script>
  import Load_request from "../../../../components/functions/load_request"
  import Edit from "../../../../components/inputs/edit"
  import custom_helper from "../../../../components/functions/custom_helper";
  import Upload_user_image from "./image";
  import User_description from "./description";

  export default {
    name: "admin_user",
    components:{
      User_description,
      Upload_user_image,
      Edit,
    },
    props:{
      request_get_user:{
        required:true
      }
    },
    data(){
      return{
        update_user:{
          url: 'https://newbackend.groe.me/user_admin/user/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
          },
          inputs:{
            firstname: {
              name: 'Vorname',
              type: 'text'
            },
            lastname: {
              name: 'Nachname',
              type: 'text'
            },
          }
        },
        update_user_gender:{
          url: 'https://newbackend.groe.me/user_admin/gender/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: null,
          },
          inputs:{
            gender: {
              name: 'Geschlecht',
              type: 'select',
              select: 'gender'
            }
          }
        }
      }
    },
    mounted(){
      this.set_inputs_user_id(this.update_user_gender)
      this.set_inputs_user_id(this.update_user)
    },
    mixins:[custom_helper, Load_request],
  }
</script>

<style lang="scss" scoped>

</style>
