<template>
  <div class="settings full_fixed">
      <div class="inner_full_fixed">
        <settings_bar/>
        <div class="default_box">
          <ul>
            <h6>EINSTELLUNGEN</h6>
            <li :class="{'active': $route.name === navigation.route}"
                v-for="(navigation, i) in navigations" :key="i"
                @click="$router.push({name: navigation.route})">{{navigation.name}}</li>
          </ul>
          <div class="content">
            <settings_permissions v-if="$route.name === 'settings_permissions'"/>
            <settings_users v-if="$route.name === 'settings_users'"/>
            <settings_tables v-if="$route.name === 'settings_tables'"/>
            <settings_lists v-if="$route.name === 'settings_lists'"/>
          </div>
          <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Settings_permissions from "./permissions/index";
  import Settings_bar from "./bar";
  import Settings_users from "./user/index";
  import Settings_tables from "./tables/index";
  import Settings_lists from "./lists/index";
  export default {

    name: "settings",
    components: {
      Settings_bar,
      Settings_tables,
      Settings_users,
      Settings_permissions,
      Settings_lists
    },
    data(){
      return{
        navigations:[
          {
            name: 'Nutzer',
            route: 'settings_users'
          },
          {
            name: 'Nutzerrechte',
            route: 'settings_permissions'
          },
          {
            name: 'Tabellen',
            route: 'settings_tables'
          },
          {
            name: 'Listen',
            route: 'settings_lists'
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

  .default_box{
    height: 100%;
    padding-top: 0;
    padding-right: 0;

    &.active, &:hover{
      box-shadow: none;
    }
  }

  ul{
    float: left;
    width: 180px;
    height: 100%;
    padding-top: 27px;
    border-right: 1px solid #e6e6e6;

    li{
      cursor: pointer;
      height:47px;
      line-height: 18px;
      padding: 14.5px 0;

      &.active{
        color: #3da0f5;
      }
    }
  }

  .content{
    float: left;
    width: calc(100% - 180px);
    height: 100%;
  }

</style>
