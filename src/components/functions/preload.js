import { mapGetters } from 'vuex'

export default {
  name: 'custom_helper',
  computed: {
    ...mapGetters([
      'get_response',
    ])
  },
  data(){
    return{
      preload_token:{}
    }
  },
  watch:{
    get_response: function () {
      this.set_preload()
    }
  },
  methods: {
    set_preload(){
      let response = this.get_response
      let preload_tokens = this.preload_token

      for(let preload_name in preload_tokens){
        let token = preload_tokens[preload_name]

        if('request_token' in response && response.request_token === token){
          for(let list_key in response.response){
            let list = response.response[list_key]

            this.$store.commit('update_' + preload_name,{list_group: list_key, list: list}) //todo dynamic
          }
        }
      }
    },

    /*
     * params object = {
     *  name, uri, list_groups
     * }
     */
    request_preload_list(object){
      let request_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      this.preload_token[object.name] = request_token

      object.request_token = request_token
      this.$store.dispatch('data_request', object)
    },
  }
}
