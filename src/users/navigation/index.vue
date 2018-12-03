<template>
    <div>
      <p>navigation</p>
        <ul>
          <li v-for="(nav, i) in u_nav_data"
              :key="i"
              :class="{'active': nav.id === check_id}">
            <a @click="$router.push('/users/' + nav.id + '/profile')">{{nav.lastname + ' ' + nav.firstname}}</a>
            <p>{{nav.type}}</p>
            <div class="buttons">
              <a @click="$router.push('/users/' + nav.id + '/account')">account</a>
              <a @click="$router.push('/users/' + nav.id + '/profile')">profile</a>
              <a @click="$router.push('/users/' + nav.id + '/progress')">progress</a>
              <a @click="$router.push('/users/' + nav.id + '/vita')">vita</a>
            </div>
            <br><br>
          </li>
        </ul>
      <request :obj="u_nav" v-model="u_nav"/>
    </div>
</template>

<script>
  import Request from "../../components/functions/request";
  export default {
    name: "user_navigation",
    components: {
      Request
    },
    data(){
      return{
        u_nav: {
            params: {

            },
            url: 'https://newbackend.groe.me/users/get_user_navigation',
            data: {},
            request: false
          }
      }
    },
    computed:{
      u_nav_data(){
        return this.u_nav.data
      }
    },
    watch:{
      u_nav_data: function(array){
        if(!('id' in this.$route.params)){
          this.$router.push(array[0].id + '/profile')
          this.store.commit('update_user_navigation', array)
        }
      }
    },
    mounted(){
      this.u_nav.request = true
    },
    methods:{
      check_id(){
        if('id' in $route.params.id){
          return $route.params.id
        }
      },
      user_navigation(){
        console.log(true)
      }
    }
  }
</script>

<style lang="less" scoped>
  ul{
    list-style-type: none;
    padding: 0;
    li{
      &.active{
          font-weight: 900
      }
    }
  }
  .buttons{
    float: left;
  }

</style>
