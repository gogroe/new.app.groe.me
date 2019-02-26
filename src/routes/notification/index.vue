<template>
  <div class="notification default_popup_background">
    <div class="inner_popup">
      <img v-if="image !== null" :src="image"/>
      <h1 v-if="header !== null">{{header}}</h1>
      <p v-if="content !== null">{{content}}</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "notification",
    data(){
      return{
        type: null,
        image: null,
        header: null,
        content: null,
      }
    },
    computed:{
      ...mapGetters([
        'notification'
      ])
    },
    mounted(){
      this.type = 'type' in this.notification
        ? this.notification.type
        : null
      this.image = 'image' in this.notification
        ? this.notification.image
        : null
      this.header = 'header' in this.notification
        ? this.notification.header
        : null
      this.content = 'content' in this.notification
        ? this.notification.content
        : null
      this.$store.commit('update_notification', {})
    }
  }
</script>

<style scoped>

  .default_popup_background{
    background: #fff;
    top:0;
    height: 100%;
  }


  h1{
    margin-bottom: 17px;
  }

</style>
