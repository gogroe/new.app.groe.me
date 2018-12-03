const layout = {
  state: {
    user_navigation: [],
  },

  mutations: {
    update_user_navigation(state, data){
      state.user_navigation = data
    }
  },

  getters: {
    user_navigation(state){
      return state.user_navigation
    }
  },

  actions: {

  }
}

export default layout
