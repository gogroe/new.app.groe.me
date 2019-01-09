<template>
  <div class="post">
    <div class="head">
      <user_image :path="obj.image"
                  size="43"
                  class="user_image"/>
      <user_name :name="obj.firstname + ' ' + obj.lastname" :id="obj.create_user_id"
                 class="user_name"/>
      <div class="clear"></div>
      <div class="options">
        <p class="option"
           v-if="active_article"><i class="material-icons">more_horiz</i></p>
        <from_now v-else
                  :timestamp="obj.create_date"
                  class="date"/>
      </div>
    </div>
    <div class="content">
      <p class="subject">{{obj.name}}</p>
      <div v-if="obj.value.length > 200"
           class="post_content">
        <p v-if="active.more">
          {{obj.value}}
          <span @click="active.more = false">weniger...</span>
        </p>
        <p v-else>
          {{obj.value.substring(0,200)}}
          <span @click="active.more = true">mehr...</span>
        </p>
      </div>
      <div v-else
           class="post_content">
        <p> {{obj.value}} </p>
      </div>
    </div>
    <div class="image_wrapper">
      <img src="/static/layout/reichstag.jpg"/>
    </div>
  </div>
</template>

<script>
  import User_image from "../../user_image/index";
  import User_name from "../../user_name/index";
  import From_now from "../../date/from_now";

  export default {
    name: "post",
    components: {From_now, User_name, User_image},
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
          more: false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .head{
    padding: 17px 17px 27px 17px;
    position: relative;

    .user_image{
      float: left;
      margin-right: 17px;
    }

    .user_name{
      float: left;
      padding-top: 14px;
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
    }
  }

  .content{
    line-height: 18px;
    padding: 17px 17px 27px 17px;

    .subject{
      font-weight: 700;
    }

    .post_content{
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

</style>
