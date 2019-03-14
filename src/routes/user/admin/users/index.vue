<template>
  <div class="user">
    <p class="section_name">NUTZER DETAILS</p>
    <upload_user_image :request_get_user="cload"/>
    <div class="section_wrapper">
      <edit_section
        :create="create_user_description"
        :update="update_user_description"
        :cload="cload"
        name="Steckbrief hinzufügen"
        button="HINZUFÜGEN"/>
      <edit_elements
        method="update"
        :url="update_user.url"
        :inputs="update_user.inputs"
        :cload="cload"
        :reload="update_user.reload"
        :params="update_user.params"/>
      <edit_elements
        method="update"
        :url="update_user_gender.url"
        :inputs="update_user_gender.inputs"
        :cload="cload"
        :reload="update_user_gender.reload"
        :params="update_user_gender.params"/>
    </div>
  </div>
</template>

<script>
  import Upload_user_image from "./image";
  import Edit_elements from "../../../../components/edit/elements";
  import loader from "../../../../components/functions/loader";
  import Edit_section from "../../../../components/edit/section";

  export default {
    name: "admin_user",
    components:{
      Edit_section,
      Edit_elements,
      Upload_user_image,
    },
    props:{
      cload:{
        required:true
      },
    },
    data(){
      return{
        update_user:{
          url: 'https://newbackend.groe.me/user_admin/user/update',
          reload: { action: 'reload', section: 'users_admin' },
          params: {
            user_id: null,
          },
          inputs:{
            firstname: {
              name: 'Vorname',
              type: 'text',
              value: null
            },
            lastname: {
              name: 'Nachname',
              type: 'text',
              value: null
            },
          }
        },
        update_user_gender:{
          url: 'https://newbackend.groe.me/user_admin/gender/update',
          reload: { action: 'reload', section: 'users_admin' },
          params: {
            user_id: null,
          },
          inputs:{
            gender: {
              name: 'Geschlecht',
              type: 'select',
              value: null,
              list: 'gender'
            }
          }
        },
        update_user_description:{
          url: 'https://newbackend.groe.me/user_admin/description/update',
          reload: { action: 'reload', section: 'users_admin' },
          params: {
            user_id: null
          },
          inputs:{
            description: {
              name: 'Steckbrief',
              type: 'textarea',
              value: null
            },
          }
        },
        create_user_description: {
          url: 'https://newbackend.groe.me/user_admin/description/create',
          reload: { action: 'reload', section: 'users_admin' },
          params: {
            user_id: null
          },
          inputs: {
            description: {
              name: 'Steckbrief',
              type: 'textarea',
              value: null
            }
          }
        }
      }
    },
    mounted(){
      this.set_user_id(this.update_user)
      this.set_user_id(this.update_user_gender)
      this.set_user_id(this.update_user_description)
      this.set_user_id(this.create_user_description)
    },
    mixins:[loader]
  }
</script>

<style lang="scss" scoped>

</style>
