<template>
  <div class="settings full_fixed">
      <div class="inner_full_fixed">
        <settings_bar/>
        <div class="default_box">
          <ul>
            <li :class="{'active': $route.name === navigation.route}"
                v-for="(navigation, i) in navigations" :key="i"
                @click="$router.push({name: navigation.route})">{{navigation.name}}</li>
          </ul>
          <div class="content">
            <permissions v-if="$route.name === 'permissions'"/>
          </div>
          <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Permissions from "./permissions/index";
  import Settings_bar from "./bar";
  export default {

    name: "settings",
    components: {Settings_bar, Permissions},
    data(){
      return{
        navigations:[
          {
            name: 'Nutzer',
            route: 'user_types'
          },
          {
            name: 'Nutzerrechte',
            route: 'permissions'
          },
          {
            name: 'Tabellen',
            route: 'tables'
          },
          {
            name: 'Listen',
            route: 'lists'
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
