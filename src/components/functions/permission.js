import { mapGetters} from 'vuex'

export default {
  name: 'permission',
  computed:{
    ...mapGetters([
      'uid',
      'perm',
      'list_permissions',
      'list_user_types',
      'list_user_roles'
    ])
  },
  methods:{
    is_perm(perm_name){
      return this.perm['perm'] >= this.list_permissions[perm_name]
    },
    is_ptype(type_name){
      return this.perm['type'] <= this.list_user_types[type_name]
    },
    is_prole(role_name){
      return this.perm['role'] <= this.list_user_roles[role_name]
    },
    is_self(user_id){
      return this.uid == user_id
    }
  }
}
