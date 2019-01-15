import { mapGetters } from 'vuex'

export default {
  name: 'custom_helper',
  computed:{
    ...mapGetters([
      'get_header',
      'list_relations'
    ])
  },
  methods:{
    cut_route_name_prefix(route_name){
      return route_name.substring(0,route_name.indexOf('_', 1))
    },
    search_relations(value){
      for (let key in this.list_relations){
        if (this.list_relations[key] == value){
          return key
        }
      }
    },
    fill_inputs(key, obj){
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
    },
    fill_inputs_edit(key, obj, request_data ){
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
