<template>
  <div class="icell">
    <p
      class="name"
      @click="$router.push({name: 'users_vita', params: { id: row.user_id } })">
      <span>{{name}}</span>
    </p>
    <!-- there was wrong rouer name ontered, just shanged user to users -->
    <i
      @click="active.delete = true"
      class="material-icons">
      delete_outline
    </i>
    <popup_white
      :active = "active.delete"
      v-model = "active.delete">
      <div class="wide create">
        <p class="section_name">
          {{name}} wirklich löschen?<br/>
          <span>
            Nachdem löschen kann der Nutzer seinen Account nicht mehr benutzen.
          </span>
        </p>
        <button
          @click="delete_user"
          class="filled">
          Löschen
        </button>
      </div>
    </popup_white>
  </div>
</template>

<script>
  import Popup_white from "../../../popup/white";

  export default {
    name: "crm_icell",
    components: {Popup_white},
    props:{
      row:{
        type: Object,
        required: true
      }
    },
    data() {
      return {
        active: {
          delete: false
        }
      }
    },
    computed:{
      name () {
        let name = ''

        if('firstname' in this.row && 'lastname' in this.row){
          name = this.row.firstname + ' ' + this.row.lastname
        }
        else if('name' in this.row){
          name = this.row.name
        }

        if(name.length > 10){
          name = name.substring(0,10) + '...'
        }

        return name
      }
    },
    methods:{
      delete_user () {
        let data = null
        let params = {
          user_id: this.row.user_id
        }

        this.$$request.post.data('https://newbackend.groe.me/user_crm/user/delete', params)
          .then((response) => data = response)

        // if('update' in data){
          this.active.delete = false
          this.$store.commit('update_reload', {action: 'reload', section: 'crm_prepare'})
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .icell{
    position: relative;
    height: 28px;
    width: 180px;

    .name{
      position: relative;
      cursor: pointer;
      display: inline;

      span{
        display: inline-block;
        padding: 5px 0;
        font-weight: 500;
      }

      &:hover{
        color: #1a73e8;
      }
    }

    i{
      float: right;
      margin-left: 17px;
      cursor: pointer;
      vertical-align: middle;
      color: #bbc6cc;

      &:hover{
        color: #1a73e8;
      }
    }
  }
</style>
