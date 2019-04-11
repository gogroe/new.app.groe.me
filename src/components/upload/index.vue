<template>
  <div
    class="upload">
    <div class="file">
      <input
        type="file"
         name="file"
         id="file"
         class="input_file"
         @change="set_single_file"/>
      <label
        for="file"
        v-if="request_obj.params.files === null">
        auswählen
      </label>
      <label
        class="selection"
         v-else>
        <i
          class="material-icons"
          @click="request_obj.params.files = null">
          delete_outline
        </i>
        {{is_cuted(request_obj.params.files.name)}}
        <span>{{format_bytes(request_obj.params.files.size)}}</span>
      </label>
      <p
        class="error"
        v-if="active.is_error_size">Maximalgröße von
        {{format_bytes(max_size)}}
        überschritten.
      </p>
      <p
        class="error"
        v-if="active.is_error_type">
        Datentyp
        <span
          v-for="(type,i) in types"
          :key="i">{{type}}
        </span>
         erforderlich.
      </p>
    </div>
    <button
      v-if="request_obj.params.files !== null"
      @click="send">
      {{name}}
    </button>
  </div>
</template>

<script>
  export default {
    name: "upload",
    props:{
      request_create:{
        required: true
      },
      name:{
        required: false
      },
      reload:{
        required:false,
        default: function () {return {}}
      },
      max_size:{
        //type: 'Number',
        required: false
      },
      types:{
        //type: 'Array',
        required: false
      }
    },
    data(){
      return{
        active: {
          info: false,
          is_error_size: false,
          is_error_type: false
        },
        request_obj:{
          params: {
            files: null,
          },
          url: '',
          data: {},
        }
      }
    },
    computed:{
      files(){
        return this.request_obj.params.files
      },
    },
    watch:{
      files: function () {
        if(this.request_obj.params.files === null) {
          this.active.is_error_size = false
          this.active.is_error_type = false
        }
        this.validate_file_size()
        this.validate_file_type()
      },
      request_create: function () {
        this.set_request_obj()
      },
    },
    mounted(){
      this.set_request_obj()
    },
    methods:{
      validate_file_size(){
        if(this.max_size !== undefined && this.request_obj.params.files !== null){
          this.active.is_error_size = this.max_size < this.request_obj.params.files.size
        }
      },
      validate_file_type(){
        let is_valid = false
        if(this.types !== undefined && this.request_obj.params.files !== null){
          for(let type_key in this.types){
            if(
              this.request_obj.params.files.type.indexOf(this.types[type_key]) !== -1 ||
              this.request_obj.params.files.type.indexOf(this.types[type_key].toUpperCase()) !== -1){
              is_valid = true
            }
          }
          if(is_valid){
            this.active.is_error_type = false
          } else {
            this.active.is_error_type = true
          }
        }
      },
      is_cuted(name){
        let extension = name.substr(name.indexOf('.'))

        return name.length > 10
          ? name.substr(0,10) + '.. ' + extension
          : name
      },
      format_bytes(bytes){
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
      },
      set_single_file (e) {
        this.request_obj.params.files = e.target.files[0]
      },
      set_request_obj(){
        this.request_obj.url = this.request_create.url

        for(let key in this.request_create.params){
          this.request_obj.params[key] = this.request_create.params[key]
        }
      },
      send () {
        if( this.active.is_error_size === false && this.active.is_error_type === false){
          this.$$request.post.file(this.request_obj.url, this.request_obj.params)
            .then((response) => this.handle_response(response))
        }
      },
      handle_response (response) {
        this.request_obj.data = response

        if(this.$$helper.length(this.reload) > 0)
        this.$store.commit('update_reload', this.reload)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload{
    padding-bottom: 10px;
  }

  .file{
    width: 100%;
    margin-bottom: 10px;
  }

  .input_file{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .input_file + label {
    position: relative;
    width: 100%;
    padding: 10px 17px;
    border-radius: 4px;
    text-align: center;
    color: white;
    background-color: #3da0f5;
    display: inline-block;

    i{
      position: absolute;
      left: 17px;
      margin-top: -5px;
      font-size: 25px;
      margin-right: 17px;
    }

    span{
      opacity: 0.5;
    }
  }

  .error{
    font-size: 10px;
    margin-top: 2px;
    color: red;
  }

  .input_file:focus + label,
  .input_file + label:hover {
    background-color: #367fcc;
  }

  .input_file + label {
    cursor: pointer; /* "hand" cursor */
  }
</style>
