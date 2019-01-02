<template>
  <div class="adress">
    <add v-if="active.update === false"
         name="Adresse"
         :active="active.create"
         v-model="active.create"/>

    <edit v-if="active.update"
          v-for="(input, key, i) in update_user.inputs"
          :key="i"
          :obj="fill_fields(key, update_user, request_admin_user.data)"/>
    <request :obj="request_admin_user" v-model="request_admin_user"/>
  </div>
</template>

<script>
  import Request from "../../../components/functions/request"
  import Load_request from "../../../components/functions/load_request"
  import Edit from "../../../components/inputs/edit"
  import Fill_edit from '../../../components/inputs/fill_edit'
  import Add from "../../../components/add/index";

  export default {
    name: "adress",
    components:{
      Add,
      Edit,
      Request,
    },
    data(){
      return{
        active:{
          create: false,
          update: false
        },
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
            street: {
              name: 'Straße',
              type: 'text'
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number'
            },
            city: {
              name: 'Stadt',
              type: 'text'
            },
            country: {
              name: 'Land',
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
        this.set_user_id(this.request_admin_user)
        this.load_request_with_route_check('request_admin_user', 'user_admin_user', 'id')
      }
    },
    mounted(){
      this.set_user_id(this.request_admin_user)
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
