<template>
  <div class="notification default popup">
    <div class="inner">
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
        console.log(this.notification.type);
      this.image = 'image' in this.notification
        ? this.image = this.notification.image
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

<style lang="scss" scoped>

  .notification{

    .inner{
      padding: 41px ;
      width: 800px !important;
      box-shadow: none;

      h1{
        font-weight: 500;
        margin-bottom: 17px;
      }
    }
  }

</style>
