<template>
  <div class="user">
    <p class="section_name">NUTZER DETAILS</p>
    <edit v-for="(input, key, i) in update_user.inputs"
          :key="i"
          :obj="fill_inputs_edit(key, update_user, request_get_user.data)"
          :reload="{action: 'reload', section:'users_admin'}"/>
    <request :obj="request_get_user" v-model="request_get_user"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request"
  import Load_request from "../../../components/functions/load_request"
  import Edit from "../../../components/inputs/edit"
  import custom_helper from "../../../components/functions/custom_helper";

  export default {
    name: "admin_user",
    components:{
      Edit,
      Request,
    },
    data(){
      return{
        request_get_user: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/users/get_user',
          data: {},
          request: false
        },
        update_user:{
          url: 'https://newbackend.groe.me/users/update_user',
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1
          },
          inputs:{
            name: {
              name: 'Benutzer',
              type: 'text'
            },
            firstname: {
              name: 'Vorname',
              type: 'text'
            },
            lastname: {
              name: 'Nachname',
              type: 'text'
            },
            gender: {
              name: 'Geschlecht',
              type: 'select',
              select: 'gender',
            }
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      route_id(){
        return this.$route.params.id
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_get_user)
        this.request_get_user.request = true
      },
      reload:{
        handler: function (object) {
          if(object.action === 'reload' && object.section === 'users_admin'){
            this.request_get_user.request = true
          }
        }, deep:true
      }
    },
    mounted(){
      this.set_user_id(this.request_get_user)
      this.request_get_user.request = true
    },
    mixins:[custom_helper, Load_request]
  }
</script>

<style lang="scss" scoped>

</style>
