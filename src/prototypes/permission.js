import store from '../../store'
let getters = store.getters

export default {
  is_perm: function (perm_name){
    return getters.perm['perm'] >= getters.list_permissions[perm_name]
  },
  is_ptype: function (type_name){
    return getters.perm['type'] <= getters.list_user_types[type_name]
  },
  is_prole: function (role_name){
    return getters.perm['role'] <= getters.list_user_roles[role_name]
  },
  is_self: function (user_id){
    return getters.uid == user_id
  }
}
