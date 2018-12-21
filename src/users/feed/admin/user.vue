<template>
  <div class="user">
    <edit v-for="(input, key, i) in update_user.inputs"
          :key="i"
          :obj="fill_fields(key, update_user, request_admin_user.data)"/>
    <request :obj="request_admin_user" v-model="request_admin_user"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request"
  import Load_request from "../../../components/functions/load_request"
  import Edit from "../../../components/inputs/edit"
  import Fill_edit from '../../../components/inputs/fill_edit'

  export default {
    name: "admin_user",
    components:{
      Edit,
      Request,
    },
    data(){
      return{
        request_admin_user: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/users/get_user',
          data: {},
          request: false
        },
        update_user:{
          url: 'https://newbackend.groe.me/users/update_user',
          input_class:'edit_input_light',
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
              type: 'text'
            }
          }
        }
      }
    },
    computed:{
      request_admin_data(){
        return this.request_admin_user.data
      },
      route_id(){
        return this.$route.params.id
      }
    },

    watch:{
      request_admin_data: function(object){
        this.update_store('update_user_admin_user', 'user_admin_user', object, 'id')
      },
      route_id: function(){
        this.get_user_request(this.request_admin_user)
      }
    },
    mounted(){
      this.get_user_request(this.request_admin_user)
    },
    methods:{
      request_reload(boolean){
        if(boolean){
          this.request_admin_user.request = true
          this.$store.commit('update_reload', false)
        }
      },
      get_user_request(request_obj){
        request_obj.params.user_id = 'id' in this.$route.params
          ? this.$route.params.id
          : this.get_header.id

        this.load_request_with_route_check('request_admin_user', 'user_admin_user', 'id')
      }
    },
    mixins:[Fill_edit, Load_request]
  }
</script>

<style lang="scss" scoped>

</style>
