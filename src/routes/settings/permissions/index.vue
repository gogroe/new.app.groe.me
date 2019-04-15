<template>
  <div class="permission">
    <div class="head">
      <img src="../../../../static/layout/permissions.png" height="400" width="401"/>
    </div>
    <div class="add_wrapper">
      <h2>Zugangsrechte für Seiten</h2>
      <p>Nutzerrechte sollten stets mit der IT abgesprochen werden.</p>
    </div>
    <permission_item
      v-for="(permission, k) in cLoad.data"
      :key="k"
      :name="k"
      :cLoad="permission"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Permission_item from "./item";
  
  export default {
    name: "permissions",
    components: {Permission_item},
    data(){
      return {
        active:{
          navigation: 'list',
        },
        cLoad:{
          params:{},
          url: 'https://newbackend.groe.me/settings_permission/get_all',
          data: {},
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      permissions_data(){
        return this.active.navigation in this.cLoad.data
          ? this.cLoad.data[this.active.navigation]
          : {}
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'settings_permission'){
          this.$store.commit('update_reload', { action: null, section: null })
          this.get_cLoad()
        }
      },
    },
    mounted(){
      this.get_cLoad()
    },
    methods:{
      get_cLoad () {
        this.$$request.post.data(this.cLoad.url, this.cLoad.params)
          .then((response) => this.cLoad.data = response)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .permission{
    width: 800px;
    margin-left: calc(50% - 400px - 100px);

    .head{
      display: block;
      min-height: 173px;
      padding-top: 43px;
      padding-bottom: 16px;

      img{
        display: block;
        margin: 0 auto;
      }
    }
  }

</style>
