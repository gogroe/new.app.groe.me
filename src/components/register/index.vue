<template>
  <div class="register">
    <h1 v-if="header !== undefined">{{header}}</h1>
    <p v-if="content !== undefined">{{content}}</p>
      <create_section :create_inputs="register_user"
                      v-model="request_register_user"/>

  </div>
</template>

<script>
  import Create_section from "../../../components/inputs/create";

  export default {
    name: "register",
    props:{
      header:{
        required: true
      },
      content:{
        required: true
      }
    },
    components:{
      Create_section,
    },
    data(){
      return{
        request_register_user: {},
        register_user:{
          url: 'https://newbackend.groe.me/register_user',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {},
          inputs:{
            firstname: {
              name: 'Vorname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            lastname: {
              name: 'Nachname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            email: {
              name: 'Email',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            }
          }
        }
      }
    },
    computed:{
      request_register_user_data(){
        return this.request_register_user
      }
    },
    watch:{
      request_register_user_data(){
        if('create' in this.request_register_user){
          // create new page wher we can push to  like an aler button notiffying about recieved email or sth
          // use a store variable which includes some text
        }
      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  .add{
    margin-bottom: 17px;
  }

  button{
    margin: 10px 0;
  }
</style>
