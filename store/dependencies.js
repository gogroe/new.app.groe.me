const dependencies = {
  state: {
    types:{
      admin: 0,
      executive: 1,
      leader: 2,
      staff: 3,
      member: 4,
      partner: 5,
      customer: 6,
      visitor: 7,
    },

    states:{
      0:'NO_DATABASE_CONNECTION',
      1:'UNAVAILABLE',
      2:'VALID',
      3:'TO_SHORT',
      4:'TO_LONG',
      5:'NO_STRING',
      6:'NO_NUMBER',
      7:'NO_INTEGER',
      8:'NO_DATE',
      9:'PERMISSION_DENIED',
      10:'UNKNOWN_USER_TYPE',
      11:'TYPE_ADMIN_DENIED',
      12:'UNKNOWN_CONTACT_TYPE',
      13:'NO_EMAIL',
      14:'MISSING_MAIL_FROM',
      15:'MISSING_MAIL_TO',
      16:'MISSING_MAIL_SUBJECT',
      17:'MISSING_MAIL_MESSAGE',
      18:'MAIL_SENDING_SUCCESS',
      19:'MAIL_SENDING_FAILURE',
      20:'NO_DYNAMIC_TABLE_NAME',
      21:'UNKNOWN_SECRET_TYPE',
      22:'MISSING_REQUIRED_PARAMS',
    },

    relations: {
      users : 0,
      articles : 1,
      progress : 2,
      vita : 3,
      projects : 4,
      posts : 5,
      tasks : 6,
      reports : 7,
      accounts : 8,
      status : 9,
      status_details : 10,
      trophies : 11,
      records : 12,
      comment : 13,
      like : 14,
      tag : 15,
      media : 16,
    }
  },

  mutations: {},

  getters: {
    list_types(state) {
      return state.types
    },
    list_states(state) {
      return state.states
    },
    list_relations(state){
      return state.relations
    }
  },

  actions: {}
}

export default dependencies
