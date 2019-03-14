import { mapGetters } from 'vuex'

export default {
  computed:{
    ...mapGetters([
      'uid'
    ])
  },
  methods:{
    set_user_id:function (object) {
      object.params.user_id = 'id' in this.$route.params
        ? this.$route.params.id
        : this.uid
    },
  }
}
