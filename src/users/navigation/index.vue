<template>
    <div>
      <p>navigation</p>
        <ul>
          <li v-for="(nav, i) in u_nav_data"
              :key="i"
              :class="{'active': nav.id === check_id}">
            <a href="#">{{nav.lastname + ' ' + nav.firstname}}</a>
            <p>{{nav.type}}</p>
          </li>
        </ul>

      <!-- {{$route.path.substring($route.path.indexOf('/', 1)+1)}}
      <p>{{u_nav.data[0]}}</p> -->
      <!-- <div v-if="checkUSer($route.path)">
        <p>{{u_nav.params}}</p>
        <p>{{u_nav.request}}</p>.
      </div> -->
      <!-- <pre>{{u_nav.data}}</pre> -->
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
        console.log('test')
        if('id' in $route.params){
          return $route.params.id
        }
      },
      // checkUSer (uid){
      //   return uid.substring(uid.indexOf('/', 1)+1) === this.u_nav.data[0].id
      // },
      user_navigation(){
        console.log(true)
      }
    }
    // created: function(){
    //   this.loadUsers();
    // },
    // methods:{
    //   loadUsers: function(){
    //     this.u_nav.data = 'Loading';
    //     axios.get(this.u_nav.url).then(function(response){
    //       this.u_nav.data = response.data;
    //     })
    //     .catch(function(error){
    //       this.u_nav.data = 'an error occured' + error;
    //     })
    //   }
    // }
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

</style>
