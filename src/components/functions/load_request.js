import { mapGetters } from 'vuex'

export default {
  computed:{
    ...mapGetters([
      'reload'
    ])
  },



  watch:{
    //set a reload function manualy
    reload: function (boolean){
      this.request_reload(boolean)
    }
  },



  methods:{
    //set required params or the request manualy
    /*
     * checks if requested data already loadet
     * params:
     * request_obj_name (string - name of request obj)
     * the request_obj has to be like:
          request_obj: {
          params: {},
          url: '',
          data: {},
          request: false
        },

     * getter (string - name of getter)
     * route_params_name (string - name of the $route.params)
     */
    load_request_with_route_check(request_obj_name, getter, route_params_name){
      let store_data = this.$store.getters[getter]

      if(store_data.length === 0){
        this[request_obj_name].request = true
      }
      else {
        if(this.load_store_data(store_data, request_obj_name, route_params_name)){
          return true
        }
      }

      this[request_obj_name].request =  true
    },



    /*
     * loads data from store if params are matching
     * params:
     *  store_data (object)
     *  request_obj_name (string - name of request obj)
     *  route_params_name (string - name of the $route.params)
     */
    load_store_data(store_data, request_obj_name, route_params_name){
      for(let key in store_data){
        if(store_data[key].id === this.$route.params[route_params_name]){
          this[request_obj_name].data = store_data[key]
          return true
        }
      }
      return false
    },


    /*
     * checks if requested data is already stored
     * if not it stores the data, should only be used in watcher
     * params:
     *  commit (string - commit name)
     *  getter (string - getter name)
     *  request_obj (object)
     *  check_params (string - params name for validation)
     */
    update_store(commit, getter, request_obj, check_param){
      let store_data = this.$store.getters[getter]

      for(let key in store_data){
        if(store_data[key][check_param] === request_obj[check_param]){
          return false
        }
      }
      this.$store.commit(commit, request_obj)
      return true
    }
  }
}
