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
  search_key_by_value: function (object, value) {
    return Object.keys(object).find(key => object[key] == value);
  },
  capitalize: function(name) {
    if(typeof name === 'string'){
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    else {
      console.error('type error capitalize ' + name)
    }
  },

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
