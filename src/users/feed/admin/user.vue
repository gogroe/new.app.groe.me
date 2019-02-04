<template>
  <div class="user">
    <p class="section_name">NUTZER DETAILS</p>
    <div v-if="active_image"
         class="user_image_wrapper">
      <user_visual class="user_image"
                   :name="request_get_user.data.firstname + ' ' + request_get_user.data.lastname"
                   :path="request_get_user.data.image" size="64"/>
      <p class="options">
        <span @click="active.edit_upload = true">bearbeiten</span> | <span @click="request_delete_user_image.request = true">entfernen</span>
      </p>
    </div>
    <add v-if="active_image === false" :active="active.upload" name="Nutzerbild" v-model="active.upload"/>
    <div class="default_popup_background"
         v-if="active.upload || active.edit_upload">
      <div class="inner_popup"
           v-click-outside="hide">
        <p class="section_name">NUTZERBILD BEARBEITEN</p>
        <p class="image_info">
          Ihr Nutzerfoto im Format jpg oder png darf maximal 2 MB groß sein.
          Das beste Ergebnis erhatlen Sie mit einem zentrierten Motiv und
          qudratischen Maßen.
        </p>
        <upload class="upload"
                :request_create="upload_user_image"
                name="NUTZER BILD HOCHLADEN"
                :max_size="2000000"
                :types="['jpeg', 'jpg', 'png', 'pdf']"
                v-model="upload_user_image.data"/>
      </div>
      <div class="close_popup" @click="active.edit_upload = false; active.upload = false"><i class="material-icons">close</i> schließen</div>
    </div>
    <edit v-for="(input, key, i) in update_user.inputs"
          :key="i"
          :obj="fill_inputs_edit(key, update_user, request_get_user.data)"
          :reload="{action: 'reload', section:'users_admin'}"/>
    <request :obj="request_get_user" v-model="request_get_user"/>
    <request :obj="request_delete_user_image" v-model="request_delete_user_image"/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Request from "../../../components/functions/request"
  import Load_request from "../../../components/functions/load_request"
  import Edit from "../../../components/inputs/edit"
  import custom_helper from "../../../components/functions/custom_helper";
  import Upload from "../../../components/upload/index";
  import Add from "../../../components/add/index";
  import User_visual from "../../../components/user_visual/index";

  export default {
    name: "admin_user",
    components:{
      User_visual,
      Add,
      Upload,
      Edit,
      Request,
    },
    data(){
      return{
        active:{
          upload: false,
          edit_upload: false
        },
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
        },
        upload_user_image:{
          url: 'http://newbackend.groe.me/users/upload_user_image',
          required_params:{
            user_id: null,
            file_type: 'user_image'
          },
          data: []
        },
        request_delete_user_image:{
          params: {
            user_id: null,
            uid: 1
          },
          url: 'https://newbackend.groe.me/users/delete_user_image',
          data: {},
          request: false
        }
      }
    },
    computed:{
      active_image(){
        return 'image' in this.request_get_user.data && this.request_get_user.data.image !== null
      },
      route_id(){
        return this.$route.params.id
      },
      upload_user_image_data(){
        return this.upload_user_image.data
      },
      request_delete_user_image_data(){
        return this.request_delete_user_image.data
      }
    },
    watch:{
      upload_user_image_data: function(object){
        if('update' in object){
          this.$store.commit('update_reload', {action: 'reload', section: 'u_head'})
          this.request_get_user.request = true
        }
      },
      request_delete_user_image_data: function(object){
        if('update' in object){
          this.$store.commit('update_reload', {action: 'reload', section: 'u_head'})
          this.request_get_user.request = true
        }
      },
      route_id: function(){
        this.set_user_id(this.request_get_user)
        this.set_user_id(this.request_delete_user_image)
        this.request_get_user.request = true
      }
    },
    mounted(){
      this.set_user_id(this.request_get_user)
      this.set_user_id(this.request_delete_user_image)
      this.set_inputs_user_id(this.upload_user_image)
      this.request_get_user.request = true
    },
    methods:{
      hide(){
        this.active.edit_upload = false
        this.active.upload = false

      },
    },
    mixins:[custom_helper, Load_request],
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>

  .image_info{
    margin-bottom: 27px;
  }

  .close_popup{
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
    color: #fff;
    line-height: 17px;

    &:hover{
      color: #3da0f5;
    }

    i{
      margin-left: 17px;
      vertical-align: -7px;
      font-weight: 700;
    }
  }

  .user_image_wrapper{
    padding-bottom: 47px;

    .user_image{
      margin-left: calc(38% - 32px);
    }

    .options{
      cursor: pointer;
      margin-top: 10px;
      margin-left: calc(38% - 70px);
      color: #bbbbbb;

      span:hover{
        color: #3da0f5;
      }
    }
  }
</style>
