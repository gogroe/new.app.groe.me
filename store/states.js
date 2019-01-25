const states = {
  state: {
    users_crm_filter: {},
    users_crm_order: []
  },

  mutations: {
    unset_users_crm_filter(state){
      state.users_crm_filter = {}
    },

    update_users_crm_filter(state, object){
      if((object.table in state.users_crm_filter) === false){
        state.users_crm_filter[object.table] = {}
        console.log(object.table in state.users_crm_filter)
      }
      if(('conditions' in state.users_crm_filter[object.table]) === false){
        state.users_crm_filter[object.table]['conditions'] = {}
        console.log('conditions' in state.users_crm_filter[object.table])
      }

      state.users_crm_filter[object.table]['conditions'][object.key] = object.value
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

  actions: {
    update_users_crm_filter(){

    }
  }
}

export default states
