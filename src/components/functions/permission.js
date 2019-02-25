import { mapGetters} from 'vuex'

export default {
  name: 'permission',
  data(){
    return{
      permissions:{},
      types:{},
      roles:{}
      //todo preload list
    }
  },
  computed:{
    ...mapGetters([
      'perm'
    ])
  },
  methods:{
    is_perm(perm_name){
      return this.perm['perm'] >= this.permissions[perm_name]
    },
    is_ptype(role_name){
      return this.perm['type'] >= this.types[role_name]
    },
    is_prole(role_name){
      return this.perm['role'] >= this.roles[role_name]
    },
  }
}
