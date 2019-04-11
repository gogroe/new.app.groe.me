<template>
  <div class="image">
    <div class="edit_elements">
      <div
        class="wrapper">
        <label
          @click="active.upload = true"
          class="input_label">
          Foto
        </label>
        <p
          v-if="has_image"
          class="options action">
          <span @click="active.upload = true">bearbeiten</span> |
          <span @click="delete_image">entfernen</span>
        </p>
        <p
          v-else
          class="action"
          @click="active.upload = true">
          Mit einem Foto können Sie Ihr Konto personalisieren.
        </p>
        <user_visual
          class="user_image"
          @click="active.upload = true"
          :name="request_get_user.firstname + ' ' + request_get_user.lastname"
          :path="request_get_user.image" size="41"/>
        <div class="clear"></div>
      </div>
    </div>
    <popup_white
      :active = "active.upload"
      v-model="active.upload">
      <div class="c_popup">
        <p class="section_name">Nutzerbild<br/><br/>
          <span>
            Ihr Nutzerfoto im Format jpg oder png darf maximal 2 MB groß sein.
            Das beste Ergebnis erhatlen Sie mit einem zentrierten Motiv und
            qudratischen Maßen.
          </span>
        </p>
        <upload
          class="upload"
          name="NUTZER BILD HOCHLADEN"
          :reload="{section: 'user_admin_image', action: null}"
          :request_create="upload_user_image"
          :max_size="2000000"
          :types="['jpeg', 'jpg', 'png', 'pdf']"/>
      </div>
    </popup_white>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Upload from "../../../../components/upload/index";
  import loader from "../../../../components/functions/loader";
  import Popup_white from "../../../../components/popup/white";
  import User_visual from "../../../../components/user_visual/index";

  export default {
    name: "upload_user_image",
    components: {User_visual, Popup_white, Upload},
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
          params:{
            user_id: null,
            file_type: 'user_image'
          },
          data: []
        },
        delete_user_image:{
          url: 'https://newbackend.groe.me/user_admin/image/delete',
          params: {
            user_id: null
          },
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      has_image () {
        return 'image' in this.request_get_user && this.request_get_user.image !== null
      }
    },
    watch:{
      reload: function(object){
        if(object.section === 'user_admin_image'){
          this.active.edit_upload = false
          this.active.upload = false
          this.$store.commit('update_reload', {action: 'reload', section: 'users_admin'})
        }
      },
      route_id: function(){
        this.set_user_id(this.upload_user_image)
        this.set_user_id(this.delete_user_image)
      }
    },
    mounted(){
      this.set_user_id(this.upload_user_image)
      this.set_user_id(this.delete_user_image)
    },
    methods:{
      delete_image () {
        this.$$request.post.file(this.delete_user_image.url, this.delete_user_image.params)
          .then((response) => this.handle_response())
      },
      handle_response () {
        this.$store.commit('update_reload', {action: 'reload', section: 'users_admin'})
      }
    },
    mixins:[loader]
  }
</script>

<style lang="scss" scoped>

  .image{
    .wrapper {
      padding-bottom: 25px !important;

      &:hover{
        &:after{
          display: none;
        }
      }

      .action{
        cursor: pointer;
      }

      label, p{
        padding-top: 10px;
      }

      p{
        display: inline;
        color: #5c6369;
      }

      .user_image{
        display: inline-block;
        vertical-align: middle;
        float: right;
        margin-right: 16px;
      }
    }

    .c_popup{
      .upload{
        padding: 0 16px;
      }
    }
  }

</style>
