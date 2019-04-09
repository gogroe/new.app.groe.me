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
      23:'INVALID_PASSWORD',
      24:'NOT_ENOUGH_JOIN_PARAMS',
      25:'MISSING_JOIN_TYPE',
      26:'UNKNOWN_JOIN_TYPE',
      27:'INVALID_JOIN_PARAM',
      28:'EXECUTE_ERROR',
      29:'INVALID_COLUMNS_REQUESTED',
      30:'UNKNOWN_USER',
      31:'INVALID_TOKEN',
      32:'EXPIRED_TOKEN',
      33:'EMAIL_ALREADY_EXISTS',
      34:'INVALID_UID',
      35:'UNKNOWN_EMAIL',
      36:'UNREGISTERED_USER',
      37:'UNKNOWN_PERMISSION_TYPE',
      38:'FIELD_ALREADY_EXISTS',
      39:'FIELD_NOT_EXISTS',
      40:'UNKNOWN_FIELD_DATA_TYPE'
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
      position : 17,
      adress : 18,
      contact : 19,
      bank : 20,
      ip : 21,
      lists : 22,
      secret : 23,
      relations : 24,
      date : 25,
      description : 26,
      gender : 27,
      permission : 28,
      table_field : 29,
      field : 30
    },

    user_types: {
      admin: 0,
      user: 1,
      company: 2,
    },

    permissions:{
      get_one: 0,
      get_all:1,
      read:2,
      update:3,
      delete:4,
      create:5,
      write:6,
      admin_get_one : 7,
      admin_get_all : 8,
      admin_read : 9,
      admin_update : 10,
      admin_delete : 11,
      admin_create : 12,
      admin_write : 13
    },

    translations:{
      inaktive: 'Inaktiv',
      aktive: 'Aktiv',
      registered: 'Registriert',
      negotiation: 'Verhandlungen',
      male: 'Mann',
      unknown: 'Unbekannt',
      female: 'Frau',
      qualify: 'Qualifizieren',
      call_back: 'Zurückrufen',
      get_contact: 'Kontaktdaten',
      phone: 'Telefon',
      developer: 'Emtwickler',
      executive: 'Führungskraft',
      admin: 'Administrator',
      member: 'Mitglied',
      leader: 'Führung',
      user: 'Benutzer',
      company: 'Unternehmen',
      partner: 'Partner',
      candidate: 'Bewerber',
      standard: 'Standard',
      premium: 'Premium',
      elite: 'Elite',
      contact_person: 'Ansprechpartner',
      buildup:'Buildup',
      authenticate:'Authentifierung',
      test:'Test',
      list:'Listen',
      settings_permission:'Einstellung Rechte',
      user_admin:'Nutzer Daten (selbst)',
      users_admin:'Nutzer Daten (global)',
      user_account:'Nutzer Konto',
      user_vita:'Nutzer Vita',
      user_crm:'Nutzer CRM',
      header:'Header',
      post:'Post',
      comment:'Kommentar',
      like:'Gefällt mir',
      media:'Medien',
      tag:'Tag',
      lead: 'Lead',
      customer: 'Kunde',
      data: 'Datensatz',
      manager: 'Manager',
      editor: 'Redakteur',
      stuff: 'Innendienst',
      get_one: 'Einzelabruf',
      get_all: 'Mehrfachabruf',
      read: 'Lesen',
      update: 'Bearbeiten',
      delete: 'Löschen',
      create: 'Hinzufügen',
      write: 'Editieren',
      u_head: 'Nutzer Profilkopf',
      settings_user: 'Einstellung Nutzer'
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
    },
    list_translations(state){
      return state.translations
    },
    list_user_types(state) {
      return state.user_types
    },
    list_user_roles(state) {
      return state.user_roles
    },
    list_permissions(state) {
      return state.permissions
    }
  },

  actions: {}
}

export default dependencies
