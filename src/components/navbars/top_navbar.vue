<template>
  <div class="navbar_top">
    <ul>
      <li v-for="(option , i) in options" :key="i"
          @click="$router.push({name: option.route, params: { id: user_id }})"
          :class="{'active' : $route.name === option.route}">
        {{option.name}}
      </li>
    </ul>
    <div class="add">
      <p>+</p>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navbar_top',
  props:{
    options:{
      type: Object,
      required: true,
    }
  },
  data(){
    return{

    }
  },
  computed:{
    ...mapGetters([
      'uid'
    ]),

    user_id(){
      return 'id' in this.$route.params
      ? this.$route.params.id
      : this.uid
    }
  },
}
</script>

<style lang="scss">
.navbar_top{
  width: calc(100% - 41px);
  height: 41px;
  line-height: 41px;
  box-shadow: inset 0 -1px 0 #eee;

  ul{
    li{
      color: #bbb;
      float: left;
      width: 173px;
      text-align: center;

      &:hover{
        background-color: #eee;
        color: #888;
        box-shadow: inset 0 -1px 0 #fff9e5;
      }

      &.active{
        color: #edad00;
        box-shadow: inset 0 -2px 0 #edad00;
      }
    }
  }

  .add{
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
    background-color: #ddd;
    margin: 8px;
    float: right;
    text-align: center;

    p{
      color: #3da0f5;
      font-size: 20px;
      line-height: 25px;
    }

    &:hover{
      background-color: #ccc;
    }
  }
}
</style>
