<template>
  <div class="adress">
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
    name: "adress",
    components:{
      Edit,
      Request,
    },
    data(){
      return{
        show_history: false,
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
          input_class:'edit_input',
          label_class: 'edit_input_label',
          error_class: '',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1
          },
          inputs:{
            country: {
              name: 'Land',
              type: 'text'
            },
            city: {
              name: 'Stadt',
              type: 'text'
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number'
            },
            street: {
              name: 'Straße',
              type: 'text'
            },
            details: {
              name: 'zusätzliche Information',
              type: 'textarea'
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
        this.request_admin_user.params.user_id = this.$route.params.id
        this.load_request_with_route_check('request_admin_user', 'user_admin_user', 'id')
      }
    },
    mounted(){
      this.request_admin_user.params.user_id = this.$route.params.id
      this.load_request_with_route_check('request_admin_user', 'user_admin_user', 'id')
    },
    methods:{
      request_reload(boolean){
        if(boolean){
          this.request_admin_user.request = true
          this.$store.commit('update_reload', false)
        }
      }
    },
    mixins:[Fill_edit, Load_request]
  }
</script>

<style lang="scss" scoped>

</style>
