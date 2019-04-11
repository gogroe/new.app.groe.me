<template>
  <div
    class="navbar"
    id="navbar">
    <ul>
      <li
        v-for="(option , i) in options"
        :key="i"
        @click="$router.push( option.route )"
        :class="{'active' : $route.name === option.route.name}">
        {{option.name}}
      </li>
    </ul>
    <add
      v-if="activeAdd"
      :active="active"
      :name="$route.name"
      v-model="active"/>
  </div>
</template>

<script>
  import Add from '../add/new_add'
  import { mapGetters } from 'vuex'

  export default {
    name: 'navbar',
    components: {
      Add,
    },
    props:{
      options:{
        type: Object,
        required: true,
      },
      name: {
        type: String,
        required: false,
      },
    },
    data () {
      return  {
        active: false,
        activeAdd: false
      }
    },
    computed:{
      ...mapGetters([
        'reload',
      ]),
    },
    watch:{
      active: function(bool) {
        this.$emit('input', bool)
      },
      reload: function (object) {
        if(object.section === 'activeAdd'){
          this.activeAdd = object.action
          this.$store.commit('update_reload', {action: null, section: null})
        }
      }
    }
  }
</script>

<style lang="scss">
.navbar{
  width: 100%;
  height: 66px;
  line-height: 66px;
  box-shadow: inset 0 -1px 0 #e6e6e6;

  ul{
    width: 100%;

    li{
      color: #bbb;
      float: left;
      width: 173px;
      text-align: center;

      &:hover{
        background: #f1f3f4;
        color: #1a73e8;
        box-shadow: inset 0 -1px 0 #e6e6e6;
        cursor: pointer;
      }

      &.active{
        color: #edad00;
        box-shadow: inset 0 -2px 0 #edad00;

        &:hover{
          background: transparent;
        }
      }
    }
  }
}
</style>
