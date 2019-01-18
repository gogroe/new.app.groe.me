const states = {
  state: {
    users_filter: {

    }
  },

  mutations: {
    update_users_filter(state, object){
      if(!(object.table in state.users_filter)){
        state.users_filter[object.table] = {}
      }
      if(!('conditions' in state.users_filter[object.table])){
        state.users_filter[object.table]['condition'] =  {}
      }
      if('conditions' in state.users_filter[object.table]){
        state.users_filter[object.table]['condition'][object.value_key] =  object.value
      }
    },


    // update_user_conditions(state, object){
    //   if(!(object.table in state.users_filter)){
    //     state.users_filter[object.table] = {}
    //   }
    //   if(!('conditions' in state.users_filter[object.table])){
    //     state.users_filter[object.table]['condition'] =  {}
    //   }
    //   if('conditions' in state.users_filter[object.table]){
    //     state.users_filter[object.table]['condition'][object.value_key] =  object.value
    //   }
    // },
    //
    // update_user_columns(state, object){
    //   if(!(object.table in state.users_filter)){
    //     state.users_filter[object.table] = {}
    //   }
    //   if(!('columns' in state.users_filter[object.table])){
    //     state.users_filter[object.table]['columns'] =  {}
    //   }
    //   if('columns' in state.users_filter[object.table]){
    //     if(!(object.value in state.users_filter[object.table]['columns'])){
    //       state.users_filter[object.table]['columns'].push(object.value)
    //     }
    //   }
    // },
    //
    // update_user_order_by(state, object){
    //   if(!(object.table in state.users_filter)){
    //     state.users_filter[object.table] = {}
    //   }
    //   if(!(object.type in state.users_filter[object.table])){
    //     state.users_filter[object.table][object.type] =  {}
    //   }
    //   if(object.type in state.users_filter[object.table]){
    //     state.users_filter[object.table][object.type][object.value_key] =  object.value
    //   }
    // },
  },
  getters: {
    users_filter(state){
      return state.users_filter
    }
  },

  actions: {}
}

export default states
