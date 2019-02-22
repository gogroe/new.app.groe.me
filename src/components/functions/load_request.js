import { mapGetters } from 'vuex'

export default {
  computed:{
    ...mapGetters([
      'get_header',
      'uid'
    ])
  },
  methods:{
    create_update_reload(request_data, reload_obj){
      if('update' in request_data && reload_obj !== undefined){
        this.$store.commit('update_reload', {action: reload_obj.action, section: reload_obj.section})
      }
      if('create' in request_data && reload_obj !== undefined){
        this.$store.commit('update_reload', {action: reload_obj.action, section: reload_obj.section})
      }
    },

    get_user_request(request_obj){
      this.set_user_id(request_obj)
      request_obj.request = true
    },

    set_user_id(request_obj){
      return request_obj.params.user_id = 'id' in this.$route.params
        ? this.$route.params.id
        : this.uid
    },

    set_inputs_user_id(input_obj){
      return input_obj.required_params.user_id = 'id' in this.$route.params
        ? this.$route.params.id
        : this.uid
    }
  }
}
