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
    }
  }
}
