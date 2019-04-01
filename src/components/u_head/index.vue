<template>
  <div>
    <div class="u_head default_box_two">
      <user_visual class="user_image" :name="user_name" :path="users_image" size="110"/>
      <user_name :name="user_name" :id="user_id" class="user_name"/>
      <div v-if="active_description">
        <a @click="active.description = !active.description" class="desription">
          Steckbrief <i v-if="active.description" class="material-icons">arrow_drop_up</i><i v-else class="material-icons">arrow_drop_down</i>
        </a>
        <p v-if="active.description">{{request_head.data.description}}</p>
      </div>
    </div>
    <request :obj="request_head" v-model="request_head"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Load_request from '../functions/load_request'
  import Request from "../functions/request";
  import User_name from "../user_name/index";
  import User_visual from "../user_visual/index";

  export default {
    name: "u_head",
    components: {
      User_visual,
      User_name,
      Request},
    data(){
      return {
        request_head: {
          params: {
            user_id: null
          },
          url: 'https://newbackend.groe.me/u_head/get_one',
          data: {},
          request: false
        },
        active: {
          description: false
        }
      }
    },
    computed:{
      ...mapGetters([
        'reload'
      ]),
      active_description(){
        return 'description' in this.request_head.data && this.request_head.data.description !== null
      },
      user_id(){
        return 'id' in this.request_head.data
          ? this.request_head.data.id
          : null
      },
      user_name(){
        return 'lastname' in this.request_head.data || 'firstname' in this.request_head.data
          ? this.request_head.data.firstname + ' ' + this.request_head.data.lastname
          : null
      },
      users_image(){
        return 'image' in this.request_head.data
          ? this.request_head.data.image
          : null
      },
      route_params_id(){
        return this.$route.params.id
      }
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'all'){
          this.request_head.request = true
          this.$store.commit('update_reload', {action: null, section: null})
        }
        if(object.action === 'reload' && object.section === 'u_head'){
          this.request_head.request = true
          this.$store.commit('update_reload', {action: null, section: null})
        }
      },
      route_params_id: function () {
        this.get_user_request(this.request_head)
      },
      get_header: function () {
        this.get_user_request(this.request_head)
      },
    },
    mounted(){
      this.get_user_request(this.request_head)
    },
    mixins:[Load_request]
  }
</script>

<style lang="scss" scoped>

  .u_head {
    min-height: 173px;
    margin-bottom: 17px;
    text-align: center;
  }

  .user_image{
    border-radius: 120px;
    width: 120px;
    height:120px;
    border: 5px solid #f3f3f3;
    margin: 25px calc(50% - 60px);
  }

  .user_name{
    font-size: 18px;
  }

  a{
    cursor: pointer;

    i{
      vertical-align: -7px;
    }
  }

  .desription{
    color: #3da0f5;
  }

  p{
    margin: 0 64px 17px 64px;
  }

</style>
