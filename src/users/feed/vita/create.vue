<template>
  <div class="create_account default_box">
    <p class="section_name">VITA ERSTELLEN</p>
    <inputs v-for="(input, key, i) in create_user_vita.inputs"
            :key="i"
            :obj="fill_inputs(key, create_user_vita)"
            :request_data="request_create_user_vita.data"
            v-model="create_user_vita.inputs[key].input"/>
    <button @click="send_create_user_vita">VITA HINZUFÜGEN</button>
    <div class="clear"></div>
    <request :obj="request_create_user_vita" v-model="request_create_user_vita"/>
  </div>
</template>

<script>
  import Inputs from "../../../components/inputs/index";
  import Request from "../../../components/functions/request";
  import Load_request from "../../../components/functions/load_request"
  import Custom_helper from '../../../components/functions/custom_helper'

  export default {
    name: "create_vita",
    components: {
      Request,
      Inputs
    },
    data(){
      return{
        request_create_user_vita: {
          params: {
            user_id: null,
            uid: 1,
          },
          url: 'https://newbackend.groe.me/users/create_user_vita',
          data: {},
          request: false
        },
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
              type: 'text',
              input: {
                value: null,
                event:null
              }
            },end_date: {
              name: 'Datum der Abschluss',
              type: 'text',
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
      route_id(){
        return this.$route.params.id
      },
      request_create_user_vita_data(){
        return this.request_create_user_vita.data
      }
    },
    watch:{
      route_id: function(){
        this.set_user_id(this.request_create_user_vita)
      },
      request_create_user_vita_data: function (object) {
        if('create' in object){
          this.create_user_vita.inputs.position.input.value = null
          this.create_user_vita.inputs.description.input.value = null
          this.create_user_vita.inputs.start_date.input.value = null
          this.create_user_vita.inputs.end_date.input.value = null
          this.create_user_vita.inputs.company.input.value = null
          this.create_user_vita.inputs.street.input.value = null
          this.create_user_vita.inputs.zip.input.value = null
          this.create_user_vita.inputs.city.input.value = null
          this.create_user_vita.inputs.country.input.value = null
          this.$emit('input', 'reload')
        }
      }
    },
    mounted(){
      this.set_user_id(this.request_create_user_vita)
    },
    methods:{
      send_create_user_vita(){
        this.request_create_user_vita.params.position = this.create_user_vita.inputs.position.input.value
        this.request_create_user_vita.params.description = this.create_user_vita.inputs.description.input.value
        this.request_create_user_vita.params.start_date = this.create_user_vita.inputs.start_date.input.value
        this.request_create_user_vita.params.end_date = this.create_user_vita.inputs.end_date.input.value
        this.request_create_user_vita.params.company = this.create_user_vita.inputs.company.input.value
        this.request_create_user_vita.params.street = this.create_user_vita.inputs.street.input.value
        this.request_create_user_vita.params.zip = this.create_user_vita.inputs.zip.input.value
        this.request_create_user_vita.params.city = this.create_user_vita.inputs.city.input.value
        this.request_create_user_vita.params.country = this.create_user_vita.inputs.country.input.value
        this.request_create_user_vita.request = true
      }
    },
    mixins:[Custom_helper, Load_request]
  }
</script>

<style lang="scss" scoped>
  .default_box{
    margin-bottom: 17px;
  }

  button{
    float:right;
    margin-top: 10px;
  }
</style>
