<template>
  <div class="admin_contact"> <!--change-->
    <edit v-for="(input, key, i) in update_user.inputs"
          :key="i"
          :obj="fill_fields(key, update_user, request_admin.data)"/>
    <request :obj="request_admin" v-model="request_admin"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Request from "../../../components/functions/request"
  import Edit from "../../../components/inputs/edit"
  import Fill_edit from '../../../components/inputs/fill_edit'

  export default {
    name: "admin_contact",
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
              type: 'text'
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
      // request_admin_data: function(object) {
      //   this.set_inputs()
      //
      //   //check if saved in store
      //   //saved delete this with id
      //   this.$store.commit('update_user_admin', object)
      // }
    },
    mounted(){
      this.get_user_profile()
    },
    methods:{
      // set_inputs(){ //populate fields
      //   for(let key in this.request_admin.data){
      //     if(key in this.inputs){
      //       this.inputs[key]['value'] = this.request_admin.data[key]
      //       this.inputs[key]['name'] = key
      //     }
      //   }
      // },
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
      // //todo build a mehtod do avoid double functions
      // load_request(if_true = null, if_false = null){
      //   for(let up_key in this.user_admin){
      //     if( this.user_admin[up_key].id === this.$route.params.id ){
      //       return if_true
      //     }
      //   }
      //   return if_false
      // }
    },
    mixins:[Fill_edit]
  }
</script>

<style lang="scss" scoped>

</style>
