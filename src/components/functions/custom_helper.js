import { mapGetters } from 'vuex'

export default {
  name: 'custom_helper',
  computed:{
    ...mapGetters([
      'get_header',
      'list_relations',
      'list_translations'
    ])
  },
  methods:{
    render_list_name(response_data, value){
      let name = ''

      for(let response_data_key in response_data){
        let list_item = response_data[response_data_key]

        if(list_item.value === value){
          name = list_item.name
        }
      }

      return name
    },

    build_list(response_data){
      const list = {}

      for(let response_data_key in response_data){
        let list_item = response_data[response_data_key]

        list[list_item.name] = list_item.value
      }

      return list
    },

    translate(string){
      if(string in this.list_translations){
        return this.list_translations[string]
      }
      else {
        return string
      }
    },

    cut_route_name_prefix(route_name){
      if(route_name !== null){
        return route_name.substring(0,route_name.indexOf('_', 1))
      }
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

          if('select' in obj.inputs[key]){
            input_obj.select = obj.inputs[key].select
          }
        }
      }

      return input_obj
    },
    fill_inputs_edit(key, obj, request_data, required_params = null ){
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

          if(required_params !== null){
            for(let required_params_key in required_params){
              edit_obj.required_params[required_params_key] = required_params[required_params_key]
            }
          }

          if('select' in obj.inputs[key]){
            edit_obj.select = obj.inputs[key].select
          }
        }
      }

      if(key in request_data){
        edit_obj.value = request_data[key]
      }

      if('id' in request_data){
        edit_obj.required_params.id = request_data['id']
      }
      
      return edit_obj
    },

    object_length(obj) {
      let size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    }
  }
}
