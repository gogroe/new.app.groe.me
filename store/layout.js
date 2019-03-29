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
    lists:{},
    dlists:{}
  },

  mutations: {
    update_bubble(state, object){
      state.bubble = object
    },
    update_active_navigation(state, boolean){
      state.active.navigation = boolean
    },
    update_header(state, object){
      state.header = object
    },
    update_user_navigation(state, array){
      state.user_navigation = array
    },
    update_lists(state, object){
      state.lists[object.list_group] = object.list
    },
    delete_list(state, string){
      delete state.lists[string]
    },
    update_dlists(state, object){
      state.dlists[object.list_group] = object.value
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
    active_navigation(state){
      return state.active.navigation
    },
    lists(state){
      return state.lists
    },
    dlists(state){
      return state.dlists
    }
  },

  actions: {}
}

export default layout
