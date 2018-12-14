<template>
  <div class="admin_user">

    <label class="edit_input_label" for="old_password">Alt</label>
    <input  class="edit_input" type="password" name="old_password" v-model="old_pass" id="old_password">
    <label class="edit_input_label" for="new_password">Neu</label>
    <input  class="edit_input" type="password" name="new_password" v-model="new_pass" id="new_password">
    <label class="edit_input_label" for="confirm_new_password">Neu bestätigen</label>
    <input class="edit_input" type="password" name="confirm_new_password" v-model="confirm_new" id="confirm_new_password">

    <div class="submit" v-if="new_pass != '' && old_pass != '' && confirm_new != ''">
      <p v-if="new_pass != confirm_new" >passwords don't match</p>
      <button type="button" name="button" v-else @click="send.request=true">send</button>
    </div>

    <request :obj="send" v-model="send"/>
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
        old_pass: '',
        new_pass: '',
        confirm_new: '',
        send:{
          params: {
            uid : 1,
            hash : 12345,
            user_id : this.$route.params.id
          },
          url: 'http://new.backend/users/create_user_secret',
          data: {},
          request: false
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
