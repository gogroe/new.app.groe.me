<template>
    <div class="appuser_content">
      <div class="content">
        <p class="section_name">NUTZER VERWALTEN</p>
        <add :active="active.create"
             :create="true"
             class="add_create"
             name="Nutzer"
             v-model="active.create"/>
        <hr/>
        <edit v-for="(input, key, i) in update_user.inputs"
              :key="key"
              :obj="fill_inputs_edit(key, update_user, {})"
              :reload="{action: 'reload', section:'users_admin'}"/>
      </div>
    </div>
</template>

<script>
  import Custom_helper from '../../../components/functions/custom_helper'
  import Edit from "../../../components/inputs/edit";
  import Add from "../../../components/add/index";

  export default {
    name: "appuser_content",
    components: {Add, Edit},
    data(){
      return {
        active:{
          create: false
        },
        update_user:{
          url: 'https://newbackend.groe.me/user_admin/user/update',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
          },
          inputs:{
            role: {
              name: 'Rolle',
              type: 'select',
              select: 'user_role'
            },
            type: {
              name: 'Typ',
              type: 'select',
              select: 'user_role'
            },
          }
        },
      }
    },
    mixins:[Custom_helper]
  }
</script>

<style lang="scss" scoped>

  .appuser_content{
    position: relative;
    max-width: 600px;
    //width: 100%;
    margin: 0 auto;
    display: block;
  }

  hr{
    margin-bottom: 43px;
  }

  .content{
    position: relative;
    margin-top: 41px;
    height: 64px;

    .add_create{
      position: absolute;
      padding: 0;
      right: 0;
      top: 0
    }
  }

</style>
