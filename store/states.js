const states = {
  state: {
    users_crm_filter: {},
    users_crm_order: [],
    users_crm_sorting: [],
    users_crm_limit_offset: {},
    notification:{},
    },

  mutations: {
    unset_users_crm_filter_table(state, string){
      delete state.users_crm_filter[string]
    },
    unset_users_crm_filter_condition(state, object){
      delete state.users_crm_filter[object.table]['conditions'][object.conditions_key]
    },
    update_users_crm_filter(state, object){
      if((object.table in state.users_crm_filter) === false){
        state.users_crm_filter[object.table] = {}
      }
      if(('conditions' in state.users_crm_filter[object.table]) === false){
        state.users_crm_filter[object.table]['conditions'] = {}
      }

      state.users_crm_filter[object.table]['conditions'][object.key] = object.value
    },
    update_users_crm_order(state, array){
      state.users_crm_order = array
    },
    update_users_crm_sorting(state, object){
      state.users_crm_sorting = object
    },
    update_users_crm_limit_offset(state, object){
      state.users_crm_limit_offset = object
    },
    update_notification(state, object){
      state.notification = object
    }
  },
  getters: {
    users_crm_filter(state){
      return state.users_crm_filter
    },
    users_crm_order(state){
      return state.users_crm_order
    },
    users_crm_sorting(state){
      return state.users_crm_sorting
    },
    users_crm_limit_offset(state){
      return state.users_crm_limit_offset
    },
    notification(state){
      return state.notification
    },
  },

  actions: {}
}

export default states
