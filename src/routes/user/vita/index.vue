<template>
  <div class="vita">
    <div class="add_wrapper">
    </div>
    <div class="add_wrapper">
      <h2>Jobs & Qualifikationen</h2>
      <p v-if="cLoad.data.length === 0">Archiviere deine letzten Tätigkeiten, sodass wir dich besser vermitteln können.</p>
      <p v-else>Trage mehr Jobs ein um besser Angebote zu erhalten.</p>
    </div>
    <posts
      v-for="(article, i) in cLoad.data"
      :key="i"
      :obj="article"/>
    <div v-if="cLoad.data.length === 0">
      <div
        class="default box edit">
        <p class="section_name">
          Erste Vita<br/>
        </p>
        <div class="section_wrapper">
          <edit_elements
            method="create"
            :url="create_user_vita.url"
            :inputs="create_user_vita.inputs"
            :params="create_user_vita.params"
            :reload="create_user_vita.reload"/>
        </div>
      </div>
    </div>
    <popup_white
      :active = "active.create"
      v-model = "active.create">
      <div class="wide create">
        <p class="section_name">Vita<br/><br/>
          <span>
            Fügen deine Qualifikationen hinzu. Achte darauf dein täglichen Aufgaben ausfühlich zu beschreiben.
          </span>
        </p>
        <edit_elements
          name="Vita hinzufügen"
          button="VITA ERSTELLEN"
          :url="create_user_vita.url"
          :inputs="create_user_vita.inputs"
          :params="create_user_vita.params"
          :reload="create_user_vita.reload"
          method="create"/>
      </div>
    </popup_white>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Posts from "../../../components/articles/index";
  import add from "../../../components/add";
  import Popup_white from "../../../components/popup/white"
  import Edit_elements from "../../../components/edit/elements";
  import loader from "../../../components/functions/loader";
  import Dropdown_menu from "../../../components/dropdown/menu";

  export default {
    name: "users_vita",
    components:{
      Edit_elements,
      Posts,
      add,
      Popup_white
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
          params: {
            user_id: null,
          },
          inputs:{
            position: {
              name: 'Position',
              type: 'text',
              value: null,
              placeholder: 'Position'
            },
            description: {
              name: 'Beschreibung',
              type: 'text',
              value: null,
              placeholder: 'Beschreibung'
            },
            start_date: {
              name: 'Beginn',
              type: 'date',
              value: null,
              placeholder: 'Beginn'
            },
            end_date: {
              name: 'Beendet',
              type: 'date',
              value: null,
              placeholder: 'Beendet'
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
      activeCreate () {
        return this.active.create
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'vitas'){
          this.$store.commit('update_reload', {action: null, section: null})
          this.get_cLoad()
          this.active.create = false
        }
        if(object.section === this.$route.name){
          this.active.create = true
          this.$store.commit('update_reload', {action: null, section: null})
        }
      },
      activeCreate: function (boolean) {
        this.$store.commit('update_reload', {section: 'add_' + this.$route.name, action: false})
      }
    },
    mounted(){
      this.$store.commit('update_reload', {section: 'activeAdd', action: true})
      this.set_user_id(this.create_user_vita)
      this.set_user_id(this.cLoad)
      this.get_cLoad()
    },
    methods:{
      get_cLoad () {
        this.$$request.post.data(this.cLoad.url, this.cLoad.params)
          .then((response) => this.cLoad.data = response)
      }
    },
    mixins:[loader]
  }
</script>

