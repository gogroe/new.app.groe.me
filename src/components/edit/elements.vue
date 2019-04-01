<template>
  <div class="edit_elements" :class="method">
    <div
      class="wrapper"
      v-for="(input, key, index) in cinputs"
      :key="key">
      <cinput
        class="cinput"
        :indicator="key"
        :name="input.name"
        :cvalue="input.value"
        :type="input.type"
        :readonly="readonly === null ? is_readonly(input) : readonly"
        :clist="is_list(input)"
        :citems="is_items(input)"
        :placeholder="is_placeholder(input)"
        v-model="item"/>
      <i
        v-if="is_create && success"
        class="material-icons success">
        done
      </i>
      <i
        v-if="is_update && success && is_updated_value (key)"
        class="material-icons success">
        done
      </i>
      <edit_errors
        :indicator="key"
        :validation="validation"
        :response="response"
      />
    </div>
    <button
      v-if="is_create"
      @click="send_create">
      {{button}}
    </button>
    <div class="clear"></div>
  </div>
</template>

<script>
  import Cinput from "../input/index";
  import Edit_errors from "./helper/errors";

  export default {
    name: "edit_elements",
    components: {
      Edit_errors,
      Cinput
    },
    props:{
      method:{
        /* method String      update of create
         */
        type: String,
        required: true,
      },
      url:{
        type: String,
        required: true,
        default: ''
      },
      inputs:{
        /* inputs Object        name          String     required
         *                      value         String     required
         *                      type          String     required
         *                      placeholder   String     optional
         *                      readonly      Boolean    optional
         *                      list          String     required on type 'select')
         *                      items         Array      optional custom list items
         */
        type: Object,
        required: true,
        default: {}
      },
      cload:{
        /* required on method update
         */
        type: Object,
        required: false,
        default: null
      },
      params:{
        type: Object,
        required: false,
        default: null
      },
      reload:{
        /* params Object        example: { action: null, section: null }
         */
        type: Object,
        required: false,
        default: null
      },
      readonly:{
        type: Boolean,
        required: false,
        default: null,
      },
      button:{
        type: String,
        required: false,
        default: 'HINZUFÜGEN'
      }
    },
    data(){
      return{
        success: false,
        item: {
          indicator: null,
          value: null,
          event: null
        },
        items:{},
        response: {},
        validation:{},

        /* update methods todo wenn update dann reload
         */
        cinputs: {},
        cparams: {},
        loaded: true
      }
    },
    computed:{
      is_create () {
        return this.method === 'create'
      },
      is_update () {
        return this.method === 'update'
      }
    },
    watch:{
      item: {
        handler: function (object) {
          if(this.is_update){
            switch (object.event) {
              case 'Enter':
              case 'Blur':
                this.send_update({[object.indicator] : object.value})
                break
            }
          }
          if(this.is_create){
            this.items[object.indicator] = object.value
          }
        }
      },
      cload: {
        handler: function () {
          this.set_value_params ()
        }, deep: true
      },
      inputs:{
        handler: function () {
          this.cinputs = this.inputs
          this.cparams = this.params
          this.set_value_params ()
        }
      }
    },
    created () {
      this.cinputs = this.inputs
      this.cparams = this.params
      this.set_value_params ()
    },
    methods:{
      send_create () {
        if(this.loaded){
          let inputs = {}

          for(let key in this.inputs){
            if(key in this.items){
              inputs[key] = this.items[key]
            }
            else {
              inputs[key] = this.inputs[key].value
            }
          }

          if(this.params !== null){
            Object.assign(inputs, this.params)
          }

          this.$$request.post.data(this.url, inputs)
            .then((result) => this.set_response(result))
        }
      },
      send_update (object) {

        if(this.loaded){
          if(this.cparams !== null){
            Object.assign(object, this.cparams)
          }

          this.$$request.post.data(this.url, object)
            .then((result) => this.set_response(result))
        }
      },
      is_updated_value (key) {
        return key === this.item.indicator
      },
      set_response (object) {
        this.set_feedback(object)
        this.response = object
        this.set_reload ()
      },
      set_reload () {
        if(typeof this.reload === 'object' && this.$$helper.length(this.reload) > 0){
          this.$store.commit('update_reload', this.reload)
        }
      },
      set_feedback (object) {
        if(('errors' in object) === false){
          this.success = true
        }

        let that = this
        setTimeout(function(){
          that.success = false
        },2000)
      },

      /* load values on update
       */
      set_value_params () {
        if(this.is_update){
          if(this.cload === null || this.params === null){
            return console.error('Error in set_value_params. cload = '+  this.cload + ' params = ' + this.params )
          }

          this.loaded = false
          this.set_value(this.cload, this.cinputs)
          this.set_params(this.cload, this.cparams)

          let that = this
          setTimeout(function(){
            that.loaded = true
          },100)
        }
      },
      /* sets value to inputs object out of response
       */
      set_value (response, inputs) {
        for(let key in inputs){
          if(key in response){
            inputs[key].value = response[key]
          }
        }
      },
      /* gets searched param out of request object
       */
      set_params (response, params){
        for(let key in params){
          let param = params[key]

          if(typeof param === 'string' && param.indexOf('get->') > -1){
            let rkey = param.substring(5)

            if(rkey in response){
              params[key] = response[rkey]
            }
            else {
              console.warn('unknown key ' + key + ' in set_params')
            }
          }
        }
      },

      //value check helper
      is_readonly(object){
        if(this.$$permission.is_perm('create') || this.$$permission.is_perm('update')){
          return false
        }
        else {
          return 'readonly' in object
            ? object.readonly
            : undefined
        }
      },
      is_list(object){
        return 'list' in object
          ? object.list
          : undefined
      },
      is_items(object){
        return 'items' in object
          ? object.items
          : undefined
      },
      is_placeholder(object){
        return 'placeholder' in object
          ? object.placeholder
          : object.name
      }
    }
  }
</script>

<style lang="scss">

  .edit_elements{
    .wrapper{
      // border-bottom: 1px solid #dadada;
      // line-height: 66px;
      position: relative;
      display:inline-block;
      color: #838688;

      &:hover{
        cursor: pointer;
        background-color: #f8f8f8;
      }
    }

    .success{
      font-size: 13px;
      color: green;
      position: absolute;
      right: 5px;
      top: calc(50% - 6.5px);
      -webkit-animation: fadeinout 2s linear forwards;
      animation: fadeinout 2s linear forwards;
    }

    .input_wrapper{
      vertical-align: middle;
      display: inline-block;
    }

    &.create{
      .input_label{
        display: none;
      }

      .wrapper, .cinput, .input_wrapper, .input, .vdatetime, .vdatetime-input {
        width: 100%;
      }

      .input, input{
        padding:10px 20px 10px 17px;
        border-radius: 4px;
        border: 2px solid transparent;
        background: #f8f8f8;

        &:hover, &:focus, &.active{
          border: 2px solid #3da0f5;
        }

        &:focus, &.active{
          background: #fff;
        }
      }

      .input_wrapper{
        margin-bottom: 10px;
      }

      button{
        float: right;
        padding: 10px;
        margin-top: 10px;
      }
    }
    .input_wrapper{
      width: calc(100% - 150px);
    }

    .wrapper, .input{
      width: 100%;
    }
  }

</style>
