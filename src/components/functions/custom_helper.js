import { mapGetters } from 'vuex'

export default {
  name: 'custom_helper',
  computed:{
    ...mapGetters([
      'get_header'
    ])
  },
  methods:{
    cut_route_name_prefix(route_name){
      return route_name.substring(0,route_name.indexOf('_', 1))
    }
  }
}
