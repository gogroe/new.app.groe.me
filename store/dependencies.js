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
    },

    user_types: {
      developer: 0,
      admin: 1,
      user: 2,
      company: 3,
//    partner: 4
    },

    user_roles: {
      '0_role': {
        standard: 0,
      },
      '1_role': {
        manager: 0,
        editor: 1,
        stuff: 2,
      },
      '2_role': {
        lead: 0,
        customer: 1,
        member: 2,
        data: 3
      },
      '3_role': {
        lead: 0,
        customer: 1,
        member: 2,
        data: 3
      }
    },

    permissions:{
      get_one: 0,
      get_all:1,
      read:2,
      update:3,
      delete:4,
      create:5,
      write:6,
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
