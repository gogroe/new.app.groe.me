export default{
  methods:{
    fill_fields(key, obj, request_data ){
      const edit_obj = {}

      for(let oe_key in obj.inputs){
        if(oe_key === key){

          edit_obj.url = obj.url
          edit_obj.label = obj.inputs[key].name
          edit_obj.name = key
          edit_obj.type = obj.inputs[key].type
          edit_obj.placeholder = obj.inputs[key].name

          edit_obj.input_class = obj.input_class,
          edit_obj.label_class = obj.label_class,
          edit_obj.error_class = obj.error_class,
          edit_obj.required_params = obj.required_params
        }
      }

      if(key in request_data){
        edit_obj.value = request_data[key]
      }

      return edit_obj
    }
  }
}
