<template>
  <div class="edit_section">
    <div
      v-if="is_update"
      class="update">
      <edit_elements
        :url="update.url"
        method="update"
        :inputs="update.inputs"
        :cload="cload"
        :params="update.params"
        :reload="is_reload(update)"/>
    </div>
    <div
      v-if="is_create"
      class="create">
    <add
      v-if="name !== undefined"
      :create="true"
      :name="name.charAt(0).toUpperCase() + name.slice(1)"
      :active="active.create"
      v-model="active.create"
      class="add"/>
      <edit_elements
        v-if="active.create"
        :url="create.url"
        method="create"
        :inputs="create.inputs"
        :params="create.params"
        :reload="is_reload(create)"
        :button="button"/>
    </div>
  </div>
</template>

<script>
  import Add from "../add/index";
  import Edit_elements from "./elements";

  export default {
    name: "edit_section",
    components: {Edit_elements, Add},
    props:{
      cload:{
      /* response keys has to be inputs keys
       *
       * response Object example: {
       *                            input_key1: 'input_value1'
       *                            input_key2: 'input_value2'
       *                          }
       */
        type: Object,
        required: false,
        default: {}
      },

      /* create update Object       url           String        required
       *                            params        Object        required
       *                            inputs        Object        required
       */
      create:{
        type: Object,
        required: true
      },
      update:{
        type: Object,
        required: true
      },
      name:{
        type: String,
        required: false
      },
      button:{
        type: String,
        required: false
      }
    },
    data () {
      return {
        active:{
          create: false
        }
      }
    },
    computed:{
      is_update(){
        return this.$$helper.length( this.cload ) >= 1
      },
      is_create () {
        return this.$$helper.length( this.cload ) == 0
      }
    },
    methods:{
      is_reload (object) {
        return 'reload' in object
          ? object.reload
          : null
      },
    }
  }
</script>

<style lang="scss">

  .edit_section{
    .add{
      line-height: 0;
    }

    button{
      margin: 10px 0;
    }
  }

</style>
