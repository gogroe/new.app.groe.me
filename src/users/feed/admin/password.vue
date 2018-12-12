<template>
  <div class="admin_user">
    <edit :obj="inputs.name"/>
    <edit :obj="inputs.firstname"/>
    <edit :obj="inputs.lastname"/>
    <edit :obj="inputs.gender"/>
    <request :obj="request_admin" v-model="request_admin"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request";
  import Edit from "../../../components/inputs/edit";

  export default {
    name: "admin_password",
    components:{
      Edit,
      Request,
    },
    data(){
      return{
        request_admin: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/users/get_user',
          data: {},
          request: false
        },
        users:{
          url: 'https://newbackend.groe.me/users/update_user',
          required_params: {
            user_id: this.$route.params.id,
            uid: 1
          },
          translation:{
            lastname: {
              name: 'Nachname',
              type: 'text'
            },
            gender: {
              name: 'Geschlecht',
              type: 'text'
            },
          },
          inputs_edit:{}
        },
        inputs:{
          name:{
            url: 'https://newbackend.groe.me/users/update_user',
            label: 'Benutzer',
            name: 'name',
            value: '',
            select:'',
            placeholder: 'Benutzer',
            type: 'text',
            input_class:'edit_input',
            label_class: 'edit_input_label',
            required_params: {
              user_id: this.$route.params.id,
              uid: 1
            }
          },
          firstname:{
            url: 'https://newbackend.groe.me/users/update_user',
            label: 'Vorname',
            name: 'firstname',
            value: '',
            select:'',
            placeholder: 'Vorname',
            type: 'text',
            input_class:'edit_input',
            label_class: 'edit_input_label',
            required_params: {
              user_id: this.$route.params.id,
              uid: 1
            }
          },
          lastname:{
            url: 'https://newbackend.groe.me/users/update_user',
            label: 'Nachname',
            name: 'lastname',
            value: '',
            select:'',
            placeholder: 'Nachname',
            type: 'text',
            input_class:'edit_input',
            label_class: 'edit_input_label',
            required_params: {
              user_id: this.$route.params.id,
              uid: 1
            }
          },
          gender:{
            url: 'https://newbackend.groe.me/users/update_user',
            label: 'Geschlecht',
            name: 'gender',
            value: '',
            select:'',
            placeholder: 'Geschlecht',
            type: 'text',
            input_class:'edit_input',
            label_class: 'edit_input_label',
            required_params: {
              user_id: this.$route.params.id,
              uid: 1
            }
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload',
        'user_admin'
      ]),
      request_admin_data(){
        return this.request_admin.data
      },
      route_id(){
        return this.$route.params.id
      }
    },

    watch:{
      reload: function (boolean){
        if(boolean){
          this.request_admin.request = true
          this.$store.commit('update_reload', false)
        }
      },
      route_id: function(){
        this.get_user_profile()
      },
      request_admin_data: function(object) {
        this.set_inputs()

        //check if saved in store
        //saved delete this with id
        this.$store.commit('update_user_admin', object)
      }
    },
    mounted(){
      this.get_user_profile()
    },
    methods:{
      set_inputs(){ //populate fields
        for(let key in this.request_admin.data){
          if(key in this.inputs){
            this.inputs[key]['value'] = this.request_admin.data[key]
            this.inputs[key]['name'] = key
          }
        }
      },
      get_user_profile(){
        this.request_admin.params.user_id = this.$route.params.id

        for(let up_key in this.user_admin){
          if( this.user_admin[up_key].id === this.$route.params.id ){
            this.request_admin.data = this.user_admin[up_key]
            return
          }
        }

        this.request_admin.request = true
      },
      //todo build a mehtod do avoid double functions
      load_request(if_true = null, if_false = null){
        for(let up_key in this.user_admin){
          if( this.user_admin[up_key].id === this.$route.params.id ){
            return if_true
          }
        }
        return if_false
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
