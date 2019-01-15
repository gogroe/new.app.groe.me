const states = {
  state: {
    users_filter: null
  },

  mutations: {
    update_users_fitler(sate, object){
      state.users_filter = object.table = object.filter
    }
  },

  getters: {},

  actions: {}
}

export default states
