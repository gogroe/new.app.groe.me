<template>
  <div class="settings_list">
    <ul>
      <h6>LISTEN</h6>
      <li v-for="(list, l_key) in lists"
          :key="l_key"
          @click="active.navigation = l_key"
          :class="{'active': active.navigation === l_key}">
        {{$$translation(l_key)}}
      </li>
    </ul>
    <div class="content">
      <settings_list_content :list="active_navigation"/>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Settings_list_content from "./content";

  export default {
    name: "settings_list",
    components: {Settings_list_content},
    data(){
      return{
        active: {
          navigation: null
        },
        lists:{}
      }
    },
    computed:{
      active_navigation(){
        return this.active.navigation !== null
          ? this.lists[this.active.navigation]
          : {}
      }
    },
    created(){
      this.$$request.post.data('https://newbackend.groe.me/settings_list/get_all', {})
      .then((result) =>
        this.lists = result
      )
    }
  }
</script>

<style lang="scss" scoped>

  .settings_list{
    height: 100%;
  }

  ul{
    float: left;
    width: 280px;
    height: 100%;
    padding-top: 27px;
    padding-left: 17px;
    border-right: 1px solid #e6e6e6;

    h6{
      margin-bottom: 10px;
    }

    li{
      cursor: pointer;
      height:27px;
      line-height: 18px;
      padding: 0 0 1px 0;

      &.active, &:hover{
        color: #3da0f5;
      }

      .user_visual{
        vertical-align: middle;
        display: inline-block;
      }

      span{
        margin-left: 17px;
        display: inline;
      }
    }
  }

  .content{
    float: left;
    width: calc(100% - 280px);
  }

</style>
