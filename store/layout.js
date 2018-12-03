const layout = {
  state: {
    user_navigation: [],
    user_profiles: []
  },

  mutations: { //this.stroe.commit('mutations_name', varible)
    update_user_navigation(state, array){
      state.user_navigation = array
    },
    update_user_profiles(state, object){
      state.user_profiles.push(object)
    }
  },

  getters: {
    user_navigation(state){
      return state.user_navigation
    },
    user_profiles(state){
      return state.user_profiles
    }
  },

  actions: { //this.stroe.dispatch('dispatch_name', varible)

  }
}

export default layout
