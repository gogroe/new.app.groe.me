const layout = {
  state: {
    active:{
      navigation: true
    },
    header: {
      firstname: "Gast",
      lastname: "Nutzer",
      name: "visitor",
      gender: null,
      id: 2,
      image: null,
      type: "visitor",
    },
    bubble: {
      text: null,
      info_link: null,
      size: 200,
      show: false,
      x: 0,
      y: 0
    },
    user_navigation: [],
    user_profiles: [],
    user_vitas: [],
    user_progress: [],
    lists:{}
  },

  mutations: {
    update_bubble(state, object){
      state.bubble = object
    },
    update_header(state, object){
      state.header = object
    },
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
    update_active_navigation(state, boolean){
      state.active.navigation = boolean
    },
    update_lists(state, object){
      state.lists[object.list_group] = object.list
    },
  },

  getters: {
    get_bubble(state){
      return state.bubble
    },
    get_header(state){
      return state.header
    },
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
    user_adress(state){
      return state.user_adress
    },
    active_navigation(state){
      return state.active.navigation
    },
    lists(state){
      return state.lists
    }
  },

  actions: {}
}

export default layout
