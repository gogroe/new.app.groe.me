export default{
  methods:{
    fill_fields_inputs(key, obj){
      const input_obj = {}

      for(let oe_key in obj.inputs){
        if(oe_key === key){

          input_obj.url = obj.url
          input_obj.label = obj.inputs[key].name
          input_obj.name = key
          input_obj.type = obj.inputs[key].type
          input_obj.placeholder = obj.inputs[key].name
          input_obj.value = obj.inputs[key].input.value

          input_obj.input_class = obj.input_class,
          input_obj.label_class = obj.label_class,
          input_obj.error_class = obj.error_class
        }
      }

      return input_obj
    }
  }
}
