<template>
    <div>
      <div class="navigation">
        <input type="search" placeholder="suche"/>
        <ul class="default_scrollbar">
          <li v-for="(nav, i) in request_navigation_data"
              :key="i"
              :class="{'active': nav.id === $route.params.id}">
            <user_image class="user_image" :path="nav.image" size="50" image_class="navigation_user_image"/>
            <div class="details">
              <a @click="$router.push('/users/' + nav.id + '/profile')">{{nav.firstname + ' ' + nav.lastname}}</a>
              <p>{{nav.type}}</p>
            </div>
            <div class="clear"></div>
          </li>
        </ul>
        <div class="options">

        </div>
      </div>
      <request :obj="request_navigation" v-model="request_navigation"/>
    </div>
</template>

<script>
  import Request from '../../components/functions/request'
  import User_image from '../../components/user_image/index'
  import { mapGetters } from 'vuex'

  export default {
    name: "user_navigation",
    components: {
      User_image,
      Request
    },
    data(){
      return{
        request_navigation: {
            params: {},
            url: 'https://newbackend.groe.me/users/get_user_navigation',
            data: {},
            request: false
          }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      request_navigation_data(){
        return this.request_navigation.data
      }
    },
    watch:{
      reload: function (boolean){
        if(boolean){
          this.request_navigation.request = true
          this.$store.commit('update_reload', false)
        }
      },
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
    width: 280px;
    position: fixed;
    top:90px;
    left:0;
    border-right: 1px solid #e6e6e6;
    background: #373737;
    /*box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);*/
  }

  input[type="search"]{
    width: 100%;
    border: none;
    background: #373737;
    padding: 17px;
    font-size: 18px;
    border-bottom: 1px solid #3c3c3c;
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
          color: #fff;
        }
      }

      &:hover{
        background: #323232;
      }

      .user_image{
        float:left;
      }

      .details{
        margin-left: 17px;
        float:left;

        a{
          font-weight: 700;
          color: #9b9b9b;
        }

        p{
          font-size: 12px;
          font-weight: 500;
          color: #878787;
        }
      }
    }
  }

  .options{
    height: 55px;
    width: 100%;
    border-top: 1px solid #3c3c3c;
  }

  .default_scrollbar{
    &::-webkit-scrollbar-thumb {
      background: #505050;

      &:hover {
        background: #3da0f5;
      }
    }
  }

</style>
