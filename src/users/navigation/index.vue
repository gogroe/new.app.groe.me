<template>
  <div>
    <div class="navigation">
      <input type="search" placeholder="suche"/>
      <ul class="default_scrollbar">
        <li v-for="(nav, i) in request_navigation_data"
            :key="i"
            :class="{'active': nav.id === $route.params.id}">
          <div class="image_wrapper">
            <img :src="user_image(nav.image)"/>
          </div>
          <div class="details">
            <a @click="$router.push('/users/' + nav.id + '/profile')">{{nav.firstname + ' ' + nav.lastname}}</a>
            <p>{{nav.type}}</p>
          </div>
          <div>
            <i class="material-icons">border_color</i>
          </div>
          <div class="clear"></div>
        </li>
      </ul>
    </div>
    <request :obj="request_navigation" v-model="request_navigation"/>
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
        request_navigation: {
            params: {

            },
            url: 'https://newbackend.groe.me/users/get_user_navigation',
            data: {},
            request: false
          }
      }
    },
    computed:{
      request_navigation_data(){
        return this.request_navigation.data
      }
    },
    watch:{
      request_navigation_data: function(array){
        if(!('id' in this.$route.params)){
          this.$router.push(array[0].id + '/profile')
          this.$store.commit('update_user_navigation', array)
        }
      }
    },
    mounted(){
      this.request_navigation.request = true
    },
    methods:{
      check_id(){
        if('id' in $route.params.id){
          return $route.params.id
        }
      },
      user_navigation(){
        console.log(true)
      },
      user_image(string, gender) {
        if (string === null) {
          return '/static/layout/default_profile_image_female.jpg'
        }
        else {
          return string
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  //mobile
  @media all and (min-width: 0px ) and (max-width: 640px) {

  }

  //tablet
  @media all and (min-width: 641px ) and (max-width: 1007px ) {

  }

  .navigation{
    height: 100%;
    position: fixed;
    width: 270px;
    top:90px;
    left:0;
    border-right: 1px solid #e6e6e6;
  }
  .material-icons{
    float: left;
    margin-top: 15px;
    margin-left: 5px;
    font-size:15px;
  }

  input[type="search"]{
    border: none;
    background: #f3f3f3;
    padding: 17px;
    font-size: 18px;
    border-bottom: 1px solid #e6e6e6;
  }

  ul{
    height: calc(100% - 90px - 55px - 55px);
    overflow-y: scroll;
    padding: 0;

    li{
      padding: 17px;
      font-weight: 700;
      cursor: pointer;
      &.active{
        .details a{
          color: #3da0f5;
        }
      }

      .image_wrapper{
        height: 45px;
        width: 45px;
        overflow: hidden;
        border-radius:45px;
        border: 1px solid #e6e6e6;
        float:left;

        img{
          height: 45px;
        }
      }

      .details{
      width: 150px;
      margin-left: 10px;
        float:left;

        a{
          font-weight: 700;
          color: #000;
        }

        p{
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }

  .options{
    height: 55px;
    width: 100%;
    border-top: 1px solid #e6e6e6;
  }

  .clear{
    clear: both;
  }

</style>
