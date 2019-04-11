export default {
  name: 'upload_validation',
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
    }
  }
}
