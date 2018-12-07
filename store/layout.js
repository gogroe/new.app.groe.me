const layout = {
  state: {
    user_navigation: [],
    user_profiles: [],
    user_vitas: [],
    user_progress: [],
    user_admin: []
  },

  mutations: { //this.stroe.commit('mutations_name', varible)
    update_user_navigation(state, array){
      state.user_navigation = array
    },
    update_user_profiles(state, object){
      state.user_profiles.push(object)
    },
    update_user_progress(state, object){
      state.user_progress.push(object)
    },
    update_user_vitas(state, object){
      state.user_vitas.push(object)
    },
    update_user_admin(state, object){
      state.user_admin.push(object)
    }
  },

  getters: {
    user_navigation(state){
      return state.user_navigation
    },
    user_profiles(state){
      return state.user_profiles
    },
    user_progress(state){
      return state.user_progress
    },
    user_vitas(state){
      return state.user_vitas
    },
    user_admin(state){
      return state.user_admin
    }
  },

  actions: {}
}

export default layout
