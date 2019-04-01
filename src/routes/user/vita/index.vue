<template>
  <div class="vita">
    <div class="add_wrapper">
      <!-- <add class="add"
           :create="true"
           :active="active.create"
           name="Vita"
           v-model="active.create"/> -->
    </div>
    <div class="create_box default_box" v-if="active.create">
      <edit_elements
        name="VITA HINZUFÜGEN"
        button="VITA ERSTELLEN"
        :url="create_user_vita.url"
        :inputs="create_user_vita.inputs"
        :params="create_user_vita.params"
        :reload="create_user_vita.reload"
        method="create"/>
    </div>
    <posts v-for="(article, i) in cLoad.data"
           :key="i"
           :obj="article"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Posts from "../../../components/articles/index";
  import add from "../../../components/add";
  import Edit_elements from "../../../components/edit/elements";
  import loader from "../../../components/functions/loader";

  export default {
    name: "users_vita",
    components:{
      Edit_elements,
      Posts,
      add
    },
    data(){
      return{
        active:{
          create: false
        },
        cLoad: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/user_vita/get_all',
          data: {},
        },
        create_user_vita:{
          url: 'https://newbackend.groe.me/user_vita/vita/create',
          reload: {action: 'reload', section: 'vitas'},
          params: {},
          inputs:{
            position: {
              name: 'Position',
              type: 'text',
              value: null,
              placeholder: 'Position'
            },
            description: {
              name: 'Stellenbeschreibung',
              type: 'text',
              value: null,
              placeholder: 'Stellenbeschreibung'
            },
            start_date: {
              name: 'Datum des Beginns',
              type: 'date',
              value: null,
              placeholder: 'Datum des Beginns'
            },
            end_date: {
              name: 'Datum der Abschluss',
              type: 'date',
              value: null,
              placeholder: 'Datum der Abschluss'
            },
            company: {
              name: 'Firmanname',
              type: 'text',
              value: null,
              placeholder: 'Firmanname'
            },
            street: {
              name: 'Straße',
              type: 'text',
              value: null,
              placeholder: 'Straße'
            },
            zip: {
              name: 'Postleitzahl',
              type: 'number',
              value: null,
              placeholder: 'Postleitzahl'
            },
            city: {
              name: 'Stadt',
              type: 'text',
              value: null,
              placeholder: 'Stadt'
            },
            country: {
              name: 'Land',
              type: 'select',
              list: 'countrys',
              value: null,
              placeholder: 'Land'
            }
          }
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'vitas'){
          this.$store.commit('update_reload', {action: null, section: null})
          this.get_cload()
          this.active.create = false
        }
      },
    },
    mounted(){
      this.set_user_id(this.cLoad)
      this.get_cLoad()
    },
    methods:{
      get_cLoad () {
        this.$$request.post.data(this.cLoad.url, this.cLoad.params)
          .then((response) => this.cLoad.data = response)
      },
    },
    mixins:[loader]
  }
</script>

<style lang="scss" scoped>

  .add{
    text-align: right;
  }

</style>
