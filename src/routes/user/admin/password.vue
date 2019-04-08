<template>
  <div class="user_password">
    <p class="section_name">NUTZER PASSWORT</p>
    <div class="section_wrapper">
      <div class="spacing">
        <cinput v-for="(input, key, i) in create_user_secret.inputs"
        :key="i"
        :name="input.name"
        :type="input.type"
        :cvalue="input.value"
        :placeholder="input.placeholder"
        v-model="create_user_secret.inputs[key].input"/>
        <p class="request_message">{{message}}</p>
      </div>
      <button @click="send_create_user_secret">PASSWORT ÄNDERN</button>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import Add from "../../../components/add/index";
  import Cinput from "../../../components/input/index";
  import loader from "../../../components/functions/loader";

  export default {
    name: "user_password",
    components:{
      Cinput,
      Add,
    },
    data(){
      return{
        message: '',
        rCreate_secret: {
          url: 'https://newbackend.groe.me/user_admin/secret/create',
          params: {
            user_id: null,
          },
          data: {},
        },
        create_user_secret:{
          url: '',
          params: {
            user_id: this.$route.params.id,
          },
          inputs:{
            old_hash: {
              name: 'Altes',
              type: 'text',
              value: null,
              placeholder: 'Altes Passwort'
            },
            hash: {
              name: 'Neues',
              type: 'text',
              value: null,
              placeholder:'Neues Passwort'
            },
            commit_hash: {
              name: 'Bestätigen',
              type: 'text',
              value: null,
              placeholder:'Passwort bestätigen'
            }
          }
        }
      }
    },
    computed:{
      route_id(){
        return this.$route.params.id
      },
      request_create_user_secret_data(){
        return this.rCreate_secret.data
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.rCreate_secret)
      },
      request_create_user_secret_data(object){
        if('create' in object){
          this.message = 'Ihr Passwort wurde geändert'
        }
      }
    },
    mounted(){
      this.set_user_id(this.rCreate_secret)
    },
    methods:{
      send_create_user_secret(){
        //check empty
        if(
          this.create_user_secret.inputs.old_hash.value === null ||
          this.create_user_secret.inputs.hash.value === null ||
          this.create_user_secret.inputs.commit_hash.value === null ||
          this.create_user_secret.inputs.old_hash.value === '' ||
          this.create_user_secret.inputs.hash.value === '' ||
          this.create_user_secret.inputs.commit_hash.value === ''
        ){
          this.message = 'Alle felder müssen ausgefüllt werden.'
        }

        //check commit
        else if(
          this.create_user_secret.inputs.hash.value === this.create_user_secret.inputs.commit_hash.value
        ){
          this.rCreate_secret.params.hash = this.create_user_secret.inputs.hash.value
          this.rCreate_secret.params.old_hash = this.create_user_secret.inputs.old_hash.value

          this.$$request.post.data(this.rCreate_secret.url, this.rCreate_secret.params)
          this.message = null
        }
        else{
          this.message = 'Passwörter stimmen nicht überein.'
        }
      }
    },
    mixins:[loader]
  }
</script>

<style lang="scss">

  .user_password{

    .request_message{
      margin-top: 10px;
      margin-left: 17px;
    }

    .input_label{
    }

    .cinput{
      margin-bottom: 17px;
    }

    button{
      margin: 25px 41px;
      float: right;
      background-color: #3da0f5;
      color: white;
      height: 42px;
      padding: 10px 41px;

      &:hover{
        background-color: #2e7dbd;
        outline: none;
      }
    }
  }


</style>
