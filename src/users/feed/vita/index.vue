<template>
  <div class="profile">
    <add class="add"
         :active="active.create"
         name="Vita"
         v-model="active.create"/>
    <div class="create_vita default_box" v-if="active.create">
      <create_section create_name="VITA HINZUFÜGEN"
                      button_name="VITA ERSTELLEN"
                      :create_inputs="create_user_vita"
                      v-model="request_create_user_vita"/>
    </div>
    <h6>VITAS</h6>
    <posts v-for="(article, i) in request_user_vitas_data"
           :key="i"
           :obj="article"/>
    <request :obj="request_user_vitas" v-model="request_user_vitas"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Custom_helper from '../../../components/functions/custom_helper'
  import Load_request from '../../../components/functions/load_request'
  import Request from "../../../components/functions/request";
  import Posts from "../../../components/articles/index";
  import Add from "../../../components/add/index";
  import Create_section from "../../../components/inputs/create";

  export default {
    name: "users_profile",
    components:{
      Create_section,
      Add,
      Posts,
      Request,
    },
    data(){
      return{
        active:{
          create: false
        },
        request_user_vitas: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/users/get_user_vitas',
          data: {},
          request: false
        },
        request_create_user_vita:{},
        create_user_vita:{
          url: 'https://newbackend.groe.me/users/create_user_vita',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: '',
          required_params: {},
          inputs:{
            position: {
              name: 'Position',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            description: {
              name: 'Stellenbeschreibung',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            start_date: {
              name: 'Datum des Beginns',
              type: 'date',
              input: {
                value: null,
                event:null
              }
            },end_date: {
              name: 'Datum der Abschluss',
              type: 'date',
              input: {
                value: null,
                event:null
              }
            },company: {
              name: 'Firmanname',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            street: {
              name: 'Straße',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number',
              input: {
                value: null,
                event:null
              }
            },
            city: {
              name: 'Stadt',
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },
            country: {
              name: 'Land',
              type: 'select',
              select: 'countrys',
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
      ...mapGetters([
        'reload'
      ]),
      request_user_vitas_data(){
        return this.request_user_vitas.data
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'vitas'){
          this.$store.commit('update_reload', {action: null, section: null})
          this.get_user_request(this.request_user_vitas)
        }
      },
      request_create_user_vita:function () {
        this.get_user_request(this.request_user_vitas)
        this.active.create = false
      }
    },
    mounted(){
      this.get_user_request(this.request_user_vitas)
      this.set_inputs_user_id(this.create_user_vita)
    },
    mixins:[Load_request, Custom_helper]
  }
</script>

<style lang="scss" scoped>

  .add{
    text-align: right;
  }

  .create_vita{
    margin-bottom: 17px;
  }

</style>
