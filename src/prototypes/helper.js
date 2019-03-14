import store from '../../store'

export default {
  length: function (object) {
    if(typeof object !== 'object'){
      return console.error('type error $$helper.length')
    }

    let size = 0, object_key;
    for (object_key in object) {
      if (object.hasOwnProperty(object_key)) size++;
    }

    return size;
  },
  reload: store.getters.reload,

  //editor
  edit:{
    cut_route_name_prefix: function (route_name){
      if(route_name !== null){
        return route_name.substring(0,route_name.indexOf('_', 1))
      }
      else {
        return route_name
      }
    }
  }
}
