<template>
  <div class="custom_tables">
    <ul>
      <h6>TABELLEN</h6>
      <li>
        Nutzer CRM
      </li>
    </ul>
    <div class="content">
      <tables_content name="Tables"/>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Tables_content from "./content";

  export default {
    name: "custom_tables",
    components: {Tables_content},
  }
</script>

<style lang="scss" scoped>

  .custom_tables{
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
      height:64px;
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
