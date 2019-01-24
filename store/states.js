const states = {
  state: {
    users_crm_filter: {

    },
    users_crm_order: []
  },

  mutations: {
    update_users_filter(state, object){
      if(!(object.table in state.users_filter)){
        state.users_crm_filter[object.table] = {}
      }
      if(!('conditions' in state.users_filter[object.table])){
        state.users_crm_filter[object.table]['condition'] =  {}
      }
      if('conditions' in state.users_filter[object.table]){
        state.users_crm_filter[object.table]['condition'][object.value_key] =  object.value
      }
    },

    update_users_crm_order(state, array){
      state.users_crm_order = array
    }
  },
  getters: {
    users_crm_filter(state){
      return state.users_crm_filter
    },
    users_crm_order(state){
      return state.users_crm_order
    }
  },

  actions: {}
}

export default states
