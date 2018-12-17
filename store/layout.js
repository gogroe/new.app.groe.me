const layout = {
  state: {
    active:{
      navigation: true
    },
    user_navigation: [],
    user_profiles: [],
    user_vitas: [],
    user_progress: [],
    user_admin_user: []

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
    update_user_admin_user(state, object){
      state.user_admin_user.push(object)
    },
    update_active_navigation(state, boolean){
      state.active.navigation = boolean
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
    user_admin_user(state){
      return state.user_admin_user
    },
    active_navigation(state){
      return state.active.navigation
    }
  },

  actions: {}
}

export default layout
