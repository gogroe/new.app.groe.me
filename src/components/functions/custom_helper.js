export default {
  name: 'custom_helper',
  methods:{
    cut_route_name_prefix(route_name){
      return route_name.substring(0,route_name.indexOf('_', 1))
    }
  }
}
