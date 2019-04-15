<template>
  <div
    v-click-outside="hide"
    class="permssion_item">
    <div class="head">
      <add_text
        class="c_add_text"
        v-if="active.body"
        v-model="active.create">
        <a class="active">
          {{$$translation(name)}}
        </a>
      </add_text>
      <a
        v-else
        @click="active.body = !active.body"
        class="active">
        {{$$translation(name)}}
      </a>
      <i
        @click="active.body = !active.body"
        class="material-icons open">
        keyboard_arrow_down
      </i>
    </div>
    <item_body
      v-if="active.body && $$helper.length(cLoad.permissions) > 0"
      :cLoad="cLoad"/>
    <popup_white
      :active = "active.create"
      v-model = "active.create">
      <div class="wide create">
        <p class="section_name">{{name}} - Berechtigung<br/><br/>
          <span>
            Fügen Sie hier Nutzerberechtigungen hinzu. Das hinzufügen kann globale Funktinen einschränken.
          </span>
        </p>
        <edit_elements
          button="ERSTELLEN"
          url="https://newbackend.groe.me/settings_permission/create"
          :inputs="{
            user_type: {
              name: 'Nutzer Typ',
              type: 'select_indicator',
              items: user_types,
              list: 'user_types'
            },
            user_role: {
              name: 'Nutzer Rolle',
              type: 'select_dependent',
              list: 'user_types$_role',

            },
            permission: {
              name: 'Berichtigung',
              type: 'select',
              items: permissions,
              list: 'permissions'
            },
          }"
          :params="{
            type: 0,
            name: name
          }"
          :reload="{ action: 'reload', section:'settings_permission' }"
          method="create"/>
      </div>
    </popup_white>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import { mapGetters } from 'vuex'
  import Add_text from "../../../components/add/add_text";
  import Item_body from "./body";
  import Popup_white from "../../../components/popup/white";
  import Edit_elements from "../../../components/edit/elements";

  export default {
    name: "permission_item",
    components: {Edit_elements, Popup_white, Item_body, Add_text},
    props:{
      name:{
        type: String,
        required: true,
      },
      cLoad:{
        type: Object,
        required: true,
        default: function () {return {} }
      }
    },
    data() {
      return {
        active: {
          body: false,
          create: false
        }
      }
    },
    computed:{
      ...mapGetters([
        'list_user_types',
        'list_permissions'
      ]),
      user_types () {
        return this.create_list(this.list_user_types)
      },
      permissions () {
        return this.create_list(this.list_permissions)
      }
    },
    methods:{
      create_list (array) {
        let list = []
        for(let key in array){
          list.push({
            name: this.$$translation(key),
            original: key,
            value: array[key].toString()
          })
        }
        return list
      },
      hide() {
        this.active.body = false
      }
    },
    directives: {
      ClickOutside
    }
  }
</script>

<style lang="scss" scoped>

  .permssion_item{
    position: relative;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    margin-bottom: 10px;

    .head{
      width: 100%;
      padding: 10px 25px;

      a{
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
      }

      .c_add_text{
        vertical-align: middle;

        a.active{
          margin-left: 16px;
          color: #edad00;
        }
      }

      .open{
        cursor: pointer;
        position: absolute;
        right: 25px;
        top:8px;
      }
    }

    .body{

    }
  }

</style>
