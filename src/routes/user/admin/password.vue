<template>
  <div class="user_password">
    <p class="section_name">Passwort</p>
    <div class="section_wrapper">
      <div
        class="edit_elements update"
        v-for="(input, key, i) in user_password.inputs"
        :key="i">
        <div
          class="wrapper"
          :class="key">
          <cinput
            :name="input.name"
            :type="input.type"
            :cvalue="input.value.value"
            :placeholder="input.placeholder"
            v-model="user_password.inputs[key].value"/>
        </div>
      </div>
      <p :class="{'request_message' : message !== ''}">{{message}}</p>
      <button
        class="filled"
        @click="send_user_password">
        PASSWORT ÄNDERN
      </button>
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
        user_password:{
          url: 'https://newbackend.groe.me/user_admin/secret/create',
          params: {
            user_id: null,
          },
          inputs:{
            old_hash: {
              name: 'Altes',
              type: 'text',
              value: {
                value: null,
                event: null
              },
              placeholder: 'Altes Passwort'
            },
            hash: {
              name: 'Neues',
              type: 'text',
              value: {
                value: null,
                event: null
              },
              placeholder:'Neues Passwort'
            },
            commit_hash: {
              name: 'Bestätigen',
              type: 'text',
              value: {
                value: null,
                event: null
              },
              placeholder:'Passwort bestätigen'
            }
          },
          data: {}
        }
      }
    },
    computed:{
      route_id(){
        return this.$route.params.id
      },
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.user_password)
      }
    },
    mounted(){
      this.set_user_id(this.user_password)
    },
    methods:{
      send_user_password(){
        //check empty
        if(
          this.user_password.inputs.old_hash.value.value === null ||
          this.user_password.inputs.hash.value.value === null ||
          this.user_password.inputs.commit_hash.value.value === null ||

          this.user_password.inputs.old_hash.value.value === '' ||
          this.user_password.inputs.hash.value.value === '' ||
          this.user_password.inputs.commit_hash.value.value === ''
        ){
          this.message = 'Alle felder müssen ausgefüllt werden.'
        }

        //check commit
        else if(
          this.user_password.inputs.hash.value.value === this.user_password.inputs.commit_hash.value.value
        ){
          this.user_password.params.hash = this.user_password.inputs.hash.value.value
          this.user_password.params.old_hash = this.user_password.inputs.old_hash.value.value

          this.$$request.post.data(this.user_password.url, this.user_password.params)
            .then((response) => this.set_response(response))
          this.message = null
        }
        else{
          this.message = 'Passwörter stimmen nicht überein.'
        }
      },
      set_response (response) {
        this.user_password.data = response

        if('update' in response){
          this.message = 'Ihr Passwort wurde geändert'
        }
      }
    },
    mixins:[loader]
  }
</script>

<style lang="scss">

  .user_password {
    .request_message{
      padding: 41px;
      width: 100%;
      text-align: center;
      color: #3da0f5;
    }

    button{
      float: right;
      margin-top: 10px;
      margin-right: 41px;
      margin-bottom: 25px;
    }

    .wrapper {
      &.old_hash{
        &:hover{
          &:after{
            display: none;
          }
        }
      }
    }

    .wrapper {
      &.commit_hash{
        border-bottom: none !important;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }

</style>
