<template>
  <div class="upload" :class="upload_class">
    <div class="file">
      <input type="file"
             name="file"
             id="file"
             class="input_file"
             @change="set_single_file"/>
      <label for="file">auswählen</label>
      <div class="file_name"
         v-if="image">
        {{image.name}}
        <span>{{format_bytes(image.size)}}</span>
      </div>
    </div>
    <button @click="upload_file">{{name}}</button>
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
      upload_class:{
        required: false
      }
    },
    data(){
      return{
        active: {
          info: false
        },
        image: null
      }
    },
    methods:{
      format_bytes(bytes){
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
      },
      set_single_file (e) {
        let file = e.target.files[0]
        let errors = {
          type: this.check_type(file.type),
          size: file.size > 1000000
        }
        if( !errors.size || !errors.type ) {
          this.image = file
        }
      },
      upload_file(){
        if( this.image !== null ) {
          let request = {
            uri: this.request_create.url,
            files: this.image,
            type: this.image.type
          }

          let params = this.request_create.required_params
          for(let param_key in params){
            request[param_key] = params[param_key]
          }

          this.$store.dispatch('file_request', request)
        }
      },
      check_type(type){
        switch(type)
        {
          case 'image/jpg':
          case 'image/jpeg':
          case 'image/png':
          case 'application/pdf':
          case 'image/gif':
            return false
          default:
            return true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .upload{
    margin-bottom: 47px;
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
    width: calc(38% - 34px);
    margin-left: 17px;
    padding: 5px 10px;
    border-radius: 2px;
    text-align: center;
    color: white;
    background-color: #3da0f5;
    display: inline-block;
  }

  .input_file:focus + label,
  .input_file + label:hover {
    background-color: #367fcc;
  }

  .input_file + label {
    cursor: pointer; /* "hand" cursor */
  }

  .input_file:focus + label {
    outline: 1px dotted #dadada;
    outline: -webkit-focus-ring-color auto 5px;
  }

  .file_name{
    position: relative;
    width: 62%;
    padding: 5px 17px;
    display: inline;


    span{
      color: #bababa;
    }
  }

  button{
   margin-left: 17px;
  }
</style>
