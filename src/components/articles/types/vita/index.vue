<template>
  <div class="vita">
    <div class="head">
      <user_initials
        :name="obj.company"
         size="43"
         class="user_initials"/>
      <p class="user_name">{{obj.company}} <span>&nbsp; &middot &nbsp; {{obj.position}}</span></p>
      <div class="clear"></div>
      <div class="options">
        <p class="option"
           v-if="active_article">
          <dropdown_menu
            :options="options"
            icon="more_horiz"
            v-model="action"/>
        </p>
        <p v-else 
           class="date">
          <ddmmmyy :timestamp="obj.start_date"/> bis <ddmmmyy :timestamp="obj.end_date"/>
        </p>
      </div>
    </div>
    <div class="content">
      <p class="subject">Positionsbeschreibung</p>
      <div v-if="obj.description.length > 200"
           class="vita_content">
        <p v-if="active.more">
          {{obj.description}}
          <span @click="active.more = false">weniger...</span>
        </p>
        <p v-else>
          {{obj.description.substring(0,200)}}
          <span @click="active.more = true">mehr...</span>
        </p>
      </div>
      <div v-else
           class="vita_content">
        <p> {{obj.description}} </p>
      </div>
    </div>
    <!--<map_location :locations="obj.adress"/>-->
    <div class="content">
      <p class="subject">{{obj.company}}</p>
      <p v-for="(adress, i) in obj.adress" :key="i" class="place">
        <i class="material-icons">place</i> {{adress.street}}, {{adress.zip}} {{adress.city}} {{adress.country}}
      </p>
    </div>
    <edit_vita :edit_vita="obj" :active="active.edit" v-model="active.edit"/>
    <request :obj="request_delete_user_vita" v-model="request_delete_user_vita"/>
  </div>
</template>

<script>
  import User_image from "../../../user_image/index";
  import User_name from "../../../user_name/index";
  import From_now from "../../../date/from_now";
  import Ddmmmyy from "../../../date/ddmmmyy";
  import Map_location from "../../../google/map_location";
  import User_initials from "../../../user_initals/index";
  import Popup_menu from "../../../popup_menu/index";
  import Edit_vita from "./edit";
  import Request from "../../../functions/request";
  import Dropdown_menu from "../../../dropdown/menu";

  export default {
    name: "vita",
    components: {
      Dropdown_menu,
      Request, Edit_vita, Popup_menu, User_initials, Map_location, Ddmmmyy, From_now, User_name, User_image},
    props:{
      obj:{
        required: true
      },
      active_article:{
        required: true
      }
    },
    data(){
      return{
        active:{
          more: false,
          open: false,
          edit: false
        },
        options:[
          {
            name: 'Bearbeiten',
            value: 'edit'
          },
          {
            name: 'Löschen',
            value: 'delete'
          }
        ],
        action:{},
        request_delete_user_vita: {
          params: {
            vita_id: this.obj.id,
          },
          url: 'https://newbackend.groe.me/user_vita/vita/delete',
          data: {},
          request: false
        },
      }
    },
    computed:{
      request_delete_user_vita_data(){
        return this.request_delete_user_vita.data
      }
    },
    watch:{
      action: function (object) {
        if(object.value === 'edit'){
          // this.action = {}
          this.active.edit = true
        }
        if(object.value  === 'delete'){
          this.request_delete_user_vita.params.vita_id = this.obj.id
          this.request_delete_user_vita.request = true
        }
      },
      request_delete_user_vita_data: function (object) {
        if('update' in object){
          this.$store.commit('update_reload', {action: 'reload', section: 'vitas'} )
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

  .head{
    padding: 17px 17px 27px 17px;
    position: relative;

    .user_initials{
      float: left;
      margin-right: 17px;
    }

    .user_name{
      float: left;
      padding-top: 14px;

      span{
        color: #7f7f7f;
        font-weight: 500;
      }
    }

    .options{
      position: absolute;
      right: 17px;
      top: calc( 17px + 12px);

      .option{
        i{
          margin-top: -5px;
        }
      }

      .date{
        color: #bbbbbb
      }
    }
  }

  .content{
    line-height: 18px;
    padding: 17px 17px 27px 17px;

    .subject{
      font-weight: 700;
    }

    .vita_content{
      span{
        display: inline-block;
        margin-left: 10px;
        color: #3da0f5;
        cursor: pointer;
      }
    }
  }

  .image_wrapper{
    position: relative;
    width: 100%;
    overflow: hidden;
    background-size: cover;

    img{
      width: 100%;
    }
  }

  .place{
    line-height: 18px;
    i{
      font-size: 14px;
      vertical-align: middle;
      color: #ca4541;
    }
  }

</style>
