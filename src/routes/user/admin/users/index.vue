<template>
  <div class="admin_user">
    <p class="section_name">
      Details<br/>
      <span>Einige Informationen sind möglicherweise für andere Personen sichtbar, die ebenfalls groe-Dienste verwenden.</span>
    </p>
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
        :readonly="$$permission.is_perm('admin_update') === false"
        :url="update_user.url"
        :inputs="update_user.inputs"
        :cload="cload"
        :reload="update_user.reload"
        :params="update_user.params"/>
      <edit_elements
        method="update"
        :readonly="$$permission.is_perm('admin_update') === false"
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
            user_id: null, //'get->id',
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
    computed:{
      gender_url(){
        return 'gender' in this.cload && this.cload.gender !== null
          ? 'https://newbackend.groe.me/user_admin/gender/create'
          : 'https://newbackend.groe.me/user_admin/gender/update'
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

<style lang="scss">

  .admin_user{
    .section_name span{
      font-size: 14px;
      font-weight: 400;
    }

    .wrapper {
      &.description{
        border-top: 1px solid #e6e6e6;
      }

      &.lastname{
        border-bottom: 1px solid #e6e6e6 !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }

      &.gender{
        border-bottom: none !important;
      }
    }

    .update{
      .wrapper {
        &.gender{
          border-bottom: none !important;
          border-bottom-left-radius: 10px !important;
          border-bottom-right-radius: 10px !important;
        }
      }
    }
  }

</style>
