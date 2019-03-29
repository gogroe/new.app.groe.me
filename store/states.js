const states = {
  state: {
    notification:{},
    },

  mutations: {
    update_notification(state, object){
      state.notification = object
    }
  },
  getters: {
    notification(state){
      return state.notification
    },
  },

  actions: {}
}

export default states
