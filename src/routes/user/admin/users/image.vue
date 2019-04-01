<template>
  <div class="image">
    <div v-if="active_image" class="user_image_wrapper">
      <user_visual class="user_image"
                   :name="request_get_user.firstname + ' ' + request_get_user.lastname"
                   :path="request_get_user.image" size="64"/>
      <p class="options">
        <span @click="active.edit_upload = true">bearbeiten</span> |
        <span @click="request_delete_user_image.request = true">entfernen</span>
      </p>
    </div>
    <div class="container"
         @click="active.upload = true">
      <p class="label">Foto</p>
      <p class="message">Mit einem Foto können Sie Ihr Konto personalisieren	</p>
        <user_visual class="user_image"
                     :name="request_get_user.firstname + ' ' + request_get_user.lastname"
                     :path="request_get_user.image" size="41"/>
    </div>

      <div class="inner_popup">
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
        <div class="close_popup" @click="active.edit_upload = false; active.upload = false"><i class="material-icons">close</i> schließen</div>
      </div>
    <request :obj="request_delete_user_image" v-model="request_delete_user_image"/>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Load_request from "../../../../components/functions/load_request"
  import custom_helper from "../../../../components/functions/custom_helper";
  import User_visual from "../../../../components/user_visual/index";
  import Upload from "../../../../components/upload/index";
  import Add from "../../../../components/add/index";
  import Request from "../../../../components/functions/request";

  export default {
    name: "upload_user_image",
    components: {Request, Add, Upload, User_visual},
    props:{
      request_get_user:{
        required:true
      }
    },
    data() {
      return {
        active: {
          upload: false,
          edit_upload: false
        },
        upload_user_image:{
          url: 'https://newbackend.groe.me/user_admin/image/create',
          required_params:{
            user_id: null,
            file_type: 'user_image'
          },
          data: []
        },
        request_delete_user_image:{
          params: {
            user_id: null,
          },
          url: 'https://newbackend.groe.me/user_admin/image/delete',
          data: {},
          request: false
        }
      }
    },
    computed:{
      active_image(){
        return 'image' in this.request_get_user && this.request_get_user.image !== null
      },
      upload_user_image_data(){
        return this.upload_user_image.data
      },
      request_delete_user_image_data(){
        return this.request_delete_user_image.data
      }
    },
    watch:{
      active: {
         handler(obj){
           let app = document.getElementById('app')
           let popup = document.getElementsByClassName('inner_popup')[0]
           if(obj.upload || obj.edit_upload){
             let div = document.createElement("div")
             div.className = "unblured"
             document.body.insertBefore(div, app);
             div.innerHTML = popup.innerHTML
             app.className = 'blured'
             app.addEventListener("click", this.hide);
             document.getElementsByClassName('close_popup')[0].addEventListener("click", this.hide);
           }
           else if(document.getElementsByClassName('unblured').length !== 0){
             document.getElementsByClassName('unblured')[0].parentNode.removeChild(document.getElementsByClassName('unblured')[0])
             app.className = ''
             app.removeEventListener("click", this.hide);
           }
         },deep: true
      },
      upload_user_image_data: function(object){
        if('update' in object){
          this.active.edit_upload = false
          this.active.upload = false
          this.$store.commit('update_reload', {action: 'reload', section: 'users_admin'})
        }
      },
      request_delete_user_image_data: function(object){
        if('update' in object){
          this.active.edit_upload = false
          this.active.upload = false
          this.$store.commit('update_reload', {action: 'reload', section: 'users_admin'})
        }
      },
      route_id: function(){
        this.set_user_id(this.request_delete_user_image)
      }
    },
    mounted(){
      this.set_user_id(this.request_delete_user_image)
      this.set_inputs_user_id(this.upload_user_image)
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

  .image{
    padding-left: 17px;
  }

  .inner_popup{
    display: none;
  }

  .image_info{
    margin-bottom: 27px;
  }

  .close_popup{
    position: fixed;
    right: 17px;
    top: 17px;
    cursor: pointer;
    color: #bbbbbb;
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

  .container{
    border-bottom: 1px solid #dadada;
    color: #838688;
    line-height: 41px;
    width: 100%;
    display: inline-block;
    padding: 12.5px 17px 12.5px 0px;

    .label{
      float: left;
      width: 100px;
      margin-right: 17px;
    }

    .message{
      float: left;
      padding: 0 20px 0 5px;
    }

    .user_image{
      float: right;
      margin-right: 17px;
    }

    &:hover{
      cursor: pointer;
      background-color: #f8f8f8;
    }
  }

</style>
