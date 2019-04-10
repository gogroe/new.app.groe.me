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
  random_key: function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  set_load: function (componentName){
    let loadToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    let loadName = componentName + '_' + loadToken
    store.commit('update_loads', {[loadName]: false})
    return loadName
  },
  sleep: function(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
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
